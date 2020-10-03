import {inject, injectable} from "inversify";
import {Repository} from "typeorm";
import {REPOSITORY_TYPE} from "../constants/repository.types";
import {indexBy, prop} from "ramda";
import {IntialOrderStatus, Order, OrderStatus} from "../entities/order";
import {OrderLine} from "../entities/orderLine";
import {OrderStatusHistory} from "../entities/orderStatusHistory";
import {Meal} from "../entities/meal";
import {OrderLineDTO, OrderWithDetailsDTO, OrderWithLinesDTO} from "../dto/orderDTO";
import {User} from "../entities/user";
import {Restaurant} from "../entities/restaurant";
import {PaginatedResponse, toPaginatedResponse} from "./restaurant.service";

@injectable()
export class OrderService {
    private readonly _orderRepository: Repository<Order>;
    private readonly _orderLineRepository: Repository<OrderLine>;
    private readonly _orderStatusHistoryRepository: Repository<OrderStatusHistory>;

    public constructor(
        @inject(REPOSITORY_TYPE.OrderRepository)orderRepository: Repository<Order>,
        @inject(REPOSITORY_TYPE.OrderLineRepository)orderLineRepository: Repository<OrderLine>,
        @inject(REPOSITORY_TYPE.OrderStatusHistoryRepository)orderStatusHistoryRepository: Repository<OrderStatusHistory>
    ) {
        this._orderRepository = orderRepository;
        this._orderLineRepository = orderLineRepository;
        this._orderStatusHistoryRepository = orderStatusHistoryRepository;
    }

    public async findById(orderId: number, userId: number): Promise<OrderWithDetailsDTO> {
        const order =  await this._orderRepository.findOneOrFail({id: orderId});
        if (order.restaurantOwnerId !== userId && order.creatorId !== userId) {
            throw new Error('This order cannot be accessed by this user');
        }
        const lines = await this._orderLineRepository.find({orderId: order.id});
        const history = await this._orderStatusHistoryRepository.find({orderId: order.id});
        return {
            ...order,
            lines,
            history
        };
    }

    public async cancel(orderId: number, userId: number): Promise<OrderStatusHistory> {
        const fromDB = await this.validateIsOwner(userId, orderId);
        if(fromDB.status !== OrderStatus.PLACED) {
            throw new Error("This order cannot be canceled");
        }
        return this.updateStatus(OrderStatus.CANCELED, userId, fromDB);
    }

    public async process(orderId: number, userId: number): Promise<OrderStatusHistory> {
        const fromDB = await this.validateIsRestaurantOwner(userId, orderId);
        if(fromDB.status !== OrderStatus.PLACED) {
            throw new Error("This order cannot be set as processing");
        }
        return this.updateStatus(OrderStatus.PROCESSING, userId, fromDB);
    }

    public async inRoute(orderId: number, userId: number): Promise<OrderStatusHistory> {
        const fromDB = await this.validateIsRestaurantOwner(userId, orderId);
        if(fromDB.status !== OrderStatus.PROCESSING) {
            throw new Error("This order cannot be sent in Route");
        }
        return this.updateStatus(OrderStatus.IN_ROUTE, userId, fromDB);
    }

    public async deliver(orderId: number, userId: number): Promise<OrderStatusHistory> {
        const fromDB = await this.validateIsRestaurantOwner(userId, orderId);
        if(fromDB.status !== OrderStatus.IN_ROUTE) {
            throw new Error("This order cannot be delivered");
        }
        return this.updateStatus(OrderStatus.DELIVERED, userId, fromDB);
    }

    public async receive(orderId: number, userId: number): Promise<OrderStatusHistory> {
        const fromDB = await this.validateIsOwner(userId, orderId);
        if(fromDB.status !== OrderStatus.DELIVERED) {
            throw new Error("This order cannot be received");
        }
        return this.updateStatus(OrderStatus.RECEIVED, userId, fromDB);
    }

    public async findByCustomerId(customerId: number): Promise<PaginatedResponse<Order>> {
        const response =  await this._orderRepository.findAndCount({
            creatorId: customerId
        });
        return toPaginatedResponse(response);
    }

    public async findByOwnerId(ownerId: number): Promise<PaginatedResponse<Order>> {
        const response =  await this._orderRepository.findAndCount({
            restaurantOwnerId: ownerId
        });
        return toPaginatedResponse(response);
    }

    public async create(order: OrderWithLinesDTO, user: User, restaurant: Restaurant, meals: Meal[]): Promise<OrderWithDetailsDTO> {
        //validate prices are correct
        this.validateOrder(order, meals);

        //TODO; migrate to transaction, or use domain events.
        const created = Date.now();
        const orderInDB = await this._orderRepository.save({
            created: created,
            lastUpdate: created,
            status: IntialOrderStatus,
            creatorId: user.id,
            creatorName: user.name,
            restaurantId: restaurant.id,
            restaurantName: restaurant.name,
            restaurantOwnerId: restaurant.ownerId,
            total: order.total
        });
        const lines = await this._orderLineRepository.save(order.lines.map((line: OrderLineDTO)=>({
            orderId: orderInDB.id,
            amount: line.amount,
            price: line.price,
            mealId: line.mealId,
            mealName: line.mealName
        })));
        const statusHistory = await this.insertNewStatusHistory(orderInDB.id, user.id, IntialOrderStatus, created);

        return {
            ...orderInDB,
            lines: lines,
            history: [statusHistory]
        };
    }
    private async insertNewStatusHistory(orderId: number, userId: number, newStatus: OrderStatus, created: number): Promise<OrderStatusHistory> {
        return await this._orderStatusHistoryRepository.save({
            orderId: orderId,
            userId: userId,
            newStatus: newStatus,
            created: created
        })
    }

    private validateOrder(order: OrderWithLinesDTO, meals: Meal[]) {

        const indexedMeals: {[key: string]: Meal} = indexBy(prop('id'), meals);
        const total: number = order.lines.reduce((acc: number, line: OrderLineDTO)=>{
            if(line.price !== indexedMeals[line.mealId].price) {
                throw new Error("Prices are out of sync. Please review your order");
            }
            return acc + (line.amount * line.price);
        },0);
        if(total !== order.total) {
            throw new Error("The total amount in the order is incorrect. Please review your order")
        }
    }
    private async validateIsOwner(userId: number, orderId: number): Promise<Order> {
        const fromDB: Order = await this._orderRepository.findOneOrFail({id: orderId});
        if(fromDB.creatorId !== userId) throw new Error("Given user cannot modify the order " + fromDB.id);
        return fromDB;
    }
    private async validateIsRestaurantOwner(userId: number, orderId: number): Promise<Order> {
        const fromDB: Order = await this._orderRepository.findOneOrFail({id: orderId});
        if(fromDB.restaurantOwnerId !== userId) throw new Error("Given user cannot modify the order " + fromDB.id);
        return fromDB;
    }

    private async updateStatus(newStatus: OrderStatus, userId: number, order: Order): Promise<OrderStatusHistory> {
        const created = Date.now();
        await this._orderRepository.save({
            ...order,
            lastUpdate: created,
            status: newStatus
        });
        return await this.insertNewStatusHistory(order.id, userId, newStatus, created);
    }
}

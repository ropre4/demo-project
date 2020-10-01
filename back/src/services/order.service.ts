import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { REPOSITORY_TYPE } from "../constants/repository.types";
import {indexBy, prop} from "ramda";
import {IntialOrderStatus, Order} from "../entities/order";
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

    public async findByCustomerId(customerId: number): Promise<PaginatedResponse<Order>> {
        const response =  await this._orderRepository.findAndCount({
            creatorId: customerId
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
            total: order.total
        });
        const lines = await this._orderLineRepository.save(order.lines.map((line: OrderLineDTO)=>({
            orderId: orderInDB.id,
            amount: line.amount,
            price: line.price,
            mealId: line.mealId,
            mealName: line.mealName
        })));
        const statusHistory = await this._orderStatusHistoryRepository.save({
            orderId: orderInDB.id,
            userId: user.id,
            newStatus: IntialOrderStatus,
            created: created
        })
        return {
            ...orderInDB,
            lines: lines,
            history: [statusHistory]
        };
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
}

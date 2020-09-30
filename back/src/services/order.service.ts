import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { REPOSITORY_TYPE } from "../constants/repository.types";
import {omit} from "ramda";
import {Order} from "../entities/order";
import {OrderLine} from "../entities/orderLine";
import {OrderStatusHistory} from "../entities/orderStatusHistory";

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

}

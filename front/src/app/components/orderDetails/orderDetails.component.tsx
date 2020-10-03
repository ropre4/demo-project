import * as React from "react";
import "./orderDetails.css";
import {OrderService} from "../../order/order.service";
import {useQuery} from "react-query";
import {OrderLinesComponent} from "../orderLines/orderLinesComponent";
import {OrderStatusComponent} from "../orderStatus/orderStatus.component";

export function OrderDetailsComponent(props: {
    orderId: number,
    isCustomer: boolean
}) {

    const orderDetails = useQuery('fetchOrderDetails', () => OrderService.fetchByOrderId(props.orderId),
        {retry: false });

    const onStatusChange = () => {
        orderDetails.refetch();
    }

    return <div className="drawer-container">
        {orderDetails && orderDetails.data &&
        <>
          <OrderLinesComponent onPlaceOrder={null} order={orderDetails.data} isCustomer={props.isCustomer}/>
          <div style={{height: '50px'}} />
          <OrderStatusComponent order={orderDetails.data} isCustomer={props.isCustomer} onStatusChange={onStatusChange}/>
        </>}
    </div>
}
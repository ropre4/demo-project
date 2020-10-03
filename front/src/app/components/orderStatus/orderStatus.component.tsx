import * as React from "react";
import "./orderStatus.css";
import {indexBy, prop} from "ramda";
import {IOrder, OrderStatus} from "../../order/order";
import Stepper from "@material-ui/core/Stepper/Stepper";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import Button from "@material-ui/core/Button/Button";
import Step from "@material-ui/core/Step/Step";
import StepContent from "@material-ui/core/StepContent/StepContent";
import {useTranslation} from "react-i18next";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import CancelIcon from '@material-ui/icons/Cancel';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SportsMotorsportsIcon from '@material-ui/icons/SportsMotorsports';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import {displayDate} from "../../../utils/utils";
import {useDispatch} from "react-redux";
import {
    CancelOrderAction,
    DeliverOrderAction,
    InRouteOrderAction,
    ProcessOrderAction,
    ReceiveOrderAction
} from "../../order/order.actions";

export function OrderStatusComponent(props: {
    isCustomer: boolean,
    onStatusChange: Function,
    order: IOrder
}) {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const indexedHistory = indexBy(prop('newStatus'), props.order.history);

    const steps = props.order.status === OrderStatus.CANCELED ? [
        {key: 0, label: t('order_status:0'), icon: (isAct: boolean)=><div className={`iconCont${isAct ? '--active': ''}`}><NotificationsActiveIcon/></div>},
        {key: 1, label: t('order_status:1'), icon: (isAct: boolean)=><div className={`iconCont${isAct ? '--active': ''}`}><CancelIcon/></div>}
    ] : [
        {key: 0, label: t('order_status:0'), icon: (isAct: boolean)=><div className={`iconCont${isAct ? '--active': ''}`}><NotificationsActiveIcon/></div>},
        {key: 2, label: t('order_status:2'), icon: (isAct: boolean)=><div className={`iconCont${isAct ? '--active': ''}`}><RestaurantMenuIcon/></div>},
        {key: 3, label: t('order_status:3'), icon: (isAct: boolean)=><div className={`iconCont${isAct ? '--active': ''}`}><SportsMotorsportsIcon/></div>},
        {key: 4, label: t('order_status:4'), icon: (isAct: boolean)=><div className={`iconCont${isAct ? '--active': ''}`}><CardGiftcardIcon/></div>},
        {key: 5, label: t('order_status:5'), icon: (isAct: boolean)=><div className={`iconCont${isAct ? '--active': ''}`}><FastfoodIcon/></div>}
    ];

    const onCancelOrder = (orderId: number) => {
        dispatch(new CancelOrderAction(orderId, props.onStatusChange));
    };
    const onReceiveOrder = (orderId: number) => {
        dispatch(new ReceiveOrderAction(orderId, props.onStatusChange));

    };
    const onProcessOrder = (orderId: number) => {
        dispatch(new ProcessOrderAction(orderId, props.onStatusChange));
    };
    const onInRouteOrder = (orderId: number) => {
        dispatch(new InRouteOrderAction(orderId, props.onStatusChange));
    };
    const onDeliverOrder = (orderId: number) => {
        dispatch(new DeliverOrderAction(orderId, props.onStatusChange));
    };

    const getAction = (key: number) => {
        if(props.isCustomer) {
            if(props.order.status === OrderStatus.PLACED && key === 0) {
                return <Button variant="outlined" color="primary" onClick={()=>onCancelOrder(props.order.id)}>{t('order_status_actions:cancel')}</Button>
            }
            if(props.order.status === OrderStatus.DELIVERED && key === 4) {
                return <Button variant="outlined" color="primary" onClick={()=>onReceiveOrder(props.order.id)}>{t('order_status_actions:receive')}</Button>
            }
        } else {
            if(props.order.status === OrderStatus.PLACED && key === 0) {
                return <Button variant="outlined" color="primary" onClick={()=>onProcessOrder(props.order.id)}>{t('order_status_actions:process')}</Button>
            }
            if(props.order.status === OrderStatus.PROCESSING && key === 2) {
                return <Button variant="outlined" color="primary" onClick={()=>onInRouteOrder(props.order.id)}>{t('order_status_actions:in_route')}</Button>
            }
            if(props.order.status === OrderStatus.IN_ROUTE && key === 3) {
                return <Button variant="outlined" color="primary" onClick={()=>onDeliverOrder(props.order.id)}>{t('order_status_actions:deliver')}</Button>
            }
        }
        return null;
    };

    return <div>
        <div className="drawer-title">{t('common:order_updates')}</div>
        <div className="table-container">
        <Stepper orientation="vertical">
            {steps.map(step => {
                const completed = !!indexedHistory[step.key];
                return <Step key={step.key}>
                    <StepLabel StepIconComponent={()=>step.icon(completed)}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span className="order-status-label">
                            {step.label} {completed ? displayDate(indexedHistory[step.key].created) : null}
                        </span>
                        {getAction(step.key)}
                        </div>
                        </StepLabel>
                    <StepContent>
                        <div>
                        </div>
                    </StepContent>
                </Step>
            })}
        </Stepper>
        </div>
    </div>
}
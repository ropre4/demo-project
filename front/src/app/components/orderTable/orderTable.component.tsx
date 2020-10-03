import * as React from "react";
import {useTranslation} from "react-i18next";
import Chip from '@material-ui/core/Chip';
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import {TableBody, TableCell, TableRow} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import {IOrder, OrderStatus} from "../../order/order";
import {displayDate, displayPrice} from "../../../utils/utils";

export function OrderTableComponent(props: {
    list: IOrder[],
    isCustomer: boolean,
    onViewDetails: (orderId: number)=>void,
    onBlockCustomer: (userId: number)=>void
}) {
    const {t} = useTranslation();

    const getChipColor = (status: OrderStatus): any => {
        switch(status){
            case OrderStatus.CANCELED:
                return "default";
            case OrderStatus.RECEIVED:
                return "secondary";
            default:
                return "primary";
        }
    }

    return <div className="table-container">
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>{t('order_table:restaurant')}</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>{t('order_table:status')}</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>{t('order_table:placed')}</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>{t('order_table:last_update')}</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>{t('order_table:total')}</TableCell>
                    {!props.isCustomer && <TableCell align="center" style={{fontWeight: 'bold'}}>{t('order_table:customer')}</TableCell>}
                    <TableCell align="right" style={{fontWeight: 'bold'}}/>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.list.map((res: IOrder, i: number)=> {
                    return <TableRow key={i}>
                        <TableCell align="center">{res.restaurantName}</TableCell>
                        <TableCell align="center"><Chip color={getChipColor(res.status)}
                                                        label={t(`order_status:${res.status}`)}/></TableCell>
                        <TableCell align="center">{displayDate(res.created)}</TableCell>
                        <TableCell align="center">{displayDate(res.lastUpdate)}</TableCell>
                        <TableCell align="center">{displayPrice(res.total)}</TableCell>
                            {!props.isCustomer && <TableCell align="center">{res.creatorName}</TableCell>}
                        <TableCell align="right">
                            <div>
                                <Button style={{margin: '0 10px'}} variant="contained" color="primary" onClick={()=>props.onViewDetails(res.id)}>{t('common:details')}</Button>
                                {!props.isCustomer && <Button style={{margin: '0 10px'}} variant="outlined" color="primary" onClick={()=>props.onBlockCustomer(res.creatorId)}>{t('common:block_customer')}</Button>}
                            </div>
                        </TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
    </div>
}
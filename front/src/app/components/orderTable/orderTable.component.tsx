import * as React from "react";
import {useTranslation} from "react-i18next";
import Chip from '@material-ui/core/Chip';
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import {TableRow, TableCell, TableBody} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import {IOrder} from "../../order/order";
import {displayDate, displayPrice} from "../../../utils/utils";

export function OrderTableComponent(props: {
    list: IOrder[],
    isCustomer: boolean,
    onViewLines: (orderId: number)=>void,
    onViewStatusHistory: (orderId: number)=>void
    onBlockCustomer: (userId: number)=>void
}) {
    const {t} = useTranslation();

    return <div className="table-container">
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>{t('order_table:restaurant')}</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>{t('order_table:status')}</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>{t('order_table:placed')}</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>{t('order_table:last_update')}</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>{t('order_table:total')}</TableCell>
                    <TableCell align="right" style={{fontWeight: 'bold'}}/>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.list.map((res: IOrder, i: number)=> {
                    return <TableRow key={i}>
                        <TableCell align="center">{res.restaurantName}</TableCell>
                        <TableCell align="center"><Chip color="primary" label={t(`order_status:${res.status}`)}/></TableCell>
                        <TableCell align="center">{displayDate(res.created)}</TableCell>
                        <TableCell align="center">{displayDate(res.lastUpdate)}</TableCell>
                        <TableCell align="center">{displayPrice(res.total)}</TableCell>
                        <TableCell align="right">
                            <div>
                                <Button style={{margin: '0 10px'}} variant="contained" color="primary" onClick={()=>props.onViewLines(res.id)}>{t('common:details')}</Button>
                                <Button style={{margin: '0 10px'}} variant="contained" color="primary" onClick={()=>props.onViewStatusHistory(res.id)}>{t('common:changes')}</Button>
                                {!props.isCustomer && <Button style={{margin: '0 10px'}} variant="outlined" color="primary" onClick={()=>props.onBlockCustomer(res.creatorId)}>{t('common:block_customer')}</Button>}
                            </div>
                        </TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
    </div>
}
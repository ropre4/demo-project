import * as React from "react";
import {useTranslation} from "react-i18next";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import {TableRow, TableCell, TableBody} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import {displayPrice} from "../../../utils/utils";
import {IOrder, IOrderLine} from "../../order/order";
import './orderLines.css';

export function OrderLinesComponent(props: {
    order: IOrder,
    isCustomer: boolean,
    onPlaceOrder: ()=>void
}) {
    const {t} = useTranslation();

    return <div>
          <div className="drawer-title">{t('common:order_details')}</div>
          <div className="table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{fontWeight: 'bold'}}>{t('order:mealName')}</TableCell>
                  <TableCell align="center" style={{fontWeight: 'bold'}}>{t('order:amount')}</TableCell>
                  <TableCell align="center" style={{fontWeight: 'bold'}}>{t('order:price')}</TableCell>
                  <TableCell align="right" style={{fontWeight: 'bold'}} />
            </TableRow>
          </TableHead>
          <TableBody>
              {props.order.lines && props.order.lines.map((line: IOrderLine, i: number)=> {
                  return <TableRow key={i}>
                      <TableCell align="center">{line.mealName}</TableCell>
                      <TableCell align="center">{line.amount}</TableCell>
                      <TableCell align="center">{displayPrice(line.price)}</TableCell>
                      <TableCell align="right">

                      </TableCell>
                  </TableRow>
              })}
          </TableBody>
        </Table>
              <div className="order-details-actions">
                  <div>{t('order:total')}:  {displayPrice(props.order.total)}</div>
                  {props.isCustomer && props.onPlaceOrder && <Button variant="contained" color="secondary" onClick={props.onPlaceOrder}>
                      {t('order:place_order')}
                  </Button>}
              </div>
        </div>
        </div>
}
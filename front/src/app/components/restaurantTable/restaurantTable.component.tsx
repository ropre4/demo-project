import * as React from "react";
import {useTranslation} from "react-i18next";
import Chip from '@material-ui/core/Chip';
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import {TableRow, TableCell, TableBody} from "@material-ui/core";
import {IRestaurant} from "../../restaurant/restaurant";
import Button from "@material-ui/core/Button/Button";

export function RestaurantTableComponent(props: { list: IRestaurant[], onViewMenu: Function, isOwner: boolean, onEdit: Function, onDelete: Function}) {
    const {t} = useTranslation();

    return <div className="table-container">
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>{t('restaurant_form:name')}</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>{t('restaurant_form:description')}</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>{t('restaurant_form:cuisineType')}</TableCell>
                    <TableCell align="right" style={{fontWeight: 'bold'}}/>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.list.map((res: IRestaurant)=> {
                    return <TableRow>
                        <TableCell align="center">{res.name}</TableCell>
                        <TableCell align="center">{res.description}</TableCell>
                        <TableCell align="center"><Chip color="secondary" label={t(`cuisine_type:${res.cuisineType}`)}/></TableCell>
                        <TableCell align="right">
                            <div>
                                <Button style={{margin: '0 10px'}} variant="contained" color="primary" onClick={()=>props.onViewMenu(res.id)}>{t('common:view_menu')}</Button>
                                {props.isOwner && <>
                                  <Button style={{margin: '0 10px'}} variant="contained" color="primary" onClick={()=>props.onEdit(res.id)}>{t('common:edit')}</Button>
                                  <Button style={{margin: '0 10px'}} variant="outlined" color="primary" onClick={()=>props.onDelete(res.id)}>{t('common:delete')}</Button>
                                </>}
                            </div>
                        </TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
    </div>
}
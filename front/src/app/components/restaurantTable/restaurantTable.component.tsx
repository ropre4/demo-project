import * as React from "react";
import {useTranslation} from "react-i18next";
import Chip from '@material-ui/core/Chip';
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import {TableRow, TableCell, TableBody} from "@material-ui/core";
import {IRestaurant} from "../../restaurant/restaurant";
import Button from "@material-ui/core/Button/Button";

export function RestaurantTableComponent(props: {
    list: IRestaurant[],
    onViewMenu: (id: number)=>void,
    isOwner: boolean,
    onEdit: (res: IRestaurant)=>void,
    onCreate: ()=>void,
    onDelete: (id: number)=>void,
}) {
    const {t} = useTranslation();

    return <div className="table-container">
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>{t('restaurant_form:name')}</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>{t('restaurant_form:description')}</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>{t('restaurant_form:cuisineType')}</TableCell>
                    <TableCell align="right" style={{fontWeight: 'bold'}}>
                        {props.isOwner && <Button  variant="contained" color="secondary" onClick={props.onCreate}>
                            {t('dashboard:new_restaurant')}
                        </Button>}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.list.map((res: IRestaurant, i: number)=> {
                    return <TableRow key={i}>
                        <TableCell align="center">{res.name}</TableCell>
                        <TableCell align="center">{res.description}</TableCell>
                        <TableCell align="center"><Chip color="secondary" label={t(`cuisine_type:${res.cuisineType}`)}/></TableCell>
                        <TableCell align="right">
                            <div>
                                <Button style={{margin: '0 10px'}} variant="contained" color="primary" onClick={()=>props.onViewMenu(res.id)}>{t('common:view_menu')}</Button>
                                {props.isOwner && <>
                                  <Button style={{margin: '0 10px'}} variant="contained" color="primary" onClick={()=>props.onEdit(res)}>{t('common:edit')}</Button>
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
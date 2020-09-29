import * as React from "react";
import {useTranslation} from "react-i18next";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import {TableRow, TableCell, TableBody} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import {IMeal} from "../../meal/meal";
import {displayPrice} from "../../../utils/utils";

export function MealTableComponent(props: {
    list: IMeal[],
    isOwner: boolean,
    onCreate: ()=>void,
    onEdit: (meal: IMeal)=>void,
    onDelete: (id: number)=>void,
}) {
    const {t} = useTranslation();

    return <div className="table-container">
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>{t('meal_form:name')}</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>{t('meal_form:description')}</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>{t('meal_form:price')}</TableCell>
                    <TableCell align="right" style={{fontWeight: 'bold'}}>
                        {props.isOwner && <Button  variant="contained" color="secondary" onClick={props.onCreate}>
                            {t('dashboard:new_meal')}
                        </Button>}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.list.map((meal: IMeal, i: number)=> {
                    return <TableRow key={i}>
                        <TableCell align="center">{meal.name}</TableCell>
                        <TableCell align="center">{meal.description}</TableCell>
                        <TableCell align="center">{displayPrice(meal.price)}</TableCell>
                        <TableCell align="right">
                            <div>
                                {props.isOwner && <>
                                  <Button style={{margin: '0 10px'}} variant="contained" color="primary" onClick={()=>props.onEdit(meal)}>{t('common:edit')}</Button>
                                  <Button style={{margin: '0 10px'}} variant="outlined" color="primary" onClick={()=>props.onDelete(meal.id)}>{t('common:delete')}</Button>
                                </>}
                            </div>
                        </TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
    </div>
}
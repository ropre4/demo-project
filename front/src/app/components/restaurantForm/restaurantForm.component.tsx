import * as React from "react";
import {useState} from "react";
import { useDispatch } from 'react-redux'
import {values, findIndex} from "ramda";
import {useTranslation} from "react-i18next";
import "./restaurantForm.css";
import {InputComponent} from "../../common/input/input.component";
import Grid from "@material-ui/core/Grid/Grid";
import {
    CuisineType,
    IRestaurant,
    IRestaurantForm,
    IRestaurantFormErrors,
    RestaurantForm
} from "../../restaurant/restaurant";
import Button from "@material-ui/core/Button/Button";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {CreateRestarantAction, EditRestaurantAction} from "../../restaurant/restaurant.actions";

export function RestaurantFormComponent(props: {onSubmit: Function, restaurant: IRestaurant}) {

    const {t} = useTranslation();
    const dispatch = useDispatch();

    const [restaurant, setRestaurant] = useState<IRestaurantForm>(RestaurantForm.InitForm(props.restaurant));
    const [errors, setErrors] = useState<IRestaurantFormErrors>(RestaurantForm.InitErrors());

    const isEdit = !!props.restaurant;

    const handleSubmit = (restaurant: IRestaurantForm) => {
        const err = RestaurantForm.ValidateRestaurantForm(restaurant);
        setErrors(err);
        if(findIndex(el=>el===true)(values(err))===-1) {
            if(isEdit) dispatch(new EditRestaurantAction(restaurant));
            else dispatch(new CreateRestarantAction(restaurant));
            props.onSubmit();
        }
    }

    return <div className="drawer-container">
        <Grid item className="form-title">{t('restaurant_form:create_title')}</Grid>
        <Grid container>
            <Grid container className="form-item">
                <Grid item sm={4} className="form-label">{t('restaurant_form:name')}:</Grid>
                <Grid item sm={8}>
                    <InputComponent type="text" error={errors.name} onChange={(value)=>setRestaurant({...restaurant, name: value})}/>
                </Grid>
            </Grid>
            <Grid container className="form-item">
                <Grid item sm={4} className="form-label">{t('restaurant_form:description')}:</Grid>
                <Grid item sm={8}>
                    <InputComponent type="text" error={errors.description} onChange={(value)=>setRestaurant({...restaurant, description: value})}/>
                </Grid>
            </Grid>
            <Grid container className="form-item">
                <Grid item sm={4} className="form-label">{t('restaurant_form:cuisineType')}:</Grid>
                <Grid item sm={8}>
                    <Select value={restaurant.cuisineType} error={errors.cuisineType} style={{width: '100%'}}
                            onChange={(event)=>setRestaurant({...restaurant, cuisineType: parseInt(event.target.value as string)})}>
                        {values(CuisineType).filter(el=>typeof el === 'number').map(el=><MenuItem value={el}>{t('cuisine_type:' + el)}</MenuItem>)}
                    </Select>
                </Grid>
            </Grid>
            <Button  style={{width: '100%', marginTop: 50}} variant="contained" color="primary" onClick={()=>handleSubmit(restaurant)}>
                {t('common:save')}
            </Button>
        </Grid>
    </div>
}
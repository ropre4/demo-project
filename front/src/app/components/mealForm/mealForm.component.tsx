import * as React from "react";
import {useState, useEffect} from "react";
import { useDispatch } from 'react-redux'
import {values, findIndex} from "ramda";
import {useTranslation} from "react-i18next";
import "./mealForm.css";
import {InputComponent} from "../../common/input/input.component";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import {IMeal, IMealForm, IMealFormErrors, MealForm} from "../../meal/meal";
import {CreateMealAction, EditMealAction} from "../../meal/meal.actions";
import {displayPrice, setPrice} from "../../../utils/utils";

export function MealFormComponent(props: {onSubmit: Function, onCancel: Function, meal: IMeal, restaurantId: number}) {

    const {t} = useTranslation();
    const dispatch = useDispatch();

    const [meal, setMeal] = useState<IMealForm>(MealForm.InitForm(props.meal));
    const [errors, setErrors] = useState<IMealFormErrors>(MealForm.InitErrors());
    const isEdit = !!props.meal;

    useEffect(()=>{
        setMeal(MealForm.InitForm(props.meal));
        setErrors(MealForm.InitErrors());
    }, [props.meal]);

    const handleSubmit = (meal: IMealForm) => {
        const err = MealForm.ValidateMealForm(meal);
        setErrors(err);
        if(findIndex(el=>el===true)(values(err))===-1) {
            if(isEdit) dispatch(new EditMealAction(meal, props.restaurantId, props.onSubmit));
            else dispatch(new CreateMealAction(meal, props.restaurantId, props.onSubmit));
        }
    }

    return <div className="meal-form-container">
        <Grid item className="form-title">{isEdit ? t('meal_form:edit_title') : t('meal_form:create_title')}</Grid>
        <Grid container>
            <Grid container className="form-item">
                <Grid item sm={4} className="form-label">{t('meal_form:name')}:</Grid>
                <Grid item sm={8}>
                    <InputComponent type="text" error={errors.name} initialValue={meal.name}
                                    onChange={(value)=>setMeal({...meal, name: value})}/>
                </Grid>
            </Grid>
            <Grid container className="form-item">
                <Grid item sm={4} className="form-label">{t('meal_form:description')}:</Grid>
                <Grid item sm={8}>
                    <InputComponent type="text" error={errors.description} initialValue={meal.description}
                                    onChange={(value)=>setMeal({...meal, description: value})}/>
                </Grid>
            </Grid>
            <Grid container className="form-item">
                <Grid item sm={4} className="form-label">{t('meal_form:price')}:</Grid>
                <Grid item sm={8}>
                    <InputComponent type="number" label={"$"} error={errors.price} initialValue={meal.price/100}
                                    onChange={(value)=>setMeal({...meal, price: value ? setPrice(value) : null})}/>
                </Grid>
            </Grid>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <Button  style={{width: '40%', marginTop: 50}} variant="outlined" color="primary" onClick={()=>props.onCancel()}>
                {t('common:cancel')}
            </Button>
            <Button  style={{width: '40%', marginTop: 50}} variant="contained" color="primary" onClick={()=>handleSubmit(meal)}>
                {isEdit ? t('common:edit') : t('common:save')}
            </Button>
            </div>
        </Grid>
    </div>
}
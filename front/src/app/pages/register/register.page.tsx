import * as React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import {useTranslation} from "react-i18next";
import './register.css';
import Link from "@material-ui/core/Link/Link";
import {InputComponent} from "../../common/input/input.component";
import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/Paper/Paper";

export default function RegisterPage() {
    const {t} = useTranslation();

    return <div className="register-container">
        <Paper elevation={0} className="form-container">
            <Grid item className="form-title">{t('register_form:welcome')}</Grid>
            <Grid container>
                <Grid container className="form-item">
                    <Grid item sm={4} className="form-label">{t('login_form:email')}:</Grid>
                    <Grid item sm={8}>
                        <InputComponent type="text"/>
                    </Grid>
                </Grid>
                <Grid  container className="form-item">
                    <Grid item sm={4} className="form-label">{t('login_form:password')}:</Grid>
                    <Grid item sm={8}>
                        <InputComponent type="password"/>
                    </Grid>
                </Grid>
                <Button  style={{width: '100%', marginTop: 30}} variant="contained" color="primary">
                    {t('common:login')}
                </Button>
            </Grid>
            <Grid item className="form-footer">
                {t('register_form:already_registered1')} <Link href="/login" color="secondary">{t('register_form:already_registered2')}</Link>
            </Grid>
        </Paper>
    </div>
}
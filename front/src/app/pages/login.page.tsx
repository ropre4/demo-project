import * as React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import {useTranslation} from "react-i18next";
import './login.css';
import Link from "@material-ui/core/Link/Link";
import {InputComponent} from "../common/input/input.component";
import Button from "@material-ui/core/Button/Button";

export default function LoginPage() {
    const {t} = useTranslation();

    return <div className="login-container">
        <div className="form-container">
            <Grid item className="form-title">{t('login_form:welcome')} Food<span className="accent-logo">Delivery</span>!</Grid>
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
                {t('login_form:new_user1')} <Link href="/register" color="secondary">{t('login_form:new_user2')}</Link>
            </Grid>
        </div>
    </div>
}
import * as React from "react";
import {useState} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import {useTranslation} from "react-i18next";
import './register.css';
import Link from "@material-ui/core/Link/Link";
import {InputComponent} from "../../common/input/input.component";
import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/Paper/Paper";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";

export default function RegisterPage() {
    const {t} = useTranslation();
    const [userRole, setUserRole] = useState<number>(0);

    return <div className="register-container">
        <Paper elevation={0} className="form-container">
            <Grid item className="form-title">{t('register_form:welcome')}</Grid>
            <Grid container>
                <Grid container className="form-item">
                    <Grid item sm={4} className="form-label">{t('register_form:name')}:</Grid>
                    <Grid item sm={8}>
                        <InputComponent type="text"/>
                    </Grid>
                </Grid>
                <Grid container className="form-item">
                    <Grid item sm={4} className="form-label">{t('register_form:surname')}:</Grid>
                    <Grid item sm={8}>
                        <InputComponent type="text"/>
                    </Grid>
                </Grid>
                <Grid container className="form-item">
                    <Grid item sm={4} className="form-label">{t('register_form:email')}:</Grid>
                    <Grid item sm={8}>
                        <InputComponent type="text"/>
                    </Grid>
                </Grid>
                <Grid  container className="form-item">
                    <Grid item sm={4} className="form-label">{t('register_form:password')}:</Grid>
                    <Grid item sm={8}>
                        <InputComponent type="password"/>
                    </Grid>
                </Grid>
                <Grid  container className="form-item">
                    <Grid item sm={4} className="form-label">{t('register_form:repeat_password')}:</Grid>
                    <Grid item sm={8}>
                        <InputComponent type="password"/>
                    </Grid>
                </Grid>
                <Grid  container className="form-item">
                    <Grid item sm={4} className="form-label">{t('register_form:role')}:</Grid>
                    <Grid item sm={8}>
                        <Tabs
                            value={userRole}
                            indicatorColor="secondary"
                            textColor="secondary"
                            onChange={(_, value)=>setUserRole(value)}
                            aria-label="disabled tabs example"
                        >
                            <Tab label={t('register_form:customer')} style={{width: '50%', fontWeight: 'bold'}} value={0}/>
                            <Tab label={t('register_form:owner')} style={{width: '50%', fontWeight: 'bold'}} value={1}/>
                        </Tabs>
                    </Grid>
                </Grid>
                <Button  style={{width: '100%', marginTop: 50}} variant="contained" color="primary">
                    {t('register_form:create_account')}
                </Button>
            </Grid>
            <Grid item className="form-footer">
                {t('register_form:already_registered1')} <Link href="/login" color="secondary">{t('register_form:already_registered2')}</Link>
            </Grid>
        </Paper>
    </div>
}
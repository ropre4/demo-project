import * as React from "react";
import {useState} from "react";
import {values, findIndex} from "ramda";
import { useHistory } from "react-router";
import Grid from "@material-ui/core/Grid/Grid";
import {useTranslation} from "react-i18next";
import './login.css';
import Link from "@material-ui/core/Link/Link";
import {InputComponent} from "../../common/input/input.component";
import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/Paper/Paper";
import {ILoginUser, ILoginUserErrors, LoginUser} from "../../user/loginUser";

export interface ILoginPageProps {
    loading: boolean
}

export interface ILoginPageDispatcher {
    login: (user: ILoginUser, done: Function) => void;
}

interface Props extends ILoginPageProps, ILoginPageDispatcher {}

export default function LoginPage(props: Props) {

    const {t} = useTranslation();
    const history = useHistory();
    const [user, setUser] = useState<ILoginUser>(LoginUser.InitLoginUser());
    const [errors, setErrors] = useState<ILoginUserErrors>(LoginUser.InitErrors());

    const onLogin= (user: ILoginUser) => {
        const err = LoginUser.ValidateLoginUser(user);
        setErrors(err);
        if(findIndex(el=>el===true)(values(err))===-1) {
            props.login(user, ()=>history.push("/"));
        }
    };

    return <div className="login-container">
        <Paper elevation={0} className="form-container" style={{marginTop: 50}}>
            <Grid item className="form-title">{t('login_form:welcome')} Food<span className="accent-logo">Delivery</span>!</Grid>
            <Grid container>
                <Grid container className="form-item">
                    <Grid item sm={4} className="form-label">{t('login_form:email')}:</Grid>
                    <Grid item sm={8}>
                        <InputComponent type="text" error={errors.email} onChange={(value)=>setUser({...user, email: value})}/>
                    </Grid>
                </Grid>
                <Grid  container className="form-item">
                    <Grid item sm={4} className="form-label">{t('login_form:password')}:</Grid>
                    <Grid item sm={8}>
                        <InputComponent type="password" error={errors.password} onChange={(value)=>setUser({...user, password: value})}/>
                    </Grid>
                </Grid>
                <Button  style={{width: '100%', marginTop: 30}} variant="contained" color="primary" onClick={()=>onLogin(user)}>
                    {t('common:login')}
                </Button>
            </Grid>
            <Grid item className="form-footer">
                {t('login_form:new_user1')} <Link href="/register" color="secondary">{t('login_form:new_user2')}</Link>
            </Grid>
        </Paper>
    </div>
}
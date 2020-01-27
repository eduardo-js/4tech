import React, { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Grid, Paper, Typography } from '@material-ui/core';
import { user } from '../../services/user';
import { login } from '../../services/auth';

import './Login.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [fullName, setFullName] = useState('');
    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const history = useHistory();

    const onLoginChange = (event) => {
        setUserLogin(event.target.value)
    };

    const onPasswordChange = (event) => {
        setUserPassword(event.target.value)
    };

    const onLogin = async (event) => {
        event.preventDefault();
        const response = await login(userLogin, userPassword);
        if (response.status >= 200 && response.status < 300) {
            history.push('/timeline');
        }
        console.log(response);
    }

    const onRegister = async (event) => {
        event.preventDefault();
        const response = await user.register(userLogin, fullName, userPassword);
        console.log(response)
    };

    const renderLogin = () => {
        return (
            <Fragment>
                <TextField
                    id="userLogin"
                    label="User Login"
                    value={userLogin}
                    onChange={onLoginChange}
                    required
                />

                <TextField
                    type="password"
                    id="userPassword"
                    label="User Password"
                    value={userPassword}
                    onChange={onPasswordChange}
                    required
                />
                <Button color="primary" type="submit">Login</Button>
                <Button color="secondary" onClick={() => setIsLogin(false)}>Sign up</Button>
            </Fragment>
        );
    };


    const renderRegister = () => {
        return (
            <Fragment>
                <TextField
                    id="fullName"
                    label="Full Name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    required
                />

                <TextField
                    id="userLogin"
                    label="User Login"
                    value={userLogin}
                    onChange={onLoginChange}
                    required
                />

                <TextField
                    type="password"
                    id="userPassword"
                    label="User Password"
                    value={userPassword}
                    onChange={onPasswordChange}
                    required
                />
                <Button color="primary" type="submit">Sign Up</Button>
                <Button color="secondary" type="submit" onClick={() => setIsLogin(true)}>Back</Button>
            </Fragment>
        )
    }

    return (
        <div className="login">
            <Grid item xs={2} className="grid">
                <Paper className="paper">
                    <form onSubmit={isLogin ? onLogin : onRegister}>
                        <Typography variant="h6"> Ins4Tech</Typography>
                        {isLogin ? renderLogin() : renderRegister()}
                    </form>
                </Paper>
            </Grid>

        </div>
    )
}

export default Login;
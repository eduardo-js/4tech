import React, { useState } from 'react';

const Login = ({ name }) => {
    const [login, setLogin] = useState('');
    const onLoginChange = (event) => {
        console.log(event.target.value);
        setLogin(event.target.value);
    }

    return (
        <div>
            <input type="text" value={login} onChange={onLoginChange} />
            <br/>Login Works :) Have some {name}
        </div>
    )
}

export default Login;
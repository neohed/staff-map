import React, {useContext, useState} from 'react';
import {
    redirect,
} from 'react-router-dom'
import SetValueContext from '../../../lib/SetValueContext'
import authProvider from './authProvider';
//import './login-form.css';

function Login() {
    const {setValue} = useContext(SetValueContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const [disableLogin, setDisableLogin] = useState(false);
    const [message, setMessage] = useState('');

    //const history = useHistory();
    //const {state} = history.location;

    const login = () => {
        setDisableLogin(true);

        authProvider.login(username, password).then(user => {
            setValue(contextKeys.auth, user);
            setRedirectToReferrer(true)
        }, res => {
            setValue(contextKeys.auth, {});
            setRedirectToReferrer(false)
            setDisableLogin(false);
        })
    }
    /*
    if (redirectToReferrer) {
        return <Redirect to={state?.referrer || '/member/welcome'}/>
    }
     */

    return (
        <div className='login-form'>
            <div className='row-75'>
                <div className='col-1'>
                    <label htmlFor="email"><b>Email</b></label>
                </div>
            </div>
            <div className='row-75'>
                <div className='col-1'>
                    <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className='row-75'>
                <div className='col-1'>
                    <label htmlFor="password"><b>Password</b></label>
                </div>
            </div>
            <div className='row-75'>
                <div className='col-1'>
                    <input
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className='row-75'>
                <div className='col-1'>
                    <button type="submit" onClick={login} disabled={disableLogin}>Login</button>
                    <span>Remember me</span>
                </div>
            </div>
            <div className='row-75'>
                <div className='col-1'>
                    <span>Reset <a href="http://neohed.com">password</a></span>
                </div>
            </div>
            <div className='row-75'>
                <div className='col-1'>
                    <div>{message}</div>
                </div>
            </div>
        </div>
    )
}

export default Login

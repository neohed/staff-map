import React, {useContext, useState} from 'react';
import type { FC } from 'react'
import type {LoginValues} from "./authProvider";
import {
    useLocation,
    useNavigate,
} from 'react-router-dom'
import SetValueContext from '../../../lib/SetValueContext'
import authProvider from './authProvider';
import './Form.css'

const Login: FC = () => {
    const {setValue} = useContext(SetValueContext)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.stopPropagation();
        e.preventDefault();
        setMessage('');

        setIsSubmitting(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const formValues: LoginValues = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        }

        authProvider.login(formValues).then(
            (user) => {
                setValue('AUTH', user);
                const from = location.state?.from?.pathname || "/";
                navigate(from, { replace: true })
            },
            () => {
                setValue('AUTH', {});
                setIsSubmitting(false);
                setMessage('Login failed!')
            },
        )
    };

    return (
        <form
            className='login-form'
            onSubmit={handleSubmit}
        >
            <fieldset
                disabled={isSubmitting}
            >
                <p>
                    <label htmlFor="email">Email</label>
                    <input name="email" type="email" required={true} placeholder="Enter email"/>
                </p>
                <p>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" required={true} placeholder="Enter password" />
                </p>
                <p className="error">
                    {
                        message
                    }
                </p>
                <button type="submit">Login</button>
            </fieldset>
        </form>
    )
}

export default Login

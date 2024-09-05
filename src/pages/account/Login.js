import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../layout/Header';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import toastr from 'toastr';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingButton } from '@mui/lab';

const Login = () => {
    const btnLogin = useRef(null);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { authLogin, action, setAction } = useAuth();
    const { t } = useTranslation();
    const [remember, setRemember] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const actionLogin = async (e) => {
        e.preventDefault();

        setLoading(true);

        let result = await axios.post(`/api/account/signin`, {
            email,
            password,
            remember,
        });

        if (!result.data.error) {
            let { user, token, expiration } = result.data;
            localStorage.setItem('jtrans-user', JSON.stringify(user));
            localStorage.setItem('jtrans-token', token);
            localStorage.setItem('jtrans-expiration', expiration);
            axios.defaults.headers.common = {
                Authorization: `Bearer ${token}`,
            };
            authLogin(user);
            toastr.clear();
            toastr.success(t('login_success'));

            if (!action || action.type === "payment") {
                navigate('/home');
            } else {
                let actionPending = action;
                setAction(null);
                if (action.type === "navigate") navigate(actionPending.link);
                if (action.type === "location") window.location.replace(actionPending.link);
                if (action.type === "paymentLink") {
                    try {
                        let { data: result } = await axios.post(`/api/payment/createPaymentLink`, { item: actionPending.item });
                        if (result.status === "success") {
                            window.location.replace(result.link);
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        } else {
            setError(t(result.data.error));
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <main>
                <div id="login-page">
                    <form id="login-form" onSubmit={actionLogin}>
                        <h1>{t('signin-form-title')}</h1>
                        <p>{t('signin-form-welcome')}</p>
                        <p
                            className={
                                'message' +
                                (error !== '' ? ' message-error' : '')
                            }
                        >
                            {error}
                        </p>
                        <div className="form-group">
                            <label htmlFor="input-email">
                                {t('signin-form-email')}
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="input-email"
                                placeholder={t('signin-email-placeholder')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="input-password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="input-password"
                                placeholder={t('signin-password-placeholder')}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group" id="remember-section">
                            <label htmlFor="input-remember">
                                <input
                                    type="checkbox"
                                    id="input-remember"
                                    checked={remember}
                                    onChange={(e) => setRemember(!remember)}
                                />
                                {t('signin-form-remember')}
                            </label>
                            <Link to="/forgotpassword" className="login-link">
                                {t('signin-form-forget')}
                            </Link>
                        </div>
                        <div className="form-group">
                            <LoadingButton
                                ref={btnLogin}
                                type="submit"
                                className="btn-common form-control"
                                loading={loading}
                            >
                                {t('button-signin')}
                            </LoadingButton>
                        </div>

                        <div className="form-group" id="signup-section">
                            {t('have-not-account')} &nbsp;&nbsp;&nbsp;
                            <Link to="/account/signup" className="login-link">
                                {t('button-signup')}
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};
export default Login;

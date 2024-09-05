import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Header from '../../layout/Header';
import toastr from 'toastr';

const Signup = () => {
    const [loading, setLoading] = useState(false);

    const { authLogin, action, setAction } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();
    // const [remember, setRemember] = useState(null);

    const [submit, setSubmit] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [country, setCountry] = useState('');
    const [pwdConfirm, setPwdConfirm] = useState('');
    const [errors, setErrors] = useState({});

    const refEmail = useRef(null);
    const refFirstname = useRef(null);
    const refLastname = useRef(null);
    const refCountry = useRef(null);
    const refPassword = useRef(null);
    const refPwdConfirm = useRef(null);

    const validateFields = () => {
        let result = {};
        let focusItem = null;
        if (email === '') {
            result = { ...result, email: t('error-email-required') };
            focusItem = refEmail;
        }

        if (firstname === '') {
            result = { ...result, firstname: t('error-firstname-required') };
            if (!focusItem) focusItem = refFirstname;
        }
        if (lastname === '') {
            result = { ...result, lastname: t('error-lastname-required') };
            if (!focusItem) focusItem = refEmail;
        }
        if (country === '') {
            result = { ...result, country: t('error-country-required') };
            if (!focusItem) focusItem = refCountry;
        }

        if (password === '') {
            result = { ...result, password: t('error-password-required') };
            if (!focusItem) focusItem = refPassword;
        }

        if (pwdConfirm === '') {
            result = { ...result, pwdConfirm: t('error-pwdConfirm-required') };
            if (!focusItem) focusItem = refPwdConfirm;
        }

        if (password !== pwdConfirm) {
            result = {
                ...result,
                pwdConfirm: t('error-password-not-confirm'),
                password: t('error-password-not-confirm'),
            };
            if (!focusItem) focusItem = refPwdConfirm;
        }

        if (focusItem) {
            focusItem.current.focus();
        }


        if (Object.keys(result).length !== 0) {
            setErrors(result);
            setSubmit(false);
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setSubmit(true);
        validateFields();
    };

    const registerCustomer = () => {
        if (!submit) return;
        setSubmit(false);

        setLoading(true);
        axios
            .post(`/api/account/register`, {
                email,
                firstname,
                lastname,
                country,
                password,
            })
            .then(async (res) => {
                if (res.data.code === 'success') {
                    localStorage.setItem('jtrans-token', res.data.token);
                    localStorage.setItem(
                        'jtrans-user',
                        JSON.stringify(res.data.user)
                    );
                    localStorage.setItem(
                        'jtrans-expiration',
                        res.data.expiration
                    );
                    axios.defaults.headers.common = {
                        Authorization: `Bearer ${res.data.token}`,
                    };
                    authLogin(res.data.user);
                    toastr.clear();
                    toastr.success(t('Signup success'));

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
                    setErrors({ email: res.data.msg });
                    refEmail.current.focus();
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (submit && errors) registerCustomer();
    }, [submit, errors]);

    return (
        <div>
            <Header />
            <main>
                <div id="register-page">
                    <form id="register-form" onSubmit={handleRegister}>
                        <h1>{t('signup-form-title')}</h1>
                        <p>{t('signup-form-welcome')}</p>

                        <div
                            className={
                                'form-group' +
                                (errors['email'] ? ' has-error' : '')
                            }
                        >
                            <label htmlFor="input-email">
                                {t('signup-form-email')}
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="input-email"
                                placeholder={t('signup-placeholder-email')}
                                onChange={(e) => setEmail(e.target.value)}
                                ref={refEmail}
                                value={email}
                            />
                            <span
                                className={
                                    `message` +
                                    (errors['email'] ? ' error' : '')
                                }
                            >
                                {t(errors['email'])}
                            </span>
                        </div>

                        <Grid container spacing={2}>
                            <Grid item sm={6} xs={12}>
                                <div
                                    className={
                                        'form-group' +
                                        (errors['firstname'] ? ' has-error' : '')
                                    }
                                >
                                    <label htmlFor="input-firstname">
                                        {t('signup-form-firstname')}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="input-firstname"
                                        placeholder={t('signup-placeholder-firstname')}
                                        ref={refFirstname}
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                    />
                                    <span
                                        className={
                                            `message` +
                                            (errors['firstname'] ? ' error' : '')
                                        }
                                    >
                                        {errors['firstname']}
                                    </span>
                                </div>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <div
                                    className={
                                        'form-group' +
                                        (errors['lastname'] ? ' has-error' : '')
                                    }
                                >
                                    <label htmlFor="input-lastname">
                                        {t('signup-form-lastname')}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="input-lastname"
                                        placeholder={t('signup-placeholder-lastname')}
                                        ref={refLastname}
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                    />
                                    <span
                                        className={
                                            `message` +
                                            (errors['lastname'] ? ' error' : '')
                                        }
                                    >
                                        {errors['lastname']}
                                    </span>
                                </div>
                            </Grid>
                        </Grid>

                        <div
                            className={
                                'form-group' +
                                (errors['country'] ? ' has-error' : '')
                            }
                        >
                            <label htmlFor="input-coun">
                                {t('signup-form-country')}
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="input-country"
                                placeholder={t('signup-placeholder-country')}
                                ref={refCountry}
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                            <span
                                className={
                                    `message` +
                                    (errors['country'] ? ' error' : '')
                                }
                            >
                                {errors['country']}
                            </span>
                        </div>

                        <div
                            className={
                                'form-group' +
                                (errors['password'] ? ' has-error' : '')
                            }
                        >
                            <label htmlFor="input-password">
                                {t('signup-form-password')}
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="input-password"
                                placeholder={t('signup-placeholder-password')}
                                ref={refPassword}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className={
                                    `message` +
                                    (errors['password'] ? ' error' : '')
                                }
                            >
                                {errors['password']}
                            </span>
                        </div>

                        <div
                            className={
                                'form-group' +
                                (errors['pwdConfirm'] ? ' has-error' : '')
                            }
                            ref={refPwdConfirm}
                        >
                            <label htmlFor="input-password-confirm">
                                {t('signup-form-password-confirm')}
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="input-password-confirm"
                                placeholder={t(
                                    'signup-placeholder-password-confirm'
                                )}
                                onChange={(e) => setPwdConfirm(e.target.value)}
                                value={pwdConfirm}
                            />
                            <span
                                className={
                                    `message` +
                                    (errors['pwdConfirm'] ? ' error' : '')
                                }
                            >
                                {t(errors['pwdConfirm'])}
                            </span>
                        </div>

                        <div
                            className="form-group"
                            style={{ marginTop: '35px', display: "flex", gap: "10px", flexDirection: "column" }}
                        >
                            <LoadingButton
                                type="submit"
                                className="btn-common form-control"
                                loading={loading}
                            >
                                {t('button-signup')}
                            </LoadingButton>
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/account/login")}
                            >
                                {t('Go to login page')}
                            </Button>
                        </div>

                        <div className="form-group">
                            {/* <Button 
                            className="btn-default form-control"
                        >
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="LgbsSe-Bz112c"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
                            {t('signup-button-googlesignup')}
                        </Button> */}
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};
export default Signup;

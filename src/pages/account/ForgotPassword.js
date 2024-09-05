import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import toastr from 'toastr';
import { useTranslation } from 'react-i18next';
import Header from '../../layout/Header';

const Forgot = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwdConfirm, setPwdConfirm] = useState("");
    const [code, setCode] = useState("");
    const [token, setToken] = useState("");

    const handleSend = (e) => {
        e.preventDefault();
        if (!token) {
            if (email === "") {
                toastr.clear();
                toastr.warning(t('msg-enter-email'));
                return;
            }
            axios.post(`/api/account/forgotrequest`, { email })
                .then(res => {
                    if (res.data.status === 'success') {
                        setToken(res.data.token);
                    } else {
                        toastr.clear();
                        toastr.warning(t(res.data.msg));
                        return;
                    }
                })
                .catch(error => {
                    console.log(error);
                    toastr.clear();
                    toastr.warning(t('msg-tryagain'));
                })
        } else {
            axios.post(`/api/account/resetpassbycode`, { email, code, token, pwd })
                .then(res => {
                    if (res.data === 'success') {
                        toastr.clear();
                        toastr.success(t("Password is reset."));

                        navigate("/");
                    } else if (res.data === 'email-required') {
                        toastr.clear();
                        toastr.warning(t(res.data));
                        return;
                    } else {
                        toastr.clear();
                        toastr.warning(t('msg-tryagain'));
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
    return (
        <div>
            <Header />
            <main>
                <div id="login-page">
                    <form id="login-form" onSubmit={handleSend}>
                        <h1>{t('forgot-title')}</h1>

                        {!token && <div>
                            <div className="form-group">
                                <label htmlFor="input-email">
                                    {t('forgot-form-email')}
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="input-email"
                                    placeholder={t('forgot-email-placeholder')}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <Button
                                    type="submit"
                                    className="btn-common form-control"
                                >
                                    {t('forgot-button-send')}
                                </Button>
                            </div>
                        </div>}

                        {token && <div>
                            <div className="form-group">
                                <label htmlFor="input-pwd">
                                    {t('forgot-pwd')}
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="input-pwd"
                                    placeholder={t('forgot-pwd-placeholder')}
                                    value={pwd}
                                    onChange={(e) => setPwd(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="input-pwd-confirm">
                                    {t('forgot-pwd-confirm')}
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="input-pwd-confirm"
                                    placeholder={t('forgot-pwdconfirm-placeholder')}
                                    value={pwdConfirm}
                                    onChange={(e) => setPwdConfirm(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="input-code">
                                    {t('forgot-code')}
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="input-code"
                                    placeholder={t('forgot-code-placeholder')}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <Button
                                    type="submit"
                                    className="btn-common form-control"
                                >
                                    {t('forgot-button-reset')}
                                </Button>
                            </div>
                            <div className="form-group">
                                <Button
                                    type="button"
                                    className="btn-common form-control"
                                    onClick={() => setToken("")}
                                >
                                    {t('forgot-button-back')}
                                </Button>
                            </div>
                        </div>}


                    </form>
                </div>
            </main>
        </div>
    );
};
export default Forgot;

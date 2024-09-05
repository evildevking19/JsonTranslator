import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import MenuMobile from '../components/MenuMobile';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Notify from '../components/Notify';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


export default function Header(props) {
    const { nomenu, nonotify } = props;

    const theme = useTheme();
    const isMobileMode = useMediaQuery('(max-width:1100px)');

    const { i18n, t } = useTranslation();
    const { isLoggedIn, authLogin, authLogout, userInfo } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('jtrans-user');
        localStorage.removeItem('jtrans-token');
        authLogout();
    };

    const handleLogin = (user) => {
        authLogin(user);
    };

    useEffect(() => {
        let user = localStorage.getItem('jtrans-user');
        let expiration = localStorage.getItem('jtrans-expiration');
        let lang = localStorage.getItem('jtrans-lang');
        i18n.changeLanguage(lang);

        if (user && new Date(expiration) > new Date()) {
            user = JSON.parse(user);
            authLogin(user);
        } else {
            localStorage.removeItem('jtrans-expiration');
            localStorage.removeItem('jtrans-user');
            localStorage.removeItem('jtrans-token');
        }
    }, []);

    useEffect(() => {
        let token = localStorage.getItem('jtrans-token');
        axios.defaults.headers.common = {
            Authorization: `Bearer ${token}`,
        };
    }, [isLoggedIn]);

    return (
        <header className={props.dark ? "dark" : ""}>
            <div id="main-header">
                <Link to="/home">
                    <img
                        src={'/assets/imgs/logo.png'}
                        className="logo"
                        alt="logo"
                    />
                </Link>
                {!nomenu && <div id="common-menu">
                    {isMobileMode ? <MenuMobile
                        handleLogout={handleLogout}
                        handleLogin={handleLogin}
                    /> : <Menu
                        handleLogout={handleLogout}
                        handleLogin={handleLogin}
                    />}
                    
                </div>}
            </div>

            {!nonotify && <Notify />}
        </header>
    );
}

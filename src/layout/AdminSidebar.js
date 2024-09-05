import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Face6Icon from '@mui/icons-material/Face6';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import { useEffect } from "react";
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from "react-i18next";
import axios from "axios";
export default function AdminSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const handleRoutes = (path) => {
        // navigate action
        navigate(path);
    }
    const { i18n } = useTranslation();
    const { isLoggedIn, authLogin, authLogout, userInfo } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('jtrans-user');
        localStorage.removeItem('jtrans-token');
        authLogout();
        navigate("/");
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
            navigate("/");
        }
    }, []);

    useEffect(() => {
        let token = localStorage.getItem('jtrans-token');
        axios.defaults.headers.common = {
            Authorization: `Bearer ${token}`,
        };
    }, [isLoggedIn]);

    return (
        <div id="admin-sidebar">
            <div className="full-width">
                <div id="admin-logo">
                    <Link to="/"><img src="/assets/imgs/logo.png" alt="logo" /></Link>
                </div>
                <div id="admin-menu">
                    <MenuList>
                        {userInfo?.admin && <MenuItem className={
                            'admin-link' + (pathname === '/admin/customers' || pathname === '/admin' ? ' active' : '')
                        } onClick={() => handleRoutes("/admin/customers")}>
                            <ListItemIcon>
                                <Face6Icon fontSize="medium" />
                            </ListItemIcon>
                            <ListItemText>New sign ups</ListItemText>
                        </MenuItem>
                        }
                        {/* <MenuItem className={
                            'admin-link' + (pathname === '/admin/contacts' ? ' active' : '')
                        } onClick={() => handleRoutes("/admin/contacts")}>
                            <ListItemIcon>
                                <ContactsIcon fontSize="medium" />
                            </ListItemIcon>
                            <ListItemText>Contact forms</ListItemText>
                        </MenuItem> */}
                        <MenuItem className={
                            'admin-link' + (pathname === '/admin/translate' ? ' active' : '')
                        } onClick={() => handleRoutes("/admin/translate")}>
                            <ListItemIcon>
                                <AutoFixHighIcon fontSize="medium" />
                            </ListItemIcon>
                            <ListItemText>Translate</ListItemText>
                        </MenuItem>
                        <MenuItem className={
                            'admin-link' + (pathname === '/admin/setting' ? ' active' : '')
                        } onClick={() => handleRoutes("/admin/setting")}>
                            <ListItemIcon>
                                <SettingsApplicationsIcon fontSize="medium" />
                            </ListItemIcon>
                            <ListItemText>Setting</ListItemText>
                        </MenuItem>
                    </MenuList>
                </div>
            </div>
            <MenuItem className="full-width" onClick={handleLogout}>
                <ListItemIcon>
                    <ExitToAppIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
            </MenuItem>
        </div>
    );
}

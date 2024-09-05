import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
// ListItemText
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import Drawer from '@mui/material/Drawer';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

import { LANGUAGES } from '../constants/languages';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light'
                ? 'rgb(55, 65, 81)'
                : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));

export default function AccountMenu(props) {
    const location = useLocation();
    const pathname = location.pathname;

    const navigate = useNavigate();
    const { isLoggedIn, userInfo } = useAuth();
    const { i18n, t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [langPath, setLangPath] = React.useState('enGB');
    const open = Boolean(anchorEl);

    const [accountAnchorEl, setAccountAnchorEl] = React.useState(null);
    const openAccount = Boolean(accountAnchorEl);

    const [langAnchorEl, setLangAnchorEl] = React.useState(null);
    const openLangMenu = Boolean(langAnchorEl);

    const [drawerState, setDrawerState] = React.useState(false);
    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setDrawerState(open);
    };

    const langChangeHandler = (e) => {
        handleLangMenuClose();
        localStorage.setItem('jtrans-lang', e.target.dataset.lang);
        i18n.changeLanguage(e.target.dataset.lang);
        setLangPath(e.target.dataset.path);
    };

    const handleAccountClick = (event) => {
        setAccountAnchorEl(event.currentTarget);
    };
    const handleAccountClose = () => {
        setAccountAnchorEl(null);
    };
    const handleLangMenuClick = (event) => {
        setLangAnchorEl(event.currentTarget);
    };
    const handleLangMenuClose = () => {
        setLangAnchorEl(null);
    };

    const logout = () => {
        handleAccountClose();
        props.handleLogout();
    };

    useEffect(() => {
        // Extract the section ID from the pathname (e.g., '/sectioned-page#section1' => 'section1')
        const sectionId = location.hash.slice(1);

        // Scroll to the section if the section ID exists
        if (sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    const handleNavigation = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        // Extract the section ID from the pathname (e.g., '/sectioned-page#section1' => 'section1')
        const sectionId = location.hash.slice(1);

        // Scroll to the section if the section ID exists
        if (sectionId) {
            console.log(sectionId);
            setTimeout(() => {
                handleNavigation(sectionId);
            }, 100);
        }
    }, [location]);

    useEffect(() => {
        const language = localStorage.getItem("jtrans-lang");
        if (language) {
            const curLang = LANGUAGES.filter(item => item.code === language);
            if (curLang && curLang[0]) {
                console.log(curLang[0]); 
                setLangPath(curLang[0].path);
            }
        }
    }, [])

    const list = (
        <Box
            sx={{
                width: 250,
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem className="memu-item-mobile" disablePadding>
                    <ListItemButton>
                        <Link
                            to="/home"
                            className={
                                'btn-link' +
                                (pathname === '/home' ? ' active' : '')
                            }
                        >
                            {t('link-home')}
                        </Link>
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem className="memu-item-mobile" disablePadding>
                    <ListItemButton>
                        <Link
                            to="/tool"
                            className={
                                'btn-link' +
                                (pathname === '/tool' ? ' active' : '')
                            }
                        >
                            {t('link-tool')}
                        </Link>
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem className="memu-item-mobile" disablePadding>
                    <ListItemButton>
                        <Link
                            to="/home#brief-section"
                            className={
                                'btn-link' +
                                (pathname === '/howitworks' ? ' active' : '')
                            }
                        >
                            {t('link-howitworks')}
                        </Link>
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem className="memu-item-mobile" disablePadding>
                    <ListItemButton>
                        <Link
                            to="/home#pricing-section"
                            className={
                                'btn-link' +
                                (pathname === '/pricing' ? ' active' : '')
                            }
                        >
                            {t('link-pricing')}
                        </Link>
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem className="memu-item-mobile" disablePadding>
                    <ListItemButton>
                        <Link
                            to="/home#pricing-section"
                            className="btn-link highlight"
                        >
                            {t('btn-try-free')}
                        </Link>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Typography className="menu-item" id="multi-language-section">
                    <Button
                        className="btn-submenu"
                        aria-controls={
                            openLangMenu ? 'languages-menu' : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={openLangMenu ? 'true' : undefined}
                        variant="contained"
                        disableElevation
                        onClick={handleLangMenuClick}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        <img
                            src={`/assets/imgs/flags/${langPath}.png`}
                            alt="lang"
                            id="lang-icon"
                        />
                        {/* {i18n.language} */}
                    </Button>

                    <StyledMenu
                        id="languages-menu"
                        MenuListProps={{
                            'aria-labelledby': 'btn-tools-submenu',
                        }}
                        anchorEl={langAnchorEl}
                        open={openLangMenu}
                        onClose={handleLangMenuClose}
                    >
                        {LANGUAGES.map(({ code, label, path }) => (
                            <MenuItem
                                key={label}
                                onClick={langChangeHandler}
                                data-lang={code}
                                data-path={path}
                                disableRipple
                            >
                                {label}
                            </MenuItem>
                        ))}
                    </StyledMenu>
                </Typography>

                {/* {!isLoggedIn && (
                    <Typography className="menu-item">
                        <Link to="/account/login" className="btn-link">
                            {t('link-login')}
                        </Link>
                    </Typography>
                )} */}

                {isLoggedIn && (
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleAccountClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }} src={userInfo.avatar} />
                        </IconButton>
                    </Tooltip>
                )}

                <Typography className="menu-item">
                    <Button onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </Button>
                </Typography>

                <Drawer
                    className="mobile-menu-list"
                    anchor="right"
                    open={drawerState}
                    onClose={toggleDrawer(false)}
                >
                    {list}
                </Drawer>
            </Box>
            <Menu
                anchorEl={accountAnchorEl}
                id="account-menu"
                open={openAccount}
                onClose={handleAccountClose}
                onClick={handleAccountClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => navigate('/admin')}>
                    <ListItemIcon>
                        <Avatar />
                    </ListItemIcon>
                    {t('Setting')}
                </MenuItem>
                <Divider />
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    {t('link-logout')}
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}

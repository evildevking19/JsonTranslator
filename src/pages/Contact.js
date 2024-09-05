/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useMemo, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextEditable from '../components/TextEditable';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import toastr from 'toastr';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Contact = () => {
    const formRef = useRef(null);

    const { i18n, t } = useTranslation();
    const [agree, setAgree] = useState(false);
    const [sending, setSending] = useState(false);

    const contactItems = [
        {
            id: 0,
            type: 'contact-location',
            des1: 'contact-location-des1',
            des2: 'contact-location-des2',
            icon: 'assets/imgs/contact/location.png',
        },
        {
            id: 1,
            type: 'contact-phone',
            des1: 'contact-phone-des1',
            des2: 'contact-phone-des2',
            icon: 'assets/imgs/contact/phone.png',
        },
        {
            id: 2,
            type: 'contact-email',
            des1: 'contact-email-des1',
            des2: 'contact-email-des2',
            icon: 'assets/imgs/contact/email.png',
        },
        {
            id: 3,
            type: 'contact-company',
            des1: 'contact-company-des1',
            des2: 'contact-company-des2',
            icon: 'assets/imgs/contact/company.png',
        },
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const requestData = ({
            firstname: data.get('firstname'),
            lastname: data.get('lastname'),
            email: data.get('email'),
            phone: data.get('phone'),
            message: data.get('message'),
            agree: agree
        });

        let validationResult = validateFormData(requestData);
        if (!validationResult.status) {
            toastr.clear();
            toastr.warning(t(validationResult.msg));
            return;
        }

        setSending(true);

        await axios.post(`/api/account/mailto`, requestData)
        .then(res => {
            console.log(res);
            toastr.success(t("request-success"));
            formRef.current.reset();
            setAgree(false);
        }).catch(err => {
            console.log(err);
            toastr.warning(t("request-failed"));
        })
        setSending(false);
    };

    const validateFormData = (data) => {
        if (!String(data.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return {
                status: false,
                msg: 'msg_email_invalid'
            };
        }
        if (!data.firstname) {
            return {
                status: false,
                msg: 'msg_firstName_required'
            };
        }
        if (!data.lastname) {
            return {
                status: false,
                msg: 'msg_lastName_required'
            };
        }
        if (!data.email) {
            return {
                status: false,
                msg: 'msg_email_required'
            };
        }
        if (!data.phone) {
            return {
                status: false,
                msg: 'msg_phone_required'
            };
        }
        if (!data.agree) {
            return {
                status: false,
                msg: 'msg_agree_our_policy'
            };
        }

        return {
            status: true
        };
    }

    return (
        <Layout dark>
            <main className="page-layout" id="contact-page">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container row-spacing={4} py={4} pt={8} sx={{ flexGrow: 1 }} id="contact-header">
                        <Grid
                            item
                            xs={12}
                            container
                            alignItems="center"
                            direction="column"
                            gap={2}
                        >
                            <TextEditable
                                className="text-primary"
                                type="h6"
                                text="contact-title"
                            />
                            <TextEditable
                                type="h1"
                                className="text-white"
                                text="contact-description1"
                            />
                            <TextEditable className="text-white" text="contact-description2" />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container alignItems="center" justifyContent="center" px={2} id="contact-items">
                        {contactItems.map((item) => (
                            <Grid key={item.id} item sm={6} md={3}>
                                <div className="contact-item">
                                    <img src={item.icon} alt={item.type} />
                                    <div>
                                        <TextEditable
                                            type="h3"
                                            text={item.type}
                                        />
                                        <TextEditable text={item.des1} />
                                        <TextEditable
                                            className="text-primary"
                                            text={item.des2}
                                        />
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <TextEditable
                        className="text-primary"
                        type="h6"
                        text="contact-form-title"
                    />
                    <TextEditable type="h1" text="contact-form-subtitle" />
                    <TextEditable text="contact-form-des2" />
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                        id="contact-form"
                        p={4}
                        mb={12}
                        ref={formRef}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstname"
                                    required
                                    fullWidth
                                    id="firstname"
                                    label={t("First Name")}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastname"
                                    label={t("Last Name")}
                                    name="lastname"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label={t("Email Address")}
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="phone"
                                    label={t("Phone number")}
                                    type="text"
                                    id="phone"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label={t("Message")}
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="allowExtraEmails"
                                            color="primary"
                                            checked={agree}
                                            onClick={(e) => setAgree(!agree)}
                                            style={{color: "#ccc"}}
                                        />
                                    }
                                    label={
                                        <div>
                                            {t("You agree to our friendly ")} {' '}
                                            <Link to="/privacy">
                                                {t("privacy policy")}
                                            </Link>
                                            .
                                        </div>
                                    }
                                />
                            </Grid>
                        </Grid>
                        <LoadingButton className="btn-common btn-pricing" type="submit" fullWidth loading={sending}>
                            {t("Send message")}
                        </LoadingButton>
                    </Box>
                </Box>
            </main>
        </Layout>
    );
};
export default Contact;

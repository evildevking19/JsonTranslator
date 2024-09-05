/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextEditable from '../components/TextEditable';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import toastr from 'toastr';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';

import CheckoutDescription from '../components/CheckoutDescription';

import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';


const serverUrl = process.env.REACT_APP_SERVER_URL;

const Checkout = () => {
    const navigate = useNavigate();
    const formRef = useRef(null);
    const { action, setAction, isLoggedIn, userInfo } = useAuth();
    const { i18n, t } = useTranslation();
    const [agree, setAgree] = useState(false);
    const [purchasing, setPurchasing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const contactInfo = ({
            firstname: data.get('firstname'),
            lastname: data.get('lastname'),
            email: data.get('email'),
            country: data.get('country'),
            phone: data.get('phone'),
            message: data.get('message'),
            agree: agree
        });

        let validationResult = validateFormData(contactInfo);
        if (!validationResult.status) {
            toastr.clear();
            toastr.warning(t(validationResult.msg));
            return;
        }

        let requestData = {
            contactInfo,
            item: action.item
        }

        if (isLoggedIn) {
            setPurchasing(true);
            try {
                let { data: result } = await axios.post(`/api/payment/createPaymentLink`, requestData);
                if (result.status === "success") {
                    window.location.replace(result.link);
                }
            } catch (err) {
                console.log(err);
            }
            setPurchasing(false);
        } else {
            setAction({
                type: "paymentLink",
                data: requestData
            })
            navigate("/account/signup");
        }

    };

    const validateFormData = (data) => {
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
        if (!String(data.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return {
                status: false,
                msg: 'msg_email_invalid'
            };
        }
        if (!data.email) {
            return {
                status: false,
                msg: 'msg_email_required'
            };
        }
        if (!data.country) {
            return {
                status: false,
                msg: 'msg_country_required'
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

    useEffect(() => {
        if (!action || action.type !== "payment") navigate("/home/#pricing-section");
        let formElements = formRef.current;

        if (isLoggedIn) {
            formElements.firstname.value = userInfo.firstname ? userInfo.firstname : "";
            formElements.lastname.value = userInfo.lastname ? userInfo.lastname : "";
            formElements.phone.value = userInfo.phone ? userInfo.phone : "";
            formElements.country.value = userInfo.country ? userInfo.country : "";
            formElements.email.value = userInfo.contactEmail ? userInfo.contactEmail : (userInfo.email ? userInfo.email : "");
        }
    }, [])

    return (
        <Layout dark>
            <main className="page-layout" id="checkout-page">
                <Box
                    className="checkout-description"
                >
                    <TextEditable
                        className="text-primary"
                        type="h6"
                        text="checkout-form-title"
                    />
                    <TextEditable type="h1" text="checkout-form-subtitle" />
                    <TextEditable text="checkout-form-des2" />
                    <Box
                        component="form"
                        ref={formRef}
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                        id="checkout-form"
                        p={4}
                        mb={3}
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
                                    type="email"
                                    placeholder={t("you@company.com")}
                                    label={t("Email")}
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="country"
                                    label="Country"
                                    name="country"
                                    autoComplete="Country"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="phone"
                                    label={t("Phone number")}
                                    type="number"
                                    id="phone"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label={t("Message")}
                                    name="message"
                                    placeholder={t("Leave us a message...")}
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
                                            name="policy"
                                            id="policy"
                                            checked={agree}
                                            onClick={(e) => setAgree(!agree)}
                                        />
                                    }
                                    label={
                                        <div>
                                            {t("You agree to our friendly ") + ' '}
                                            <Link to="/privacy">
                                                {t("privacy policy")}
                                            </Link>
                                            .
                                        </div>
                                    }
                                />
                            </Grid>
                        </Grid>
                        <LoadingButton loading={purchasing} className="btn-common btn-pricing" type="submit" fullWidth>
                            {t("Go to Checkout")}
                        </LoadingButton>
                    </Box>
                </Box>

                <CheckoutDescription />
            </main>
        </Layout>
    );
};
export default Checkout;

import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement
} from "@stripe/react-stripe-js";   
import axios from "axios";
import useResponsiveFontSize from "./useResponsiveFontSize";
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import toastr from 'toastr';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const useOptions = () => {
    const fontSize = useResponsiveFontSize();
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize,
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Roboto, Source Code Pro, monospace, SFUIDisplay",
                    "::placeholder": {
                        color: "#aab7c4"
                    }
                },
                invalid: {
                    color: "#9e2146"
                },

            }
        }),
        [fontSize]
    );

    return options;
};

const SplitForm = (props) => {
    const navigate = useNavigate();
    const [isProcessing, setProcessingTo] = useState(false);
    const [errors, setErrors] = useState({});
    const { i18n, t } = useTranslation();
    const [plan, setPlan] = useState(null);
    const [calcInfo, setCalcInfo] = useState({});

    const [extraInfo, setExtraInfo] = useState({firstname: "", lastname: ""});

    const [cnErr, setCNErr] = useState(null);
    const [ceErr, setCEErr] = useState(null);
    const [cvcErr, setCvcErr] = useState(null);

    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

    const setPurchaseInfo = async () => {
        await axios.post(`/api/account/planinfo`, {
            planId: props.planId
        }).then(res => {
            setPlan(res.data);
        }).catch(err => {
            console.log(err);
        })
        
    }

    const setCalculationInfo = async () => {
        await axios.post(`/api/payment/getCalcInfo`, {
            calcId: props.money
        }).then(res => {
            setCalcInfo(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (props.planId !== "calculate") {
            setPurchaseInfo();
        } else {
            setCalculationInfo();
        }
    }, [])

    const handleCardDetailsChange = async (event) => {
        // console.log(event);return;
        // if (event.error) {
        //     let newErrors = {...errors};
        //     newErrors[event.elementType] = event.error.message;
        //     console.log(newErrors);
        //     await setErrors(newErrors);
        // } else {
        //     let newErrors = {...errors};
        //     delete newErrors[event.elementType];
        //     console.log(newErrors);
        //     await setErrors(newErrors);
        // }

        if (event.elementType === "cardNumber") {
            if (event.error) setCNErr(event.error.message);
            else setCNErr(null);
        }

        if (event.elementType === "cardExpiry") {
            if (event.error) setCEErr(event.error.message);
            else setCEErr(null);
        }

        if (event.elementType === "cardCvc") {
            if (event.error) setCvcErr(event.error.message);
            else setCvcErr(null);
        }
    };

    useEffect(() => {
        // console.log(errors);
    }, [errors]);

    const onChangeExtraInfo = async (e) => {
        let newExtraInfo = {...extraInfo};
        newExtraInfo[e.target.id] = e.target.value;
        setExtraInfo(newExtraInfo);
        
        if (e.target.id === "firstname" && e.target.value.trim() === "") {
            setErrors({...errors, firstname: "First Name required"});
            return;
        }
        if (e.target.id === "lastname" && e.target.value.trim() === "") {
            setErrors({...errors, lastname: "Last Name required"});
            return;
        }

        let newErrors = {...errors};
        delete newErrors[e.target.id];
        setErrors(newErrors);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let newErrors = {};
        if (extraInfo.firstname.trim() === "") {
            newErrors["firstname"] = "First Name required";
        }
        if (extraInfo.lastname.trim() === "") {
            newErrors["lastname"] = "Last Name required";
        }

        if (Object.keys(newErrors).length !== 0) {
            setErrors(newErrors);
            return;
        } else {
            setErrors({});
        }

        if (isProcessing || !stripe || Object.keys(errors).length !== 0) return;

        setProcessingTo(true);

        let amount = 0;
        let planId;
        if (props.planId !== "calculate") {
            amount = plan.price;
            planId = props.planId;
        } else {
            amount = props.money;
            planId = props.planId;
        }
        
        const data = await axios.post(`/api/payment/checkout`, { amount, planId })
            .then(response => response.data)
            .catch(error => {
                if (error.response) {
                    let errorInfo = error.response.data;
                    if (errorInfo.error.name && errorInfo.error.name === "JsonWebTokenError") {
                        toastr.clear();
                        toastr.warning(t('please_login'));
                    } else if (typeof errorInfo.error === 'string') {
                        toastr.clear();
                        toastr.warning(t(errorInfo.error));
                    }
                } else {
                    console.log(error);
                }
            });

        if (data && data.clientSecret) {

            // your billing details object looks like this
            const billingDetails = {
                name: "John",
                email: "john@example.com",
                address: {
                    city: "New York",
                    line1: "896 Bell Street",
                    state: "New York",
                    postal_code: "	10022"
                }
            }

            const cardElement = elements.getElement(CardNumberElement)

            try {
                const paymentMethodReq = await stripe.createPaymentMethod({
                    type: "card",
                    card: cardElement,
                    billing_details: billingDetails
                });

                if (paymentMethodReq.error) {
                    setProcessingTo(false);
                    return;
                }


                const confirmedCardPayment = await stripe.confirmCardPayment(data.clientSecret, {
                    payment_method: paymentMethodReq.paymentMethod.id
                });

                if (confirmedCardPayment.error) {
                    setProcessingTo(false);
                    return;
                }

                // display your success messages or redirect user to a success page
                let amount = 0;
                let planId;
                if (props.planId !== "calculate") {
                    amount = plan.price;
                    planId = props.planId;
                } else {
                    amount = props.money;
                    planId = props.planId;
                }
                let result = await axios.post(`/api/payment/confirm`, {amount, planId});
                if (result.data === "confirmed") {
                    toastr.clear();
                    toastr.success(t('success'));
                    navigate("/home");
                }
                
                setProcessingTo(false);
            } catch (err) {
                console.log(err.message);
            }

        } else {
            console.log("Error: Server could not initiate the payment process.")
        }
    }

    return (
        <form onSubmit={handleSubmit} id="form-checkout">
            <h1>{t('checkout-title')}</h1>

            <div className="form-group grid-2">
                <div className="form-group">
                    <div className="form-group">
                        <span>{t('card-number')}</span>
                        <div className={"stripe-item" + (cnErr ? " has-error" : "")}>
                            <CardNumberElement options={options} onChange={handleCardDetailsChange} />
                        </div>
                        <span className="error-message">{cnErr ? cnErr : ""}</span>
                    </div>
                    <div className="form-group grid-2">
                        <div className="form-group">
                            <span>{t('expiration-date')}</span>

                            <div className={"stripe-item" + (ceErr ? " has-error" : "")}>
                                <CardExpiryElement options={options} onChange={handleCardDetailsChange} />
                            </div>
                            <span className="error-message">{ceErr ? ceErr : ""}</span>
                        </div>
                        <div className="form-group">
                            <span>{t('security-code')}</span>
                            <div className={"stripe-item" + (cvcErr ? " has-error" : "")}>
                                <CardCvcElement options={options} onChange={handleCardDetailsChange} />
                                </div>
                            <span className="error-message">{cvcErr ? cvcErr : ""}</span>
                        </div>
                    </div>

                    <div className="form-group grid-2">
                        <div className="form-group">
                            <span>{t('firstname')}</span>

                            <div className={"stripe-item" + (errors['firstname'] ? " has-error" : "")}>
                                <FormControl fullWidth>
                                    <TextField id="firstname" variant="outlined" value={extraInfo['firstname']} onChange={onChangeExtraInfo}/>
                                </FormControl>
                            </div>
                            <span className="error-message">{errors['firstname'] ? errors['firstname'] : ""}</span>
                        </div>
                        <div className="form-group">
                            <span>{t('lastname')}</span>
                            <div className={"stripe-item" + (errors['lastname'] ? " has-error" : "")}>
                                <FormControl fullWidth>
                                    <TextField id="lastname" variant="outlined" value={extraInfo['lastname']} onChange={onChangeExtraInfo}/>
                                </FormControl>
                            </div>
                            <span className="error-message">{errors['lastname'] ? errors['lastname'] : ""}</span>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div id="purchase-section">
                        {props.planId !== "calculate" && plan && <div id="plan-info">
                            <h1>{plan.title[i18n.language] ? plan.title[i18n.language] : plan.title[i18n.options.fallbackLng[0]]}</h1>
                            <h5>{plan.description[i18n.language] ? plan.description[i18n.language] : plan.description[i18n.options.fallbackLng[0]]}</h5>

                            {plan.items && plan.items.map((record, index) => 
                                <p key={index} className="description-item">{record[i18n.language] ? record[i18n.language] : record[i18n.options.fallbackLng[0]]}</p>
                            )}

                            <h4>$ {plan.price}</h4>
                        </div>}

                        {props.planId === "calculate" && calcInfo && <div id="plan-info">
                            <h1>{t('plan-price-indication')}</h1>
                            <h5>{t('expected-delivery-time')}</h5>

                            <h4>$ {calcInfo.price} {t('btw')}</h4>
                        </div>}
                        
                        <Button
                            type="submit"
                            disabled={isProcessing || !stripe}
                            className={"btn-common " + ((isProcessing || !stripe) ? " disabled" : "")}
                        >
                            {t('button-checkout')}
                        </Button>
                    </div>
                </div>
            </div>
            
        </form>
    );

}

export default SplitForm;
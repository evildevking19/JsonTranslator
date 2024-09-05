import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const Pricing = () => {
    const { i18n, t } = useTranslation();
    const { isLoggedIn, setAction, userInfo } = useAuth();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [purchasing, setPurchasing] = useState(null);
    const handleTryOut = () => {
        if (isLoggedIn) {
            navigate("/tool");
        } else {
            // setAction({ type: "location", link: "https://stripe.com" });
            setAction({ type: "navigate", link: "/tool" });
            navigate("/account/signup");
        }
    }

    const handlePay = async (item) => {
        if (isLoggedIn) {
            setPurchasing(true);
            try {
                let { data: result } = await axios.post(`/api/payment/createPaymentLink`, { item });
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
                item
            })
            navigate("/account/signup");
        }
    }

    return (
        <div className="pricing-section" id="pricing-section">
            {/* test */}
            {/* <div className="pricing-item">
                <div className="pricing-item-header">
                    <p className="pricing-title">{t('Paid per file')}</p>
                    <p>
                        <strong>€0.01</strong> {t('Test')}
                    </p>
                    <p>{t('Easily pay per file for occasional use')}</p>
                </div>
                <div className="pricing-item-actions">
                    <LoadingButton className="btn-common btn-pricing form-control" loading={purchasing} onClick={() => handlePay(2)}>
                        {t('Test')}
                    </LoadingButton>
                </div>
            </div> */}
            {/* pay per file */}
            <div className="pricing-item">
                <div className="pricing-item-header">
                    <p className="pricing-title">{t('Paid per file')}</p>
                    <p>
                        <strong>€<span className="strikethrough thick">4</span></strong><strong>€2</strong> {t('Per file')}
                    </p>
                    <p>{t('Easily pay per file for occasional use')}</p>
                </div>
                <div className="pricing-item-actions">
                    <LoadingButton className="btn-common btn-pricing" loading={purchasing} onClick={() => handlePay(0)}>
                        {t('Get started')}
                    </LoadingButton>
                    <Button className="btn-pricing" onClick={handleTryOut} disabled={isLoggedIn && !userInfo.free}>
                        {t('Try one file for free')}
                    </Button>
                </div>
                <div className="pricing-item-description">
                    <h6>{t('FEATURES')}</h6>
                    <p>{t('Everything in our free plan plus....')}</p>
                    <p className="pricing2-item">{t('Easily translate and pay per file')}</p>
                    <p className="pricing2-item">
                        {t('Choose from 260+ translation options')}
                    </p>
                    <p className="pricing2-item">{t('Easily download translated files')}</p>
                    <p className="pricing2-item">
                        {t('The best translation quality with the use of ChatGPT')}
                    </p>
                    <p className="pricing2-item">
                        {t('Receive email support within 48 hours')}
                    </p>
                </div>
            </div>

            {/* unlimited */}
            <div className="pricing-item">
                <div className="pricing-item-header">
                    <p className="pricing-title">{t('Unlimited')}</p>
                    <p>
                        <strong>€<span className="strikethrough thick">3</span></strong><strong>€1.5</strong> {t('Per month')}
                    </p>
                    <p>{t('Billed yearly')} €<span className="strikethrough">36</span>,- €18,-</p>
                </div>
                <div className="pricing-item-actions">
                    <LoadingButton className="btn-common btn-pricing" loading={purchasing} onClick={() => handlePay(1)}>
                        {t('Get started')}
                    </LoadingButton>
                    <Button className="btn-pricing" onClick={handleTryOut} disabled={isLoggedIn && !userInfo.free}>
                        {t('Try one file for free')}
                    </Button>
                </div>
                <div className="pricing-item-description">
                    <h6>{t('FEATURES')}</h6>
                    <p>{t('Everything in our free plan plus....')}</p>
                    <p className="pricing2-item">{t('1 year unlimited translations')}</p>
                    <p className="pricing2-item">
                        {t('Translate into 260+ languages at the click of a button')}
                    </p>
                    <p className="pricing2-item">{t('Easily download translated files')}</p>
                    <p className="pricing2-item">
                        {t('The best translation quality with the use of ChatGPT')}
                    </p>
                    <p className="pricing2-item">
                        {t('Receive email support within 24 hours and online chat')}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Pricing;

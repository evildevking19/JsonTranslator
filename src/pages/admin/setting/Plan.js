import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BillingTable from "../../../components/table/BillingTable";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";
import { LoadingButton } from '@mui/lab';
import toastr from "toastr";
export default function Plan() {
    const { tid } = useParams();
    const { t } = useTranslation();
    const { userInfo, setUserInfo } = useAuth();
    const [transactions, steTransactions] = useState([]);
    const [loadingCancel, setLoadingCancel] = useState(false);

    useEffect(() => {
        if (tid) {
            setTimeout(() => {
                setLoadingCancel(true);
                axios.post("/api/payment/confirm", { tid })
                    .then(res => {
                        if (res.data.subscription || res.data.perfile) {
                            setUserInfo(res.data);
                            localStorage.steItem(JSON.stringify(res.data));
                        } else {
                            console.log("pending");
                        }
                        setLoadingCancel(false);
                    })
                    .catch(err => {
                        console.log(err);
                        setLoadingCancel(false);
                    })
            }, 1000);

        }
        axios.get("/api/payment/getPaymentHistory")
            .then(res => {
                const { transactions, user } = res.data;
                steTransactions(transactions);
                setUserInfo(user);
                localStorage.setItem("jtrans-user", JSON.stringify(user));
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handleCancelSubscription = () => {
        axios.post("/api/payment/cancelSubscription")
            .then(res => {
                if (res.data === "success") {
                    let newUserInfo = { ...userInfo, subscription: null };
                    localStorage.setItem("jtrans-user", JSON.stringify(newUserInfo));
                    setUserInfo(newUserInfo);
                    toastr.clear();
                    toastr.success(t("Successfully canceled your subscription"));
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div id="setting-plan">
            <h5 className="setting-subtitle">{t('Account plans')}</h5>
            <p className="setting-subdes">{t('Pick an account plan that fits your workflow. ')}</p>
            <div className="tab-content-section common">
                <div className="sub-about">
                    <h6>{t('Current plan')}</h6>
                    <p>{t('We’ll credit your account if you need to downgrade during the billing cycle.')}</p>
                </div>
                <div className="sub-content">
                    {userInfo.perfile && <div className="plan-items">
                        <img src="/assets/imgs/icon-edit-green.png" alt="Plan" />
                        <div className="plan-description">
                            <p><strong>{t('Paid per file $3.5/per file')}</strong></p>
                            <p>{t('Easily pay per file for occasional use')}</p>
                        </div>
                    </div>}
                    {userInfo.subscription && <div className="plan-items">
                        <img src="/assets/imgs/icon-edit-green.png" alt="Plan" />
                        <div className="plan-description">
                            <p><strong>{t('Paid $90 for unlimited plan')}</strong></p>
                            <p>{t('Unlimited translate for one year')}</p>
                        </div>
                        <LoadingButton loading={loadingCancel} variant="contained" color="third" sx={{ marginLeft: "20px" }} onClick={handleCancelSubscription}>{t('Cancel subscription')}</LoadingButton>
                    </div>}
                </div>
            </div>

            <h5 className="setting-subtitle">{t('Billing history')}</h5>
            <p className="setting-subdes">{t('Please reach out to our friendly team via billing@untitled.com with questions.')}</p>

            <div className="tab-content-section common">
                <div className="sub-about">
                    <h6>{t('Current plan')}</h6>
                    <p>{t('We’ll credit your account if you need to downgrade during the billing cycle.')}</p>
                </div>
                <div className="sub-content">
                    <BillingTable items={transactions} />
                </div>
            </div>
        </div>
    );
}

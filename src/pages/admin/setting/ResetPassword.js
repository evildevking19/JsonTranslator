import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from '@mui/material';
import axios from "axios";
import toastr from "toastr";
export default function Notification() {
    const [errors, setErrors] = useState([]);
    const { t } = useTranslation();
    const [curPwd, setCurPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const curPwdRef = useRef(null);

    const resetForm = () => {
        setCurPwd("");
        setNewPwd("");
        setConfirmPwd("");
    }
    const changePassword = async () => {
        if (!validateForm()) return;
        await axios.post(`/api/account/resetpassword`, {
            newPass: newPwd, curPass: curPwd, confirm: confirmPwd
        }).then(res => {
            console.log(res);
            if (res.data === 'success') {
                toastr.clear();
                toastr.success(t('Changed successfully'));

                setCurPwd("");
                setNewPwd("");
                setConfirmPwd("");
                resetForm();
            } else {
                toastr.clear();
                toastr.warning(t('Current passworf field is not correct'));
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const validateForm = () => {
        let newErrors = [];
        if (curPwd === "") {
            newErrors["curPwd"] = t("Current Password Required");
        }
        if (newPwd === "") {
            newErrors["newPwd"] = t("New Password Required");
        }
        if (newPwd === "") {
            newErrors["confirmPwd"] = t("New Password Confirm Required");
        }

        if (newPwd !== confirmPwd) {
            newErrors["newPwd"] = t("The new password does not match the confirmation");
            newErrors["confirmPwd"] = t("The new password does not match the confirmation");
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length !== 0) {
            return false;
        } else {
            return true;
        }
    }

    useEffect(() => {
        curPwdRef.current.focus();
    }, [])
    return (
        <div id="setting-password">
            <h5 className="setting-subtitle">{t('Password')}</h5>
            <p className="setting-subdes">{t('Please enter your current password to change your password.')}</p>
            <div className="tab-content-section">
                <div className={errors['curPwd'] ? "form-group has-error" : "form-group"}>
                    <label htmlFor="cur-pwd" className="form-label">{t('Current password')}</label>
                    <input ref={curPwdRef} type="password" id="cur-pwd" value={curPwd} onChange={(e) => setCurPwd(e.target.value)} />
                    {errors['curPwd'] && <p className="field-error">{errors['curPwd']}</p>}
                </div>
            </div>
            <div className="tab-content-section">
                <div className={errors['newPwd'] ? "form-group has-error" : "form-group"}>
                    <label htmlFor="new-pwd" className="form-label">{t('New password')}</label>
                    <input type="password" id="new-pwd" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
                    {errors['newPwd'] && <p className="field-error">{errors['newPwd']}</p>}
                </div>
            </div>
            <div className="tab-content-section">
                <div className={errors['confirmPwd'] ? "form-group has-error" : "form-group"}>
                    <label htmlFor="confirm-pwd" className="form-label">{t('Confirm password')}</label>
                    <input type="password" id="confirm-pwd" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
                    {errors['confirmPwd'] && <p className="field-error">{errors['confirmPwd']}</p>}
                </div>
            </div>
            <div className="tab-content-section">
                <div className="form-group" id="reset-password-actions">
                    <Button variant="contained" color="white" onClick={resetForm}>{t('Reset')}</Button>
                    <Button variant="contained" color="third" onClick={changePassword}>{t('Update password')}</Button>
                </div>
            </div>
        </div>
    );
}

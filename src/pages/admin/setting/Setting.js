import { useState } from "react";
import Layout from '../../../layout/AdminLayout';
import Profile from './Profile';
import ResetPassword from './ResetPassword';
import Team from './Team';
import Plan from './Plan';
import Notification from './Notification';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useTranslation } from 'react-i18next';
export default function Setting() {
    const { t, i18n } = useTranslation();
    const [tab, setTab] = useState(0);

    const tabContent = () => {
        if (tab === 0) return <Profile />
        if (tab === 1) return <ResetPassword />
        if (tab === 2) return <Team />
        if (tab === 3) return <Plan />
        if (tab === 4) return <Notification />
    }
    return (
        <Layout title="Setting">
            <div className="tabs-setting">
                <ButtonGroup variant="contained" color="tabs" aria-label="outlined primary button group">
                    <Button className={tab === 0 ? "active" : ""} onClick={() => setTab(0)}>{t('Profile')}</Button>
                    <Button className={tab === 1 ? "active" : ""} onClick={() => setTab(1)}>{t('Password')}</Button>
                    {/* <Button className={tab === 2 ? "active" : ""} onClick={() => setTab(2)}>{t('Team')}</Button> */}
                    <Button className={tab === 3 ? "active" : ""} onClick={() => setTab(3)}>{t('Plan & Biiling')}</Button>
                    {/* <Button className={tab === 4 ? "active" : ""} onClick={() => setTab(4)}>{t('Notification')}</Button> */}
                </ButtonGroup>
            </div>
            <div className="tab-contents">
                {tabContent()}
            </div>
        </Layout>
    );
}

/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useMemo, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import Layout from '../layout/Layout';
import Pricing from '../components/Pricing2';
import TextEditable from '../components/TextEditable';
import LandingItem from '../components/LandingItem';
import { useTranslation } from 'react-i18next';
import toastr from 'toastr';

const Affilate = () => {
    const { i18n, t } = useTranslation();
    const { stripeSession } = useParams();
    const [flg, setFlg] = useState(true);

    const landingSections = useMemo(() => {
        const landingItems = [
            {
                title: 'affiliate-edit-title',
                description: 'affiliate-edit-des',
                items: [
                    'affiliate-edit-item1',
                    'affiliate-edit-item2',
                    'affiliate-edit-item3',
                ],
                icon: '/assets/imgs/landing/mark-edit.png',
                image: '/assets/imgs/new/first.png',
            },
            {
                title: 'affiliate-trans-title',
                description: 'affiliate-trans-des',
                items: [
                    'affiliate-trans-item1',
                    'affiliate-trans-item2',
                    'affiliate-trans-item3',
                ],
                icon: '/assets/imgs/landing/mark-print.png',
                image: '/assets/imgs/new/second.png',
            },
            {
                title: 'affiliate-third-title',
                description: 'affiliate-third-des',
                items: [
                    'affiliate-third-item1',
                    'affiliate-third-item2',
                    'affiliate-third-item3',
                ],
                icon: '/assets/imgs/landing/mark-epub.png',
                image: '/assets/imgs/new/third.png',
            },
        ];

        return landingItems.map((item, key) => (
            <LandingItem key={key} order={key % 2} item={item} />
        ));
    });

    useEffect(() => {
        if (!flg) return;
        setFlg(false);
        if (stripeSession && flg) {
            toastr.clear();
            toastr.success(t('payment-successfully-done'));
        }
    }, [stripeSession]);

    const handleNavigation = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Layout>
            <main>
                <div id="affiliate-page-section" className="first-section">
                    <div className="affiliate-section">
                        <TextEditable
                            type="h3"
                            text="affiliate-title"
                        />
                        <TextEditable
                            text="affiliate-description"
                        />
                        <div id="affiliate-form-group">
                            <Button 
                            className="btn btn-black"
                            onClick={() =>
                                handleNavigation('brief-section')
                            }>
                                <TextEditable type="span" text="Read more" />
                            </Button>
                            <a href='https://jsontranslator.tapfiliate.com'>
                                <Button className="btn btn-common">
                                    <TextEditable type="span" text="Get started" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
                <div id="brief-section" className="about-section">
                    <TextEditable
                        className="text-primary"
                        type="h3"
                        text="affiliate-info-title"
                    />
                    <TextEditable
                        type="h1"
                        text="affiliate-info-sub-title"
                    />

                    <TextEditable text="affiliate-info-des" />
                </div>
                <div id="landing-section">{landingSections}</div>
                <div id="joinus-section-container">
                    <div id="joinus-section">
                        <div id="joinus-about">
                            <TextEditable type="h3" text={t('Join us as an affiliate partner and get 10% commission')} />
                            <TextEditable text={t('Get up and running in less than 5 minutes.')} />
                        </div>
                        <div id="joinus-action">
                            {/* <Button variant="contained" className="btn-joinus-action btn-white">{t('Learn more')}</Button> */}
                            <a href='https://jsontranslator.tapfiliate.com'>
                                <Button variant="contained" className="btn-joinus-action btn-black">{t('Get started')}</Button>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
};
export default Affilate;

/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useMemo, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Layout from '../layout/Layout';
import Pricing from '../components/Pricing2';
import Review from '../components/Review';
import TextEditable from '../components/TextEditable';
import LandingItem from '../components/LandingItem';
import FaqContent from '../components/FaqContent';
import CheckoutDescriptionHome from '../components/CheckoutDescriptionHome';

const Home = () => {
    const landingSections = useMemo(() => {
        const landingItems = [
            {
                title: 'homepage-aipublish-edit-title',
                description: 'homepage-aipublish-edit-des',
                items: [
                    'homepage-aipublish-edit-item1',
                    'homepage-aipublish-edit-item2',
                    'homepage-aipublish-edit-item3',
                ],
                icon: '/assets/imgs/landing/aipublish/icon-ai-green.png',
                image: '/assets/imgs/landing/aipublish/1.png',
                video: "/assets/video/promotion.mp4"
            },
            {
                title: 'homepage-aipublish-trans-title',
                description: 'homepage-aipublish-trans-des',
                items: [
                    'homepage-aipublish-trans-item1',
                    'homepage-aipublish-trans-item2',
                    'homepage-aipublish-trans-item3',
                ],
                icon: '/assets/imgs/landing/aipublish/icon-ai-green.png',
                image: '/assets/imgs/landing/aipublish/2.png',
            },
        ];

        return landingItems.map((item, key) => (
            <LandingItem key={key} order={key % 2} item={item} />
        ));
    });

    const handleNavigation = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Layout>
            <main>
                <div id="home-section" className="first-section">
                    <img src="/assets/imgs/bg-home.png" alt="background" />
                    <div className="about">
                        <TextEditable
                            className="text-primary"
                            type="h3"
                            text="homepage-aipublish-title"
                        />

                        <TextEditable
                            className="text-white"
                            type="h1"
                            text="homepage-aipublish-sub-title1"
                        />
                        <div className="first-section-actions">
                            <Button
                                className="btn-common"
                                onClick={() =>
                                    handleNavigation('brief-section')
                                }
                                endIcon={
                                    <img
                                        src="/assets/imgs/icon-edit.png"
                                        alt="ai"
                                    />
                                }
                            >
                                <TextEditable
                                    type="span"
                                    text="homepage-aipublish-sub-title2"
                                />
                            </Button>
                            <TextEditable
                                className="text-white"
                                text="homepage-aipublish-sub-title3"
                            />
                        </div>
                    </div>
                </div>
                <div id="brief-section" className="about-section">
                    <TextEditable
                        className="text-primary"
                        type="h3"
                        text="homepage-aipublish-info-title"
                    />
                    <TextEditable
                        type="h1"
                        text="homepage-aipublish-info-sub-title"
                    />

                    <TextEditable text="homepage-aipublish-info-des" />
                </div>
                <div id="landing-section">{landingSections}</div>

                <CheckoutDescriptionHome />

                <div id="pricing-section-intro" className="about-section">
                    <TextEditable
                        className="text-primary"
                        type="h3"
                        text="homepage-aipublish-price-title"
                    />
                    <TextEditable
                        type="h1"
                        text="homepage-aipublish-price-sub-title"
                    />
                    <TextEditable text="homepage-aipublish-price-des" />
                </div>
                <Pricing />
                <Review />
                <FaqContent include={true} />
            </main>
        </Layout>
    );
};
export default Home;

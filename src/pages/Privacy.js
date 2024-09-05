/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useMemo, useState } from 'react';
import Layout from '../layout/Layout';
import TextEditable from '../components/TextEditable';
import Grid from '@mui/material/Grid';
import Container from "../components/SimpleContainer";

const Privacy = () => {
    return (
        <Layout dark>
            <main className="page-layout">
                <Container maxWidth="md">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div className="footer-page-header">
                                <TextEditable type="h1" text="Start with the JSON Translator" className="center" />
                                <TextEditable type="h3" text="Privacy Statement" className="center" />
                                <TextEditable text="Privacy Statement for JSON Translator" />
                                <TextEditable text="Last Updated: 20 december 2023" />
                            </div>
                            <div className="footer-page-body">
                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="1. Introduction" />
                                    <TextEditable text="JSON Translator values the privacy and security of our users. This Privacy Statement outlines how we collect, use, and protect your personal information when you use our website and services." />
                                </div>
                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="2. Information We Collect" />
                                    <TextEditable text="We collect the following types of information:" />
                                    <TextEditable text="Personal Information: When you sign up for an account or use our services, we may collect personal information, including but not limited to your name, email address, and payment details." />
                                    <TextEditable text="Usage Information: We collect information about how you use our website and services, including your interactions and transactions." />
                                    <TextEditable text="Device Information: We may collect information about the device you use to access our services, such as the device type, operating system, and browser." />
                                </div>
                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="3. How We Use Your Information" />
                                    <TextEditable text="To provide and improve our services." />
                                    <TextEditable text="To communicate with you about our services and updates." />
                                    <TextEditable text="To personalize your experience and provide targeted content." />
                                    <TextEditable text="To process payments and transactions." />
                                </div>
                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="4. Information Sharing" />
                                    <TextEditable text="We do not sell, trade, or rent your personal information to third parties. However, we may share information with trusted third-party service providers who assist us in operating our website or conducting our business, as long as they agree to keep this information confidential." />
                                    <TextEditable text="To communicate with you about our services and updates." />
                                    <TextEditable text="To personalize your experience and provide targeted content." />
                                    <TextEditable text="To process payments and transactions." />
                                </div>
                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="5. Security Measures" />
                                    <TextEditable text="We prioritize the security of your information. We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction." />
                                </div>

                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="6. Your Choices" />
                                    <TextEditable text="You have the right to review, update, and delete the personal information we hold about you. You may also choose to opt-out of certain communications." />
                                </div>

                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="7. Changes to This Privacy Statement" />
                                    <TextEditable text="We may update this Privacy Statement to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify users of any significant changes through the website." />
                                </div>

                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="8. Contact Us" />
                                    <TextEditable text="If you have any questions, concerns, or requests regarding this Privacy Statement, please contact us at info@jsontranslator.io" />
                                    <TextEditable text="By using our website and services, you agree to the terms outlined in this Privacy Statement." />
                                    <TextEditable text="Thank you for choosing JSON Translator. " />
                                </div>

                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="JSON Translator" />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </Layout>
    );
};
export default Privacy;

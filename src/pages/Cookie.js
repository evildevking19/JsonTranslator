/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useMemo, useState } from 'react';
import Layout from '../layout/Layout';
import TextEditable from '../components/TextEditable';
import Grid from '@mui/material/Grid';
import Container from "../components/SimpleContainer";

const Cookies = () => {
    return (
        <Layout dark>
            <main className="page-layout">
                <Container maxWidth="md">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div className="footer-page-header">
                                <TextEditable type="h1" text="Start with the JSON Translator" className="center" />
                                <TextEditable type="h3" text="Cookie Statement" className="center" />
                                <TextEditable text="Cookie Statement for JSON Tool" />
                                <TextEditable text="Last Updated: 20 december 2023" />
                            </div>
                            <div className="footer-page-body">
                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="1. Introduction" />
                                    <TextEditable text="This Cookie Statement explains how JSON Translator uses cookies and similar technologies when you use the JSON Tool. By using the JSON Tool, you consent to the use of cookies as described in this statement." />
                                </div>
                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="2. What Are Cookies?" />
                                    <TextEditable text="Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work or to improve their efficiency, as well as to provide information to website owners." />
                                </div>
                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="3. How We Use Cookies" />
                                    <TextEditable text="3.1 Essential Cookies: These cookies are necessary for the JSON Tool to function properly. They enable core functionality such as security, network management, and accessibility." />
                                    <TextEditable text="3.2 Analytics Cookies: We use analytics cookies to collect information about how users interact with the JSON Tool. This helps us analyze and improve the performance and user experience." />
                                    <TextEditable text="3.3 Marketing Cookies: Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user." />
                                </div>
                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="4. Types of Cookies We Use" />
                                    <TextEditable text="4.1 Session Cookies: These are temporary cookies that expire when you close your browser." />
                                    <TextEditable text="4.2 Persistent Cookies: These cookies remain on your device for a set period or until you delete them." />
                                </div>
                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="5. Your Choices" />
                                    <TextEditable text="You can control and/or delete cookies as you wish. You can delete all cookies that are already on your device, and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences each time you visit the JSON Tool." />
                                </div>

                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="6. Third-Party Cookies" />
                                    <TextEditable text="We may use third-party services that may set cookies on our behalf. These cookies are subject to the respective privacy policies of these third-party providers." />
                                </div>

                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="7. Changes to This Cookie Statement" />
                                    <TextEditable text="We may update this Cookie Statement to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify users of any significant changes through the JSON Tool." />
                                </div>

                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="8. Contact Us" />
                                    <TextEditable text="If you have any questions, concerns, or requests regarding this Cookie Statement, please contact us at info@jsontranslator.io" />
                                    <TextEditable text="By using the JSON Tool, you agree to the use of cookies as outlined in this statement." />
                                    <TextEditable text="Thank you for choosing" />
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
export default Cookies;

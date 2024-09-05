/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useMemo, useState } from 'react';
import Layout from '../layout/Layout';
import TextEditable from '../components/TextEditable';
import Grid from '@mui/material/Grid';
import Container from "../components/SimpleContainer";

const Terms = () => {
    return (
        <Layout dark>
            <main className="page-layout">
                <Container maxWidth="md">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div className="footer-page-header">
                                <TextEditable type="h1" text="Start with the JSON Translator" className="center" />
                                <TextEditable type="h3" text="Terms and Conditions" className="center" />
                                <TextEditable text="Terms and Conditions for JSON Tool" />
                                <TextEditable text="Last Updated: 20 december 2023" />
                            </div>
                            <div className="footer-page-body">
                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="1. Acceptance of Terms" />
                                    <TextEditable text="By accessing or using the JSON Tool provided by JSON Translator, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use the JSON Tool." />
                                </div>
                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="2. Use of the JSON Tool" />
                                    <TextEditable text="2.1 Eligibility: You must be at least 18 years old to use the JSON Tool." />
                                    <TextEditable text="2.2 Account Information: You agree to provide accurate and complete information when using the JSON Tool, and you will update this information to ensure its accuracy." />
                                    <TextEditable text="2.3 Prohibited Activities: You may not misuse the JSON Tool. Prohibited activities include, but are not limited to, attempting to gain unauthorized access, interfering with the proper functioning, or violating applicable laws and regulations." />
                                </div>
                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="3. Intellectual Property" />
                                    <TextEditable text="The JSON Tool, including all content, features, and functionality, is owned by our company and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our explicit consent." />
                                </div>
                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="4. Privacy" />
                                    <TextEditable text="Your use of the JSON Tool is subject to our Privacy Statement, which outlines how we collect, use, and protect your personal information." />
                                </div>
                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="5. Termination" />
                                    <TextEditable text="We reserve the right to terminate or suspend your access to the JSON Tool at any time, without prior notice, for any reason, including violation of these Terms and Conditions." />
                                </div>

                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="6. Changes to Terms and Conditions" />
                                    <TextEditable text="We may update these Terms and Conditions to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify users of any significant changes through the JSON Tool." />
                                </div>

                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="7. Disclaimer of Warranties" />
                                    <TextEditable text="The JSON Tool is provided 'as is,' without any warranties, express or implied. We do not guarantee that the tool will be error-free or uninterrupted." />
                                </div>

                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="8. Limitation of Liability" />
                                    <TextEditable text="In no event shall be liable for any indirect, consequential, incidental, special, or punitive damages arising out of or in connection with the use of the JSON Tool." />
                                </div>

                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="9. Governing Law" />
                                    <TextEditable text="These Terms and Conditions are governed by and construed in accordance with the laws of our company, without regard to its conflict of law principles." />
                                </div>

                                <div className="footer-description-item">
                                    <TextEditable type="h6" text="10. Contact Us" />
                                    <TextEditable text="If you have any questions, concerns, or requests regarding these Terms and Conditions, please contact us at info@jsontranslator.io" />
                                    <TextEditable text="By using the JSON Tool, you agree to the terms outlined in these Terms and Conditions." />
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
export default Terms;

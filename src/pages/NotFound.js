import React from 'react';
import Layout from '../layout/Layout';
const NotFound = () => {
    return (
        <Layout>
            <main>
                <div className="first-section" id="not-fount-page">
                    <h2>404 - Not Found</h2>
                    <p>The page you're looking for does not exist.</p>
                </div>
            </main>
        </Layout>
    );
};
export default NotFound;

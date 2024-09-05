import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// client pages
import Home from '../pages/Home';
import Tool from '../pages/Tool';
import How from '../pages/How';
import Contact from '../pages/Contact';
import Login from '../pages/account/Login';
import Signup from '../pages/account/Signup';
import ForgotPassword from '../pages/account/ForgotPassword';

import Affiliate from '../pages/Affiliate';
import Privacy from '../pages/Privacy';
import Cookie from '../pages/Cookie';
import Terms from '../pages/Terms';

// admin pages
import Client from '../pages/admin/client/List';
import ContactForm from '../pages/admin/ContactForm';
import Translate from '../pages/admin/Translate';
import Setting from '../pages/admin/setting/Setting';

import NotFound from '../pages/NotFound';

const RoutesTree = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/tool" element={<Tool />} />
                <Route path="/howitworks" element={<How />} />
                <Route path="/affiliate" element={<Affiliate />} />

                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookie" element={<Cookie />} />
                <Route path="/account/login" element={<Login />} />
                <Route path="/account/signup" element={<Signup />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />

                <Route path="/admin" element={<Client />} />
                <Route path="/admin/customers" element={<Client />} />
                <Route path="/admin/contacts" element={<ContactForm />} />
                <Route path="/admin/translate" element={<Translate />} />
                <Route path="/admin/setting" element={<Setting />} />
                <Route path="/admin/setting/:tid" element={<Setting />} />

                <Route path="/notfound" element={<NotFound />} />
            </Routes>
        </Router>
    )
}
export default RoutesTree;
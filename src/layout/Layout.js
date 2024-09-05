import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';

const Layout = (props) => {
    const location = useLocation();
    const { nofooter, nomenu, nonotify } = props;

    useEffect(() => {
        window.scrollTo(0, 0); // Reset scroll position to (0, 0) whenever the location changes
    }, [location]);

    return (
        <>
            <Header
                dark={props.dark}
                data={props.header}
                nomenu={nomenu}
                nonotify={nonotify}
            />

            {props.children}

            {!nofooter && <Footer />}

            <ScrollToTopButton />
        </>
    );
};
export default Layout;

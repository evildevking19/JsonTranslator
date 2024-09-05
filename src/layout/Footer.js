import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
export default function Footer() {
    const { t } = useTranslation();
    return (
        <footer>
            <div id="footer-left">
                <span>{t('footer-copyright')}</span>
            </div>
            <div id="footer-right">
                <Link to="/contact" className="footer-link">
                    {t('footer-link-contact')}
                </Link>
                <Link to="/affiliate" className="footer-link">
                    {t('footer-link-affiliate')}
                </Link>
                <Link to="/terms" className="footer-link">
                    {t('footer-link-terms')}
                </Link>
                <Link to="/privacy" className="footer-link">
                    {t('footer-link-privacy')}
                </Link>
                <Link to="/cookie" className="footer-link">
                    {t('footer-link-cookies')}
                </Link>
            </div>
        </footer>
    );
}

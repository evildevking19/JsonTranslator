import { useState } from 'react';
import { Link } from 'react-router-dom';
import TextEditable from './TextEditable';
import Button from '@mui/material/Button';
import Search from './Search';
import Accordion from './Accordion';
import { useTranslation } from 'react-i18next';

const faqItemsInitial = [
    {
        title: 'faq-item-title1',
        description: 'faq-item-description1',
    },
    {
        title: 'faq-item-title2',
        description: 'faq-item-description2',
    },
    {
        title: 'faq-item-title3',
        description: 'faq-item-description3',
    },
    {
        title: 'faq-item-title4',
        description: 'faq-item-description4',
    },
    {
        title: 'faq-item-title5',
        description: 'faq-item-description5',
    },
    {
        title: 'faq-item-title6',
        description: 'faq-item-description6',
    },
    {
        title: 'faq-item-title7',
        description: 'faq-item-description7',
    },
    {
        title: 'faq-item-title8',
        description: 'faq-item-description8',
    },
    {
        title: 'faq-item-title9',
        description: 'faq-item-description9',
    },
    {
        title: 'faq-item-title10',
        description: 'faq-item-description10',
    },
];

const FaqContent = (props) => {
    const [faqSearch, setFaqSearch] = useState('');
    const [faqItems, setFaqItems] = useState(faqItemsInitial);
    const { i18n, t } = useTranslation();

    const handleFaqSearchChange = (e) => {
        setFaqSearch(e.target.value);
        setFaqItems(
            faqItemsInitial.filter(
                (item) =>
                    t(item.title).includes(e.target.value) ||
                    t(item.description).includes(e.target.value)
            )
        );
    };

    const handleNavigation = (sectionId) => {
        const element = document.getElementById(sectionId);
        console.log(element);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div id="faq-content">
                <div id="faq-header">
                    {/* <TextEditable
                        className="text-primary"
                        type="h4"
                        text="faq-support"
                    /> */}
                    <TextEditable
                        className="faq-title"
                        type="h1"
                        text="faq-title"
                    />
                    <TextEditable text="faq-description" />

                    {!props.include && (
                        <Search
                            value={faqSearch}
                            handleChange={handleFaqSearchChange}
                            handleReset={() => setFaqSearch('')}
                        />
                    )}
                </div>

                <Accordion items={faqItems} />
            </div>

            {props.include && (
                <div id="case-section">
                    <div id="pm-about">
                        <img
                            src={'/assets/imgs/avatar-group.png'}
                            alt="Lulu Meyers"
                        />
                    </div>
                    <TextEditable
                        style={{ margin: '10px 0' }}
                        type="h5"
                        text="faq-case-study"
                    />
                    <TextEditable
                        style={{ marginBottom: '20px' }}
                        text="faq-case-study-title3"
                    />
                    <div id="faq-actions">
                        <Link to="/shop">
                            <Button className="btn btn-common">
                                <TextEditable type="span" text="Get in touch" />
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};
export default FaqContent;

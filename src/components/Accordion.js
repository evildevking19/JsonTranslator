import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import TextEditable from './TextEditable';
import { useTranslation } from 'react-i18next';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
    backgroundColor: "#191a1c",
    marginBottom: 0,
    "&.Mui-expanded": {
        borderBottom: "1px solid #888",
        paddingBottom: "30px",
        
    },
    "&.Mui-expanded .MuiButtonBase-root": {
        borderBottom: "none",
        paddingBottom: "0!important",
    }
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : '#191a1c',
    flexDirection: 'row-reverse',
    color: 'white',
    '&.MuiButtonBase-root': {
        padding: '20px 0!important',
        borderBottom: "1px solid #888"
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
        color: '#33A68E',
        position: 'absolute',
        right: 0,
    },
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(0),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(0),
    textAlign: 'left',
    backgroundColor: '#191a1c',
    color: 'white',
}));

export default function CustomizedAccordions(props) {
    const { i18n, t } = useTranslation();
    const [expanded, setExpanded] = React.useState('panel0');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div className="accordion">
            {props.items.map((item, key) => (
                <Accordion
                    key={key}
                    expanded={expanded === `panel${key}`}
                    onChange={handleChange(`panel${key}`)}
                >
                    <AccordionSummary
                        expandIcon={
                            expanded === `panel${key}` ? (
                                <RemoveCircleOutlineIcon />
                            ) : (
                                <AddCircleOutlineIcon />
                            )
                        }
                        aria-controls="panel1d-content"
                        id={`panel${key}d-header`}
                    >
                        <TextEditable type="h3" text={item.title} />
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextEditable text={item.description} />
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}

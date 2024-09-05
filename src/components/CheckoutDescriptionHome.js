import { Box, Grid } from '@mui/material';
import TextEditable from '../components/TextEditable';

export default function () {
    return (
        <>
            <Box className="checkout-description des"
            >
                <TextEditable
                    className="text-primary"
                    type="h6"
                    text="checkout-page-title"
                />
                <TextEditable type="h1" text="checkout-page-subtitle" />
                <TextEditable text="checkout-page-des" />
            </Box>

            <Grid container spacing={2} sx={{ marginTop: "10px" }}>
                <Grid item xs={12} sm={6} md={4}>
                    <div className="checkout-guide">
                        <img src="/assets/imgs/new/reply.png" alt="Translate JSON files in 5 seconds" />
                        <TextEditable type="h6" text='Translate JSON files in 5 seconds' />
                        <TextEditable text='The fastest tool, translate entire JSON files in less then 5 seconds.' />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div className="checkout-guide">
                        <img src="/assets/imgs/new/thunder.png" alt="Translate complete JSON files" />
                        <TextEditable type="h6" text='Translate complete JSON files' />
                        <TextEditable text='Never again split JSON files into parts; simply translate as a whole, powered by ChatGPT.' />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div className="checkout-guide">
                        <img src="/assets/imgs/new/arrow.png" alt="Translate with ChatGPT" />
                        <TextEditable type="h6" text='Translate with ChatGPT' />
                        <TextEditable text='Translate with ChatGPT, better than Google Translate and DeepL.' />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div className="checkout-guide">
                        <img src="/assets/imgs/new/smile.png" alt="Choose from 260+ languages" />
                        <TextEditable type="h6" text='Choose from 260+ languages' />
                        <TextEditable text='The widest range of languages, choose from 260+ languages.' />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div className="checkout-guide">
                        <img src="/assets/imgs/new/square.png" alt="We offer unlimited packages" />
                        <TextEditable type="h6" text='We offer unlimited packages' />
                        <TextEditable text='No hassle with pay-per-character or string; we offer unlimited packages.' />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div className="checkout-guide">
                        <img src="/assets/imgs/new/heart.png" alt="Multi-translate option" />
                        <TextEditable type="h6" text='Multi-translate option' />
                        <TextEditable text='Translate complete JSON files into 260+ languages with the push of a button in minutes.' />
                    </div>
                </Grid>
            </Grid>
        </>
    )
}
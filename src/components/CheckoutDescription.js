import { Box, Grid } from '@mui/material';
import TextEditable from '../components/TextEditable';

export default function CheckoutDescription() {
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
                        <img src="/assets/imgs/new/reply.png" alt="Share team inboxes" />
                        <TextEditable type="h6" text='Share team inboxes' />
                        <TextEditable text='Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.' />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div className="checkout-guide">
                        <img src="/assets/imgs/new/thunder.png" alt="Deliver instant answers" />
                        <TextEditable type="h6" text='Deliver instant answers' />
                        <TextEditable text='An all-in-one customer service platform that helps you balance everything your customers need to be happy.' />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div className="checkout-guide">
                        <img src="/assets/imgs/new/arrow.png" alt="Manage your team with reports" />
                        <TextEditable type="h6" text='Manage your team with reports' />
                        <TextEditable text='Measure what matters with Untitled’s easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.' />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div className="checkout-guide">
                        <img src="/assets/imgs/new/smile.png" alt="Connect with customers" />
                        <TextEditable type="h6" text='Connect with customers' />
                        <TextEditable text='Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email without confusion.' />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div className="checkout-guide">
                        <img src="/assets/imgs/new/square.png" alt="Connect the tools you already use" />
                        <TextEditable type="h6" text='Connect the tools you already use' />
                        <TextEditable text='Explore 100+ integrations that make your day-to-day workflow more efficient and familiar. Plus, our extensive developer tools.' />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div className="checkout-guide">
                        <img src="/assets/imgs/new/heart.png" alt="Our people make the difference" />
                        <TextEditable type="h6" text='Our people make the difference' />
                        <TextEditable text='We’re an extension of your customer service team, and all of our resources are free. Chat to our friendly team 24/7 when you need help.' />
                    </div>
                </Grid>
            </Grid>
        </>
    )
}
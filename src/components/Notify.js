import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextEditable from './TextEditable';
import { useTranslation } from 'react-i18next';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function Notify(props) {
    const [open, setOpen] = useState(false);
    const { i18n, t } = useTranslation();

    const handleClickOpen = () => {
        if (sessionStorage.getItem('jtrans-notify-block')) {
            return;
        }
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleNotifyBlock = () => {
        sessionStorage.setItem('jtrans-notify-block', true);
        handleClose();
    };

    useEffect(() => {
        handleClickOpen();
    }, []);

    return (
        <div>
            <BootstrapDialog
                className="notify-modal"
                maxWidth="md"
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={false}
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12} sm={6} order={{ xs: 2, sm: 1 }}>
                            <img
                                style={{ width: '100%', height: '100%' }}
                                src="/assets/imgs/notify/left.png"
                                alt="Notify"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }}>
                            <Grid
                                flexGrow={1}
                                container
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    px: 6,
                                    pt: 6,
                                    pb: 2,
                                }}
                            >
                                <Box>
                                    <TextEditable
                                        className="notify-title"
                                        type="h5"
                                        text="notify-title"
                                    />
                                    <TextEditable
                                        className="notify-description"
                                        text="notify-description"
                                    />
                                </Box>
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        Є75,-
                                    </Typography>
                                    <TextEditable
                                        className="notify-des-item"
                                        text="notify-des-item1"
                                    />

                                    <Link to="/promotion">
                                        <Button
                                            className="btn-common btn-notify-checkout"
                                            color="primary"
                                            variant="contained"
                                            onClick={handleClose}
                                        >
                                            {t('notify-link')}
                                        </Button>
                                    </Link>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'end',
                                        fontSize: '12px',
                                    }}
                                >
                                    <FormControlLabel
                                        id="notify-block"
                                        onClick={handleNotifyBlock}
                                        control={<Checkbox />}
                                        label={t('notify-hide')}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}

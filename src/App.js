import React, { Suspense } from 'react';
import RoutesTree from './components/RoutesTree';
import { AuthProvider } from './contexts/AuthContext';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { green } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material/styles';
import theme from './contexts/theme';

toastr.options = {
    positionClass: 'toast-top-full-width',
    hideDuration: 300,
    timeOut: 5000,
};

function App() {
    return (
        <Suspense fallback="loading">
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <div className="App">
                        <RoutesTree />
                    </div>
                </ThemeProvider>
            </AuthProvider>
        </Suspense>
    );
}

export default App;

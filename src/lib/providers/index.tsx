'use client';

import React from 'react';
import LoginModalProvider from './modals/LoginModal';
import ReportSafetyModalProvider from './modals/ReportSafetyModal';
import { SessionProvider } from 'next-auth/react';
import CreateTripModalProvider from './modals/CreateTripModal';
import { ThemeProvider } from 'next-themes';

const Providers = ({ children }: { children: React.ReactNode }) => (
    <SessionProvider>
        <ThemeProvider
        attribute='class'
        defaultTheme='dark'
        enableSystem={false}
        >
            <LoginModalProvider>
                <ReportSafetyModalProvider>
                    <CreateTripModalProvider>{children}</CreateTripModalProvider>
                </ReportSafetyModalProvider>
            </LoginModalProvider>
        </ThemeProvider>
    </SessionProvider>
);

export default Providers;

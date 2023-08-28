'use client';

import React from "react";
import LoginModalProvider from "./modals/LoginModal";
import ReportSafetyModalProvider from "./modals/ReportSafetyModal";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => (
    <SessionProvider>
        <LoginModalProvider>
            <ReportSafetyModalProvider>
                {children}
            </ReportSafetyModalProvider>
        </LoginModalProvider>
    </SessionProvider>
    
)

export default Providers;
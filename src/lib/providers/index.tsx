'use client';

import React from "react";
import LoginModalProvider from "./modals/LoginModal";
import ReportSafetyModalProvider from "./modals/ReportSafetyModal";
import { SessionProvider } from "next-auth/react";
import CreateTripModalProvider from "./modals/CreateTripModal";

const Providers = ({ children }: { children: React.ReactNode }) => (
    <SessionProvider>
        <LoginModalProvider>
            <ReportSafetyModalProvider>
                <CreateTripModalProvider>
                    {children}
                </CreateTripModalProvider>
            </ReportSafetyModalProvider>
        </LoginModalProvider>
    </SessionProvider>
    
)

export default Providers;
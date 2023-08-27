'use client';

import React from "react";
import LoginModalProvider from "./modals/LoginModal";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => (
    <SessionProvider>
        <LoginModalProvider>
            {children}
        </LoginModalProvider>
    </SessionProvider>
    
)

export default Providers;
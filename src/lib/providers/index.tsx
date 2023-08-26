'use client';

import React from "react";
import LoginModalProvider from "./modals/LoginModal";

const Providers = ({ children }: { children: React.ReactNode }) => (
    <LoginModalProvider>
        {children}
    </LoginModalProvider>
)

export default Providers;
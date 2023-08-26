'use client';

import { LoginModalContext } from "./context";

import React, { Suspense, useState } from "react";
import LoginModal from "@/components/layout/modal/login_modal";

const LoginModalProvider = ({ children } : { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);

    return (
        <LoginModalContext.Provider value={{ open, setOpen }}>
            <Suspense>
                <LoginModal open={open} setOpen={setOpen} />
            </Suspense>
            {children}
        </LoginModalContext.Provider>
    )
};

export default LoginModalProvider;
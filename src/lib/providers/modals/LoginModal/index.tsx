'use client';

import { LoginModalContext } from "./context";

import React, { Suspense, useState, useEffect, useCallback } from "react";
import LoginModal from "@/components/layout/modal/login_modal";

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { getSession } from "next-auth/react";

const LoginModalProvider = ({ children } : { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const newSetOpen = useCallback((value: boolean) => {
        if (value === false) {
            setOpen(false);
            return;
        }
        
        const session = getSession();
        session
        .then((session) => {
            if (session && session.user) {
                setOpen(false);
                return;
            }

            setOpen(value);
        })
        .catch(err => {
            setOpen(false);
        })
    }, []);

    useEffect(() => {
        if (searchParams.has('login')) {
            if (searchParams.get('login') === '1') {
                newSetOpen(true);
                router.replace(pathname, { scroll: true });
            }
            else {
                newSetOpen(false);
            }
        }

        if (searchParams.has('auth_error')) {
            const authError = searchParams.get('auth_error');

            switch (authError) {
                case 'oauth':
                    alert('Could not login with the selected provider. Please select another provider.');
                    break;
                default:
                    break;
            }
        }
    }, [newSetOpen, pathname, router, searchParams]);

    return (
        <LoginModalContext.Provider value={{ open, setOpen: newSetOpen }}>
            <Suspense>
                <LoginModal open={open} setOpen={newSetOpen} />
            </Suspense>
            {children}
        </LoginModalContext.Provider>
    )
};

export default LoginModalProvider;
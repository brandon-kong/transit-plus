'use client';

import { createContext, useContext } from 'react';

export interface LoginModalContext {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const LoginModalContext = createContext<LoginModalContext>({
    open: false,
    setOpen: () => {},
});

export const useLoginModal = () => useContext(LoginModalContext);

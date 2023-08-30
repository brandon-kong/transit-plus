'use client';

import { createContext, useContext } from 'react';

export interface CreateTripModalContext {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const CreateTripModalContext = createContext<CreateTripModalContext>({
    open: false,
    setOpen: () => {},
});

export const useCreateTripModal = () => useContext(CreateTripModalContext);

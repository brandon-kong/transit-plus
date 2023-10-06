'use client';

import { CreateTripModalContext } from './context';

import React, { Suspense, useState } from 'react';
import CreateTripModal from '@/components/layout/modal/create_trip_modal';

const CreateTripModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);

    return (
        <CreateTripModalContext.Provider value={{ open, setOpen }}>
            <Suspense>
                <CreateTripModal open={open} setOpen={setOpen} />
            </Suspense>
            {children}
        </CreateTripModalContext.Provider>
    );
};

export default CreateTripModalProvider;

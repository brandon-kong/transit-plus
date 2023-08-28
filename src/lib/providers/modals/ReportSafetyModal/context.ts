'use client';

import { createContext, useContext } from 'react';

export interface ReportSafetyModalContext {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const ReportSafetyModalContext = createContext<ReportSafetyModalContext>({
    open: false,
    setOpen: () => {},
});

export const useReportSafetyModal = () => useContext(ReportSafetyModalContext);

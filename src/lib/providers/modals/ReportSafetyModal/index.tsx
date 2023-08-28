'use client';

import { ReportSafetyModalContext } from "./context";

import React, { Suspense, useState } from "react";
import ReportSafetyModal from "@/components/layout/modal/report_safety_modal";

const ReportSafetyModalProvider = ({ children } : { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);

    return (
        <ReportSafetyModalContext.Provider value={{ open, setOpen }}>
            <Suspense>
                <ReportSafetyModal open={open} setOpen={setOpen} />
            </Suspense>
            {children}
        </ReportSafetyModalContext.Provider>
    )
};

export default ReportSafetyModalProvider;
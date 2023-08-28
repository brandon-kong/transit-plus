'use client';

import Image from "next/image";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog";

import { TypographyH3, TypographyP } from "@/components/typography";
import { LoginModalContext } from "@/lib/providers/modals/LoginModal/context";
import { BackButton, CloseButton } from "@/components/input/buttons";

import { useReportSafetyStore } from "@/lib/state/report_safety";

import ReportSafetyLocationView from "./views/location";
import ReportSafetyDateTimeView from "./views/date-time";

import { BlackSpinner } from "@/components/spinner";

const ReportSafetyStates: { [key: string]: any } = {
    'location': {
        title: 'Report Safety Concern',
        description: 'Thank you for helping us make transit safer for everyone.',
        view: <ReportSafetyLocationView />
    },
    'date-time': {
        title: 'Report Safety Concern',
        description: 'You don\'t have to be exact, but please provide as much detail as possible.',
        view: <ReportSafetyDateTimeView />
    },
}

const ReportSafetyModal = ({ open, setOpen }: LoginModalContext) => {
    const view = useReportSafetyStore((state) => state.view);
    const setView = useReportSafetyStore((state) => state.setView);
    const loading = useReportSafetyStore((state) => state.loading);

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent id="login-dialog" className="max-w-[550px] overflow-hidden border-none">

                <DialogHeader className="z-20">

                    {
                        view === 'location' ? (
                        <>
                            <Image
                            src={'/brand/transit-logo.png'}
                            alt="Transit+ Logo"
                            width={40}
                            height={40}

                            className={'mb-4 z-20'}
                            />

                            <CloseButton
                            onClick={() => setOpen(false)}
                            className={'absolute top-3 right-4 z-20'}
                            />
                        </>
                        
                        ) : <BackButton onClick={() => setView('location')} className="z-20"/>
                    }

                    {
                        loading && (
                            <div className="absolute left-0 top-0 w-full h-full backdrop-blur-sm flex items-center justify-center">
                                <BlackSpinner />
                            </div>
                        )
                    }
                    
                    <TypographyH3>
                        {ReportSafetyStates[view] && ReportSafetyStates[view].title}
                    </TypographyH3>
                    <DialogDescription className="z-20">
                        {ReportSafetyStates[view] && ReportSafetyStates[view].description}
                    </DialogDescription>
                    
                </DialogHeader>
                {
                    ReportSafetyStates[view] && ReportSafetyStates[view].view
                }
            </DialogContent>
        </Dialog>
    )
};

export default ReportSafetyModal;
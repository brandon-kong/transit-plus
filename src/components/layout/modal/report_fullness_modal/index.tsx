'use client';

import Image from 'next/image';

import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from '@/components/ui/dialog';

import { TypographyH3 } from '@/components/typography';
import { LoginModalContext } from '@/lib/providers/modals/LoginModal/context';
import { BackButton, CloseButton } from '@/components/input/buttons';

import { useCreateTripStore } from '@/lib/state/create_trip';

import CreateTripStartingPointView from './views/starting_location';
import CreateTripEndingPointView from './views/ending-location';
import CreateTripTransportationView from './views/transportation';
import CreateTripFrequencyView from './views/frequency';
import CreateTripTrainInfoView from './views/train-info';
import CreateTripNameView from './views/name';

import { BlackSpinner } from '@/components/spinner';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const CreateTripStates: { [key: string]: any } = {
    'starting-point': {
        title: 'Report Safety Concern',
        description: 'Thank you for helping us make transit safer for everyone.',
        view: <CreateTripStartingPointView />,
        progress: 'w-[10%]',
    },
    destination: {
        title: 'Report Safety Concern',
        description: 'Thank you for helping us make transit safer for everyone.',
        view: <CreateTripEndingPointView />,
        progress: 'w-[20%]',
    },
    transportation: {
        title: 'Report Safety Concern',
        description: 'Thank you for helping us make transit safer for everyone.',
        view: <CreateTripTransportationView />,
        progress: 'w-[50%]',
    },
    'train-info': {
        title: 'Report Safety Concern',
        description: 'Thank you for helping us make transit safer for everyone.',
        view: <CreateTripTrainInfoView />,
        progress: 'w-[70%]',
    },
    frequency: {
        title: 'Report Safety Concern',
        description: 'Thank you for helping us make transit safer for everyone.',
        view: <CreateTripFrequencyView />,
        progress: 'w-[80%]',
    },
    name: {
        title: 'Report Safety Concern',
        description: 'Thank you for helping us make transit safer for everyone.',
        view: <CreateTripNameView />,
        progress: 'w-[90%]',
    },
};

const ReportFullnessModal = ({ open, setOpen }: LoginModalContext) => {
    const view = useCreateTripStore(state => state.view);
    const setView = useCreateTripStore(state => state.setView);
    const loading = useCreateTripStore(state => state.loading);

    const progress = CreateTripStates[view] && CreateTripStates[view].progress;

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (pathname === '/plan' && searchParams.has('open')) {
            router.replace('/plan');
            setOpen(true);
        }
    }, [pathname, searchParams, router, setOpen]);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent id="login-dialog" className="max-w-[650px] overflow-hidden border-none">
                <DialogHeader className="z-20">
                    {view === 'starting-point' ? (
                        <>
                            <Image
                                src={'/brand/transit-logo.png'}
                                alt="Transit+ Logo"
                                width={40}
                                height={40}
                                className={'mb-4 z-20'}
                            />

                            <CloseButton onClick={() => setOpen(false)} className={'absolute top-3 right-4 z-20'} />
                        </>
                    ) : (
                        <BackButton onClick={() => setView('starting-point')} className="z-20" />
                    )}

                    {loading && (
                        <div className="absolute left-0 top-0 w-full h-full backdrop-blur-sm flex items-center justify-center">
                            <BlackSpinner />
                        </div>
                    )}

                    {view === 'starting-point' && (
                        <>
                            <TypographyH3>New trip, new adventure!</TypographyH3>
                            <DialogDescription className="z-20">
                                You can create a reoccurring trip or a one-time trip; it&apos;s up to you! E.g. You can
                                create a trip for your daily commute to work or a fun, little getaway to the beach.
                            </DialogDescription>
                        </>
                    )}
                </DialogHeader>
                {CreateTripStates[view] && CreateTripStates[view].view}

                <div className={`absolute bottom-0 left-0 border-black border-2 ${progress} transition-all`}></div>
            </DialogContent>
        </Dialog>
    );
};

export default ReportFullnessModal;

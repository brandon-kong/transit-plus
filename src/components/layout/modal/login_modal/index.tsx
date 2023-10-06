'use client';

import Image from 'next/image';

import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from '@/components/ui/dialog';

import { TypographyH3, TypographyP } from '@/components/typography';
import { LoginModalContext } from '@/lib/providers/modals/LoginModal/context';
import { BackButton, CloseButton } from '@/components/input/buttons';

import { useLoginStore } from '@/lib/state/login';

import LoginModalLoginView from './views/login';
import EmailLoginView from './views/email-login';
import OTPVerifyView from './views/otp-verify';
import PhoneRegisterView from './views/phone-register';
import EmailRegisterView from './views/email-register';
import { BlackSpinner } from '@/components/spinner';

const LoginStates: { [key: string]: any } = {
    login: {
        title: 'Sign in to Transit+',
        description: 'Log in or create an account to start earning by crowdsourcing.',
        view: <LoginModalLoginView />,
    },
    'email-verify': {
        title: 'Verify your email',
        description: "Let's make sure it's really you!",
        view: <EmailLoginView />,
    },
    'otp-verify': {
        title: 'Verify your phone number',
        description: 'We sent you a fun little code to verify your phone number. Enter it below!',
        view: <OTPVerifyView />,
    },
    'phone-register': {
        title: 'Finish your registration',
        description: 'We just need a few more details to finish your registration.',
        view: <PhoneRegisterView />,
    },
    'email-register': {
        title: 'Finish your registration',
        description: 'We just need a few more details to finish your registration.',
        view: <EmailRegisterView />,
    },
};

const LoginModal = ({ open, setOpen }: LoginModalContext) => {
    const view = useLoginStore(state => state.view);
    const setView = useLoginStore(state => state.setView);
    const loading = useLoginStore(state => state.loading);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent id="login-dialog" className="max-w-[550px] overflow-hidden border-none">
                {view !== 'login' && (
                    <Image
                        src="/astronaut.gif"
                        alt="Astronaut"
                        width={120}
                        height={120}
                        className="absolute right-0 top-0 z-50 select-none"
                    />
                )}
                <DialogHeader className="z-20">
                    {view === 'login' ? (
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
                        <BackButton onClick={() => setView('login')} className="z-20" />
                    )}

                    {loading && (
                        <div className="absolute left-0 top-0 w-full h-full backdrop-blur-sm flex items-center justify-center">
                            <BlackSpinner />
                        </div>
                    )}

                    <DialogTitle className="z-20">
                        <TypographyH3>{LoginStates[view] && LoginStates[view].title}</TypographyH3>
                    </DialogTitle>
                    <DialogDescription className="z-20">
                        <TypographyP>{LoginStates[view] && LoginStates[view].description}</TypographyP>
                    </DialogDescription>
                </DialogHeader>
                {LoginStates[view] && LoginStates[view].view}
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;

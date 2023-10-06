import { InputWithLabel } from '@/components/input/inputbox';
import { Button } from '@/components/ui/button';

import { signIn } from 'next-auth/react';

import { useLoginStore } from '@/lib/state/login';

import { useLoginModal } from '@/lib/providers/modals/LoginModal/context';

import { useSearchParams } from 'next/navigation';

export default function EmailLoginView() {
    const searchParams = useSearchParams();
    const { setOpen } = useLoginModal();

    const setLoading = useLoginStore(state => state.setLoading);
    const email = useLoginStore(state => state.email);
    const setEmail = useLoginStore(state => state.setEmail);

    const password = useLoginStore(state => state.password);
    const setPassword = useLoginStore(state => state.setPassword);

    const attemptEmailLogin = async (e: any) => {
        e.preventDefault();

        setLoading(true);

        let callback = 'http://localhost:3000/';
        if (searchParams.has('redirect')) {
            callback = `http://localhost:3000/${searchParams.get('redirect') as string}`;
        }
        const verified = await signIn('email-password', {
            email,
            password,

            callbackUrl: callback,
        });

        if (!verified?.error) {
            setOpen(false);
        } else {
            // TODO: handle error
        }

        setLoading(false);
    };

    return (
        <form onSubmit={attemptEmailLogin} className="flex flex-col gap-4 mt-4">
            <InputWithLabel
                label="Email"
                placeholder="Email"
                name="email"
                className="transition-all"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <InputWithLabel
                autoFocus
                label="Password"
                placeholder="Password"
                name="password"
                className="transition-all"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <Button size={'lg'} type="submit" className={'my-4 bg-black hover:bg-gray-900 h-12'}>
                Join back on the road
            </Button>
        </form>
    );
}

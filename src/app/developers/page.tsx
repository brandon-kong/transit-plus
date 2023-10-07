'use client';

import { TypographyH2, TypographyP } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { useCreateTripModal } from '@/lib/providers/modals/CreateTripModal/context';

export default function DeveloperPage() {
    const { setOpen } = useCreateTripModal();
    
    return (
        <main className={'h-[700px] pt-16 flex flex-col w-full max-h-lg'}>
            <div className="flex p-8 lg:p-20 flex-col h-fit gap-4 max-w-4xl mx-auto w-full ">
                <div className="flex flex-col w-full">
                    <TypographyH2 className="">Are you a Developer?</TypographyH2>

                    <TypographyP>
                        Well, you&apos;re in luck because Transit+ offers an extensive API for developers to use. You
                        can use our API to create your own applications, or even integrate Transit+ into your own
                        application.
                        <br />
                        <br />
                        <Button onClick={() => setOpen(true)}>Get an API Key</Button>
                    </TypographyP>
                </div>
            </div>
        </main>
    );
}

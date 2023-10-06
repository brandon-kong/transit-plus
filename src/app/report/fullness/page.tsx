'use client';

import { TypographyH2 } from '@/components/typography';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useReportSafetyModal } from '@/lib/providers/modals/ReportSafetyModal/context';

export default function ReportFullnessPage() {
    const { setOpen } = useReportSafetyModal();
    return (
        <main className={'h-[700px] pt-16 flex flex-col w-full max-h-lg'}>
            <div className="flex p-8 lg:p-20 flex-col h-fit gap-4 max-w-4xl mx-auto w-full ">
                <div className="flex justify-between w-full">
                    <TypographyH2 className="">Train fullness</TypographyH2>
                    <Button className="w-fit px-6" onClick={() => setOpen(true)}>
                        Report train fullness
                    </Button>
                </div>

                <div></div>
            </div>
        </main>
    );
}

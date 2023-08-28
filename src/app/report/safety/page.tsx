'use client';

import { Button } from '@/components/ui/button'
import { useReportSafetyModal } from '@/lib/providers/modals/ReportSafetyModal/context';

export default function ReportSafetyPage() {
    const { setOpen } = useReportSafetyModal()
    return (
        <main className={'h-[700px] flex flex-col w-full'} >
            <div className="flex p-8 lg:p-32 flex-col h-fit gap-4 xl:gap-20 mx-auto ">
                <Button onClick={() => setOpen(true)}>
                    Create a new report
                </Button>

                <div>

                </div>
            
            </div>
        </main>
    )
}

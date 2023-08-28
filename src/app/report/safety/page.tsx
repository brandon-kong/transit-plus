'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button'
import { useReportSafetyModal } from '@/lib/providers/modals/ReportSafetyModal/context';

export default function ReportSafetyPage() {
    const { setOpen } = useReportSafetyModal()
    return (
        <main className={'h-[700px] flex flex-col w-full'} >
            <div className="flex p-8 lg:p-20 flex-col h-fit gap-4 mx-auto ">
                <Alert variant="destructive" className='bg-red-50'>
                    <AlertTitle>
                        This is not a substitute for emergency services.
                    </AlertTitle>
                    <AlertDescription>
                        If you or someone else is in immediate danger, please call 911.
                    </AlertDescription>
                </Alert>

                <Button className='w-fit px-6' onClick={() => setOpen(true)}>
                    Create a new report
                </Button>

                <div>

                </div>
            
            </div>
        </main>
    )
}

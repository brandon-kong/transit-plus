'use client';

import { TypographyH2 } from '@/components/typography';
import { Button } from '@/components/ui/button'
import { useReportSafetyModal } from '@/lib/providers/modals/ReportSafetyModal/context';
import { useCreateTripModal } from '@/lib/providers/modals/CreateTripModal/context';

export default function PlanTripView() {
    const { setOpen } = useCreateTripModal()
    return (
        <main className={'h-[700px] flex flex-col w-full max-h-lg'} >
            <div className="flex p-8 lg:p-20 flex-col h-fit gap-4 max-w-4xl mx-auto w-full ">
                
                <div className='flex justify-between w-full'>
                    <TypographyH2 className=''>
                        Your trips
                    </TypographyH2>

                    <Button className='w-fit px-6' onClick={() => setOpen(true)}>
                        Create a new trip
                    </Button>
                </div>
                

                <div>

                </div>
            
            </div>
        </main>
    )
}

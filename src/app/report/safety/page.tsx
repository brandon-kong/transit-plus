'use client';

import SafetyConcernCard from '@/components/cards/safety';
import { TypographyH2 } from '@/components/typography';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button'
import { useReportSafetyModal } from '@/lib/providers/modals/ReportSafetyModal/context';
import Link from 'next/link';

export default function ReportSafetyPage() {
    const { setOpen } = useReportSafetyModal()
    return (
        <main className={'h-[700px] pt-16 flex flex-col w-full max-h-lg'} >
            <div className="flex p-8 lg:p-20 flex-col h-fit gap-4 max-w-4xl mx-auto w-full ">
                <Alert variant="destructive" className='bg-red-50'>
                    <AlertTitle>
                        This is not a substitute for emergency services.
                    </AlertTitle>
                    <AlertDescription>
                        If you or someone else is in immediate danger, please call 911. {' '}
                        {/*<Link
                        href={'/'}
                        >
                            <Button variant={'link'} className={'p-0 text-destructive font-semibold'}>
                                Learn more
                            </Button>
                        </Link>
                        */}
                        
                    </AlertDescription>
                </Alert>

                <div className='flex justify-between w-full'>
                    <TypographyH2 className=''>
                        Safety reports
                    </TypographyH2>
                    <Button className='w-fit px-6' onClick={() => setOpen(true)}>
                        Create a new report
                    </Button>
                </div>
                

                <div className={'flex flex-col gap-8'}>
                    <SafetyConcernCard />
                    <SafetyConcernCard />
                    <SafetyConcernCard />
                    <SafetyConcernCard />
                </div>
            
            </div>
        </main>
    )
}

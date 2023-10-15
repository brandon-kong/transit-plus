'use client';

import SafetyConcernCard from '@/components/cards/safety';
import { TypographyH2 } from '@/components/typography';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useReportSafetyModal } from '@/lib/providers/modals/ReportSafetyModal/context';
import Link from 'next/link';

import useSWR from 'swr';
import { fetcherGet } from '@/lib/auth/axios/server';
import { BlackSpinner } from '@/components/spinner';
import { Report } from '@/types/reports/types';


export default function ReportSafetyPage() {
    const { setOpen } = useReportSafetyModal();

    const { data, error, isLoading, mutate } = useSWR('/reports/', fetcherGet);

    const reports = data || [];
    
    return (
        <main className={'h-[700px] pt-16 flex flex-col w-full max-h-lg'}>
            <div className="flex p-8 lg:p-20 flex-col h-fit gap-4 mx-auto w-full">
                <div className={'max-w-3xl w-full mx-auto flex flex-col gap-4'}>
                    <Alert variant="destructive" className="bg-red-50">
                        <AlertTitle>This is not a substitute for emergency services.</AlertTitle>
                        <AlertDescription>
                            If you or someone else is in immediate danger, please call 911.{' '}
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

                    <div className="flex justify-between w-full">
                        <TypographyH2 className="">Safety reports</TypographyH2>
                        <Button className="w-fit px-6" onClick={() => setOpen(true)}>
                            Create a new report
                        </Button>
                    </div>
                </div>
                
                {
                    isLoading ? (
                        <div className={'mx-auto'}>
                            
                            <BlackSpinner />
                        </div>
                    ) : error ? (
                        <></>
                    ) : (
                        <div className={'grid md:grid-cols-2 xl:grid-cols-3 gap-8 w-full'}>
                   
                        {    
                        reports &&
                            reports.map((report: Report) => {
                                return <SafetyConcernCard report={report} key={report.id} />;
                            })
                        }
                   
                        </div>
                        
                    )
                }
            </div>
        </main>
    );
}

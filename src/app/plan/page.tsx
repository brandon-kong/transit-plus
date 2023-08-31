'use client';

import { BlackSpinner } from '@/components/spinner';
import { TypographyH2 } from '@/components/typography';
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card';
import { fetcherGet } from '@/lib/auth/axios/server';
import { useCreateTripModal } from '@/lib/providers/modals/CreateTripModal/context';

import useSWR from 'swr';

export default function PlanTripView() {
    const { data, error, isLoading } = useSWR('/trips/', fetcherGet)

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
                    {
                        isLoading ? (
                            <BlackSpinner />
                        ) : (error ? (
                            <>
                            </>
                        ) : (
                            data && data.detail && data.status_code === 200 && data.detail.map((trip: any) => (
                                <TripCard trip={trip} />
                            ))
                        )
                    )
                    }
                </div>
            
            </div>
        </main>
    )
}

const TripCard = ({ trip }: { trip: any }) => {
    return (
        <Card className={'p-4'}>
            <CardTitle>
                { trip.name }
            </CardTitle>
        </Card>
    )
}
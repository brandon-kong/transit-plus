'use client';

import { BlackSpinner } from '@/components/spinner';
import { TypographyH2, TypographyP } from '@/components/typography';
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card';
import { fetcherGet } from '@/lib/auth/axios/server';
import { useCreateTripModal } from '@/lib/providers/modals/CreateTripModal/context';
import { formatDays } from '@/lib/trips/util/client';
import { TripCreateData } from '@/types/trips/types';

import useSWR from 'swr';

export default function PlanTripView() {
    const { data, error, isLoading } = useSWR('/trips/', fetcherGet, {
        revalidateIfStale: false,
        revalidateOnFocus: false
    })

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
                            data && data.detail && data.status_code === 200 &&  data.detail.map((trip: any) => {
                                
                                return (
                                <TripCard trip={trip} key={trip.id} />
                                )
                            })
                        )
                    )
                    }
                </div>
            
            </div>
        </main>
    )
}

const TripCard = ({ trip }: { trip: TripCreateData }) => {
    return (
        <Card className={'p-4 flex flex-col gap-2'}>
            <CardTitle>
                { trip.name }
            </CardTitle>
            <div className={'flex flex-col'}>
                <TypographyP className={'text-gray-800'}>
                    Repeat: {
                        trip.weeks_to_repeat
                    }
                </TypographyP>
                <TypographyP className={'text-gray-500'}>
                    {
                        formatDays(trip.days)
                    }
                </TypographyP>
            </div>
            
        </Card>
    )
}
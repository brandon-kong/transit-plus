'use client';

import { DeleteButton } from '@/components/input/buttons';
import { BlackSpinner } from '@/components/spinner';
import { TypographyH2, TypographyP } from '@/components/typography';
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card';
import { fetcherGet } from '@/lib/auth/axios/server';
import { useCreateTripModal } from '@/lib/providers/modals/CreateTripModal/context';
import { deleteTrip } from '@/lib/trips/util';
import { formatDays } from '@/lib/trips/util/client';
import { TripCreateData, TripData } from '@/types/trips/types';

import useSWR from 'swr';

export default function PlanTripView() {
    const { data, error, isLoading, mutate } = useSWR('/trips/', fetcherGet)

    const { setOpen } = useCreateTripModal()

    const trips = data ? data.detail.trips : [];

    const handleDelete = async (id: Number) => {
        const filtered = trips.filter((trip: TripData) => trip.id !== id);

        await mutate(deleteTrip(id), {
            optimisticData: {
                detail: {
                    trips: filtered
                },
                status_code: 200
            },
            rollbackOnError: true,
            populateCache: true,
            revalidate: false,
        })
        

    }
    return (
        <main className={'h-[700px] pt-16 flex flex-col w-full max-h-lg'} >
            <div className="flex p-8 lg:p-20 flex-col h-fit gap-4 max-w-4xl mx-auto w-full ">
                
                <div className='flex flex-col w-full'>
                    <TypographyH2 className=''>
                        Are you a Developer?
                    </TypographyH2>

                   <TypographyP>
                        Well, you&apos;re in luck because Transit+ offers an extensive
                        API for developers to use. You can use our API to create your own
                        applications, or even integrate Transit+ into your own application.
                        <br />
                        <br />
                        <Button
                        onClick={() => setOpen(true)}
                        >
                            Get an API Key
                        </Button>
                   </TypographyP>
                </div>
                

                <div>
                    {
                        isLoading ? (
                            <BlackSpinner />
                        ) : (error ? (
                            <>
                            </>
                        ) : (
                            trips && trips.map((trip: any) => {
                                
                                return (
                                <TripCard trip={trip} key={trip.id} handleDelete={handleDelete} />
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

const TripCard = ({ trip, handleDelete }: { 
    trip: TripData, 
    handleDelete: (id: Number) => void;
}) => {
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

            <DeleteButton
            onClick={() => handleDelete(trip.id)}
            />
            
        </Card>
    )
}
import { useState, useEffect, useCallback } from "react";

import { Button } from "@/components/ui/button"

import { TypographyH4, TypographyP } from "@/components/typography"

import { useCreateTripModal } from "@/lib/providers/modals/CreateTripModal/context";
import { DialogFooter } from "@/components/ui/dialog";
import { Input, InputWithLabel, MapSearchOverlay, } from "@/components/input/inputbox";
import { useCreateTripStore } from "@/lib/state/create_trip";
import { ScrollArea } from "@/components/ui/scroll-area";

import { DumpedAddress, TripCreateData } from "@/types/trips/types";
import { Address } from "@/lib/state/report_safety";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLoginModal } from "@/lib/providers/modals/LoginModal/context";
import { BlackSpinner } from "@/components/spinner";
import { createTrip } from "@/lib/trips/util";

export default function CreateTripNameView () {

    const { data: session, status } = useSession()
    const router = useRouter()
    const { setOpen: setLoginModalOpen } = useLoginModal()
    const { setOpen } = useCreateTripModal()

    const setView = useCreateTripStore((state) => state.setView)
        
    const name = useCreateTripStore((state) => state.name)
    const setName = useCreateTripStore((state) => state.setName)

    const startingPoint = useCreateTripStore((state) => state.starting_point)
    const destination = useCreateTripStore((state) => state.destination)

    const typeOfTransportation = useCreateTripStore((state) => state.typeOfTransportation)

    const daysOfWeek = useCreateTripStore((state) => state.daysOfWeek);
    const frequency = useCreateTripStore((state) => state.frequency);

    const setLoading = useCreateTripStore((state) => state.setLoading)
    const clear = useCreateTripStore((state) => state.clear)

    const attemptCreateTrip = async (e: any) => {
        e.preventDefault()

        setLoading(true)

        const newLocation: DumpedAddress[] = []

        // TODO: Fix this, this is a hack

        newLocation.push({
            ...startingPoint,
            address_line_1: startingPoint.address?.address_line1 as string,
            address_line_2: startingPoint.address?.address_line2 as string,
            ...startingPoint.address as Address,
            latitude: startingPoint.lat,
            longitude: startingPoint.lng,
        })

        newLocation.push({
            ...destination,
            address_line_1: destination.address?.address_line1 as string,
            address_line_2: destination.address?.address_line2 as string,
            ...destination.address as Address,
            latitude: destination.lat,
            longitude: destination.lng,
        })

        const data: TripCreateData = {
            name,
            locations: newLocation,
            type_of_transportation: typeOfTransportation,

            days: daysOfWeek,
            weeks_to_repeat: frequency
        }

        const created = await createTrip(data);

        if (created.status_code === 201) {
            setOpen(false)
            clear()
        }

        else {
            // TODO: Handle error
        }


        setLoading(false)
    }

    return (
        <div className="flex flex-col gap-4 mt-4">

            <ScrollArea className="flex-grow max-h-[300px] md:max-h-[500px]">

            <form onSubmit={attemptCreateTrip} className="flex flex-col gap-4 p-4">
                <div className="flex justify-between">
                    <TypographyH4>
                        Finally, give your trip a name
                    </TypographyH4>
                </div>

                    <Input 
                    name="trip_name"
                    placeholder="E.g. My trip to Narnia"
                    value={name}

                    onChange={(e) => setName(e.target.value)}
                    />

                    {
                            status === 'loading' && (
                                <BlackSpinner />
                            )
                        }

                        {
                            status === 'unauthenticated' && (
                        
                                <div className="flex flex-col gap-4">
                                    <TypographyP className="text-sm">
                                        You must be logged in to submit a report. We use this information to help prevent abuse of the system.
                                    </TypographyP>

                                    <Button 
                                    onClick={() => {
                                        router.replace('/plan?redirect=/plan?open')
                                        setLoginModalOpen(true)
                                    }}
                                    className="w-fit px-8">
                                        Login
                                    </Button>
                                </div>
                            )
                        }
                </form>

                
                        
            </ScrollArea>

            <DialogFooter>
                <Button
                variant={'outline'}
                onClick={() => setView('frequency')}
                >
                    Back
                </Button>
                <Button
                disabled={!name || status !== 'authenticated'}
                onClick={attemptCreateTrip}
                >
                    Continue
                </Button>
            </DialogFooter>
            
        </div>
    )
}
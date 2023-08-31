import { useState, useEffect, useCallback } from "react";

import { Button } from "@/components/ui/button"

import { Address, useReportSafetyStore } from "@/lib/state/report_safety"
import { TypographyH4, TypographyP } from "@/components/typography"

import GoogleMapReact, { Coords } from 'google-map-react';
import { DialogFooter } from "@/components/ui/dialog";
import { Input, InputWithLabel, MapSearchOverlay, } from "@/components/input/inputbox";
import { useCreateTripStore } from "@/lib/state/create_trip";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLoginModal } from "@/lib/providers/modals/LoginModal/context";
import { BlackSpinner } from "@/components/spinner";

export default function CreateTripNameView () {

    const { data: session, status } = useSession()
    const router = useRouter()
    const { setOpen: setLoginModalOpen } = useLoginModal()

    const setView = useCreateTripStore((state) => state.setView)
        
    const name = useCreateTripStore((state) => state.name)
    const setName = useCreateTripStore((state) => state.setName)

    const attemptCreateTrip = (e: any) => {
        e.preventDefault()
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
                onClick={() => setView('transportation')}
                >
                    Back
                </Button>
                <Button
                disabled={!name || status !== 'authenticated'}
                onClick={() => setView('destination')}
                >
                    Continue
                </Button>
            </DialogFooter>
            
        </div>
    )
}
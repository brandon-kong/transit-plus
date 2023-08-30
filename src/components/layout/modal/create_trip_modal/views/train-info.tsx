import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button"

import { useCreateTripStore } from "@/lib/state/create_trip";
import { TypeOfIncident, useReportSafetyStore } from "@/lib/state/report_safety"
import { TypographyH4, TypographyP } from "@/components/typography"

import { DialogFooter } from "@/components/ui/dialog";
import { Input, InputWithLabel, } from "@/components/input/inputbox";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scroll } from "lucide-react";
import { Transportation } from "@/lib/state/create_trip";
import Image from "next/image";
import { getClosestStation } from "@/lib/api/subway";
import { Error, Success } from "@/types/response/types";
import { CTATrainLines, CTATrainStation } from "@/types/geometry/types";

type TrainLineTypes = { [key: string]: string }

export const CTATrainLineTypes: TrainLineTypes = {
    'Red Line': 'bg-[#c60c30] text-white',
}

export default function CreateTripTrainInfoView () {

    const setView = useCreateTripStore((state) => state.setView)
    
    const typeOfTransportation = useCreateTripStore((state) => state.typeOfTransportation)
    
    const setLoading = useCreateTripStore((state) => state.setLoading)
    
    const startingPoint = useCreateTripStore((state) => state.starting_point)
    const closestStation = useCreateTripStore((state) => state.closestStation)
    const setClosestStation = useCreateTripStore((state) => state.setClosestStation)

    useEffect(() => {
        if (!closestStation) {
            setLoading(true)
            
            getClosestStation(startingPoint.lat, startingPoint.lng)
            .then((data: Success | Error) => {
                const detail = data.detail as unknown as { closest_stop: CTATrainStation }
                setClosestStation(detail.closest_stop)
            }
            ).catch((error: Error) => {
                console.log(error)
            }
            ).finally(() => {
                setLoading(false)
            })
        }
    }, [closestStation, startingPoint, setClosestStation, setLoading])

    return (
        <div className="flex flex-col gap-4 mt-4">

            <div className="flex justify-between">
                <TypographyH4>
                    Which train station will you be departing from?
                </TypographyH4>
            </div>

            <ScrollArea className="max-h-[300px] md:max-h-[500px] h-full">
                
                <div className="w-full gap-4 p-4 pl-4">
                
                <div className="flex flex-col gap-2">
                    <TypographyP className="text-sm font-semibold text-left w-full">
                        Suggested Station
                    </TypographyP>

                    <div className={`${CTATrainLineTypes[closestStation?.line as string] || 'bg-gray-100'} p-4 w-full flex items-center justify-center rounded-lg`}>
                        { closestStation?.name }
                    </div>
                </div>
                
                    
                </div>
            </ScrollArea>

            <DialogFooter>
                
                <Button 
                onClick={() => setView('transportation')}
                variant={'ghost'}>
                    Back
                </Button>

                <Button
                disabled={!typeOfTransportation}
                onClick={() => setView('destination')}
                >
                    Continue
                </Button>
            </DialogFooter>
            
        </div>
    )
}

const TransportationCard = ({ title, src, onClick, selected }: {
    title: string,
    src: string,
    onClick: () => void,
    selected?: boolean
}) => {
    return (
        <Card className={`flex flex-col w-full items-start justify-start gap-2 p-4 hover:border-black hover:shadow-md transition-all cursor-pointer ${selected && 'border-black ring-1 ring-primary'}`} onClick={onClick}>
            <Image
            src={src}
            alt={title}
            width={30}
            height={30}

            className="select-none"
            />

            <TypographyP className={'text-sm font-semibold text-left w-full'}>
                {title}
            </TypographyP>
        </Card>
    )
}
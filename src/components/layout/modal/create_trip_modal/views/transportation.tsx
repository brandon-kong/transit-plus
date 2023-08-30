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

type IncidentType = {
    title: Transportation,
    src: string
}

export const TransportationTypes: IncidentType[] = [
    {
        title: 'Car',
        src: '/icons/transportation/car.svg'
    },
    {
        title: 'Bus',
        src: '/icons/transportation/bus.svg'
    },
    {
        title: 'CTA Train',
        src: '/icons/transportation/train.svg'
    },
    {
        title: 'Plane',
        src: '/icons/transportation/plane.svg'
    },
    {
        title: 'Bicycle',
        src: '/icons/transportation/bicycle.svg'
    },
    {
        title: 'Walk',
        src: '/icons/transportation/walk.svg'
    },
]

export default function CreateTripTransportationView () {

    const setView = useCreateTripStore((state) => state.setView)
    
    const typeOfTransportation = useCreateTripStore((state) => state.typeOfTransportation)
    const setTypeOfTransportation = useCreateTripStore((state) => state.setTypeOfTransportation)
    
    return (
        <div className="flex flex-col gap-4 mt-4">

            <div className="flex justify-between">
                <TypographyH4>
                    What type of transportation are you taking?
                </TypographyH4>
            </div>

            <ScrollArea className="max-h-[300px] md:max-h-[500px] h-full">
                <div className="w-full grid md:grid-cols-2 gap-4 p-4 pl-4">
                    {
                        TransportationTypes.map((transportation, index) => (
                            <TransportationCard
                            key={index}
                            title={transportation.title}
                            src={transportation.src}
                            onClick={() => setTypeOfTransportation(transportation.title)}
                            selected={typeOfTransportation === transportation.title}
                            />
                        ))
                    }
                </div>
            </ScrollArea>

            <DialogFooter>
                
                <Button 
                onClick={() => setView('destination')}
                variant={'ghost'}>
                    Back
                </Button>

                <Button
                disabled={!typeOfTransportation}
                onClick={() => setView(typeOfTransportation === 'CTA Train' ? 'train-info' : 'date-time')}
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
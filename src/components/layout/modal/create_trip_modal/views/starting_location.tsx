import { useState, useEffect, useCallback } from "react";

import { Button } from "@/components/ui/button"

import { Address, useReportSafetyStore } from "@/lib/state/report_safety"
import { TypographyH4, TypographyP } from "@/components/typography"

import GoogleMapReact, { Coords } from 'google-map-react';
import { DialogFooter } from "@/components/ui/dialog";
import { Input, InputWithLabel, MapSearchOverlay, } from "@/components/input/inputbox";
import { useCreateTripStore } from "@/lib/state/create_trip";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CreateTripStartingPointView () {

    const startingPoint = useCreateTripStore((state) => state.starting_point)
    const setStartingPoint = useCreateTripStore((state) => state.setStartingPoint)
    
    const setView = useCreateTripStore((state) => state.setView)
    const setClosestStation = useCreateTripStore((state) => state.setClosestStation)
    useEffect(() => {
        setClosestStation(undefined)
    }, [startingPoint, setClosestStation])
        
    return (
        <div className="flex flex-col gap-4 mt-4">

            <ScrollArea className="flex-grow max-h-[300px] md:max-h-[500px]">

            <form className="flex flex-col gap-4 p-4">
                <div className="flex justify-between">
                    <TypographyH4>
                        First things first, where are you starting?
                    </TypographyH4>
                </div>
                <div>
                    <MapSearchOverlay 
                    onChange={(placeDetails) => {
                        const address_line_1 = placeDetails.formatted_address
                        const address_line_2 = placeDetails.address_components.find((component: any) => component.types.includes('sublocality'))?.long_name
                        const city = placeDetails.address_components.find((component: any) => component.types.includes('locality'))?.long_name
                        const region = placeDetails.address_components.find((component: any) => component.types.includes('administrative_area_level_1'))?.long_name
                        const postal_code = placeDetails.address_components.find((component: any) => component.types.includes('postal_code'))?.long_name
                        const country = placeDetails.address_components.find((component: any) => component.types.includes('country'))?.long_name

                        setStartingPoint({
                            ...startingPoint,

                            lat: placeDetails.geometry.location.lat(),
                            lng: placeDetails.geometry.location.lng(),
                            address: {
                                address_line1: address_line_1,
                                address_line2: address_line_2,
                                city,
                                region,
                                zip: postal_code,
                                country,
                                completed: true
                            },
                        })
                 
                    }}
                    />
                </div>

                    <Input 
                    name="address_line_1"
                    placeholder="Address Line 1"
                    value={startingPoint.address?.address_line1}

                    onChange={(e) => {
                        setStartingPoint({
                            ...startingPoint,
                            address: {
                                ...startingPoint.address as Address,
                                address_line1: e.target.value,
                            },
                        })
                    }}
                    />

                    <Input 
                    name="address_line_2"
                    placeholder="Address Line 2"
                    value={startingPoint.address?.address_line2}

                    onChange={(e) => {
                        setStartingPoint({
                            ...startingPoint,
                            address: {
                                ...startingPoint.address as Address,
                                address_line2: e.target.value,
                            },
                        })
                    }}
                    />
                    <div
                    className={'flex gap-4'}
                    >
                        <Input
                        name="city"
                        placeholder="City"
                        value={startingPoint.address?.city}

                        onChange={(e) => {
                            setStartingPoint({
                                ...startingPoint,
                                address: {
                                    ...startingPoint.address as Address,
                                    city: e.target.value,
                                },
                            })
                        }}
                        />

                        <Input
                        name="region"
                        placeholder="State/Region/Province"
                        value={startingPoint.address?.region}

                        onChange={(e) => {
                            setStartingPoint({
                                ...startingPoint,
                                address: {
                                    ...startingPoint.address as Address,
                                    region: e.target.value,
                                },
                            })
                        }}
                        />
                    </div>

                    <div
                    className={'flex gap-4'}
                    >
                        <Input
                        name="postal_code"
                        placeholder="Postal Code"
                        value={startingPoint.address?.zip}

                        onChange={(e) => {
                            setStartingPoint({
                                ...startingPoint,
                                address: {
                                    ...startingPoint.address as Address,
                                    zip: e.target.value,
                                },
                            })
                        }}
                        />

                        <Input
                        name="country"
                        placeholder="Country"
                        value={startingPoint.address?.country}

                        onChange={(e) => {
                            setStartingPoint({
                                ...startingPoint,
                                address: {
                                    ...startingPoint.address as Address,
                                    country: e.target.value,
                                },
                            })
                        }}
                        />
                    </div>

                    <InputWithLabel 
                    label="Give this location a name"
                    name="starting-point-name"
                    placeholder="Home, Work, etc."

                    value={startingPoint.name}
                    onChange={(e) => {
                        setStartingPoint({
                            ...startingPoint,
                            name: e.target.value,
                        })
                    }}
                    />
                </form>
            </ScrollArea>
                
            

            <DialogFooter>
                
                <Button
                onClick={() => setView('destination')}
                disabled={!startingPoint.lat || !startingPoint.lng || !startingPoint.name || !startingPoint.address }
                >
                    Continue
                </Button>
            </DialogFooter>
            
        </div>
    )
}
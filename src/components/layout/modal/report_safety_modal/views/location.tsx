import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button"

import { useReportSafetyStore } from "@/lib/state/report_safety"
import { TypographyH4 } from "@/components/typography"

import GoogleMapReact, { Coords } from 'google-map-react';
import { DialogFooter } from "@/components/ui/dialog";
import { Input, MapSearchOverlay } from "@/components/input/inputbox";


export default function ReportSafetyLocationView () {
    const location = useReportSafetyStore((state) => state.location)
    const setLocation = useReportSafetyStore((state) => state.setLocation)

    const center = useState<Coords>({ lat: 0, lng: 0 })
    const [userLocation, setUserLocation] = useState<Coords | undefined>()

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                setLocation({ lat: latitude, lng: longitude })
                setUserLocation({ lat: latitude, lng: longitude })
            })
        }
    }, [setLocation, setUserLocation])

    const handleApiLoaded = (map: any, maps: any) => {
        const triangleCoords = [
          { lat: 42.0733127969170, lng: -87.69083605418916 },
          { lat: 18.466, lng: -66.118 },
          { lat: 32.321, lng: -64.757 },
          { lat: 25.774, lng: -80.19 }
        ];
      
         var bermudaTriangle = new maps.Polygon({
          paths: triangleCoords,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: "#FF0000",
          fillOpacity: 0
        });
        bermudaTriangle.setMap(map);
      }

    return (
        <div className="flex flex-col gap-4 mt-4">

            <TypographyH4>
                Where did this happen?
            </TypographyH4>

            <div
            className="h-96 w-full rounded-xl overflow-hidden relative"
            >
                <GoogleMapReact
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string }}
                defaultCenter={{ lat: location.lat, lng: location.lng }}
                defaultZoom={15}

                center={{
                    lat: location.lat,
                    lng: location.lng
                }}

                onDrag={(e) => {
                    const { lat, lng } = e.center
                    setLocation({ lat, lng })
                }}
                >
                    <UserMarker
                    lat={userLocation?.lat || 41.88}
                    lng={userLocation?.lng || -87.62}
                    />
                </GoogleMapReact>

                <Button
                onClick={() =>{ 
                    setLocation({
                    lat: userLocation?.lat || 41.88,
                    lng: userLocation?.lng || -87.62
                });
            }}
                className="absolute bottom-4 left-4 z-10 pointer-events-auto"
                >
                    Reset Location
                </Button>

                <div className="absolute pointer-events-none top-0 left-0 w-full h-full p-4">
                    <MapSearchOverlay />
                </div>
            </div>

            <DialogFooter>
                
                <Button
                >
                    Continue
                </Button>
            </DialogFooter>
            
        </div>
    )
}

const UserMarker = ({
    lat,
    lng
}: {
    lat: number
    lng: number
}) => {
    return (
        <div 
        className="h-10 w-10 translate-x-[-50%] translate-y-[-50%] relative flex items-center justify-center"
        >
            <div
            className="h-4 w-4 absolute z-20 rounded-full bg-blue-500"
            />

           
             <div
            className="h-8 w-8 z-10 absolute rounded-full bg-blue-300"
            />

            <div
            className="h-10 w-10 absolute animate-ping rounded-full bg-blue-200"
            />
        </div>
    )
}

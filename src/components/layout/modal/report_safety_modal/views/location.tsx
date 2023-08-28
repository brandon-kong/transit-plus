import { useState, useEffect, useCallback } from "react";

import { Button } from "@/components/ui/button"

import { useReportSafetyStore } from "@/lib/state/report_safety"
import { TypographyH4, TypographyP } from "@/components/typography"

import GoogleMapReact, { Coords } from 'google-map-react';
import { DialogFooter } from "@/components/ui/dialog";
import { Input, MapSearchOverlay, } from "@/components/input/inputbox";


export default function ReportSafetyLocationView () {
    const location = useReportSafetyStore((state) => state.location)
    const setLocation = useReportSafetyStore((state) => state.setLocation)

    const [mapPosition, setMapPosition] = useState<Coords>({ lat: 41.88, lng: -87.62 })

    const [userLocation, setUserLocation] = useState<Coords | undefined>()

    const address = useReportSafetyStore((state) => state.address)
    const setAddress = useReportSafetyStore((state) => state.setAddress)

    const [map, setMap] = useState<any>()
    const [maps, setMaps] = useState<any>()

    const [incidentMarker, setIncidentMarker] = useState<any>()

    const [incidentLocation, setIncidentLocation] = useState<Coords | undefined>()
    const [mapOrManual, setMapOrManual] = useState<'map' | 'manual'>('map')
    
    const setView = useReportSafetyStore((state) => state.setView)

    const spawnIncidentMarker = useCallback((maps: any) => {
        if (incidentMarker && incidentLocation) {
            incidentMarker.setMap(null)

            const marker = new maps.Marker({
                position: incidentLocation,
                map: map,
                draggable: true,
            });

            marker.addListener('dragend', (drag: any) => {
                const { lat, lng } = drag.latLng

                setIncidentLocation({ lat: lat(), lng: lng() })
                setLocation({ lat: lat(), lng: lng() })
                setMapPosition({ lat: lat(), lng: lng() })
            })
            marker.setZIndex(10)

            setIncidentMarker(marker)

        }
        else {
            if (location) {
                const marker = new maps.Marker({
                    position: location,
                    map: map,
                    draggable: true,
                    animation: maps.Animation.DROP,
                });

                marker.addListener('dragend', (drag: any) => {
                    const { lat, lng } = drag.latLng

                    setIncidentLocation({ lat: lat(), lng: lng() })
                    setLocation({ lat: lat(), lng: lng() })
                    setMapPosition({ lat: lat(), lng: lng() })
                })

                marker.setZIndex(10)

                setIncidentLocation(location)
                setIncidentMarker(marker)
            }
        }
    }, [setLocation, setMapPosition, location, incidentMarker, setIncidentLocation, setIncidentMarker])

    const handleApiLoaded = (map: any, maps: any) => {
        setMap(map)
        setMaps(maps)

        spawnIncidentMarker(maps)

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

      useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                setMapPosition({ lat: latitude, lng: longitude })
                setUserLocation({ lat: latitude, lng: longitude })
            })
        }

        if (maps) {
            spawnIncidentMarker(maps)
        }

    }, [maps, map, setMapPosition, setUserLocation, incidentLocation])

    return (
        <div className="flex flex-col gap-4 mt-4">

            <div className="flex justify-between">
                <TypographyH4>
                    Where did this happen?
                </TypographyH4>
                
                <Button 
                onClick={() => {
                    if (mapOrManual === 'map') {
                        setMapOrManual('manual')
                    }
                    else {
                        setMapOrManual('map')
                    }
                }}
                variant={'link'} className="underline rounded-md hover:bg-accent">
                    { mapOrManual === 'map' ? 'Manually set address' : 'Use Map' }
                </Button>
            </div>

            {
                mapOrManual === 'manual' ? (
                    <form className="flex flex-col gap-4">
                        
                        <div>
                            <MapSearchOverlay 
                            onChange={(placeDetails) => {
                                const address_line_1 = placeDetails.formatted_address
                                const address_line_2 = placeDetails.address_components.find((component: any) => component.types.includes('sublocality'))?.long_name
                                const city = placeDetails.address_components.find((component: any) => component.types.includes('locality'))?.long_name
                                const region = placeDetails.address_components.find((component: any) => component.types.includes('administrative_area_level_1'))?.long_name
                                const postal_code = placeDetails.address_components.find((component: any) => component.types.includes('postal_code'))?.long_name
                                const country = placeDetails.address_components.find((component: any) => component.types.includes('country'))?.long_name
                            
                                setAddress({
                                    address_line1: address_line_1,
                                    address_line2: address_line_2,
                                    city,
                                    region,
                                    zip: postal_code,
                                    country,
                                    completed: true
                                })

                                setIncidentLocation({
                                    lat: placeDetails.geometry.location.lat(),
                                    lng: placeDetails.geometry.location.lng()
                                })

                                setLocation({
                                    lat: placeDetails.geometry.location.lat(),
                                    lng: placeDetails.geometry.location.lng()
                                })

                                setMapPosition({
                                    lat: placeDetails.geometry.location.lat(),
                                    lng: placeDetails.geometry.location.lng()
                                })

                                setMapOrManual('map')
                                
                            }}
                            />
                        </div>

                        <Input 
                        name="address_line_1"
                        placeholder="Address Line 1"
                        value={address.address_line1}

                        onChange={(e) => {
                            setAddress({
                                ...address,
                                address_line1: e.target.value,
                                completed: true
                            })
                        }}
                        />

                        <Input 
                        name="address_line_2"
                        placeholder="Address Line 2"
                        value={address.address_line2}

                        onChange={(e) => {
                            setAddress({
                                ...address,
                                address_line2: e.target.value,
                                completed: true
                            })
                        }}
                        />
                        <div
                        className={'flex gap-4'}
                        >
                            <Input
                            name="city"
                            placeholder="City"
                            value={address.city}

                            onChange={(e) => {
                                setAddress({
                                    ...address,
                                    city: e.target.value,
                                    completed: true
                                })
                            }}
                            />

                            <Input
                            name="region"
                            placeholder="State/Region/Province"
                            value={address.region}

                            onChange={(e) => {
                                setAddress({
                                    ...address,
                                    region: e.target.value,
                                    completed: true
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
                            value={address.zip}

                            onChange={(e) => {
                                setAddress({
                                    ...address,
                                    zip: e.target.value,
                                    completed: true
                                })
                            }}
                            />

                            <Input
                            name="country"
                            placeholder="Country"
                            value={address.country}

                            onChange={(e) => {
                                setAddress({
                                    ...address,
                                    country: e.target.value,
                                    completed: true
                                })
                            }}
                            />
                        </div>
                        
                    </form>
                ) : (
                    
                    <>
                    {
                incidentMarker && (
                    <TypographyP className="rounded-full bg-green-100 px-4 w-fit">
                        You can drag the marker to adjust the precise location
                    </TypographyP>
                )
                }
            
            

                <div
                className="h-96 w-full rounded-xl overflow-hidden relative"
                >
                    <GoogleMapReact
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                    //bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string }}
                    defaultCenter={{ lat: userLocation?.lat || 41, lng: userLocation?.lng || -87.62 }}
                    defaultZoom={15}

                    options={{
                        streetViewControl: true,
                    }}

                    center={{
                        lat: incidentLocation?.lat || userLocation?.lat || mapPosition.lat || 41.88,
                        lng: incidentLocation?.lng || userLocation?.lng || mapPosition.lng || -87.62
                    }}

                    onDrag={(e) => {
                        const { lat, lng } = e.center
                        setMapPosition({ lat, lng })
                    }}
                    >
                        <UserMarker
                        lat={userLocation?.lat || 41.88}
                        lng={userLocation?.lng || -87.62}
                        />

                    </GoogleMapReact>

                    <Button
                    onClick={() =>{ 
                        setMapPosition({
                        lat: userLocation?.lat || 41.88,
                        lng: userLocation?.lng || -87.62
                    });

                    if (incidentMarker) {
                        incidentMarker.setMap(null);
                    }
                    setIncidentLocation(undefined);
                    setIncidentMarker(undefined);

                    setLocation(undefined)

                    setAddress({
                        address_line1: '',
                        address_line2: '',
                        city: '',
                        region: '',
                        zip: '',
                        country: '',
                        completed: false
                    })
                }}
                    className="absolute bottom-4 left-4 z-10 pointer-events-auto"
                    >
                        Reset
                    </Button>

                    <div className="absolute pointer-events-none top-0 left-0 w-full h-full p-4 pr-16">
                        <MapSearchOverlay 
                        onChange={(placeDetails) => {
                            const { lat, lng } = placeDetails.geometry.location

                            const address_line_1 = placeDetails.formatted_address
                            const address_line_2 = placeDetails.address_components.find((component: any) => component.types.includes('sublocality'))?.long_name
                            const city = placeDetails.address_components.find((component: any) => component.types.includes('locality'))?.long_name
                            const region = placeDetails.address_components.find((component: any) => component.types.includes('administrative_area_level_1'))?.long_name
                            const postal_code = placeDetails.address_components.find((component: any) => component.types.includes('postal_code'))?.long_name
                            const country = placeDetails.address_components.find((component: any) => component.types.includes('country'))?.long_name
                        
                            setAddress({
                                address_line1: address_line_1,
                                address_line2: address_line_2,
                                city,
                                region,
                                zip: postal_code,
                                country,
                                completed: true
                            })

                            const latAsNumber = Number(lat())
                            const lngAsNumber = Number(lng())

                            setIncidentLocation({ lat:latAsNumber, lng: lngAsNumber })
                            setLocation({ lat:latAsNumber, lng: lngAsNumber })
                            setMapPosition({ lat:latAsNumber, lng: lngAsNumber })
                        }}
                        />
                    </div>
                </div>

                </>
            )}
            

            <DialogFooter>
                
                <Button
                onClick={() => setView('date-time')}
                disabled={!address.completed}
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
        className="h-10 w-10 translate-x-[-50%] translate-y-[-50%] relative flex items-center justify-center -z-"
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
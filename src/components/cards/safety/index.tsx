import { TypographyH2, TypographyH3, TypographyH4, TypographyP } from '@/components/typography';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import GoogleMapReact from 'google-map-react';

export default function SafetyConcernCard() {
    return (
        <Card className={'flex flex-col gap-4 h-fit'}>
            <map className={'w-full h-[300px] rounded-t-lg overflow-hidden'}>
                <GoogleMapReact
                    yesIWantToUseGoogleMapApiInternals
                    //onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                    bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string }}
                    defaultCenter={{ lat: 41, lng: -87.62 }}
                    defaultZoom={15}
                    options={{
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                        zoomControl: true,
                        panControl: false,
                        scrollwheel: false,
                        draggable: false,
                    }}
                    center={{
                        lat: 41.88,
                        lng: -87.62,
                    }}
                ></GoogleMapReact>
            </map>

            <div className={'p-4 flex flex-col gap-4'}>
                {/*<Alert className={'bg-red-100'} variant={'destructive'}>
                        <AlertTitle>
                            This safety concern is on or near your route
                        </AlertTitle>
                        <AlertDescription>
                            Please be careful and avoid this area if possible.
                        </AlertDescription>
                    </Alert>
                    */}
                <TypographyP className={'text-destructive text-sm'}>
                    This safety concern is on or near your route. Please be careful and avoid this area if possible.
                </TypographyP>
                <div>
                    <TypographyH2>Robbery at 1234 Main St</TypographyH2>
                    <TypographyP>2 hours ago • 1.2 miles away</TypographyP>
                </div>

                <div className={'flex flex-col gap-2'}>
                    <TypographyH4>Risk level</TypographyH4>
                    <div className="flex w-full">
                        <Button
                            className={`w-full cursor-default rounded-r-none bg-gray-200 hover:bg-gray-200 transition-all text-black `}
                        >
                            Low
                        </Button>
                        <Button
                            className={`w-full cursor-default rounded-none bg-gray-200 hover:bg-gray-200 transition-all text-black `}
                        >
                            Medium
                        </Button>
                        <Button
                            className={`w-full cursor-default rounded-l-none bg-gray-200 hover:bg-gray-200 transition-all  text-black ${'ring-2 ring-black z-10 text-white bg-red-600 hover:bg-red-600'}`}
                        >
                            High
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

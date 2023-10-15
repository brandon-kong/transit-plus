import { TypographyH2, TypographyH3, TypographyH4, TypographyP } from '@/components/typography';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { convertDateToTimeAgo } from '@/lib/reports/util/client';
import type { Report } from '@/types/reports/types';
import GoogleMapReact from 'google-map-react';

export default function SafetyConcernCard({ report }: { report: Report }) {
    return (
        <Card className={'flex flex-col gap-4 h-full border-black'}>
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

            <div className={'px-12 pb-8 flex flex-col gap-4'}>
                <TypographyP className={'text-destructive text-sm'}>
                    This safety concern is on or near your route. Please be careful and avoid this area if possible.
                </TypographyP>
                <div>
                    <TypographyH3>{report.title}</TypographyH3>
                    <TypographyP>{convertDateToTimeAgo(report.date_of_incident)} • 1.2 miles away</TypographyP>
                </div>

                <div className={'flex flex-col gap-2'}>
                    <TypographyH4>Risk level</TypographyH4>
                    <div className="flex w-full z-0">
                        <Button
                            className={`w-full cursor-default rounded-r-none bg-gray-200 hover:bg-gray-200 transition-all text-black ${
                                report.severity === 'Low'
                                    ? 'bg-yellow-500 hover:bg-yellow-500 text-black'
                                    : 'text-black bg-gray-200 hover:bg-gray-200'
                            }`}
                        >
                            Low
                        </Button>
                        <Button
                            className={`w-full cursor-default rounded-none bg-gray-200 hover:bg-gray-200 transition-all text-black ${
                                report.severity === 'Medium'
                                    ? 'bg-orange-500 hover:bg-orange-500 text-white'
                                    : 'text-black bg-gray-200 hover:bg-gray-200'
                            }`}
                        >
                            Medium
                        </Button>
                        <Button
                            className={`w-full cursor-default rounded-l-none transition-all ${
                                report.severity === 'High'
                                    ? 'bg-red-500 hover:bg-red-500 text-white'
                                    : 'text-black bg-gray-200 hover:bg-gray-200'
                            }}`}
                        >
                            High
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

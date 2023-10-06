'use client';

import { Map } from '@/components/input/maps';
import { getRedLineTrains } from '@/lib/api/cta';
import { useState, useEffect } from 'react';

import { useSearchParams, useRouter } from 'next/navigation';

import { useTrackMapStore } from '@/lib/state/track_map';

/*
<train>
    <rn>824</rn>
    <destSt>30173</destSt>
    <destNm>Howard</destNm>
    <trDr>1</trDr>
    <nextStaId>40990</nextStaId>
    <nextStpId>30191</nextStpId>
    <nextStaNm>69th</nextStaNm>
    <prdt>20230908 21:56:08</prdt>
    <arrT>20230908 21:58:08</arrT>
    <isApp>0</isApp>
    <isDly>0</isDly>
    <flags/>
    <lat>41.75042</lat>
    <lon>-87.62518</lon>
    <heading>359</heading>
</train>
*/

export default function TrackRoute() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [redLines, setRedLines] = useState([]);

    useEffect(() => {
        getRedLineTrains().then((res: any) => {
            setRedLines(res.ctatt.route[0].train);
        });
    });

    const splat = searchParams.get('lat');
    const splng = searchParams.get('lng');
    const spzoom = searchParams.get('zoom');

    return (
        <div className={'w-full h-screen -z-10 absolute top-0 left-0'}>
            <Map
                yesIWantToUseGoogleMapApiInternals
                defaultZoom={15}
                defaultCenter={{
                    lat: 41.48,
                    lng: -87.4,
                }}
                style={{
                    zIndex: '-10',
                }}
            >
                {redLines.map((train: any, index) => {
                    return <RedLineMarker key={index} lat={train.lat} lng={train.lon} />;
                })}
            </Map>
        </div>
    );
}

const RedLineMarker = ({ lat, lng }: { lat: number; lng: number }) => {
    return (
        <div className="h-10 w-10 translate-x-[-50%] translate-y-[-50%] relative flex items-center justify-center -z-">
            <div className="h-4 w-4 absolute z-20 rounded-full bg-red-500" />

            <div className="h-8 w-8 z-10 absolute rounded-full bg-red-300" />

            <div className="h-10 w-10 absolute animate-ping rounded-full bg-red-200" />
        </div>
    );
};

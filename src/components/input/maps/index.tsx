'use client';

import GoogleMapReact from "google-map-react";

export const Map = (props: any) => {
    return <GoogleMapReact
    bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string }}
    defaultCenter={{ lat: 41, lng: -87.62 }}
    defaultZoom={15}

    options={{
        streetViewControl: true,
    }}

    center={{
        lat: 41.88,
        lng: -87.62
    }}
   >
    </GoogleMapReact>
}
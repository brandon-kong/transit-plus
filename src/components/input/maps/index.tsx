'use client';

import GoogleMapReact, { Props } from 'google-map-react';

export const Map = ({ children, ...rest }: { children: React.ReactNode } & Props) => {
    return (
        <GoogleMapReact
            yesIWantToUseGoogleMapApiInternals
            bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string }}
            defaultCenter={{ lat: 41, lng: -87.62 }}
            defaultZoom={15}
            center={{
                lat: 41.88,
                lng: -87.62,
            }}
            {...rest}
        >
            {children}
        </GoogleMapReact>
    );
};

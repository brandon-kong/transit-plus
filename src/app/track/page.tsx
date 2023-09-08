import { Map } from "@/components/input/maps"

export default function TrackRoute() {
    return (
        <div className={'w-full h-screen -z-10 absolute top-0 left-0'}>
            <Map 
            yesIWantToUseGoogleMapApiInternals
            defaultZoom={15}
            defaultCenter={{
                lat: -41.2,
                lng: 87.2
            }}
            style={{
                width: '100%',
                zIndex: '-10'
            }}
            />
        </div>
    )
}
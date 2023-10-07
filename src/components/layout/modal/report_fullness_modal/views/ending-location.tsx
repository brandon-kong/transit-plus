import { Button } from '@/components/ui/button';

import { TypographyH4 } from '@/components/typography';

import { DialogFooter } from '@/components/ui/dialog';
import { Input, InputWithLabel, MapSearchOverlay } from '@/components/input/inputbox';
import { useCreateTripStore } from '@/lib/state/create_trip';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Address } from '@/lib/state/report_safety';

export default function CreateTripEndingPointView() {
    const destination = useCreateTripStore(state => state.destination);
    const setDestination = useCreateTripStore(state => state.setDestination);

    const setView = useCreateTripStore(state => state.setView);

    return (
        <div className="flex flex-col gap-4 mt-4">
            <ScrollArea className="flex-grow max-h-[300px] md:max-h-[500px]">
                <form className="flex flex-col gap-4 p-4">
                    <div className="flex justify-between">
                        <TypographyH4>What&apos;s the destination?</TypographyH4>
                    </div>

                    <InputWithLabel
                        label="Give this location a name"
                        name="starting-point-name"
                        placeholder="Home, Work, etc."
                        value={destination.name}
                        onChange={e => {
                            setDestination({
                                ...destination,
                                name: e.target.value,
                            });
                        }}
                    />
                    <div>
                        <MapSearchOverlay
                            onChange={placeDetails => {
                                const address_line_1 = placeDetails.formatted_address;
                                const address_line_2 = placeDetails.address_components.find((component: any) =>
                                    component.types.includes('sublocality'),
                                )?.long_name;
                                const city = placeDetails.address_components.find((component: any) =>
                                    component.types.includes('locality'),
                                )?.long_name;
                                const region = placeDetails.address_components.find((component: any) =>
                                    component.types.includes('administrative_area_level_1'),
                                )?.long_name;
                                const postal_code = placeDetails.address_components.find((component: any) =>
                                    component.types.includes('postal_code'),
                                )?.long_name;
                                const country = placeDetails.address_components.find((component: any) =>
                                    component.types.includes('country'),
                                )?.long_name;

                                setDestination({
                                    ...destination,

                                    lat: placeDetails.geometry.location.lat(),
                                    lng: placeDetails.geometry.location.lng(),
                                    address: {
                                        address_line1: address_line_1,
                                        address_line2: address_line_2,
                                        city,
                                        region,
                                        zip: postal_code,
                                        country,
                                        completed: true,
                                    },
                                });
                            }}
                        />
                    </div>

                    <Input
                        name="address_line_1"
                        placeholder="Address Line 1"
                        value={destination.address?.address_line1}
                        onChange={e => {
                            setDestination({
                                ...destination,
                                address: {
                                    ...(destination.address as Address),
                                    address_line1: e.target.value,
                                },
                            });
                        }}
                    />

                    <Input
                        name="address_line_2"
                        placeholder="Address Line 2"
                        value={destination.address?.address_line2}
                        onChange={e => {
                            setDestination({
                                ...destination,
                                address: {
                                    ...(destination.address as Address),
                                    address_line2: e.target.value,
                                },
                            });
                        }}
                    />
                    <div className={'flex gap-4'}>
                        <Input
                            name="city"
                            placeholder="City"
                            value={destination.address?.city}
                            onChange={e => {
                                setDestination({
                                    ...destination,
                                    address: {
                                        ...(destination.address as Address),
                                        city: e.target.value,
                                    },
                                });
                            }}
                        />

                        <Input
                            name="region"
                            placeholder="State/Region/Province"
                            value={destination.address?.region}
                            onChange={e => {
                                setDestination({
                                    ...destination,
                                    address: {
                                        ...(destination.address as Address),
                                        region: e.target.value,
                                    },
                                });
                            }}
                        />
                    </div>

                    <div className={'flex gap-4'}>
                        <Input
                            name="postal_code"
                            placeholder="Postal Code"
                            value={destination.address?.zip}
                            onChange={e => {
                                setDestination({
                                    ...destination,
                                    address: {
                                        ...(destination.address as Address),
                                        zip: e.target.value,
                                    },
                                });
                            }}
                        />

                        <Input
                            name="country"
                            placeholder="Country"
                            value={destination.address?.country}
                            onChange={e => {
                                setDestination({
                                    ...destination,
                                    address: {
                                        ...(destination.address as Address),
                                        country: e.target.value,
                                    },
                                });
                            }}
                        />
                    </div>
                </form>
            </ScrollArea>

            <DialogFooter>
                <Button variant={'outline'} onClick={() => setView('starting-point')}>
                    Back
                </Button>

                <Button
                    onClick={() => setView('transportation')}
                    disabled={!destination.lat || !destination.lng || !destination.name || !destination.address}
                >
                    Continue
                </Button>
            </DialogFooter>
        </div>
    );
}

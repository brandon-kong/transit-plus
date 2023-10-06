import { Button } from '@/components/ui/button';

import { DaysOfWeek, Frequency, useCreateTripStore } from '@/lib/state/create_trip';
import { TypographyH4, TypographyP } from '@/components/typography';

import { DialogFooter } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Transportation } from '@/lib/state/create_trip';
import Image from 'next/image';
import { Select, SelectItem, SelectValue, SelectContent, SelectTrigger } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { InputWithLabel } from '@/components/input/inputbox';

type IncidentType = {
    title: Transportation;
    src: string;
};

export const DaysOfWeekFrequency = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const FrequencyList = ['Never', 'Weekly', 'Biweekly', 'Monthly', 'Bimonthly'];

export default function CreateTripFrequencyView() {
    const setView = useCreateTripStore(state => state.setView);

    const typeOfTransportation = useCreateTripStore(state => state.typeOfTransportation);
    const daysOfWeek = useCreateTripStore(state => state.daysOfWeek);
    const setDaysOfWeek = useCreateTripStore(state => state.setDaysOfWeek);
    const frequency = useCreateTripStore(state => state.frequency);
    const setFrequency = useCreateTripStore(state => state.setFrequency);

    const departure = useCreateTripStore(state => state.departure);
    const setDeparture = useCreateTripStore(state => state.setDeparture);

    return (
        <div className="flex flex-col gap-4 mt-4">
            <ScrollArea className="flex flex-col gap-4 max-h-[300px]  md:max-h-[600px] h-full">
                <div className="flex flex-col gap-2 p-4">
                    <TypographyH4>What days will you be taking this trip?</TypographyH4>

                    <div className="w-full grid md:grid-cols-2 gap-4 p-4 pl-4">
                        {DaysOfWeekFrequency.map((day, index) => (
                            <DayCard
                                key={index}
                                day={day}
                                onClick={() => {
                                    if (daysOfWeek.includes(day as DaysOfWeek)) {
                                        // take it out
                                        setDaysOfWeek(daysOfWeek.filter((el: string) => el !== day));
                                    } else {
                                        // add it
                                        setDaysOfWeek([...daysOfWeek, day as DaysOfWeek]);
                                    }
                                }}
                                selected={daysOfWeek.includes(day as DaysOfWeek)}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-6 mt-4 p-4">
                    <TypographyH4>How frequently will you repeat this trip?</TypographyH4>
                    <Select value={frequency} onValueChange={e => setFrequency(e as Frequency)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Weekly" defaultValue={'Weekly'} />
                        </SelectTrigger>
                        <SelectContent>
                            {FrequencyList.map((day, index) => (
                                <SelectItem value={day} key={index}>
                                    {day}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-6 mt-4 p-4">
                    <TypographyH4>When will you depart?</TypographyH4>
                    <InputWithLabel
                        value={departure}
                        onChange={e => setDeparture(e.target.value)}
                        label="Departure Time"
                        placeholder="Departure"
                        type="time"
                    />
                </div>
            </ScrollArea>

            <DialogFooter>
                <Button onClick={() => setView('transportation')} variant={'ghost'}>
                    Back
                </Button>

                <Button disabled={daysOfWeek.length === 0} onClick={() => setView('name')}>
                    Continue
                </Button>
            </DialogFooter>
        </div>
    );
}

const DayCard = ({ day, onClick, selected }: { day: string; onClick: () => void; selected?: boolean }) => {
    return (
        <Card
            className={`flex flex-col w-full items-start justify-start gap-2 p-4 hover:border-black hover:shadow-md transition-all cursor-pointer ${
                selected && 'border-black ring-1 ring-primary'
            }`}
            onClick={onClick}
        >
            <TypographyP className={'text-sm font-semibold text-left w-full'}>{day}</TypographyP>
        </Card>
    );
};

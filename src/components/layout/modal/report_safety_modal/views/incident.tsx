import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';

import { TypeOfIncident, useReportSafetyStore } from '@/lib/state/report_safety';
import { TypographyH4, TypographyP } from '@/components/typography';

import { DialogFooter } from '@/components/ui/dialog';
import { Input, InputWithLabel } from '@/components/input/inputbox';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Scroll } from 'lucide-react';

type IncidentType = {
    title: TypeOfIncident;
    description: string;
};

export const IncidentTypes: IncidentType[] = [
    {
        title: 'Harassment / Inappropriate Behaviour',
        description:
            'This includes verbal or physical harassment, sexual harassment, or any other inappropriate behaviour.',
    },
    {
        title: 'Suspicious activity / Unattended Baggage',
        description: 'This includes suspicious activity, unattended baggage, or any other suspicious behaviour.',
    },
    {
        title: 'Vandalism / Damages',
        description: 'This includes vandalism, damages, or any other damage to property.',
    },
    {
        title: 'Health / Medical Emergency',
        description: 'This includes health or medical emergencies, or any other medical emergency.',
    },
    {
        title: 'Safety Hazard / Dangerous Situation',
        description:
            'This includes safety hazards and dangerous situations. Examples include: slippery floors, broken glass, or any other dangerous situation.',
    },
    {
        title: 'Other',
        description: 'This includes any other incident that does not fit into the above categories.',
    },
];

export default function ReportSafetyIncidentView() {
    const setView = useReportSafetyStore(state => state.setView);

    const typeOfIncident = useReportSafetyStore(state => state.typeOfIncident);
    const setTypeOfIncident = useReportSafetyStore(state => state.setTypeOfIncident);
    const incidentIfOther = useReportSafetyStore(state => state.incidentIfOther);
    const setIncidentIfOther = useReportSafetyStore(state => state.setIncidentIfOther);

    return (
        <div className="flex flex-col gap-4 mt-4">
            <div className="flex justify-between">
                <TypographyH4>What type of incident did you witness?</TypographyH4>
            </div>

            <ScrollArea className="max-h-[300px] md:max-h-[500px] h-full">
                <div className="w-full grid md:grid-cols-2 gap-4 p-4 pl-4">
                    {IncidentTypes.map((incident, index) => (
                        <IncidentCard
                            key={index}
                            title={incident.title}
                            description={incident.description}
                            onClick={() => setTypeOfIncident(incident.title)}
                            selected={typeOfIncident === incident.title}
                        />
                    ))}
                </div>
            </ScrollArea>

            {typeOfIncident === 'Other' && (
                <InputWithLabel
                    value={incidentIfOther}
                    onChange={e => setIncidentIfOther(e.target.value)}
                    label={'Please specify'}
                    placeholder={'Please specify'}
                />
            )}

            <DialogFooter>
                <Button onClick={() => setView('date-time')} variant={'ghost'}>
                    Back
                </Button>

                <Button
                    disabled={!typeOfIncident || (typeOfIncident === 'Other' && !incidentIfOther)}
                    onClick={() => setView('severity')}
                >
                    Continue
                </Button>
            </DialogFooter>
        </div>
    );
}

const IncidentCard = ({
    title,
    description,
    onClick,
    selected,
}: {
    title: string;
    description: string;
    onClick: () => void;
    selected?: boolean;
}) => {
    return (
        <Card
            className={`flex flex-col w-full items-start justify-start gap-2 p-4 hover:border-black hover:shadow-md transition-all cursor-pointer ${
                selected && 'border-black ring-1 ring-primary'
            }`}
            onClick={onClick}
        >
            <TypographyP className={'text-sm text-left w-full'}>{title}</TypographyP>
            <TypographyP className={'text-xs text-gray-500 text-left w-full'}>{description}</TypographyP>
        </Card>
    );
};

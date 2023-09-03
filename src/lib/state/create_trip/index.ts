import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { CTATrainStation, GeometryPointWithAddress } from '@/types/geometry/types';
import { Address } from '@/types/trips/types';

export type DaysOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
export type Frequency = 'Never' | 'Weekly' | 'Biweekly' | 'Monthly' | 'Bimonthly'
export type View = 'starting-point' | 'destination' | 'date-time' | 'transportation' | 'train-info' | 'name' | 'frequency'
export type Transportation = 'Car' | 'Bus' | 'CTA Train' | 'Bicycle' | 'Walk'  | 'Boat' | 'Plane'

const initial = (set: any) => ({
    loading: false,
    setLoading: (loading: boolean) => set({ loading }),

    view: 'starting-point' as View,
    setView: (view: View) => set({ view }),

    starting_point: {
        name: '',
        is_start: true,
        lat: 41.8781,
        lng: -87.6298,
    },
    
    setStartingPoint: (starting_point: Address) => set({ starting_point }),

    setClosestStation: (closestStation?: CTATrainStation) => set({ closestStation }),
    
    destination: {
        name: '',
        is_start: false,
        lat: 41.8781,
        lng: -87.6298,
    },
    setDestination: (destination: Address) => set({ destination }),

    typeOfTransportation: 'Car' as Transportation,
    setTypeOfTransportation: (typeOfTransportation: Transportation) => set({ typeOfTransportation }),

    name : '',
    setName: (name: string) => set({ name }),

    daysOfWeek: [],
    setDaysOfWeek: (daysOfWeek: DaysOfWeek[]) => set({ daysOfWeek }),

    frequency: 'Never' as Frequency,
    setFrequency: (frequency: Frequency) => set({ frequency }),

    clear: () => set(initial(set))
});

export const useCreateTripStore = create( 
    persist<CreateTripState>
    (
        (set) => (initial(set)),
        {
            name: 'transit+-last-create-trip',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);

export interface CreateTripState {
    loading: boolean;
    setLoading: (loading: boolean) => void;

    view: View;
    setView: (view: View) => void;

    closestStation?: CTATrainStation

    setClosestStation: (closestStation?: CTATrainStation) => void;

    starting_point: Address;
    setStartingPoint: (starting_point: Address) => void;

    destination: Address
    setDestination: (starting_point: Address) => void;

    typeOfTransportation: Transportation;
    setTypeOfTransportation: (typeOfTransportation: Transportation) => void;

    name: string;
    setName: (name: string) => void;

    daysOfWeek: DaysOfWeek[];
    setDaysOfWeek: (days: DaysOfWeek[]) => void;

    frequency: Frequency;
    setFrequency: (frequency: Frequency) => void;

    clear: () => void;
}
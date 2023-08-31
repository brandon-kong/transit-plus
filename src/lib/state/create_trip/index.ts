import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { CTATrainStation, GeometryPointWithAddress } from '@/types/geometry/types';

export type View = 'starting-point' | 'destination' | 'date-time' | 'transportation' | 'train-info' | 'name'
export type Transportation = 'Car' | 'Bus' | 'CTA Train' | 'Bicycle' | 'Walk'  | 'Boat' | 'Plane'

const initial = (set: any) => ({
    loading: false,
    setLoading: (loading: boolean) => set({ loading }),

    view: 'starting-point' as View,
    setView: (view: View) => set({ view }),

    starting_point: {
        name: '',
        lat: 41.8781,
        lng: -87.6298,
    },
    
    setStartingPoint: (starting_point: GeometryPointWithAddress) => set({ starting_point }),

    setClosestStation: (closestStation?: CTATrainStation) => set({ closestStation }),
    
    destination: {
        name: '',
        lat: 41.8781,
        lng: -87.6298,
    },
    setDestination: (destination: GeometryPointWithAddress) => set({ destination }),

    typeOfTransportation: 'Car' as Transportation,
    setTypeOfTransportation: (typeOfTransportation: Transportation) => set({ typeOfTransportation }),

    name : '',
    setName: (name: string) => set({ name }),
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

    starting_point: GeometryPointWithAddress;
    setStartingPoint: (starting_point: GeometryPointWithAddress) => void;

    destination: GeometryPointWithAddress
    setDestination: (starting_point: GeometryPointWithAddress) => void;

    typeOfTransportation: Transportation;
    setTypeOfTransportation: (typeOfTransportation: Transportation) => void;

    name: string;
    setName: (name: string) => void;
}
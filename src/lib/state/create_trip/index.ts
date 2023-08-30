import { create } from 'zustand';
import { Address } from '../report_safety';
import { CTATrainLines, CTATrainStation, GeometryPointWithAddress } from '@/types/geometry/types';

export type View = 'starting-point' | 'destination' | 'date-time' | 'transportation' | 'train-info'
export type Transportation = 'Car' | 'Bus' | 'CTA Train' | 'Bicycle' | 'Walk'  | 'Boat' | 'Plane'

export const useCreateTripStore = create<CreateTripState>((set) => ({
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

    setClosestStation: (closestStation: CTATrainStation) => set({ closestStation }),
    
    destination: {
        name: '',
        lat: 41.8781,
        lng: -87.6298,
    },
    setDestination: (destination: GeometryPointWithAddress) => set({ destination }),

    typeOfTransportation: 'Car' as Transportation,
    setTypeOfTransportation: (typeOfTransportation: Transportation) => set({ typeOfTransportation }),

}));

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
}
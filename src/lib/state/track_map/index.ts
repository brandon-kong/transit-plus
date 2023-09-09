import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const initial = (set: any) => ({
    zoom: 15,

    setLat: (lat: number) => set({ lat }),
    setLng: (lng: number) => set({ lng }),
    setZoom: (zoom: number) => set({ zoom }),

    clear: () => set(initial(set))
});

export const useTrackMapStore = create( 
    persist<TrackMapState>
    (
        (set) => (initial(set)),
        {
            name: 'transit+-track-map',
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export interface TrackMapState {
    lat?: number;
    setLat: (lat: number) => void;

    lng?: number;
    setLng: (lng: number) => void;

    zoom: number;
    setZoom: (zoom: number) => void;

    clear: () => void;
}
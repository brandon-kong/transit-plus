import { create } from 'zustand';

export type View = 'location'

export const useReportSafetyStore = create<ReportSafetyStore>((set) => ({
    loading: false,
    setLoading: (loading: boolean) => set({ loading }),

    view: 'location' as View,
    setView: (view: View) => set({ view }),

    title: '',
    setTitle: (title: string) => set({ title }),

    description: '',
    setDescription: (description: string) => set({ description }),

    location: {
        lat: 41.88,
        lng: -87.62
    },
    setLocation: (location: { lat: number, lng: number }) => set({ location })
}));

export interface ReportSafetyStore {
    loading: boolean;
    setLoading: (loading: boolean) => void;

    view: View;
    setView: (view: View) => void;

    title: string;
    setTitle: (title: string) => void;

    description: string;
    setDescription: (description: string) => void;

    location: {
        lat: number;
        lng: number;
    }
    setLocation: (location: { lat: number, lng: number }) => void;
}
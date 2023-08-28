import { create } from 'zustand';

export type View = 'location' | 'date-time'

export type Address = {
    address_line1: string;
    address_line2: string;
    city: string;
    region: string;
    zip: string;
    country: string;
    completed: boolean;
}

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

    address: {
        address_line1: '',
        address_line2: '',
        city: '',
        region: '',
        zip: '',
        country: '',
        completed: false
    },

    setAddress: (address: Address) => set({ address }),

    setLocation: (location: { lat: number, lng: number }) => set({ location }),

    date: new Date(),
    setDate: (date: Date) => set({ date }),

    time: new Date(),
    setTime: (time: Date) => set({ time })
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

    address: Address
    setAddress: (address: Address) => void;

    setLocation: (location: { lat: number, lng: number }) => void;

    date: Date;
    setDate: (date: Date) => void;

    time: Date;
    setTime: (time: Date) => void;
}
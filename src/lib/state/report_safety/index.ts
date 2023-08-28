import { create } from 'zustand';

export type View = 'location' | 'date-time' | 'incident' | 'severity'
export type TypeOfIncident = 'Harassment / Inappropriate Behaviour' | 'Suspicious activity / Unattended Baggage' | 'Vandalism / Damages' | 'Health / Medical Emergency' | 'Safety Hazard / Dangerous Situation' | 'Other';
export type Severity = 'Low' | 'Medium' | 'High';

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

    setLocation: (location: { lat: number, lng: number } | undefined) => set({ location }),

    date: new Date(),
    setDate: (date?: Date) => set({ date }),
    time: undefined,
    setTime: (time?: string) => set({ time }),

    typeOfIncidet: undefined,
    setTypeOfIncident: (typeOfIncident?: TypeOfIncident) => set({ typeOfIncident }),
    incidentIfOther: undefined,
    setIncidentIfOther: (incidentIfOther?: string) => set({ incidentIfOther }),

    setSeverity: (severity?: Severity) => set({ severity }),
    additional_info: '',
    setAdditionalInfo: (additional_info?: string) => set({ additional_info })
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

    location?: {
        lat: number;
        lng: number;
    }

    address: Address
    setAddress: (address: Address) => void;

    setLocation: (location: { lat: number, lng: number } | undefined) => void;

    date?: Date;
    setDate: (date?: Date) => void;

    time?: string;
    setTime: (time?: string) => void;

    typeOfIncident?: TypeOfIncident;
    setTypeOfIncident: (typeOfIncident?: TypeOfIncident) => void;
    incidentIfOther?: string;
    setIncidentIfOther: (incidentIfOther?: string) => void;

    severity?: Severity;
    setSeverity: (severity?: Severity) => void;

    additional_info?: string;
    setAdditionalInfo: (additional_info?: string) => void;
}
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type View = 'location' | 'date-time' | 'incident' | 'severity' | 'review'
export type TypeOfIncident = 'Harassment / Inappropriate Behaviour' | 'Suspicious activity / Unattended Baggage' | 'Vandalism / Damages' | 'Health / Medical Emergency' | 'Safety Hazard / Dangerous Situation' | 'Other';
export type Severity = 'Low' | 'Medium' | 'High';

export type NewFile = {
    url: string;
    name: string;
}

export type Address = {
    address_line1: string;
    address_line2: string;
    city: string;
    region: string;
    zip: string;
    country: string;
    completed: boolean;
}

const initial = (set: any) => ({
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

  date: new Date().toISOString().split('T')[0],
  setDate: (date?: string) => set({ date }),
  time: undefined,
  setTime: (time?: string) => set({ time }),

  typeOfIncidet: undefined,
  setTypeOfIncident: (typeOfIncident?: TypeOfIncident) => set({ typeOfIncident }),
  incidentIfOther: undefined,
  setIncidentIfOther: (incidentIfOther?: string) => set({ incidentIfOther }),

  setSeverity: (severity?: Severity) => set({ severity }),
  additional_info: '',
  setAdditionalInfo: (additional_info?: string) => set({ additional_info }),

  files: [],
  setFiles: (files?: NewFile[]) => set({ files }),

  confirmed: false,
  setConfirmed: (confirmed: boolean) => set({ confirmed }),

  clear: () => set(initial(set), true)
})

export const useReportSafetyStore = create(
    persist<ReportSafetyStore>(
      (set) => (initial(set)),
      {
        name: 'transit+-last-report-safety', // name of the item in the storage (must be unique)
      }
    )
  )

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

    date?: string;
    setDate: (date?: string) => void;

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

    files: NewFile[];
    setFiles: (files?: NewFile[]) => void;

    confirmed: boolean;
    setConfirmed: (confirmed: boolean) => void;

    clear: () => void;
}
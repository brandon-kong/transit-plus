import { create } from 'zustand';

export type EmailOrPhone = 'email' | 'phone';
export type View = 'login' | 'email-register' | 'phone-register' | 'otp-verify' | 'email-verify';

export const useLoginStore = create<LoginState>(set => ({
    loading: false,
    setLoading: (loading: boolean) => set({ loading }),

    view: 'login' as View,
    setView: (view: View) => set({ view }),

    emailOrPhone: 'phone' as EmailOrPhone,
    setEmailOrPhone: (emailOrPhone: EmailOrPhone) => set({ emailOrPhone }),

    email: '',
    setEmail: (email: string) => set({ email }),

    countryCode: '+1',
    setCountryCode: (countryCode: string) => set({ countryCode }),
    phone: '',
    setPhone: (phone: string) => set({ phone }),

    password: '',
    setPassword: (password: string) => set({ password }),

    otp: '',
    setOtp: (otp: string) => set({ otp }),

    dateOfBirth: '',
    setDateOfBirth: (dateOfBirth: string) => set({ dateOfBirth }),

    firstName: '',
    setFirstName: (firstName: string) => set({ firstName }),

    lastName: '',
    setLastName: (lastName: string) => set({ lastName }),
}));

export interface LoginState {
    loading: boolean;
    setLoading: (loading: boolean) => void;

    view: View;
    setView: (view: View) => void;

    emailOrPhone: EmailOrPhone;
    setEmailOrPhone: (emailOrPhone: EmailOrPhone) => void;

    email: string;
    setEmail: (email: string) => void;

    countryCode: string;
    setCountryCode: (countryCode: string) => void;
    phone: string;
    setPhone: (phone: string) => void;

    password: string;
    setPassword: (password: string) => void;

    otp: string;
    setOtp: (otp: string) => void;

    dateOfBirth: string;
    setDateOfBirth: (dateOfBirth: string) => void;

    firstName: string;
    setFirstName: (firstName: string) => void;

    lastName: string;
    setLastName: (lastName: string) => void;
}

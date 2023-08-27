'use server';

import { TokenTypes } from '@/types/types';
import { api } from '@/lib/auth/axios';

import { Error, Success } from '@/types/response/types';
import { getServerSession } from 'next-auth';
import authOptions from '../next-auth/authOptions';

type RegisterUserWithPhoneProps = {
    phone: string;
    countryCode: string;
    otp: string;
    firstName: string;
    lastName: string;
    email: string;
    birth_date?: string;
};

type RegisterUserWithEmailProps = {
    email: string;
    firstName: string;
    lastName: string;
    birth_date?: string;
    password: string;
};

export async function refreshToken(token: TokenTypes): Promise<TokenTypes | null> {
    // To prevent unnecessary requests to the server
    const refresh = token.refresh;

    if (!refresh) {
        return {
            ...token,
            error: 'No refresh token provided',
        };
    }

    try {
        const { data, status } = await api.post('/accounts/token/refresh/', {
            refresh,
        });

        if (status === 200) {
            return {
                ...token,
                access: data.access,
                refresh: data.refresh,
            };
        }
    } catch (error: any) {
        return {
            ...token,
            error: error,
        };
    }

    return null;
}

export async function sendPhoneOTP(phone: string, country_code: string): Promise<Success | Error> {
    const phoneWithCountryCode = country_code + phone;

    try {
        const { data, status } = await api.post('/accounts/otp/send/', {
            phone: phoneWithCountryCode,
           
        });

        const response: Success | Error = data;
         response.status_code = status;
        return response;
    } catch (error: any) {
        const response: Error = error.response ? error.response.data : {};
        response.status_code = 400;
        return response;
    }
}

type VerifyPhoneOTPProps = {
    phone: string;
    country_code: string;
    otp: string;
};

export async function verifyPhoneOTP({ phone, country_code, otp }: VerifyPhoneOTPProps): Promise<Success | Error> {
    const phoneWithCountryCode = country_code + phone;

    try {
        const { data } = await api.post('/accounts/otp/verify/', {
            phone: phoneWithCountryCode,
            token: otp,
        });

        const response: Success | Error = data;
        return response;
    } catch (error: any) {
        const response: Error = error.response.data;
        return response;
    }
}

export async function userExistsWithPhone(phone: string, countryCode: string): Promise<Success | Error> {
    const phoneWithCountryCode = countryCode + phone;

    try {
        const { data } = await api.post('/accounts/exists/phone/', {
            phone: phoneWithCountryCode,
        });

        const response: Success | Error = data;
        return response;
    } catch (error: any) {
        const response: Error = error.response.data;
        return response;
    }
}

export async function userExistsWithEmail(email: string): Promise<Success | Error> {
    try {
        const { data } = await api.get('/accounts/exists/email/' + email);

        const response: Success | Error = data;
        return response;
    } catch (error: any) {
        const response: Error = error.response.data;
        return response;
    }
}

export async function registerUserWithPhone({
    phone,
    countryCode,
    otp,
    firstName,
    lastName,
    email,
    birth_date,
}: RegisterUserWithPhoneProps) {
    const phoneWithCountryCode = countryCode + phone;

    try {
        const { data } = await api.post('/accounts/register/phone/', {
            phone: phoneWithCountryCode,
            token: otp,
            first_name: firstName,
            last_name: lastName,
            email,
            birth_date,
            country_code: countryCode,
        });

        const response: Success | Error = data;
        return response;
    } catch (error: any) {
        const response: Error = error.response.data;
        return response;
    }
}

export async function registerUserWithEmail({
    firstName,
    lastName,
    email,
    birth_date,
    password,
}: RegisterUserWithEmailProps) {
    try {
        const { data } = await api.post('/accounts/register/email/', {
            first_name: firstName,
            last_name: lastName,
            email,
            birth_date,
            password,
        });

        const response: Success | Error = data;
        return response;
    } catch (error: any) {
        const response: Error = error.response.data
        return response;
    }
}

export async function verifyEmailWithToken(token: string) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return null;
    }

    const accessToken = session.user.access;

    if (!accessToken) {
        return null;
    }

    try {
        const { data } = await api.get(`/accounts/email/verify/?token=${token}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        const response: Success | Error = data;
        return response;
    } catch (error: any) {
        const response: Error = error.response.data;
        return response;
    }
}
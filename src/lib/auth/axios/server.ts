'use server';

import { api } from ".";

import { getServerSession } from 'next-auth';
import authOptions from "../next-auth/authOptions";

export const fetcherGet = async (url: string) => {
    const session = await getServerSession(authOptions);
    const token = session?.user.access;

    if (!token) {
        return {
            status_code: 401,
            error_message: "Unauthorized",
            error_type: "invalid_token",
            detail: "Invalid token"
        }
    }

    return api.get(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.data);
};
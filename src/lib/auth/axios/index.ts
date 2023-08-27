import axios from 'axios';
import { getSession } from 'next-auth/react';

const api = axios.create({
    baseURL: process.env.BACKEND_API_URL,
});

const clientApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    }
});

const localFetcherGet = async (url: string) => {
    const session = await getSession();
    const token = session?.user.access;

    return axios.get(url).then(res => res.data);
};

export { api, clientApi, localFetcherGet };

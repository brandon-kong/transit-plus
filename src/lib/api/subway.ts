'use server';

import { Error, Success } from '@/types/response/types';
import { api } from '../auth/axios';

export const getClosestStation = async (
    lat: number,
    lng: number,
    end_lat: number,
    end_lng: number,
): Promise<Success | Error> => {
    const { data } = await api.get(`/subway/closest/?start_lat=${lat}&start_lng=${lng}`);
    return data;
};

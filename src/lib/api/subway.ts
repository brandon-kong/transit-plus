'use server';

import { Error, Success } from "@/types/response/types";
import { api } from "../auth/axios";

export const getClosestStation = async (lat: number, lng: number): Promise<Success | Error> => {
    const { data } = await api.get(`/subway/closest/?lat=${lat}&lng=${lng}`);
    return data;
}
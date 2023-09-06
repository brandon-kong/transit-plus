'use server';

import { AuthenticatedRequest } from "@/lib/auth/axios";
import { DaysOfWeek } from "@/lib/state/create_trip";
import { Success, Error } from "@/types/response/types";
import { TripCreateData } from "@/types/trips/types";

export const createTrip = async (data: TripCreateData) => {
    return await AuthenticatedRequest('/trips/create/', 'POST', data);
};

export const deleteTrip = async (id: Number): Promise<Success | Error> => {
    return await AuthenticatedRequest(`/trips/delete/${id}/`, 'GET', null)
}
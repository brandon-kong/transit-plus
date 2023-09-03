'use server';

import { AuthenticatedRequest } from "@/lib/auth/axios";
import { DaysOfWeek } from "@/lib/state/create_trip";
import { TripCreateData } from "@/types/trips/types";

export const createTrip = async (data: TripCreateData) => {
    return await AuthenticatedRequest('/trips/create/', 'POST', data);
};
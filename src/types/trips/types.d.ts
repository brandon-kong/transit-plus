import type { DaysOfWeek, Frequency, Transportation } from "@/lib/state/create_trip";
import { GeometryPointWithAddress } from "../geometry/types";

export interface Address extends GeometryPointWithAddress {
    is_start: boolean;
}

export type DumpedAddress = {
    name: string;
    is_start: boolean;
    latitude: number;
    longitude: number;

    address_line_1: string;
    address_line_2: string;
    city: string;
    region: string;
    zip: string;
    country: string;
    completed: boolean;

}

export type TripCreateData = {

    name: string;
    locations: DumpedAddress[];

    days: DaysOfWeek[];
    weeks_to_repeat: Frequency;

    type_of_transportation: Transportation;

}

export type TripData = {
    id: Number;
    name: string;
    locations: DumpedAddress[];

    days: DaysOfWeek[];
    weeks_to_repeat: Frequency;

    type_of_transportation: Transportation;

}
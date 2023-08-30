import type { Address } from "@/lib/state/report_safety";

export type GeometryPointWithAddress = {
    name: string;
    address?: Address;
    lat: number;
    lng: number;
}

export type CTATrainLines = 'Red Line' | 'Blue Line' | 'Brown Line' | 'Green Line' | 'Orange Line' | 'Pink Line' | 'Purple Line' | 'Yellow Line' | 'Other Line';

export type CTATrainStation = {
    "name": string,
    "line": CTATrainLines,
    "distance": Number,
    "geometry": {
        "lat": Number,
        "lng": Number,
    }
}
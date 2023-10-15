import type { Address, Severity, TypeOfIncident, NewFile } from '@/lib/state/report_safety';

export type ReportCreateData = {
    latitude: number;
    longitude: number;

    address_line_1: string;
    address_line_2: string;
    city: string;
    region: string;
    postal_code: string;
    country: string;

    date_of_incident: string;
    time_of_incident: string;

    type: TypeOfIncident;
    incident_if_other?: string;

    severity: Severity;

    additional_info?: string;

    files: NewFile[];
};

export type Report = {
    id: number;
    title: string;
    type: TypeOfIncident;
    latitude: number;
    longitude: number;
    address_line_1: string;
    address_line_2: string;
    city: string;
    region: string;
    country: string;
    postal_code: string;
    severity: Severity;
    date_of_incident: string;
    date_reported: string;
    additional_details: string;
}

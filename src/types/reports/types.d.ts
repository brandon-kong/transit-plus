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

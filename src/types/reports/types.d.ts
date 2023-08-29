import type { Address, Severity, TypeOfIncident, NewFile } from "@/lib/state/report_safety";

export type ReportCreateData = {
    latitude: number;
    longitude: number;

    address: Address;

    date_of_incident: string;
    time_of_incident: string;

    type: TypeOfIncident;
    incident_if_other?: string;

    severity: Severity;

    additional_info?: string;

    files: NewFile[];
}
'use server';

import { AuthenticatedRequest } from '@/lib/auth/axios';
import { ReportCreateData } from '@/types/reports/types';

export const createReport = async (data: ReportCreateData) => {
    return await AuthenticatedRequest('/reports/create/', 'POST', data);
};
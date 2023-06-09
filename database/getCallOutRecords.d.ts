import type { CallOutRecord } from '../types/recordTypes.js';
interface GetCallOutRecordsFilters {
    listId?: string;
    employeeNumber?: string;
    recentOnly: boolean;
}
export declare function getCallOutRecords(filters: GetCallOutRecordsFilters): Promise<CallOutRecord[]>;
export {};

export declare const availablePermissionValues: {
    'attendance.absences.canView': string[];
    'attendance.absences.canUpdate': string[];
    'attendance.absences.canManage': string[];
    'attendance.afterHours.canView': string[];
    'attendance.afterHours.canUpdate': string[];
    'attendance.afterHours.canManage': string[];
    'attendance.callOuts.canView': string[];
    'attendance.callOuts.canUpdate': string[];
    'attendance.callOuts.canManage': string[];
    'attendance.returnsToWork.canView': string[];
    'attendance.returnsToWork.canUpdate': string[];
    'attendance.returnsToWork.canManage': string[];
    'reports.hasRawExports': string[];
};
export declare function hasAttendance(user: MonTYUser): boolean;
export declare function hasPermission(user: MonTYUser, permissionKey: keyof typeof availablePermissionValues): boolean;

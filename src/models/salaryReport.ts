export interface SalaryReport {
    department: string;
    position: string;
    fullName: string;
    salary: number;
    totalDepartmentSalary: number;
};

export interface SalaryReportFilters{
    department: string;
    position: string;
};
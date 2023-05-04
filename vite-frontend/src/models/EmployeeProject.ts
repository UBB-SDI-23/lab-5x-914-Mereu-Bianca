import { Employee } from "./Employee";
import { Project } from "./Project";

export interface EmployeeProject {
    id?: number;
    employee: Employee;
    project: Project;
    role: string;
    hours_worked: number;
    employee_id?: number;
    project_id?: number;
}
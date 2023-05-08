import { Department } from "./Department";
import { Project } from "./Project";

export interface Employee {
    id?: number;
    first_name: string;
    last_name: string;
    employment_start_date: Date;
    salary: number;
    nr_of_projects?: number;
    sum_hours_worked?: number;
    sum_project_complete?: number;
    status?: string;
    department_id?: number;
    department?: Department;
    projects?: Project[];
}
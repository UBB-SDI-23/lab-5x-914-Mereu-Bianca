import { Employee } from "./Employee";

export interface Project {
    id?: number;
    name: string;
    description: string;
    language: string;
    start_date: Date;
    percent_complete: number;
    nr_of_employees?: number;
    employees?: Employee[];
}
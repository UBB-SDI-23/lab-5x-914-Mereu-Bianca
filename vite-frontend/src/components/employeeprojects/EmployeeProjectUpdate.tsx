import { Autocomplete, Button, Card, CardActions, CardContent, Container, FormLabel, IconButton, TextField, Toolbar, colors } from "@mui/material";
import axios, { toFormData } from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { EmployeeProject } from "../../models/EmployeeProject";
import { useCallback, useEffect, useRef, useState } from "react";
import { Department } from "../../models/Department";
import { debounce } from "lodash";
import { Employee } from "../../models/Employee";
import { Project } from "../../models/Project";


export const UpdateEmployeeProject = () => {
    const { employeeProjectId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const first_employee: Employee = {
        first_name: "Ana",
        last_name: "Catrina",
        employment_start_date: new Date("2023-04-06T12:00:00Z"),
        salary: 2000,
    }

    const first_project: Project = {
        name: "project",
        description: "description of the project",
        language: "na",
        percent_complete: 0,
        start_date: new Date("2023-04-06T12:00:00Z"),
    }

    const [employeeProject, setEmployeeProject] = useState<EmployeeProject>({
        id: parseInt(String(employeeProjectId)),
        employee: first_employee,
        project: first_project,
        role: "",
        hours_worked: 0,

    });

    const department = useRef<Department>({
        name: "",
        description: "",
        number_of_positions: 0,
        location: "",
        budget: 1,
    })

    const updateEmployeeProject = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/employeeprojects/${employeeProjectId}/`, employeeProject);
            navigate("/employeeprojects");
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/employeeprojects");
    };

    //    Autocomplete for employees

    const [employees, setEmployees] = useState<Employee[]>([]);
    const fetchSuggestionsEmployee = async (query: string) => {
        try {
            const response = await axios.get<Employee[]>(
                `${BACKEND_API_URL}/employees/autocomplete?query=${query}`
            );
            const data = await response.data;
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const debouncedFetchSuggestionsEmployee = useCallback(debounce(fetchSuggestionsEmployee, 500), []);
    useEffect(() => {
        return () => {
            debouncedFetchSuggestionsEmployee.cancel();
        };
    }, [debouncedFetchSuggestionsEmployee]);
    const handleInputChangeEmployee = (event: any, value: any, reason: any) => {
        console.log("input", value, reason);

        if (reason === "input") {
            debouncedFetchSuggestionsEmployee(value);
        }
    };


    //    Autocomplete for projects

    const [projects, setProjects] = useState<Project[]>([]);
    const fetchSuggestionsProject = async (query: string) => {
        try {
            const response = await axios.get<Project[]>(
                `${BACKEND_API_URL}/projects/autocomplete?query=${query}`
            );
            const data = await response.data;
            setProjects(data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const debouncedFetchSuggestionsProject = useCallback(debounce(fetchSuggestionsProject, 500), []);
    useEffect(() => {
        return () => {
            debouncedFetchSuggestionsProject.cancel();
        };
    }, [debouncedFetchSuggestionsProject]);
    const handleInputChangeProject = (event: any, value: any, reason: any) => {
        console.log("input", value, reason);

        if (reason === "input") {
            debouncedFetchSuggestionsProject(value);
        }
    };

    const [hoursWokedError, setHoursWokedError] = useState('');
    function handleHoursWokedChange(event: any) {
        const input = event.target.value;
        const regex = /^\d{1,2}$/;
        if (regex.test(input) && parseInt(input) < 12) {
            setHoursWokedError('');
            setEmployeeProject({ ...employeeProject, hours_worked: input });
        }
        else {
            setHoursWokedError('must be < 12');
        }
    }

    return (
        <Container>
            <Card>
                <CardContent>
                    <Toolbar>
                        <IconButton component={Link} sx={{ mr: 3 }} to={`/employeeprojects`}>
                            <ArrowBackIcon />
                        </IconButton>{" "}
                    </Toolbar>
                    <form onSubmit={updateEmployeeProject} style={{ display: "flex", flexDirection: "column", padding: "8px" }}>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Role
                            </FormLabel>
                            <TextField
                                id="role"
                                variant="outlined"
                                onChange={(event) => setEmployeeProject({ ...employeeProject, role: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Hours worked
                            </FormLabel>
                            <TextField
                                id="hours_worked"
                                variant="outlined"
                                // onChange={(event) => setEmployeeProject({ ...employeeProject, hours_worked: parseInt(event.target.value) })}
                                onChange={handleHoursWokedChange}
                                error={!!hoursWokedError}
                                helperText={hoursWokedError}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Employee
                            </FormLabel>
                            <Autocomplete
                                id="employee_id"
                                options={employees}

                                getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                                renderInput={(params) => <TextField {...params} label="Employee" variant="outlined" />}
                                filterOptions={(x) => x}
                                onInputChange={handleInputChangeEmployee}
                                onChange={(event, value) => {
                                    if (value) {
                                        console.log(value);
                                        setEmployeeProject({ ...employeeProject, employee_id: value.id });
                                    }
                                }}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Salary
                            </FormLabel>
                            <Autocomplete
                                id="department_id"
                                options={projects}

                                getOptionLabel={(option) => `${option.name}`}
                                renderInput={(params) => <TextField {...params} label="Project" variant="outlined" />}
                                filterOptions={(x) => x}
                                onInputChange={handleInputChangeProject}
                                onChange={(event, value) => {
                                    if (value) {
                                        console.log(value);
                                        setEmployeeProject({ ...employeeProject, project_id: value.id });
                                    }
                                }}
                            />
                        </Container>

                    </form>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button type="submit" onClick={updateEmployeeProject} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Update</Button>
                    <Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
}
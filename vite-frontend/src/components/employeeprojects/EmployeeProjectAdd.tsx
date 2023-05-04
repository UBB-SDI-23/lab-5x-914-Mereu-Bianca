import { Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { EmployeeProject } from "../../models/EmployeeProject";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Department } from "../../models/Department";
import { debounce } from "lodash";
import { Employee } from "../../models/Employee";
import { Project } from "../../models/Project";


export const EmployeeProjectAdd = () => {
	const navigate = useNavigate();

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
        employee: first_employee,
        project: first_project,
		role: "",
		hours_worked: 0,
	});
	
	const addEmployeeProject = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			console.log(employeeProject);
			await axios.post(`${BACKEND_API_URL}/employeeprojects/`, employeeProject);
			navigate("/employeeprojects");
		} catch (error) {
			console.log(error);
		}
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
					<form onSubmit={addEmployeeProject}>
						<TextField
							id="role"
							label="Role"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setEmployeeProject({ ...employeeProject, role: event.target.value })}
						/>
						
						<TextField
							id="hours_worked"
							label="Hours Worked"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							// onChange={(event) => setEmployeeProject({ ...employeeProject, hours_worked: parseInt(event.target.value) })}
                            onChange={handleHoursWokedChange}
							error={!!hoursWokedError}
							helperText={hoursWokedError}
						/>
						
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

						<Button type="submit">Add Employee Project</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};
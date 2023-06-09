import { Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Employee } from "../../models/Employee";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Department } from "../../models/Department";
import { debounce } from "lodash";


export const EmployeeAdd = () => {
	const navigate = useNavigate();

	const [employee, setEmployee] = useState<Employee>({
		first_name: "",
		last_name: "",
		employment_start_date: new Date("2023-04-06T12:00:00Z"),
		salary: 0,
		status: "",
		department_id: 5,
	});

	const [departments, setDepartments] = useState<Department[]>([]);

	const fetchSuggestions = async (query: string) => {
		try {
			const response = await axios.get<Department[]>(
				`${BACKEND_API_URL}/departments/autocomplete?query=${query}`
			);
			const data = await response.data;
			setDepartments(data);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};

	const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

	useEffect(() => {
		return () => {
			debouncedFetchSuggestions.cancel();
		};
	}, [debouncedFetchSuggestions]);

	const addEmployee = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			console.log(employee);
			await axios.post(`${BACKEND_API_URL}/employees/`, employee);
			navigate("/employees");
		} catch (error) {
			console.log(error);
		}
	};

	const handleInputChange = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);

		if (reason === "input") {
			debouncedFetchSuggestions(value);
		}
	};

	const [employmentDateError, setEmploymentDateError] = useState('');
	function handleDateChange(event: any) {
		const input = event.target.value;
		const regex = /^\d{4}-\d{1,2}-\d{1,2}$/;
		if (regex.test(input)) {
			setEmploymentDateError('');
			setEmployee({ ...employee, employment_start_date: input });
		}
		else {
			setEmploymentDateError('The date format is: YYYY-MM-DD');
		}
	}

	const [salaryError, setSalaryError] = useState('');
	function handleSalaryChange(event: any) {
		const input = event.target.value;
		const regex = /^\d{4,5}$/;
		if (regex.test(input)) {
			setSalaryError('');
			setEmployee({ ...employee, salary: input });
		}
		else {
			setSalaryError('Salary must be between 1000 and 100000!');
		}
	}


	return (
		<Container>
			<Card>
				<CardContent>
					<Toolbar>
						<IconButton component={Link} sx={{ mr: 3 }} to={`/employees`}>
							<ArrowBackIcon />
						</IconButton>{" "}
					</Toolbar>
					<form onSubmit={addEmployee}>
						<TextField
							id="first_name"
							label="First Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setEmployee({ ...employee, first_name: event.target.value })}
						/>
						<TextField
							id="last_name"
							label="Last Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setEmployee({ ...employee, last_name: event.target.value })}
						/>
						<TextField
							id="employment_start_date"
							label="Employment Start Date"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							// onChange={(event) => setEmployee({
							// 	...employee,
							// 	employment_start_date: new Date(event.target.value)
							// })}
							onChange={handleDateChange}
							error={!!employmentDateError}
							helperText={employmentDateError}
						/>
						<TextField
							id="salary"
							label="Salary"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							// onChange={(event) => setEmployee({ ...employee, salary: parseInt(event.target.value) })}
							onChange={handleSalaryChange}
							error={!!salaryError}
							helperText={salaryError}
						/>

						<TextField
							id="status"
							label="Status"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setEmployee({ ...employee, status: event.target.value })}
						/>

						<Autocomplete
							id="department_id"
							options={departments}

							getOptionLabel={(option) => `${option.name}`}
							renderInput={(params) => <TextField {...params} label="Department" variant="outlined" />}
							filterOptions={(x) => x}
							onInputChange={handleInputChange}
							onChange={(event, value) => {
								if (value) {
									console.log(value);
									setEmployee({ ...employee, department_id: value.id });
								}
							}}
						/>

						<Button type="submit">Add Employee</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};
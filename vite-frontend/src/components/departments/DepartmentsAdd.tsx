import { Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Department } from "../../models/Department";
import { debounce } from "lodash";


export const DepartmentAdd = () => {
	const navigate = useNavigate();

	const [department, setDepartment] = useState<Department>({
		name: "",
		description: "",
		number_of_positions: 0,
		location: "",
		budget: 0,
	});

	const addDepartment = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			console.log(department);
			await axios.post(`${BACKEND_API_URL}/departments/`, department);
			navigate("/departments");
		} catch (error) {
			console.log(error);
		}
	};

	const [numberOfPositionsError, setNumberOfPositionsError] = useState('');
	function handleNumberOfPositionsChange(event: any) {
		const input = event.target.value;
		const regex = /^\d{1,2}$/;
		if (regex.test(input) && input < 30) {
			setNumberOfPositionsError('');
			setDepartment({ ...department, number_of_positions: input });
		}
		else {
			setNumberOfPositionsError('The number of positions must be between 0 and 30');
		}
	}

	const [budgetError, setBudgetError] = useState('');
	function handleBudgetChange(event: any) {
		const input = event.target.value;
		const regex = /^\d{5,6}$/;
		if (regex.test(input)) {
			setBudgetError('');
			setDepartment({ ...department, budget: input });
		}
		else {
			setBudgetError('The budget must be between 10000 and 1000000!');
		}
	}


	return (
		<Container>
			<Card>
				<CardContent>
					<Toolbar>
						<IconButton component={Link} sx={{ mr: 3 }} to={`/departments`}>
							<ArrowBackIcon />
						</IconButton>{" "}
					</Toolbar>
					<form onSubmit={addDepartment}>
						<TextField
							id="name"
							label="Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDepartment({ ...department, name: event.target.value })}
						/>
						<TextField
							id="description"
							label="Description"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDepartment({ ...department, description: event.target.value })}
						/>
						<TextField
							id="number_of_positions"
							label="Number Of Positions"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={handleNumberOfPositionsChange}
							error={!!numberOfPositionsError}
							helperText={numberOfPositionsError}
						/>
						<TextField
							id="budget"
							label="Budget"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={handleBudgetChange}
							error={!!budgetError}
							helperText={budgetError}
						/>

						<TextField
							id="location"
							label="Location"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDepartment({ ...department, location: event.target.value })}
						/>

						<Button type="submit">Add Department</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};
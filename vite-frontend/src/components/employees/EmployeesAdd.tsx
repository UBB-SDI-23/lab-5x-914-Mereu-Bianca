import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Employee } from "../../models/Employee";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const EmployeeAdd = () => {
	const navigate = useNavigate();

	const [employee, setEmployee] = useState<Employee>({
		first_name: "",
		last_name: "",
	});

	const addEmployee = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/employees/`, employee);
			navigate("/employees");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/employees`}>
						<ArrowBackIcon />
					</IconButton>{" "}
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

						<Button type="submit">Add Employee</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};
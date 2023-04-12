import { Card, CardActions, CardContent, IconButton, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Employee } from "../../models/Employee";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const EmployeeDetails = () => {
	const { employeeId } = useParams();
	const [employee, setEmployee] = useState<Employee>();

	useEffect(() => {
		const fetchEmployee = async () => {
			// TODO: use axios instead of fetch
			// TODO: handle errors
			// TODO: handle loading state
			const response = await fetch(`${BACKEND_API_URL}/employees/${employeeId}`);
			const employee = await response.json();
			setEmployee(employee);
		};
		fetchEmployee();
	}, [employeeId]);


	console.log(employee?.department);

	return (
		<Container>
			<Card>
				<CardContent>
					<Toolbar>
						<IconButton component={Link} sx={{ mr: 3 }} to={`/employees`}>
							<ArrowBackIcon />
						</IconButton>{" "}
					</Toolbar>
					<h1>Employee Details</h1>
					<p>Employee First Name: {employee?.first_name}</p>
					<p>Employee Last Name: {employee?.last_name}</p>
					{/* <p>Employment Start Date: {employee?.employment_start_date.toString()}</p> */}
					<p>Employee Salary: {employee?.salary}</p>
					<p>Employee Salary: {employee?.status}</p>
					<p>Department: {employee?.department?.name}</p>
					<p>Projects:</p>
					<ul>
						{employee?.projects?.map((project) => (
							<li>{project.name}</li>
						))}
					</ul>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/employees/${employeeId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/employees/${employeeId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};
import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Employee } from "../../models/Employee";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

export const AllEmployees = () => {
	const [loading, setLoading] = useState(false);
	const [employees, setEmployees] = useState<Employee[]>([]);

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/employees`)
			.then((response) => response.json())
			.then((data) => {
				setEmployees(data);
				setLoading(false);
			});
	}, []);

	return (
		<Container>
			<h1>All employees</h1>

			{loading && <CircularProgress />}
			{!loading && employees.length === 0 && <p>No Employees found</p>}
			{!loading && (
				<IconButton component={Link} sx={{ mr: 3 }} to={`/employees/add`}>
					<Tooltip title="Add a new employee" arrow>
						<AddIcon color="primary" />
					</Tooltip>
				</IconButton>
			)}
			{!loading && employees.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">First Name</TableCell>
								<TableCell align="right">Last Name</TableCell>
								{/* <TableCell align="right">Teacher Name</TableCell>
								<TableCell align="center">Operations</TableCell> */}
							</TableRow>
						</TableHead>
						<TableBody>
							{employees.map((employee, index) => (
								<TableRow key={employee.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/employees/${employee.id}/details`} title="View employee details">
											{employee.first_name}
										</Link>
									</TableCell>
									<TableCell align="right">{employee.last_name}</TableCell>
									{/* <TableCell align="right">{course.teacher?.name}</TableCell> */}
									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/employees/${employee.id}/details`}>
											<Tooltip title="View employee details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/employees/${employee.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/employees/${employee.id}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Container>
	);
};
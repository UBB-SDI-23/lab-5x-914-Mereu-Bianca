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
	Button,
	Toolbar,
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
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(1000000 / 100);

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/employees/?p=${currentPage}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data.results);
				setEmployees(data.results);
				setLoading(false);
			});
	}, []);

	const orderBySalary = () => {
		const sorted = [...employees].sort((a, b) => {
			const salary1 = a.salary;
			const salary2 = b.salary;
			return salary1 - salary2;
		});
		setEmployees(sorted);
	}

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);

		setLoading(true);
		fetch(`${BACKEND_API_URL}/employees/?p=${newPage}`)
			.then((response) => response.json())
			.then((data) => {
				setEmployees(data.results);
				setLoading(false);
			});
	};

	const pageNumbers = [];
	for (
		let i = Math.max(1, currentPage - 5);
		i <= Math.min(totalPages, currentPage + 5);
		i++
	) {
		pageNumbers.push(i);
	}

	return (
		<Container>
			<h1>All employees</h1>
			<label style={{ color: "gray" }}>Current Page: {currentPage}</label>

			{loading && <CircularProgress />}
			{!loading && employees.length === 0 && <p>No Employees found</p>}
			{!loading && (
				<Toolbar>
					<div style={{ width: "1200px" }}>
						{currentPage > 1 && (
							<button style={{ margin: "3px" }} onClick={() => handlePageChange(currentPage - 1)}>
								Previous
							</button>
						)}
						{pageNumbers[0] > 1 && (
							<>
								<button style={{ margin: "3px" }} onClick={() => handlePageChange(1)}>1</button>
								{pageNumbers[0] > 2 && <span style={{ margin: "3px" }} >...</span>}
							</>
						)}
						{pageNumbers.map((pageNumber) => (
							<button
								style={{
									backgroundColor: "white",
									color: currentPage === pageNumber ? "blue" : "black",
									pointerEvents: currentPage === pageNumber ? "none" : "auto"
								}}
								key={pageNumber}
								onClick={() => handlePageChange(pageNumber)}
							>
								{pageNumber}
							</button>
						))}
						{pageNumbers[pageNumbers.length - 1] <= totalPages - 1 && (
							<>
								{pageNumbers[pageNumbers.length - 1] <= totalPages - 2 && (
									<span>...</span>
								)}
								<button onClick={() => handlePageChange(totalPages)}>
									{totalPages}
								</button>
							</>
						)}
						{currentPage < totalPages && (
							<button onClick={() => handlePageChange(currentPage + 1)}>
								Next
							</button>
						)}
					</div>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/employees/add`}>
						<Tooltip title="Add a new employee" arrow>
							<AddIcon color="primary" />
						</Tooltip>
					</IconButton>
					<Button
						onClick={orderBySalary}
					>Order By Salary
					</Button>
				</Toolbar>
			)}
			{!loading && employees.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">First Name</TableCell>
								<TableCell align="right">Last Name</TableCell>
								<TableCell align="right">Employment Start Date</TableCell>
								<TableCell align="right">Salary</TableCell>
								<TableCell align="right">Status</TableCell>
								<TableCell align="right">Department</TableCell>
								<TableCell align="right">Number of projects</TableCell>
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
									<TableCell align="right">{employee.employment_start_date.toString()}</TableCell>
									<TableCell align="right">{employee.salary}</TableCell>
									<TableCell align="right">{employee.status}</TableCell>
									<TableCell align="right">{employee.department?.name}</TableCell>
									<TableCell align="right">{employee.nr_of_projects}</TableCell>
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
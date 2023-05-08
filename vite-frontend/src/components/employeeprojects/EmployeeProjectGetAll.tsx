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
import { EmployeeProject } from "../../models/EmployeeProject";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

export const AllEmployeeProjects = () => {
	const [loading, setLoading] = useState(false);
	const [employeeProjects, setEmployeeProjects] = useState<EmployeeProject[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(10000000 / 100);

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/employeeprojects/?p=${currentPage}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data.results);
				setEmployeeProjects(data.results);
				setLoading(false);
			});
	}, []);

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);

		setLoading(true);
		fetch(`${BACKEND_API_URL}/employeeprojects/?p=${newPage}`)
			.then((response) => response.json())
			.then((data) => {
				setEmployeeProjects(data.results);
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
			<h1>All Employees Projects</h1>
			<label style={{ color: "gray" }}>Current Page: {currentPage}</label>

			{loading && <CircularProgress />}
			{!loading && employeeProjects.length === 0 && <p>No employeeProjects found</p>}
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
									margin: "3px",
									// backgroundColor: currentPage === pageNumber ? "white" : "",
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
									<span style={{ margin: "3px" }}>...</span>
								)}
								<button style={{ margin: "3px" }} onClick={() => handlePageChange(totalPages)}>
									{totalPages}
								</button>
							</>
						)}
						{currentPage < totalPages && (
							<button style={{ margin: "3px" }} onClick={() => handlePageChange(currentPage + 1)}>
								Next
							</button>
						)}
					</div>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/employeeprojects/add`}>
						<Tooltip title="Add a new employeeProject" arrow>
							<AddIcon color="primary" />
						</Tooltip>
					</IconButton>
				</Toolbar>
			)}
			{!loading && employeeProjects.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">employeeProject</TableCell>
								<TableCell align="right">Project</TableCell>
								<TableCell align="right">Role</TableCell>
								<TableCell align="right">Hours Worked</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{employeeProjects.map((employeeProject, index) => (
								<TableRow key={employeeProject.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/employees/${employeeProject.employee.id}/details`} title="View employee details">
											{employeeProject.employee.first_name + " " + employeeProject.employee.last_name}
										</Link>
									</TableCell>
                                    <TableCell component="th" scope="row">
										<Link to={`/projects/${employeeProject.project.id}/details`} title="View project details">
											{employeeProject.project.name}
										</Link>
									</TableCell>
									<TableCell align="right">{employeeProject.role}</TableCell>
									<TableCell align="right">{employeeProject.hours_worked}</TableCell>
									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/employeeprojects/${employeeProject.id}/details`}>
											<Tooltip title="View employeeProject details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/employeeprojects/${employeeProject.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/employeeprojects/${employeeProject.id}/delete`}>
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
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
import { Department } from "../../models/Department";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

export const AllDepartments = () => {
	const [loading, setLoading] = useState(false);
	const [departments, setDepartments] = useState<Department[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(1000000 / 100);

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/departments/?p=${currentPage}`)
			.then((response) => response.json())
			.then((data) => {

                console.log("OKK")
				console.log(data.results);
				setDepartments(data.results);
				setLoading(false);
			});
	}, []);

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);

		setLoading(true);
		fetch(`${BACKEND_API_URL}/departments/?p=${newPage}`)
			.then((response) => response.json())
			.then((data) => {
				setDepartments(data.results);
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
			<h1>All Departments</h1>
			<label style={{ color: "gray" }}>Current Page: {currentPage}</label>

			{loading && <CircularProgress />}
			{!loading && departments.length === 0 && <p>No Departments found</p>}
			{!loading && (
				<Toolbar>
					<div style={{ width: "1200px" }}>
						{currentPage > 1 && (
							<button onClick={() => handlePageChange(currentPage - 1)}>
								Previous
							</button>
						)}
						{pageNumbers[0] > 1 && (
							<>
								<button onClick={() => handlePageChange(1)}>1</button>
								{pageNumbers[0] > 2 && <span >...</span>}
							</>
						)}
						{pageNumbers.map((pageNumber) => (
							<button
								style={{
									margin: "3px",
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
					<IconButton component={Link} sx={{ mr: 3 }} to={`/departments/add`}>
						<Tooltip title="Add a new Department" arrow>
							<AddIcon color="primary" />
						</Tooltip>
					</IconButton>
				</Toolbar>
			)}
			{!loading && departments.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">Name</TableCell>
								<TableCell align="right">Department</TableCell>
								<TableCell align="right">Location</TableCell>
								<TableCell align="right">Budget</TableCell>
								<TableCell align="right">Number of Positons</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{departments.map((departments, index) => (
								<TableRow key={departments.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/departments/${departments.id}/details`} title="View Department details">
											{departments.name}
										</Link>
									</TableCell>
									<TableCell align="right">{departments.description}</TableCell>
									<TableCell align="right">{departments.location}</TableCell>
									<TableCell align="right">{departments.budget}</TableCell>
									<TableCell align="right">{departments.number_of_positions}</TableCell>
									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/departments/${departments.id}/details`}>
											<Tooltip title="View Department details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/departments/${departments.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/departments/${departments.id}/delete`}>
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
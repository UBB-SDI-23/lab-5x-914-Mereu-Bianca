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
import { Project } from "../../models/Project";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const AllProjects = () => {
	const [loading, setLoading] = useState(false);
	const [projects, setProjects] = useState<Project[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = 2; //Math.ceil(1000000 / 100);

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/projects/?p=${currentPage}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data.results);
				setProjects(data.results);
				setLoading(false);
			});
	}, []);

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
			setLoading(true);
			fetch(`${BACKEND_API_URL}/projects/?p=${currentPage + 1}`)
				.then((response) => response.json())
				.then((data) => {
					setProjects(data.results);
					setLoading(false);
				});
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
			setLoading(true);
			fetch(`${BACKEND_API_URL}/projects/?p=${currentPage - 1}`)
				.then((response) => response.json())
				.then((data) => {
					setProjects(data.results);
					setLoading(false);
				});
		}
	};

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);

		setLoading(true);
		fetch(`${BACKEND_API_URL}/projects/?p=${newPage}`)
			.then((response) => response.json())
			.then((data) => {
				setProjects(data.results);
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

	const [open, setOpen] = React.useState(false);
	const numbers = Array.from({ length: 100 }, (_, index) => index + 1);
	const handleOpen = () => {
		setOpen(!open);
	};

	return (
		<Container>
			<h1>All projects</h1>
			<label style={{ color: "gray" }}>Current Page: {currentPage}</label>

			{loading && <CircularProgress />}
			{!loading && projects.length === 0 && <p>No projects found</p>}
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
					<IconButton component={Link} sx={{ mr: 3 }} to={`/projects/add`}>
						<Tooltip title="Add a new project" arrow>
							<AddIcon color="primary" />
						</Tooltip>
					</IconButton>
				</Toolbar>
			)}
			{!loading && projects.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">Name</TableCell>
								<TableCell align="right">Description</TableCell>
								<TableCell align="right">Language</TableCell>
								<TableCell align="right">Percent Complete</TableCell>
								<TableCell align="right">Start Date</TableCell>
                                <TableCell align="right">Number of Employees</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{projects.map((project, index) => (
								<TableRow key={project.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/projects/${project.id}/details`} title="View project details">
											{project.name}
										</Link>
									</TableCell>
									<TableCell align="right">{project.description}</TableCell>
									<TableCell align="right">{project.language}</TableCell>
									<TableCell align="right">{project.percent_complete}</TableCell>
									<TableCell align="right">{project.start_date.toString()}</TableCell>
                                    <TableCell align="right">{project.nr_of_employees}</TableCell>
									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/projects/${project.id}/details`}>
											<Tooltip title="View project details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/projects/${project.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/projects/${project.id}/delete`}>
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
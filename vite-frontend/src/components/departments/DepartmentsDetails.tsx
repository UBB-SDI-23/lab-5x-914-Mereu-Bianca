import { Card, CardActions, CardContent, IconButton, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Department } from "../../models/Department";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const DepartmentDetails = () => {
	const { DepartmentId } = useParams();
	const [Department, setDepartment] = useState<Department>();

	useEffect(() => {
		const fetchDepartment = async () => {
			// TODO: use axios instead of fetch
			// TODO: handle errors
			// TODO: handle loading state
            console.log(DepartmentId);
			const response = await fetch(`${BACKEND_API_URL}/departments/${DepartmentId}`);
			const Department = await response.json();
			setDepartment(Department);
		};
		fetchDepartment();
	}, [DepartmentId]);


	return (
		<Container>
			<Card>
				<CardContent>
					<Toolbar>
						<IconButton component={Link} sx={{ mr: 3 }} to={`/departments`}>
							<ArrowBackIcon />
						</IconButton>{" "}
					</Toolbar>
					<h1>Department Details</h1>
					<p>Name: {Department?.name}</p>
					<p>Description: {Department?.description}</p>
					<p>Budget: {Department?.budget}</p>
					<p>Location: {Department?.location}</p>
					<p>Number of Positions: {Department?.number_of_positions}</p>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/departments/${DepartmentId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/departments/${DepartmentId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};
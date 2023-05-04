import { Card, CardActions, CardContent, IconButton, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Project } from "../../models/Project";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const ProjectDetails = () => {
	const { projectId } = useParams();
	const [project, setProject] = useState<Project>();

	useEffect(() => {
		const fetchProject = async () => {
			// TODO: use axios instead of fetch
			// TODO: handle errors
			// TODO: handle loading state
            console.log(projectId);
			const response = await fetch(`${BACKEND_API_URL}/projects/${projectId}`);
			const project = await response.json();
			setProject(project);
		};
		fetchProject();
	}, [projectId]);


	return (
		<Container>
			<Card>
				<CardContent>
					<Toolbar>
						<IconButton component={Link} sx={{ mr: 3 }} to={`/projects`}>
							<ArrowBackIcon />
						</IconButton>{" "}
					</Toolbar>
					<h1>Project Details</h1>
					<p>Project Name: {project?.name}</p>
					<p>Project Description: {project?.description}</p>
					<p>Project Start Date: {project?.start_date.toString()}</p>
					<p>Project Language: {project?.language}</p>
					<p>Project Percent Complete: {project?.percent_complete}</p>
					<p>Employees:</p>
					<ul>
						{project?.employees?.map((employee) => (
							<li>{employee.first_name} {employee.last_name}</li>
						))}
					</ul>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/projects/${projectId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/projects/${projectId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};
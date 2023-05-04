import { Card, CardActions, CardContent, IconButton, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { EmployeeProject } from "../../models/EmployeeProject";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const EmployeeProjectDetails = () => {
	const { employeeProjectId } = useParams();
	const [employeeProject, setEmployeeProject] = useState<EmployeeProject>();

	useEffect(() => {
		const fetchEmployeeProject = async () => {
			// TODO: use axios instead of fetch
			// TODO: handle errors
			// TODO: handle loading state
            console.log(employeeProjectId);
			const response = await fetch(`${BACKEND_API_URL}/employeeprojects/${employeeProjectId}`);
			const employeeProject = await response.json();
			setEmployeeProject(employeeProject);
		};
		fetchEmployeeProject();
	}, [employeeProjectId]);


	return (
		<Container>
			<Card>
				<CardContent>
					<Toolbar>
						<IconButton component={Link} sx={{ mr: 3 }} to={`/employeeprojects`}>
							<ArrowBackIcon />
						</IconButton>{" "}
					</Toolbar>
					<h1>EmployeeProject Details</h1>
					<p>Role: {employeeProject?.role}</p>
					<p>Hours Worked: {employeeProject?.hours_worked}</p>
					<p>Employee: {employeeProject?.employee.first_name}</p>
					<p>Project: {employeeProject?.project.name}</p>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/employeeprojects/${employeeProjectId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/employeeprojects/${employeeProjectId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};
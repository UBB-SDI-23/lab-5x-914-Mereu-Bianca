import { Container, Card, CardContent, IconButton, CardActions, Button, Toolbar } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";

export const EmployeeProjectDelete = () => {
	const { employeeprojectId } = useParams();
	const navigate = useNavigate();

	const handleDelete = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await axios.delete(`${BACKEND_API_URL}/employeeprojects/${employeeprojectId}`);
		// go to employeeprojects list
		navigate("/employeeprojects");
	};

	const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		// go to employeeprojects list
		navigate("/employeeprojects");
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<Toolbar>
						<IconButton component={Link} sx={{ mr: 3 }} to={`/employeeprojects`}>
							<ArrowBackIcon />
						</IconButton>{" "}
					</Toolbar>
					Are you sure you want to delete this employeeproject? This cannot be undone!
				</CardContent>
				<CardActions>
					<Button onClick={handleDelete}>Delete it</Button>
					<Button onClick={handleCancel}>Cancel</Button>
				</CardActions>
			</Card>
		</Container>
	);
};
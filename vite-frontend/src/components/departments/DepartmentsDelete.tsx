import { Container, Card, CardContent, IconButton, CardActions, Button, Toolbar } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";

export const DepartmentDelete = () => {
	const { DepartmentId } = useParams();
	const navigate = useNavigate();

	const handleDelete = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await axios.delete(`${BACKEND_API_URL}/departments/${DepartmentId}`);
		// go to Departments list
		navigate("/departments");
	};

	const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		// go to Departments list
		navigate("/departments");
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<Toolbar>
						<IconButton component={Link} sx={{ mr: 3 }} to={`/departments`}>
							<ArrowBackIcon />
						</IconButton>{" "}
					</Toolbar>
					Are you sure you want to delete this Department? This cannot be undone!
				</CardContent>
				<CardActions>
					<Button onClick={handleDelete}>Delete it</Button>
					<Button onClick={handleCancel}>Cancel</Button>
				</CardActions>
			</Card>
		</Container>
	);
};
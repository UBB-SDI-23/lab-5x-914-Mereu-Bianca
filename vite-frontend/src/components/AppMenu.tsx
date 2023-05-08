import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

export const AppMenu = () => {
	const location = useLocation();
	const path = location.pathname;

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ marginBottom: "20px" }}>
				<Toolbar>
					<IconButton
						component={Link}
						to="/"
						size="large"
						edge="start"
						color="inherit"
						aria-label="school"
						sx={{ mr: 2 }}>
						<SchoolIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ mr: 5 }}>
						Employees management
					</Typography>
					<Button
						variant={path.startsWith("/employees") ? "outlined" : "text"}
						to="/employees"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Employees
					</Button>
					<Button
						variant={path.startsWith("/employeeprojects") ? "outlined" : "text"}
						to="/employeeprojects"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Employees Projects
					</Button>
					<Button
						variant={path.startsWith("/projects") ? "outlined" : "text"}
						to="/projects"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Projects
					</Button>
					<Button
						variant={path.startsWith("/departments") ? "outlined" : "text"}
						to="/departments"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Departments
					</Button>
					<Button
						variant={path.startsWith("/employees-ordered-by-hours-worked") ? "outlined" : "text"}
						to="/employees-ordered-by-hours-worked"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Statistics Hours Worked
					</Button>
					<Button
						variant={path.startsWith("/employees-ordered-by-avg-percent-complete") ? "outlined" : "text"}
						to="/employees-ordered-by-avg-percent-complete"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Statistics Percent Complete
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
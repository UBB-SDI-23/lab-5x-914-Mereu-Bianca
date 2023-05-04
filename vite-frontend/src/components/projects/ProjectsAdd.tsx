import { Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Project } from "../../models/Project";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Department } from "../../models/Department";
import { debounce } from "lodash";


export const ProjectAdd = () => {
    const navigate = useNavigate();

    const [project, setProject] = useState<Project>({
        name: "",
        description: "",
        start_date: new Date("2023-04-06T12:00:00Z"),
        percent_complete: 0,
        language: "",
    });

    const addProject = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            console.log(project);
            await axios.post(`${BACKEND_API_URL}/projects/`, project);
            navigate("/projects");
        } catch (error) {
            console.log(error);
        }
    };

    const [percentError, setPercentError] = useState('');
    function handlePercentChange(event: any) {
        const input = event.target.value;
        const regex = /^\d{1,3}$/;
        if (regex.test(input))
            if (parseInt(input) < 0 || parseInt(input) > 100) {

                setPercentError("The percent must be between 0 and 100");
            } else {
                setPercentError('');
                setProject({ ...project, percent_complete: input });
            }
        else {
            setPercentError('Invalid percent!');
        }
    }

    const [startDateError, setStartDateError] = useState('');
    function handleDateChange(event: any) {
        const input = event.target.value;
        const regex = /^\d{4}-\d{1,2}-\d{1,2}$/;
        if (regex.test(input)) {
            setStartDateError('');
            setProject({ ...project, start_date: input });
        }
        else {
            setStartDateError('The date format is: YYYY-MM-DD');
        }
    }

    return (
        <Container>
            <Card>
                <CardContent>
                    <Toolbar>
                        <IconButton component={Link} sx={{ mr: 3 }} to={`/projects`}>
                            <ArrowBackIcon />
                        </IconButton>{" "}
                    </Toolbar>
                    <form onSubmit={addProject}>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setProject({ ...project, name: event.target.value })}
                        />
                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setProject({ ...project, description: event.target.value })}
                        />
                        <TextField
                            id="start_date"
                            label="Start Date"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            // onChange={(event) => setProject({
                            //     ...project,
                            //     start_date: new Date(event.target.value)
                            // })}
                            onChange={handleDateChange}
                            error={!!startDateError}
                            helperText={startDateError}
                        />
                        <TextField
                            id="percent_complete"
                            label="Percent Complete"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            // onChange={(event) => setProject({ ...project, percent_complete: parseInt(event.target.value) })}
                            onChange={handlePercentChange}
                            error={!!percentError}
                            helperText={percentError}
                        />

                        <TextField
                            id="language"
                            label="Language"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setProject({ ...project, language: event.target.value })}
                        />

                        <Button type="submit">Add project</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};
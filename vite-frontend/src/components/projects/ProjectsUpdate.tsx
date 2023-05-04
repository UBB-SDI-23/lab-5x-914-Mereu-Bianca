import { Autocomplete, Button, Card, CardActions, CardContent, Container, FormLabel, IconButton, TextField, Toolbar, colors } from "@mui/material";
import axios, { toFormData } from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Project } from "../../models/Project";
import { useCallback, useEffect, useRef, useState } from "react";
import { Department } from "../../models/Department";
import { debounce } from "lodash";


export const UpdateProject = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState<Department[]>([]);

    const [project, setProject] = useState<Project>({
        id: parseInt(String(projectId)),
        name: "",
		description: "",
		start_date: new Date("2023-04-06T12:00:00Z"),
		percent_complete: 0,
		language: "",
    });

    const updateProject = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/projects/${projectId}/`, project);
            navigate("/projects");
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/projects");
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <Toolbar>
                        <IconButton component={Link} sx={{ mr: 3 }} to={`/projects`}>
                            <ArrowBackIcon />
                        </IconButton>{" "}
                    </Toolbar>
                    <form onSubmit={updateProject} style={{ display: "flex", flexDirection: "column", padding: "8px" }}>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Name
                            </FormLabel>
                            <TextField
                                id="name"
                                variant="outlined"
                                onChange={(event) => setProject({ ...project, name: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Description
                            </FormLabel>
                            <TextField
                                id="description"
                                variant="outlined"
                                onChange={(event) => setProject({ ...project, description: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Start date
                            </FormLabel>
                            <TextField
                                id="start_date"
                                variant="outlined"
                                onChange={(event) => setProject({ ...project, start_date: new Date(event.target.value) })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Percent Complete
                            </FormLabel>
                            <TextField
                                id="percent_complete"
                                variant="outlined"
                                onChange={(event) => setProject({ ...project, percent_complete: parseInt(event.target.value) })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Language
                            </FormLabel>
                            <TextField
                                id="language"
                                variant="outlined"
                                onChange={(event) => setProject({ ...project, language: event.target.value })}
                            />
                        </Container>


                    </form>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button type="submit" onClick={updateProject} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Update</Button>
                    <Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
}
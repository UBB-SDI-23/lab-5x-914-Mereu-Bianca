import { Autocomplete, Button, Card, CardActions, CardContent, Container, FormLabel, IconButton, TextField, Toolbar, colors } from "@mui/material";
import axios, { toFormData } from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCallback, useEffect, useRef, useState } from "react";
import { Department } from "../../models/Department";
import { debounce } from "lodash";


export const UpdateDepartment = () => {
    const { DepartmentId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [department, setDepartment] = useState<Department>({
        id: parseInt(String(DepartmentId)),
        name: "",
        description: "",
        budget: 0,
        location: "",
        number_of_positions: 0,
    });

    const updateDepartment = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/departments/${DepartmentId}/`, department);
            navigate("/departments");
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/departments");
    };


    const [numberOfPositionsError, setNumberOfPositionsError] = useState('');
    function handleNumberOfPositionsChange(event: any) {
        const input = event.target.value;
        const regex = /^\d{1,2}$/;
        if (regex.test(input) && input < 30) {
            setNumberOfPositionsError('');
            setDepartment({ ...department, number_of_positions: input });
        }
        else {
            setNumberOfPositionsError('The number of positions must be between 0 and 30');
        }
    }

    const [budgetError, setBudgetError] = useState('');
    function handleBudgetChange(event: any) {
        const input = event.target.value;
        const regex = /^\d{5,6}$/;
        if (regex.test(input)) {
            setBudgetError('');
            setDepartment({ ...department, budget: input });
        }
        else {
            setBudgetError('The budget must be between 10000 and 1000000!');
        }
    }

    return (
        <Container>
            <Card>
                <CardContent>
                    <Toolbar>
                        <IconButton component={Link} sx={{ mr: 3 }} to={`/departments`}>
                            <ArrowBackIcon />
                        </IconButton>{" "}
                    </Toolbar>
                    <form onSubmit={updateDepartment} style={{ display: "flex", flexDirection: "column", padding: "8px" }}>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Name
                            </FormLabel>
                            <TextField
                                id="name"
                                variant="outlined"
                                onChange={(event) => setDepartment({ ...department, name: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Description
                            </FormLabel>
                            <TextField
                                id="description"
                                variant="outlined"
                                // onChange={(event) => setDepartment({ ...department, description: event.target.value })}
                                onChange={handleBudgetChange}
                                error={!!budgetError}
                                helperText={budgetError}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Budget
                            </FormLabel>
                            <TextField
                                id="budget"
                                variant="outlined"
                                onChange={(event) => setDepartment({ ...department, budget: parseInt(event.target.value) })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Number of Positions
                            </FormLabel>
                            <TextField
                                id="number_of_positions"
                                variant="outlined"
                                // onChange={(event) => setDepartment({ ...department, number_of_positions: parseInt(event.target.value) })}
                                onChange={handleNumberOfPositionsChange}
                                error={!!numberOfPositionsError}
                                helperText={numberOfPositionsError}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Location
                            </FormLabel>
                            <TextField
                                id="location"
                                variant="outlined"
                                onChange={(event) => setDepartment({ ...department, location: event.target.value })}
                            />
                        </Container>

                    </form>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button type="submit" onClick={updateDepartment} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Update</Button>
                    <Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
}
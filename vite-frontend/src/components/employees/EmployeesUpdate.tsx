import { Button, Card, CardActions, CardContent, Container, FormLabel, IconButton, TextField, Toolbar, colors } from "@mui/material";
import axios, { toFormData } from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Employee } from "../../models/Employee";
import { useEffect, useState } from "react";


export const UpdateEmployee = () => {
    const { employeeId } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState<Employee>({
        id: parseInt(String(employeeId)),
        first_name: "",
        last_name: "",
        employment_start_date: new Date("2023-04-06T12:00:00Z"),
        salary: 0,
        status: "",
    });

    const updateEmployee = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/employees/${employeeId}/`, employee);
            navigate("/employees");
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/employees");
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <Toolbar>
                        <IconButton component={Link} sx={{ mr: 3 }} to={`/employees`}>
                            <ArrowBackIcon />
                        </IconButton>{" "}
                    </Toolbar>
                    <form onSubmit={updateEmployee} style={{ display: "flex", flexDirection: "column", padding: "8px" }}>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                First name
                            </FormLabel>
                            <TextField
                                id="first_name"
                                // label="First Name"
                                variant="outlined"
                                onChange={(event) => setEmployee({ ...employee, first_name: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Last name
                            </FormLabel>
                            <TextField
                                id="last_name"
                                variant="outlined"
                                // generate the same code for onChange, but can you convert the string to int?
                                onChange={(event) => setEmployee({ ...employee, last_name: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Employment start date
                            </FormLabel>
                            <TextField
                                id="employment_start_date"
                                variant="outlined"
                                onChange={(event) => setEmployee({ ...employee, employment_start_date: new Date(event.target.value) })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Salary
                            </FormLabel>
                            <TextField
                                id="salary"
                                variant="outlined"
                                onChange={(event) => setEmployee({ ...employee, salary: parseInt(event.target.value) })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Status
                            </FormLabel>
                            <TextField
                                id="status"
                                variant="outlined"
                                onChange={(event) => setEmployee({ ...employee, status: event.target.value })}
                            />
                        </Container>

                    </form>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button type="submit" onClick={updateEmployee} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Update</Button>
                    <Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
}
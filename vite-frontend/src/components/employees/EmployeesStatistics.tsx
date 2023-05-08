import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { BACKEND_API_URL } from "../../constants";
import { Employee } from "../../models/Employee";


export const EmployeesStatistics1 = () => {
    const[loading, setLoading] = useState(true)
    const [employees, setEmployees] = useState([]);
    const totalPages = Math.ceil(1000000 / 100);

    useEffect(() => {
    fetch(`${BACKEND_API_URL}/employees-ordered-by-hours-worked`)
        .then(res => res.json())
        .then(data => {setEmployees(data.results); setLoading(false);})
    }, []);

    console.log(employees);

    
    return (
    <Container>
        <h1 style={{marginTop:"65px"}}>All employees ordered by the sum of hours worked</h1>

        {loading && <CircularProgress />}

        {!loading && employees.length == 0 && <div>No employees found</div>}

        {!loading && employees.length > 0 && (

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>First Name</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Nast Name</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Sum Hours Worked</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employees:Employee, index) => (
                            <TableRow key={employees.id}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{employees.first_name}</TableCell>
                                <TableCell align="center">{employees.last_name}</TableCell>
                                <TableCell align="center">{employees.sum_hours_worked}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                </Table>
            </TableContainer>
        )
        }
    </Container>
        
    );       
};


export const EmployeesStatistics2 = () => {
    const[loading, setLoading] = useState(true)
    const [employees, setEmployees] = useState([]);
    const totalPages = Math.ceil(1000000 / 100);

    useEffect(() => {
    fetch(`${BACKEND_API_URL}/employees-ordered-by-avg-percent-complete`)
        .then(res => res.json())
        .then(data => {setEmployees(data.results); setLoading(false);})
    }, []);

    console.log(employees);

    
    return (
    <Container>
        <h1 style={{marginTop:"65px"}}>All employees ordered by the sum of hours worked</h1>

        {loading && <CircularProgress />}

        {!loading && employees.length == 0 && <div>No employees found</div>}

        {!loading && employees.length > 0 && (

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>First Name</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Nast Name</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Sum Project Complete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employees:Employee, index) => (
                            <TableRow key={employees.id}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{employees.first_name}</TableCell>
                                <TableCell align="center">{employees.last_name}</TableCell>
                                <TableCell align="center">{employees.sum_project_complete}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                </Table>
            </TableContainer>
        )
        }
    </Container>
        
    );       
};
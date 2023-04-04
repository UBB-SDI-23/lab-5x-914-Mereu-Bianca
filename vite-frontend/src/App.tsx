import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppHome } from "./components/AppHome";
import { AppMenu } from "./components/AppMenu";
import { AllEmployees } from './components/employees/EmployeesGetAll';
import { EmployeeDetails } from './components/employees/EmployeesDetails';
import { EmployeeAdd } from './components/employees/EmployeesAdd';
import { EmployeeDelete } from './components/employees/EmployeesDelete';
import { UpdateEmployee } from './components/employees/EmployeesUpdate';
import { EmployeesFilter } from './components/employees/EmployeesFilter';

function App() {
  return (
		<React.Fragment>
			<Router>
				<AppMenu />

				<Routes>
					<Route path="/" element={<AppHome />} />
					<Route path="/employees" element={<AllEmployees />} />
					<Route path="/employees/:employeeId/details" element={<EmployeeDetails />} />
					<Route path="/employees/:employeeId/edit" element={<UpdateEmployee />} />
					<Route path="/employees/:employeeId/delete" element={<EmployeeDelete />} />
					<Route path="/employees/add" element={<EmployeeAdd />} /> 
					<Route path="/employees-ordered-by-hours-worked" element={<EmployeesFilter />} />
				</Routes>
			</Router> 
		</React.Fragment>
	);
}

export default App;

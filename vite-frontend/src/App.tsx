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
import { EmployeesStatistics1, EmployeesStatistics2 } from './components/employees/EmployeesStatistics';
import { AllProjects } from './components/projects/ProjectsGetAll';
import { ProjectAdd } from './components/projects/ProjectsAdd';
import { ProjectDelete } from './components/projects/ProjectsDelete';
import { ProjectDetails } from './components/projects/ProjectsDetails';
import { UpdateProject } from './components/projects/ProjectsUpdate';
import { AllEmployeeProjects } from './components/employeeprojects/EmployeeProjectGetAll';
import { EmployeeProjectAdd } from './components/employeeprojects/EmployeeProjectAdd';
import { EmployeeProjectDelete } from './components/employeeprojects/EmployeeProjectDelete';
import { UpdateEmployeeProject } from './components/employeeprojects/EmployeeProjectUpdate';
import { EmployeeProjectDetails } from './components/employeeprojects/EmployeeProjectDetails';
import { DepartmentAdd } from './components/departments/DepartmentsAdd';
import { AllDepartments } from './components/departments/DepartmentsGetAll';
import { UpdateDepartment } from './components/departments/DepartmentsUpdate';
import { DepartmentDelete } from './components/departments/DepartmentsDelete';
import { DepartmentDetails } from './components/departments/DepartmentsDetails';


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
					<Route path="/employees-ordered-by-hours-worked" element={<EmployeesStatistics1 />} />
					<Route path="/employees-ordered-by-avg-percent-complete" element={<EmployeesStatistics2 />} />

					<Route path="/projects" element={<AllProjects />} />
					<Route path="/projects/:projectId/details" element={<ProjectDetails />} />
					<Route path="/projects/:projectId/edit" element={<UpdateProject />} />
					<Route path="/projects/:projectId/delete" element={<ProjectDelete />} />
					<Route path="/projects/add" element={<ProjectAdd />} /> 

					<Route path="/employeeprojects" element={<AllEmployeeProjects />} />
					<Route path="/employeeprojects/:employeeProjectId/details" element={<EmployeeProjectDetails />} />
					<Route path="/employeeprojects/:employeeProjectId/edit" element={<UpdateEmployeeProject />} />
					<Route path="/employeeprojects/:employeeProjectId/delete" element={<EmployeeProjectDelete />} />
					<Route path="/employeeprojects/add" element={<EmployeeProjectAdd />} />

					<Route path="/departments" element={<AllDepartments />} />
					<Route path="/departments/:DepartmentId/details" element={<DepartmentDetails />} />
					<Route path="/departments/:DepartmentId/edit" element={<UpdateDepartment />} />
					<Route path="/departments/:DepartmentId/delete" element={<DepartmentDelete />} />
					<Route path="/departments/add" element={<DepartmentAdd />} />
				</Routes>
			</Router> 
		</React.Fragment>
	);
}

export default App;

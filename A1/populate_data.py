from faker import Faker

if __name__ == '__main__':

    fake = Faker()

    batch_size = 1000
    with open('employees.sql', 'w') as file:

        sql =  "TRUNCATE TABLE employees_projectemployee RESTART IDENTITY CASCADE;\n \
                TRUNCATE TABLE employees_project RESTART IDENTITY CASCADE;\n \
                TRUNCATE TABLE employees_employeedetail RESTART IDENTITY CASCADE;\n \
                TRUNCATE TABLE employees_employee RESTART IDENTITY CASCADE;\n \
                TRUNCATE TABLE employees_department RESTART IDENTITY CASCADE;\n "
        file.write(sql + "\n")

        for i in range(0, 1000000, 1000):
            departments = []
            for j in range(i, i + 1000):
                name = fake.random_element(elements=("Marketing", "Legal", "Administrative", "Development", "Leadership",
                                                    "Production", "Research and Development", "Accounting and Finance",
                                                    "IT", "Human Resources"))
                description = fake.sentence()
                number_of_positions = fake.random_int(min=10, max=30)
                location = fake.address()
                budget = fake.random_int(min=10000, max=50000)
                departments.append(f"('{name}', '{description}', '{number_of_positions}', '{location}', '{budget}')")
            data = f"INSERT INTO employees_department (name, description, number_of_positions, location, budget) VALUES {','.join(departments)};"
            file.write(data + "\n")

        print("Departments added")

        for i in range(0, 1000000, 1000):
            employees = []
            for j in range(i, i + 1000):
                first_name = fake.first_name()
                last_name = fake.last_name()
                employment_start_date = fake.date_between(start_date='-12y', end_date='today')
                salary = fake.random_int(min=2000, max=10000)
                status = fake.random_element(elements=("active", "vacation", "probation", "suspended", "retired"))
                department = fake.random_int(min=1, max=1000000)
                employees.append(f"('{first_name}', '{last_name}', '{employment_start_date}', '{salary}', '{status}', '{department}')")
            data = f"INSERT INTO employees_employee (first_name, last_name, employment_start_date, salary, status, department) VALUES {','.join(employees)};"
            file.write(data + "\n")

        print("Employees added")

        for i in range(0, 1000000, 1000):
            employee_details = []
            for j in range(i, i+1000):
                email = fake.email()
                phone_number = fake.numerify(text='###-###')
                address = fake.address()
                birth_date = fake.date_of_birth(minimum_age=18)
                employee = fake.random_int(min=1, max=1000000)
                employee_details.append(f"('{email}', '{phone_number}', '{address}', '{birth_date}', '{employee}')")
            data = f"INSERT INTO employees_employeedetail (email, phone_number, address, birth_date, employee) VALUES {','.join(employee_details)};"
            file.write(data + "\n")

        print("Employee details added")

        pairs = set()
        nr = 10000000

        for i in range(10000):
            if i % 1000 == 0:
                print(f'{i * 1000} done')

            employee = fake.random_int(min=i * 100 + 1, max=(i + 1) * 100)
            employees_projects = []
            for j in range(1000):
                project = fake.random_int(min=j * 1000 + 1, max=(j + 1) * 1000)
                role = fake.random_element(elements=("Manager", "Team Leader", "Business Analyst", "Developer",
                                                    "Quality Assurance", "Technical Writer", "UX/UI Designer"))
                hours_worked = fake.random_int(min=4, max=12)
                employees_projects.append(f"('{employee}', '{project}', '{role}', '{hours_worked}')")
            data = f"INSERT INTO employees_projectemployee (employee, project, role, hours_worked) VALUES {','.join(employees_projects)};"
            file.write(data + "\n")

        print("EmployeesProjects added")

       # sql = f"ALTER TABLE employees_employee ADD CONSTRAINT fk_employees_department_id FOREIGN KEY(department_id) REFERENCES employees_department(id);\n \
       #         ALTER TABLE employees_projectemployee ADD CONSTRAINT fk_employees_project_id FOREIGN KEY(project_id) REFERENCES employees_project(id);\n \
       #         ALTER TABLE employees_projectemployee ADD CONSTRAINT fk_employees_employee_id FOREIGN KEY(employee_id) REFERENCES employees_employee(id);\n \
       #         CREATE INDEX employee_department_id_idx ON employees_employee(department_id);\n \
       #         CREATE INDEX employeeproject_employee_id_idx ON employees_employeeproject(employee_id);\n \
       #         CREATE INDEX employeeproject_project_id_idx ON employees_employeeproject(project_id);\n "
       # file.write(sql + "\n")


from faker import Faker

if __name__ == '__main__':

    fake = Faker()

    batch_size = 1000
    with open('employees.sql', 'w') as file:

        sql =  "TRUNCATE TABLE employee_register_employeeproject RESTART IDENTITY CASCADE;\n \
                TRUNCATE TABLE employee_register_project RESTART IDENTITY CASCADE;\n \
                TRUNCATE TABLE employee_register_employeedetails RESTART IDENTITY CASCADE;\n \
                TRUNCATE TABLE employee_register_employee RESTART IDENTITY CASCADE;\n \
                TRUNCATE TABLE employee_register_department RESTART IDENTITY CASCADE;\n "
               # ALTER TABLE employee_register_employeeproject DROP CONSTRAINT employee_register_em_project_id_9af26355_fk_employee_;\n \
               # ALTER TABLE employee_register_employeeproject DROP CONSTRAINT employee_register_em_employee_id_36bf3f97_fk_employee_;\n \
               # DROP INDEX employee_register_employeeproject_employee_id_36bf3f97;\n \
               # DROP INDEX employee_register_employeeproject_project_id_9af26355;\n"
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
            data = f"INSERT INTO employee_register_department (name, description, number_of_positions, location, budget) VALUES {','.join(departments)};"
            file.write(data + "\n")

        print("Departments added")
        file.write("SELECT 'departments done!' as msg;\n")

        for i in range(0, 1000000, 1000):
            employees = []
            for j in range(i, i + 1000):
                first_name = fake.first_name()
                last_name = fake.last_name()
                employment_start_date = fake.date_between(start_date='-12y', end_date='today')
                salary = fake.random_int(min=2000, max=10000)
                status = fake.random_element(elements=("active", "vacation", "probation", "suspended", "retired"))
                department_id = fake.random_int(min=1, max=1000000)
                employees.append(f"('{first_name}', '{last_name}', '{employment_start_date}', '{salary}', '{status}', '{department_id}')")
            data = f"INSERT INTO employee_register_employee (first_name, last_name, employment_start_date, salary, status, department_id) VALUES {','.join(employees)};"
            file.write(data + "\n")

        print("Employees added")
        file.write("SELECT 'employees done!' as msg;\n")

        for i in range(0, 1000000, 1000):
            employee_details = []
            for j in range(i, i+1000):
                email = fake.email()
                phone_number = fake.numerify(text='###-###')
                address = fake.address()
                birth_date = fake.date_of_birth(minimum_age=18)
                employee_id = fake.random_int(min=1, max=1000000)
                employee_details.append(f"('{email}', '{phone_number}', '{address}', '{birth_date}', '{employee_id}')")
            data = f"INSERT INTO employee_register_employeedetails (email, phone_number, address, birth_date, employee_id) VALUES {','.join(employee_details)};"
            file.write(data + "\n")

        print("Employee details added")
        file.write("SELECT 'employee details  done!' as msg;\n")

        for i in range(0, 1000000, 1000):
            projects = []
            for j in range(1, 1+1000):
                name = fake.name()
                description = fake.text(max_nb_chars=250)
                language = fake.random_element(elements=("C++", "Java", "Assembly", "Python", "C", "C#", "JavaScript", "PHP", "Ruby", "TypeScript"))
                start_date = fake.date_between(start_date='-2y', end_date='today')
                percent_complete = fake.random_int(min=1, max=100)
                projects.append(f"('{name}', '{description}', '{language}', '{start_date}', '{percent_complete}')")
            data = f"INSERT INTO employee_register_project (name, description, language, start_Date, percent_complete) VALUES {','.join(projects)};"
            file.write(data + "\n")
        print("Projects added")
        file.write("SELECT 'projects done!' as msg;\n")

        nr = 10000000

        for i in range(10000):
            if i % 1000 == 0:
                print(f'{i * 1000} done')

            employee_id = fake.random_int(min=i * 100 + 1, max=(i + 1) * 100)
            employees_projects = []
            for j in range(1000):
                project_id = fake.random_int(min=j * 1000 + 1, max=(j + 1) * 1000)
                role = fake.random_element(elements=("Manager", "Team Leader", "Business Analyst", "Developer",
                                                    "Quality Assurance", "Technical Writer", "UX/UI Designer"))
                hours_worked = fake.random_int(min=4, max=12)
                employees_projects.append(f"('{employee_id}', '{project_id}', '{role}', '{hours_worked}')")
            data = f"INSERT INTO employee_register_employeeproject (employee_id, project_id, role, hours_worked) VALUES {','.join(employees_projects)};"
            file.write(data + "\n")

        print("EmployeesProjects added")
        file.write("SELECT 'all done!' as msg;\n")
        #sql = f"ALTER TABLE employee_register_employeeproject ADD CONSTRAINT employee_register_em_project_id_9af26355_fk_employee FOREIGN KEY(project_id) REFERENCES employee_register_project(id);\n \
        #      ALTER TABLE employee_register_employeeproject ADD CONSTRAINT employee_register_em_employee_id_36bf3f97_fk_employee_ FOREIGN KEY(employee_id) REFERENCES employee_register_employee(id);\n \
        #      CREATE INDEX employee_register_employeeproject_employee_id_36bf3f97 ON employee_register_employeeproject(employee_id);\n \
        #      CREATE INDEX employee_register_employeeproject_project_id_9af26355 ON employee_register_employeeproject(project_id);\n "
        #file.write(sql + "\n")


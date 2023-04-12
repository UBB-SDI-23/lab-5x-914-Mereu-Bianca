from django.db import models

# Create your models here.


class Department(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    number_of_positions = models.IntegerField()
    location = models.CharField(max_length=100)
    lead_id = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Employee(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employment_start_date = models.DateTimeField(null=True)
    salary = models.IntegerField(null=True)
    status = models.CharField(max_length=100, null=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True, related_name='employees')
    projects = models.ManyToManyField('Project', through='EmployeeProject')

    def __str__(self):
        return self.id.__str__() + " " + self.first_name + " " + self.last_name


class EmployeeDetails(models.Model):
    email = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)
    address = models.CharField(max_length=100, default="")
    birth_date = models.DateTimeField()
    employee = models.OneToOneField(Employee, on_delete=models.CASCADE, primary_key=True)


class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    language = models.CharField(max_length=100)
    start_date = models.DateTimeField()
    percent_complete = models.IntegerField()
    employees = models.ManyToManyField(Employee, through='EmployeeProject')

    def __str__(self):
        return self.name


class EmployeeProject(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    role = models.CharField(max_length=100)
    hours_worked = models.IntegerField()

    class Meta:
        unique_together = ('employee', 'project')

    def __str__(self):
        return f"{self.employee.first_name} - {self.project.name}"




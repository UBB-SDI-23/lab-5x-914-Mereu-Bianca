from collections import OrderedDict

from django.test import TestCase

from employee_register.models import Department, Employee, EmployeeProject, Project
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from employee_register.serializer import DepartmentSerializerList


class OrderedEmployeesTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        Project.objects.create(name="p1", description="p1", percent_complete=1, language="",
                               start_date="2019-10-10 10:10")
        Employee.objects.create(first_name="a", last_name="a")
        Employee.objects.create(first_name="b", last_name="b")
        EmployeeProject.objects.create(employee_id=1, project_id=1, role="j", hours_worked=10)
        EmployeeProject.objects.create(employee_id=2, project_id=1, role="j", hours_worked=5)

    def test_employees_ordered_by_hours_worked(self):
        url = reverse("employees-ordered-by-hours-worked")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        expected_data = [OrderedDict([('id', 2), ('first_name', 'b'), ('last_name', 'b'), ('department', None), ('sum_hours_worked', 5)]),
                         OrderedDict([('id', 1), ('first_name', 'a'), ('last_name', 'a'), ('department', None), ('sum_hours_worked', 10)])]
        self.assertEqual(response.data, expected_data)

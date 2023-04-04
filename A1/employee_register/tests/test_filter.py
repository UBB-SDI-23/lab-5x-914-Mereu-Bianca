from collections import OrderedDict

from django.test import TestCase
from rest_framework.test import APITestCase
from employee_register.models import Department, Employee, EmployeeProject, Project
from django.urls import reverse
from rest_framework import status
from employee_register.serializer import DepartmentSerializerList


class FilterDepartmentTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        Department.objects.create(name='Department 1', description='Description 1',
                                  number_of_positions=10, location='Location 1', lead_id=1)
        Department.objects.create(name='Department 2', description='Description 2',
                                  number_of_positions=10, location='Location 1', lead_id=1)
        Department.objects.create(name='Department 3', description='Description 3',
                                  number_of_positions=1, location='Location 1', lead_id=1)

    def test_department_filter_api(self):
        url = reverse("departments-filter-api", kwargs={'pk': 5})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print(response.data)
        expected_data = [OrderedDict([('id', 1), ('name', 'Department 1'), ('description', 'Description 1'), ('number_of_positions', 10), ('location', 'Location 1'), ('lead_id', '1')]),
                         OrderedDict([('id', 2), ('name', 'Department 2'), ('description', 'Description 2'), ('number_of_positions', 10), ('location', 'Location 1'), ('lead_id', '1')])]
        self.assertEqual(response.data, expected_data)

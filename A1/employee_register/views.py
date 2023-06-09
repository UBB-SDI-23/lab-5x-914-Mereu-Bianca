from django.http import Http404
from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, generics
from .models import Employee
from .serializer import *
from rest_framework import (viewsets, filters, status, )
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.db.models import Avg, Max, Sum, Q, Count
from rest_framework.pagination import PageNumberPagination


class MyPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10
    page_query_param = 'p'


class DepartmentFilter(ModelViewSet):
    serializer_class = DepartmentSerializerList

    def get_queryset(self):
        queryset = Department.objects.all()
        positions_value = self.request.query_params.get('number_of_positions')
        if positions_value:
            queryset = queryset.filter(number_of_positions__gt=positions_value)
        return queryset


class DepartmentFilterAPI(generics.ListAPIView):
    serializer_class = DepartmentSerializerList

    def get_queryset(self):
        positions_value = self.kwargs['pk']
        return Department.objects.filter(number_of_positions__gt=positions_value)


class EmployeeList(generics.ListCreateAPIView):
    serializer_class = EmployeeSerializer2
    queryset = Employee.objects.annotate(nr_of_projects=Count('project')).order_by('id')
    pagination_class = MyPagination


class EmployeeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer2


class DepartmentList(generics.ListCreateAPIView):
    serializer_class = DepartmentSerializerList
    queryset = Department.objects.all()
    pagination_class = MyPagination


class DepartmentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class ProjectList(generics.ListCreateAPIView):

    serializer_class = ProjectSerializerList
    queryset = Project.objects.annotate(nr_of_employees=Count('employee')).order_by('id')
    pagination_class = MyPagination


class EmployeeProjectsList(generics.ListCreateAPIView):
    serializer_class = EmployeeProjectSerializer2
    queryset = EmployeeProject.objects.all()
    pagination_class = MyPagination


class EmployeeProjectsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployeeProject.objects.all()
    serializer_class = EmployeeProjectSerializer2


class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class EmployeeDetailsList(generics.ListCreateAPIView):
    queryset = EmployeeDetails.objects.all()
    serializer_class = EmployeeDetailsSerializerList


class EmployeeDetailsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployeeDetails.objects.all()
    serializer_class = EmployeeDetailsSerializer


# class EmployeeProjectList(generics.ListCreateAPIView):
#     queryset = EmployeeProject.objects.all()
#     serializer_class = EmployeeProjectSerializerList


class ProjectsForEmployeeList(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EmployeeProjectSerializerList

    def get_queryset(self):
        pk = self.kwargs['pk']
        query = EmployeeProject.objects.filter(employee_id=pk)
        return query


class MultipleEmployeesForDepartmentList(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DepartmentEmployeeSerializer
    queryset = Department.objects.all()


class MultipleEmployeesForDepartmentList2(APIView):
    serializer_class = DepartmentSerializer

    def get(self, request, *args, **kwargs):
        department_id = kwargs['pk']
        department = Department.objects.get(id=department_id)
        serializer = self.serializer_class(department)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        department_id = kwargs['pk']
        employee_ids = request.data.get('employees', [])
        department = Department.objects.get(id=department_id)
        employees = Employee.objects.filter(id__in=employee_ids)

        for employee in employees:
            employee.department = department
            employee.save()

        serializer = self.serializer_class(department)
        return Response(serializer.data)


class EmployeesForProjectList(generics.ListCreateAPIView):
    serializer_class = EmployeeProjectSerializerList

    def get_queryset(self):
        pk = self.kwargs['pk']
        query = EmployeeProject.objects.filter(project_id=pk)
        return query


class ProjectForEmployeeDetail(generics.ListCreateAPIView):
    serializer_class = EmployeeProjectSerializer

    def get_queryset(self):
        pk = self.kwargs['pk']
        second_pk = self.kwargs['second_pk']
        return EmployeeProject.objects.filter(employee_id=pk, project_id=second_pk)


class EmployeesByMaxHoursWorked(generics.ListCreateAPIView):
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        queryset = Employee.objects.annotate(sum_hours_worked=Sum('employeeproject__hours_worked')).order_by(
            'sum_hours_worked')
        return queryset


class EmployeesByAvgPercentComplete(generics.ListCreateAPIView):
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        queryset = Employee.objects.annotate(sum_project_complete=Sum('employeeproject__project__percent_complete')).order_by(
            'sum_project_complete')
        return queryset


class DepartmentsForAutocomplete(APIView):
    # queryset = Department.objects.all()
    serializer_class = DepartmentSerializerWithoutEmployee

    def get(self, request, *args, **kwargs):
        query = request.GET.get('query')
        departments = Department.objects.filter(name__icontains=query).order_by('name')[:20]
        serializer = DepartmentSerializerWithoutEmployee(departments, many=True)
        return Response(serializer.data)

class EmployeesForAutocomplete(APIView):
    # queryset = Department.objects.all()
    serializer_class = EmployeeSimpleSerializer

    def get(self, request, *args, **kwargs):
        query = request.GET.get('query')
        employees = Employee.objects.filter(first_name__icontains=query).order_by('first_name')[:20]
        serializer = EmployeeSimpleSerializer(employees, many=True)
        return Response(serializer.data)

class ProjectsForAutocomplete(APIView):
    # queryset = Department.objects.all()
    serializer_class = ProjectSimpleSerializer

    def get(self, request, *args, **kwargs):
        query = request.GET.get('query')
        departments = Project.objects.filter(name__icontains=query).order_by('name')[:20]
        serializer = ProjectSimpleSerializer(departments, many=True)
        return Response(serializer.data)
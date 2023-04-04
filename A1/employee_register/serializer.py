from datetime import datetime as dt

from rest_framework.serializers import ModelSerializer, SerializerMethodField, \
    HyperlinkedModelSerializer, PrimaryKeyRelatedField, IntegerField, ValidationError
from .models import *


class DepartmentSerializerList(ModelSerializer):
    def validate(self, data):
        if data['number_of_positions'] < 0:
            raise ValidationError("The nr of positions must be greater than 0")
        return data

    class Meta:
        model = Department
        fields = ['id', 'name', 'description', 'number_of_positions', 'location', 'lead_id']


class EmployeeSerializer(ModelSerializer):
    sum_hours_worked = IntegerField(read_only=True)
    sum_project_complete = IntegerField(read_only=True)
    department = DepartmentSerializerList

    class Meta:
        model = Employee
        fields = ['id', 'first_name', 'last_name', 'department', 'sum_hours_worked', 'sum_project_complete']


class EmployeeSimpleSerializer(ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'department')


class DepartmentEmployeeSerializer(ModelSerializer):
    employees = EmployeeSerializer(many=True)

    class Meta:
        model = Department
        fields = ['id', 'name', 'employees']

    def update(self, instance, validated_data):
        employees_data = validated_data.get('employees')
        employees = (instance.employees).all()
        employees = list(employees)

        print(validated_data.get('employees'))
        print(instance.id)

        for employee_data in employees_data:  # set the dep to the current one to the employees given
            # print(employee_data.key)
            employee_f_name = employee_data.pop('first_name')  # retrieve the employee's first_name
            employee = Employee.objects.get(first_name=employee_f_name)
            for key, value in employee_data.items():
                setattr(employee, key, value)  # update the employee's fields with new data
            setattr(employee, 'department', Department.objects.get(id=instance.id))
            employee.save()

        return instance


class EmployeeSerializerList(ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'first_name', 'last_name', 'department']


class DepartmentSerializer(ModelSerializer):
    employees = EmployeeSerializerList(many=True, read_only=True)

    def validate(self, data):
        if data['number_of_positions'] < 0:
            raise ValidationError("The nr of positions must be greater than 0")
        return data

    class Meta:
        model = Department
        fields = ['id', 'name', 'description', 'number_of_positions', 'location', 'lead_id', 'employees']


class EmployeeDetailsSerializer(ModelSerializer):
    employee = EmployeeSerializer(read_only=True)

    def validate(self, data):
        if "@" not in data['email']:
            raise ValidationError("The email is not correct!")
        return data

    class Meta:
        model = EmployeeDetails
        fields = ['employee', 'email', 'phone_number', 'address', 'birth_date']


class EmployeeDetailsSerializerList(ModelSerializer):
    def validate(self, data):
        if "@" not in data['email']:
            raise ValidationError("The email is not correct!")
        return data

    class Meta:
        model = EmployeeDetails
        fields = '__all__'


class ProjectSerializer(ModelSerializer):
    employees = EmployeeSerializer(many=True, read_only=True)

    def validate(self, data):
        if data['percent_complete'] < 0 or data['percent_complete'] > 100:
            raise ValidationError("The percent must be between 0 and 100")
        return data

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'language', 'start_date', 'percent_complete', 'employees']


class ProjectSerializerList(ModelSerializer):
    def validate(self, data):
        if data['percent_complete'] < 0 or data['percent_complete'] > 100:
            raise ValidationError("The percent must be between 0 and 100")
        return data

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'language', 'start_date', 'percent_complete']


class EmployeeProjectSerializerList(ModelSerializer):
    class Meta:
        model = EmployeeProject
        fields = ['employee', 'project', 'role', 'hours_worked']


class EmployeeProjectSerializer(ModelSerializer):
    employee = EmployeeSerializerList
    project = ProjectSerializerList

    class Meta:
        model = EmployeeProject
        fields = ['id', 'employee', 'project', 'role', 'hours_worked']

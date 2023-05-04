from datetime import datetime as dt
from rest_framework import serializers
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
        fields = ['id', 'name', 'description', 'number_of_positions', 'location', 'budget']


class ProjectSerializerList(ModelSerializer):
    nr_of_employees = serializers.IntegerField(read_only=True)
    def validate(self, data):
        if data['percent_complete'] < 0 or data['percent_complete'] > 100:
            raise ValidationError("The percent must be between 0 and 100")
        return data

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'language', 'start_date', 'percent_complete', 'nr_of_employees']


class DepartmentSerializerWithoutEmployee(ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name', 'description', 'number_of_positions', 'location', 'budget']



class EmployeeSerializer(ModelSerializer):
    sum_hours_worked = IntegerField(read_only=True)
    sum_project_complete = IntegerField(read_only=True)
    department = DepartmentSerializerWithoutEmployee(read_only=True)
    projects = ProjectSerializerList(many=True, read_only=True)

    class Meta:
        model = Employee
        # fields = ['id', 'first_name', 'last_name', 'employment_start_date',  'salary', 'department', 'sum_hours_worked', 'sum_project_complete']
        fields = "__all__"

class EmployeeSimpleSerializer(ModelSerializer):
    class Meta:
        model = Employee
        # fields = ('id', 'first_name', 'last_name', 'employment_start_date',  'salary', 'department')
        fields = "__all__"


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
        fields = ['id', 'first_name', 'last_name', 'employment_start_date',  'salary', 'status', 'department']
        # fields = "__all__"


class DepartmentSerializer(ModelSerializer):
    employees = EmployeeSerializerList(many=True, read_only=True)

    def validate(self, data):
        if data['number_of_positions'] < 0:
            raise ValidationError("The nr of positions must be greater than 0")
        return data

    class Meta:
        model = Department
        fields = ['id', 'name', 'description', 'number_of_positions', 'location', 'budget', 'employees']


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

class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        kwargs.pop('fields', None)
        include_fields = kwargs.pop('include_fields', None)
        exclude_fields = kwargs.pop('exclude_fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if include_fields is not None:
            for field in include_fields:
                self.fields.append(field)
        if exclude_fields is not None:
            for field in exclude_fields:
                split = field.split('__')
                to_access = self.fields
                for i in range(len(split)-1):
                    to_access = to_access.get(split[i])
                if isinstance(to_access, serializers.ListSerializer):
                    to_access = to_access.child
                to_access.fields.pop(split[-1])


class EmployeeSerializer2(DynamicFieldsModelSerializer):
    department_id = serializers.IntegerField(write_only=True)
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    employment_start_date = serializers.DateTimeField()
    salary = serializers.IntegerField()
    status = serializers.CharField(max_length=255)
    department = DepartmentSerializer(read_only=True)
    projects = ProjectSerializer(many=True, read_only=True)
    sum_hours_worked = serializers.IntegerField(read_only=True)
    sum_project_complete = serializers.IntegerField(read_only=True)
    nr_of_projects = serializers.IntegerField(read_only=True)

    def validate_department_id(self, value):
        filter = Department.objects.filter(id=value)
        if not filter.exists():
            raise serializers.ValidationError("Department does not exist")
        return value

    class Meta:
        model = Employee
        fields = ['id', 'first_name', 'last_name', 'employment_start_date',  'salary', 'status',
                 'department_id', 'department', 'sum_hours_worked', 'sum_project_complete', 'projects', 'nr_of_projects']

class   EmployeeProjectSerializer2(DynamicFieldsModelSerializer):
    employee_id = serializers.IntegerField(write_only=True)
    project_id = serializers.IntegerField(write_only=True)
    employee = EmployeeSerializer(read_only=True)
    project = ProjectSerializer(read_only=True)

    def validate_employee_id(self, value):
        filter = Employee.objects.filter(id=value)
        if not filter.exists():
            raise serializers.ValidationError("Employee does not exist")
        return value

    def validate_project_id(self, value):
        filter = Project.objects.filter(id=value)
        if not filter.exists():
            raise serializers.ValidationError("Project does not exist")
        return value

    class Meta:
        model = EmployeeProject
        fields = ['id', 'role', 'hours_worked', 'employee', 'project', 'employee_id', 'project_id']


class ProjectSimpleSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

from rest_framework.routers import DefaultRouter
from .views import *
from django.urls import path, include
from rest_framework import routers
from employee_register.views import *

router = routers.DefaultRouter()
# router.register(r'employee', EmployeeViewSet)
# router.register(r'department', DepartmentViewSet)
router.register(r'departments-filter', DepartmentFilter, basename='Department')
# router.register(r'employee/<int:pk>/project/<int:second_pk>/', ProjectForEmployeeDetail, basename='EmployeeProject')

urlpatterns = [
    path("employees/", EmployeeList.as_view()),
    path("employees/<int:pk>/", EmployeeDetail.as_view()),
    path("departments", DepartmentList.as_view()),
    path("departments/<int:pk>/", DepartmentDetail.as_view()),
    path("projects", ProjectList.as_view()),
    path("projects/<int:pk>/", ProjectDetail.as_view()),
    path("employee-details", EmployeeDetailsList.as_view()),
    path("employee-details/<int:pk>", EmployeeDetailsDetail.as_view()),
    path("departments-filter-api/<int:pk>/", DepartmentFilterAPI.as_view(), name="departments-filter-api"),
    path("employee/<int:pk>/projects", ProjectsForEmployeeList.as_view()),
    path("department/<int:pk>/employees", MultipleEmployeesForDepartmentList2.as_view(), name='department_employee'),
    path("project/<int:pk>/employees", EmployeesForProjectList.as_view()),
    path("employee/<int:pk>/project/<int:second_pk>/", ProjectForEmployeeDetail.as_view()),
    path("employees-ordered-by-hours-worked/", EmployeesByMaxHoursWorked.as_view(),
         name="employees-ordered-by-hours-worked"),
    path("employees-ordered-by-avg-percent-complete/", EmployeesByAvgPercentComplete.as_view()),
    path('', include(router.urls)),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

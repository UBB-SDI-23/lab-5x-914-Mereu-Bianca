# Generated by Django 4.1.7 on 2023-03-26 18:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('employee_register', '0005_employeedetails_employeeproject_employee_projects_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='address',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='email_name',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='phone_number',
        ),
    ]

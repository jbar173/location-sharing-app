# Generated by Django 3.1.6 on 2021-06-22 10:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=200)),
                ('latitude', models.DecimalField(decimal_places=10, max_digits=19)),
                ('longitude', models.DecimalField(decimal_places=10, max_digits=19)),
                ('date', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('location', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_location', to='api.location')),
            ],
        ),
    ]

from django.db import models

# Create your models here.


class Location(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return f"Latitude: {self.latitude}, Longitude: {self.longitude}."


class User(models.Model):
    name = models.CharField(max_length=50)
    location = models.ForeignKey(Location,on_delete=models.CASCADE,related_name="user")

    def __str__(self):
        return f"{self.name}, latest location: ({self.location.latitude}, {self.location.longitude})."

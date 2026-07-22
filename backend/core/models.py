from django.db import models

class SensorData(models.Model):
    device_id = models.CharField(max_length=50, default="SIMULATOR_001")
    temperature = models.FloatField(null=True, blank=True)
    humidity = models.FloatField(null=True, blank=True)
    smoke = models.IntegerField(null=True, blank=True)
    pm25 = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=20, default="active")
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']  
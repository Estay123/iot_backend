from rest_framework import serializers
from .models import SensorData

class SensorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorData
        fields = ['device_id', 'temperature', 'humidity', 'smoke', 'pm25', 'status', 'timestamp']
        read_only_fields = ['timestamp']
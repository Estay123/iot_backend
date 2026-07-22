from django.contrib import admin
from django.urls import path
from core.views import SensorDataListCreateView, monitor_dashboard

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/data/', SensorDataListCreateView, name='sensor-data'),
    path('monitor/', monitor_dashboard, name='monitor'),
]
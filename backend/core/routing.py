from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    # ❌ 错误写法：re_path(r'ws/data/$', consumers.DataConsumer),
    
    # ✅ 正确写法：后面必须加上 .as_asgi() ！！！
    re_path(r'ws/data/$', consumers.DataConsumer.as_asgi()),
]
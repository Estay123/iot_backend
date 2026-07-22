import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

# 1. 设置环境变量
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'my_iot_system.settings')

# 2. 【关键】先初始化 Django 的 HTTP ASGI 应用
# 这必须在导入 core.routing 之前执行，以确保 Django 环境完全加载
django_asgi_app = get_asgi_application()

import core.routing  # 现在导入你的路由

application = ProtocolTypeRouter({
    # 3. 【必须添加】处理普通 HTTP 请求（网页、API 等）
    "http": django_asgi_app,
    
    # 4. 处理 WebSocket 请求（IoT 设备连接）
    "websocket": AuthMiddlewareStack(
        URLRouter(
            core.routing.websocket_urlpatterns
        )
    ),
})
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render

# 🛡️ 导入 Django Channels 通道层和异步转同步工具
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from .models import SensorData
from .serializers import SensorDataSerializer

@csrf_exempt
@api_view(['GET', 'POST'])
def SensorDataListCreateView(request):
    if request.method == 'GET':
        # 获取最近的 20 条数据，按 ID 倒序排列，保证拿到最新记录
        data = SensorData.objects.all().order_by('-id')[:20]
        serializer = SensorDataSerializer(data, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SensorDataSerializer(data=request.data)
        if serializer.is_valid():
            # 1. 正常保存到 SQLite 数据库
            sensor_instance = serializer.save()
            
            # 2. ⚡ 核心：通过 WebSocket 将数据实时广播给 React
            channel_layer = get_channel_layer()
            
            # 🛡️ 加固防御：判断 channel_layer 是否成功被 Django 加载
            if channel_layer is not None:
                async_to_sync(channel_layer.group_send)(
                    'iot_data_group',  # 必须和 consumers.py 里的组名一致
                    {
                        'type': 'send_data',  # 对应 consumers.py 里的 send_data 方法
                        'data': serializer.data  # 直接把序列化后的 JSON 丢给 React
                    }
                )
                print("📡 WebSocket 数据广播成功！")
            else:
                # 如果控制台打印了这一句，说明 settings.py 里的 CHANNEL_LAYERS 还是没配对
                print("⚠️ 警告：channel_layer 为 None，请务必检查 settings.py 中 CHANNEL_LAYERS 的配置！")
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 专门用来渲染 HTML 页面的视图（如果你 React 是独立运行的，这个视图甚至可以不用）
def monitor_dashboard(request):
    return render(request, 'core/monitor.html')
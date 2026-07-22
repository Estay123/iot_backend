import json
from channels.generic.websocket import AsyncWebsocketConsumer

class DataConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = 'iot_data_group'
        # 加入组
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # 离开组
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    # 接收来自通道层广播的方法
    async def send_data(self, event):
        data = event['data']
        # 发送数据到 React 前端
        await self.send(text_data=json.dumps(data))
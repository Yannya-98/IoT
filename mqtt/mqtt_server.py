import paho.mqtt.client as mqtt
import time
import json
import mysql.connector
from datetime import datetime

host = "47.97.2.1"
port = 1883
db = mysql.connector.connect(
    host="47.97.2.1",  # 数据库主机地址
    user="root",  # 数据库用户名
    passwd="root",  # 数据库密码
    database="iot"  # 数据库名称
)


def server_start():
    client_id = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time()))
    client = mqtt.Client(client_id)  # ClientId不能重复，所以使用当前时间
    client.on_connect = on_connect
    client.on_message = on_message

    client.connect(host, port, 60)
    client.loop_forever()


def on_connect(client, user_data, flags, rc):
    print("Connected with result code " + str(rc))
    client.subscribe("testapp1")


def on_message(client, user_data, msg):
    msg_json = json.loads(msg.payload.decode("utf-8"))
    write_into_db(msg_json)


def write_into_db(msg_json):
    cursor = db.cursor()
    timestamp = datetime.fromtimestamp(msg_json["timestamp"] / 1000)  # 将timestamp转换为datetime类型
    msg_sql = "INSERT INTO `message` VALUES(null, '{}', '{}', {}, {}, {}, {}, '{}');".format(
        msg_json["clientId"], msg_json["info"], msg_json["value"],
        msg_json["alert"], msg_json["lng"], msg_json["lat"], timestamp
    )
    cursor.execute(msg_sql)
    db.commit()


if __name__ == '__main__':
    server_start()
    db.close()

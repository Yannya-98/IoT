import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, List, Avatar, Form, Button, Select } from 'antd';
import { Map, Marker, NavigationControl, ZoomControl, Label, MapTypeControl, Polyline } from 'react-bmapgl';
import ksm from "../../../img/2.png";
import axios from "axios";

const { Content } = Layout;
const { Option } = Select;

const server = "http://127.0.0.1:8090";

const DevicePosition = () => {
    const [show, setShow] = useState(false);
    const [path, setPath] = useState([]);
    const [devices, setDevices] = useState([]);
    const [msg, setMsg] = useState([]);

    useEffect(() => {
        let user = localStorage.getItem("user");
        axios.get(server + "/device/query/list/all/" + user).then(response => {
            console.log(response.data);
            setDevices(response.data);
        });
    }, []);
    useEffect(() => {
        setPath(path);
        console.log(path);
    }, [path])

    const getPositionMark = () => {
        if (show) {
            return path.map((item, index) => {
                let icon = "loc_blue";
                if (index === 0) {
                    icon = "start";
                } else if (index === path.length - 1) {
                    icon = "end";
                }
                return (
                    <Marker
                        key = {index}
                        position={new window.BMapGL.Point(item.lng, item.lat)}
                        icon={icon}
                    />
                );
            });
        } else {
            return null;
        }
    };

    const getPositionAlert = () => {
        if (show) {
            let result = path.map((item, index) => {
                if (item["alert"] === 1) {
                    return <Label
                        key={index}
                        position={{ lng: item["lng"], lat: item["lat"] }}
                        text="此处设备状态异常!"
                        onClick={e => { console.log(e) }}
                    />
                }
            });
            console.log(result);
            return result;
        }
    }

    const getPositionTrack = () => {
        if (show) {
            const coordinates = path.map(item => new window.BMapGL.Point(item.lng, item.lat));
            console.log(coordinates);
            if(coordinates.length > 0){
                return (
                    <Polyline
                        strokeColor='#F4606C'
                        strokeStyle={"solid"}
                        path={coordinates}
                        strokeWeight={4}
                    />
                );
            }
        } else {
            return null;
        }
    };

    const getSelectDevice = () => {
        let result = devices.map((item, index) => {
            return <Option value={item.deviceName}>{item.deviceName}</Option>
        });
        console.log(result);
        return result;
    }

    const onFinish = (values) => {
        console.log(values)
        let device = values.device;
        axios.get(server + "/message/info/" + device).then(response => {
            console.log(response.data);
            setPath(response.data);
            setShow(true);
            if (response.data.length >= 10) {
                alert("消息数量过多，仅显示最近10条消息");
            }
            setMsg(response.data);
        })
    }

    return (
        <Layout className="site-layout">
            <Content style={{ margin: '0px 16px', textAlign: 'left' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>设备</Breadcrumb.Item>
                    <Breadcrumb.Item>运动轨迹</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 540, textAlign: 'left' }}>
                    <header
                        className="site-page-header"
                        title="查看设备历史轨迹"
                    />
                    <br />
                    <Form name="horizontal_login" layout="inline" onFinish={onFinish}>
                        <Form.Item
                            name="device"
                            label={"选择想要查看的设备"}
                            rules={[{ required: true, message: '请选择设备!!!' }]}
                        >
                            <Select defaultValue="请选择设备">
                                {getSelectDevice()}
                            </Select>
                        </Form.Item>
                        <Form.Item shouldUpdate>
                            {() => (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                >
                                    查询
                                </Button>
                            )}
                        </Form.Item>
                    </Form>
                    <br />
                    <br />
                    <Map
                        zoom={12}
                        tilt={40}
                        style={{ height: '550px' }}
                        center={{ lng: 120.1, lat: 30.3 }}
                    >
                        <MapTypeControl />
                        <NavigationControl />
                        <ZoomControl />
                        {getPositionTrack()}
                        {getPositionMark()}
                        {getPositionAlert()}
                    </Map>
                    <br />
                    <h2>设备消息记录</h2>
                    <br />
                    <div>
                        <List
                            itemLayout="horizontal"
                            dataSource={msg}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={ksm} />}
                                        title={<a>{"消息发送时间：" + item.timeStamp}</a>}
                                        description={"消息内容：" + item.info}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </Content>
        </Layout>
    );
}

export default DevicePosition;

import React, { useState, useEffect } from 'react';
import { Form, Select } from "antd";
import './ConfigForm.css'
import NewDeviceForm from "./NewDeviceForm";
import axios from "axios";

const { Option } = Select;
const server = "http://127.0.0.1:8090";

const ConfigForm = () => {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        let user = localStorage.getItem("user");
        axios.get(server + "/device/query/list/all/" + user).then(response => {
            console.log(response.data);
            setDevices(response.data);
        });
    }, []);

    const onFinish = (values) => {
        let address = server + "/device/config";
        axios.post(address, values).then(response => {
            console.log(response);
            if (response.data) {
                alert("修改配置成功!");
            } else {
                alert("配置修改失败，请重试!");
            }
        })
        console.log('Received values of form: ', values);
    };

    const getSelectDevice = () => {
        return devices.map((item, index) => (
            <Option value={item.deviceName} key={index}>{item.deviceName}</Option>
        ));
    };

    return (
        <Form
            name="normal_login"
            className="config-form"
            initialValues={{ remember: true, prefix: '86' }}
            onFinish={onFinish}
        >
            <Form.Item
                name="device"
                label={"选择设备"}
                rules={[{ required: true, message: '请选择设备!!!' }]}
            >
                <Select defaultValue="请选择设备">
                    {getSelectDevice()}
                </Select>
            </Form.Item>
            <Form.Item
                name="type"
                label={"设备类型"}
                rules={[{ required: true, message: '请选择新的设备类型!!!' }]}
            >
                <Select defaultValue="请选择设备">
                    <Option value='1'>车载设备</Option>
                    <Option value='2'>可穿戴设备</Option>
                    <Option value='3'>智能家居</Option>
                    <Option value='4'>基础设施</Option>
                    <Option value='5'>其他设备</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <NewDeviceForm />
            </Form.Item>
        </Form>
    );
};

export default ConfigForm;

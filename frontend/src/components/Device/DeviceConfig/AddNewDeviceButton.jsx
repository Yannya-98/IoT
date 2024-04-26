import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from 'react';
import { AlertOutlined } from '@ant-design/icons';
import './ConfigForm.css'
import axios from "axios";

const { Option } = Select;
const server = "http://localhost:8090";

const AddNewDeviceButton = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const onFinish = (values) => {
        setLoading(true);
        console.log(values);
        let address = server + "/device/new";
        values.username = localStorage.getItem("user");
        axios.post(address, values).then(response => {
            if (response.data) {
                alert("新设备添加成功！您可以在统计信息界面看到新设备的相关信息");
            } else {
                alert("设备名已被使用，请修改后重新添加!");
            }
            setTimeout(() => {
                setLoading(false);
                setIsModalVisible(false);
            }, 300);
            window.location.reload();
        });
    }

    return (
        <div>
            <Button
                type="primary"
                className="add-new-device-button"
                onClick={showModal}
            >
                新增设备
            </Button>
            <Modal title="新增物联网设备"
                   className="custom-modal"
                   visible={isModalVisible}
                   onCancel={handleCancel}
                   footer={[]}
            >
                <Form
                    name="normal_login"
                    initialValues={{ remember: true, prefix: '86' }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="deviceName"
                        label="设备名称"
                        rules={[
                            {
                                required: true,
                                message: '请输入设备名称!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<AlertOutlined />}
                            className="input-box"
                        />
                    </Form.Item>

                    <Form.Item
                        name="deviceType"
                        label="设备类型"
                        rules={[
                            {
                                required: true,
                                message: '请选择设备类型',
                            },
                        ]}
                    >
                        <Select placeholder="请选择设备的类型" className="input-box">
                            <Option value="1">车载设备</Option>
                            <Option value="2">可穿戴设备</Option>
                            <Option value="3">智能家居</Option>
                            <Option value="4">基础设施</Option>
                            <Option value="5">其他设备</Option>
                        </Select>

                    </Form.Item>

                    <Form.Item>
                        <div style={{ textAlign: 'center' }}>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                确定
                            </Button>
                            <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
                                取消
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AddNewDeviceButton;

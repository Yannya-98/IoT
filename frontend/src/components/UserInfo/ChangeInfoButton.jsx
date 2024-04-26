import React, { useState } from 'react';
import { Button, Form, Input, Modal } from "antd";
import { MobileOutlined, MailOutlined } from '@ant-design/icons';
import './buttons.css'
import axios from "axios";

const server = "http://localhost:8090";

const ChangeInfoButton = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({
        username: "yzf",
        email: "3210104262@zju.edu.cn",
    });

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get(server + "/user/" + localStorage.getItem("user"));
            setUserInfo({
                username: response.data.username,
                email: response.data.email
            });
        } catch (error) {
            console.error("获取用户信息失败:", error);
        }
    };

    fetchUserInfo();

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const onFinish = (values) => {
        setLoading(true);
        values.username = localStorage.getItem("user");
        console.log(values);
        let address = server + "/user/config/info";
        axios.post(address, values).then(response => {
            if (response.data === 1) {
                alert("修改成功!");
                setTimeout(() => {
                    setLoading(false);
                    setIsModalVisible(false);
                }, 300);
                window.location.reload();
            } else if (response.data === -1) {
                alert("该邮箱已经被注册!");
                setTimeout(() => {
                    setLoading(false);
                }, 100);
            } else if (response.data === -2) {
                alert("该用户名已被占用!");
                setTimeout(() => {
                    setLoading(false);
                }, 100);
            }
        })
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={showModal}>
                编辑信息
            </Button>
            <Modal
                title="编辑信息"
                className="custom-modal"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[]}
            >
                <Form
                    name="normal_login"
                    initialValues={{ remember: true, prefix: '86',  newname: userInfo.username, email: userInfo.email}}
                    onFinish={onFinish}
                >

                    <Form.Item
                        name="newname"
                        label="用户名"
                        rules={[
                            {
                                required: true,
                                message: '用户名'
                            }
                        ]}
                    >
                        <Input
                            style={{
                                width: '100%',
                            }}
                            className={"input-box"}
                            prefix={<MobileOutlined />}
                            placeholder="newname"
                            disabled={true}
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="电子邮箱"
                        rules={[
                            {
                                type: 'email',
                                message: '无效的E-mail!',
                            },
                            {
                                required: true,
                                message: '请输入电子邮箱'
                            }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            className={"input-box"} placeholder="e-mail"
                        />
                    </Form.Item>

                    <Form.Item>
                        <div style={{ textAlign: 'center' }}>
                            <Button type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    loading={loading}>
                                确定
                            </Button>
                            <Button className="login-form-button" onClick={handleCancel}>
                                取消
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ChangeInfoButton;

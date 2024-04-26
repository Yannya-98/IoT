import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import './buttons.css';
import axios from 'axios';

const server = 'http://localhost:8090';

const ChangePasswordButton = () => {
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
        let address = server + '/user/config/password';
        values.username = localStorage.getItem('user');
        console.log(values);
        axios.post(address, values).then((response) => {
            if (response.data) {
                alert('修改密码成功!');
                setTimeout(() => {
                    setLoading(false);
                    setIsModalVisible(false);
                }, 300);
            } else {
                alert('旧密码错误！');
                setTimeout(() => {
                    setLoading(false);
                }, 100);
            }
        });
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Button onClick={showModal}>修改密码</Button>
            <Modal title="修改密码" className="custom-modal" open={isModalVisible} onCancel={handleCancel} footer={[]}>
                <Form name="normal_login" initialValues={{ remember: false, prefix: '86' }} onFinish={onFinish}>
                    <Form.Item
                        name="old"
                        label={'旧密码'}
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            className={'input-box'}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={'输入密码'}
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                            () => ({
                                validator(_, value) {
                                    if (value.length >= 6) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('密码的安全性过低!请修改密码'));
                                },
                            }),
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            className={'input-box'}
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请再次输入密码',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入的密码不一致'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} className={'input-box'} />
                    </Form.Item>
                    <Form.Item>
                        <div style={{ textAlign: 'center' }}>
                            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
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

export default ChangePasswordButton;

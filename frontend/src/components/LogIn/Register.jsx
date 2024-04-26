import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import './Register.css';
import axios from "axios";
const server = "http://127.0.0.1:8090";
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
        this.backToLogin = this.backToLogin.bind(this);
    }

    onFinish(values) {
        console.log('Received values of form: ', values);
        let address = server + "/user/register";
        axios.post(address, values).then(response => {
            if (response.data === 1) {
                alert("注册成功！请回到登陆界面登陆账号!");
                this.props.history.push('/');
            } else if (response.data === -1) {
                alert("注册失败！该用户名已被注册!");
            } else if (response.data === -2) {
                alert("注册失败，当前邮箱已经被注册！");
            }
        })
    }

    backToLogin() {
        alert("回到登陆页面!");
        this.props.history.push('/');
    }

    render() {
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true, prefix: '86', }}
                onFinish={this.onFinish}
            >
                <Form.Item>
                    <h1>注册</h1>
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
                            message: '请输入您的电子邮箱',
                        },
                    ]}
                >
                    <Input
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        className={"input-box"} placeholder="e-mail"
                    />
                </Form.Item>

                <Form.Item
                    name="username"
                    label={"用户名"}
                    rules={[{ required: true, message: '请输入用户名!' }]}

                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />}
                           placeholder="Username" className={"input-box"}/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label={"输入密码"}
                    rules={[{
                        required: true, message: '请输入密码'
                    }, () => ({
                        validator(_, value) {
                            if (value.length >= 6) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('密码的安全性过低!请修改密码'));
                        }})
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        className={"input-box"}
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
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        className={"input-box"}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        注册
                    </Button>
                    <Button className="login-form-button" onClick={this.backToLogin}>
                        回到登录
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
export default Register;
import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import InfoUpdateForm from "./InfoUpdateForm";
import axios from "axios";

const server = "http://localhost:8090";

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState({
        username: "yzf",
        email: "3210104262@zju.edu.cn",
    });

    useEffect(() => {
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
    }, []);

    return (
        <div style={{ padding: '24px' }}>
            <header
                style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    padding: '16px 0',
                }}
                title="用户信息"
            />
            <Descriptions
                style={{
                    marginTop: '24px',
                }}
                bordered
                size={'default'}
                labelStyle={{
                    fontWeight: 'bold',
                }}
                contentStyle={{
                    fontWeight: 'normal',
                }}
            >
                <Descriptions.Item
                    label="用户名"
                    span={1}
                    style={{
                        width: '25%',
                    }}
                >
                    {userInfo.username}
                </Descriptions.Item>
                <Descriptions.Item
                    label="电子邮箱"
                    span={1}
                    style={{
                        width: '25%',
                    }}
                >
                    {userInfo.email}
                </Descriptions.Item>
            </Descriptions>
            <div
                style={{
                    marginTop: '24px',
                }}
            >
                <InfoUpdateForm />
            </div>
        </div>
    );
};

export default UserInfo;

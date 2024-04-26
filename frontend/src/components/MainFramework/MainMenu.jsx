import React from 'react';
import { Menu, Button, Layout, Typography, Avatar } from 'antd';
import { Link } from "react-router-dom";
import {
    DesktopOutlined,
    PieChartOutlined,
    HomeOutlined,
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { Text } = Typography;

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    logOut = () => {
        alert("退出登录");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.reload();
    }

    render() {
        let name = localStorage.getItem("user");
        return (
            <Sider theme="dark" width={200}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
                    <Avatar size={32} icon={<UserOutlined />} />
                    <Text strong style={{ marginLeft: '8px', color: '#fff' }}>{name}</Text>
                    <Button type="link" onClick={this.logOut} icon={<LogoutOutlined />} style={{ marginLeft: '8px', color: '#fff' }}>退出</Button>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
                    <Menu.Item key="0" icon={<HomeOutlined />}>
                        <Link to={"/main"} >统计信息</Link>
                    </Menu.Item>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to={"/main/user"} >个人信息</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        <Link to={"/main/config"} >设备配置</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<PieChartOutlined />}>
                        <Link to={"/main/show"} >查看设备</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<PieChartOutlined />}>
                        <Link to={"/main/message"} >设备趋势图</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default MainMenu;

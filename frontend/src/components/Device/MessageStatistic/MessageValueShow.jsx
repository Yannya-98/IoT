import React from 'react';
import { Breadcrumb, Layout, Typography } from "antd";
import ValueLineChart from "./ValueLineChart";

const { Content } = Layout;
const { Title } = Typography;

export default class MessageValueShow extends React.Component {
    render() {
        return (
            <Layout className="site-layout">
                <Content style={{ margin: '24px 16px' }}>
                    <Breadcrumb style={{ marginBottom: '24px' }}>
                        <Breadcrumb.Item>设备</Breadcrumb.Item>
                        <Breadcrumb.Item>变化趋势</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Title level={2}>设备信息折线统计图</Title>
                        <p>您可以看到设备发送的 value 的折线图。</p>
                        <br />
                        <ValueLineChart />
                        <br />
                    </div>
                </Content>
            </Layout>
        );
    }
}

import React from 'react';
import { Layout, Breadcrumb, Typography, Card } from 'antd';
import ConfigForm from "./ConfigForm";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const DeviceConfiguration = () => {
    return (
        <Layout className="site-layout">
            <Content style={{ margin: '0px 16px', textAlign: 'left'}}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>设备</Breadcrumb.Item>
                    <Breadcrumb.Item>修改配置</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 540,  textAlign: 'left'}}>
                    <Title level={3}>设备配置信息修改</Title>
                    <Paragraph>
                        您可以填写下面的表单修改配置信息，也可以点击新增设备按钮来添加一个设备
                    </Paragraph>
                    <Card>
                        <ConfigForm />
                    </Card>
                </div>
            </Content>
        </Layout>
    );
};

export default DeviceConfiguration;

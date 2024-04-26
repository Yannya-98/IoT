import React from 'react';
import MainMenu from "../components/MainFramework/MainMenu";
import ContentBox from "../components/MainFramework/ContentBox";
import MainFooter from "../components/MainFramework/MainFooter";
import { Layout } from "antd";
import { Redirect } from "react-router-dom";
import {CarOutlined, CloudOutlined} from '@ant-design/icons';


const { Header, Footer, Sider, Content } = Layout;

class MainPage extends React.Component {
    render() {
        if (!localStorage.getItem("token")) {
            return (
                <Redirect to={{
                    pathname: "/login",
                }} />
            )
        }
        return (
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider>
                        <MainMenu />
                    </Sider>
                    <Layout>
                        <Header>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <CloudOutlined style={{ fontSize: '20px', color: 'white', marginRight: '8px' }} />
                                <text style={{ color: "white", fontSize: "25px" }}>物联网应用平台</text>
                            </div>
                        </Header>
                        <Content>
                            <ContentBox />
                        </Content>
                        <Footer>
                            <MainFooter />
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default MainPage;

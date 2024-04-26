import React, { useEffect, useState } from 'react';
import { Statistic, Row, Col } from 'antd';
import { CustomerServiceTwoTone, FundTwoTone } from '@ant-design/icons';
import axios from "axios";

const server = "http://127.0.0.1:8090";

const StatisticData = () => {
    const [total, setTotal] = useState(0);
    const [msg, setMsg] = useState(0);

    useEffect(() => {
        let user = localStorage.getItem("user");
        let values = {
            "token": localStorage.getItem("token")
        };

        axios.get(server + "/device/query/all/" + user).then(response => {
            setTotal(response.data);
        });

        axios.get(server + "/message/user/all/" + user).then(response => {
            setMsg(response.data);
        });
    }, []);

    return (
        <Row gutter={16}>
            <Col span={12}>
                <Statistic
                    title="设备总数"
                    value={total}
                    prefix={<FundTwoTone />}
                />
            </Col>
            <Col span={12}>
                <Statistic
                    title="消息总数"
                    value={msg}
                    prefix={<CustomerServiceTwoTone />}
                />
            </Col>
        </Row>
    );
}

export default StatisticData;

import React, { useEffect, useState } from 'react';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
import axios from "axios";
import { Button, Form, Select } from "antd";

const server = "http://localhost:8090";

const MessageLine = () => {
    const [data, setData] = useState([]);
    const [devices, setDevices] = useState([]);
    const [option, setOption] = useState({});

    useEffect(() => {
        let user = localStorage.getItem("user");
        axios.get(server + "/device/query/list/all/" + user).then(response => {
            setDevices(response.data);
        });
    }, []);

    const getSelectDevice = () => {
        return devices.map((item, index) => {
            return <Select.Option key={index} value={item.deviceName}>{item.deviceName}</Select.Option>
        });
    };

    const processData = (device, responseData) => {
        let result = [];
        let data = responseData.map(map => {
            let stamp = map.timeStamp;
            let value = map.value;
            return [stamp, value];
        });
        let dataItem = {
            type: 'line',
            name: device,
            data: data
        };
        result.push(dataItem);
        return result;
    };


    const generateOption = (data) => {
        return {
            title: {
                text: '设备信息折线图',
                left: 'center',
                textStyle: {
                    color: '#706c6c',
                    fontSize: 17,
                }
            },
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '5%',
                containLabel: true,
            },
            legend: {
                type: 'scroll',
                orient: 'horizontal',  // 修改为水平排列
                top: 'bottom',  // 修改为底部
                data: data.map(item => item.name),
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
            },
            yAxis: {
                type: 'value',
            },
            series: data,
        };
    };

    const onFinish = (values) => {
        let device = values.device;
        axios.get(server + "/message/info/" + device).then(response => {
            const result = processData(device, response.data);
            setData(result);
        });
    };

    useEffect(() => {
        const option = generateOption(data);
        setOption(option);
    }, [data]);

    return (
        <div>
            <Form style={{ marginBottom: '20px' }} layout="inline" initialValues={{ device: "请选择设备" }} onFinish={onFinish}>
                <Form.Item
                    name="device"
                    label={"选择查看的设备"}
                    rules={[{ required: true, message: '请选择设备!' }]}
                >
                    <Select style={{ width: 200 }}>
                        {getSelectDevice()}
                    </Select>
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            查询
                        </Button>
                    )}
                </Form.Item>
            </Form>
            <ReactEcharts
                option={option}
                style={{ minHeight: '400px' }}
            />
        </div>
    );
};

export default MessageLine;

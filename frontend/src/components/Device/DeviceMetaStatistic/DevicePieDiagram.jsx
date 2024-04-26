import React, { useState, useEffect } from 'react';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
import axios from "axios";
import { Card, Skeleton, Typography } from 'antd';

const server = "http://localhost:8090";
const { Title } = Typography;

const DevicePieChart = () => {
    const [pieData, setPieData] = useState([]);
    const [loading, setLoading] = useState(true);

    // 组件挂载后获取数据
    useEffect(() => {
        let user = localStorage.getItem("user");
        axios.get(server + "/device/statistic/" + user).then(response => {
            setPieData(response.data);
            setLoading(false);
        })
    }, []);

    const getOption = () => {
        let option = {
            title: {
                text: '设备类型分布',
                x: 'center',
                textStyle: {
                    color: '#858080', // 字体颜色
                    fontSize: 17, // 字体大小
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                top: 20,
                right: 5,
                data: pieData.map(item => item.type)
            },
            series: [
                {
                    name: '设备类型',
                    type: 'pie',
                    stillShowZeroSum: false,
                    data: pieData.map(item => ({
                        name: item.type,
                        value: item.value
                    })),
                    radius: '70%',
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return option;
    };

    return (
        <Card>
            <Title level={3}>设备类型分布</Title>
            {loading ? (
                <Skeleton active />
            ) : (
                <ReactEcharts option={getOption()} style={{ height: '400px' }} />
            )}
        </Card>
    );
};

export default DevicePieChart;

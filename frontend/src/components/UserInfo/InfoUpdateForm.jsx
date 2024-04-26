import React from 'react';
import {Space} from 'antd';
import ChangeInfoButton from "./ChangeInfoButton";
import ChangePasswordButton from "./ChangePasswordButton";

export default class InfoUpdateForm extends React.Component {
    render() {
        return (
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <Space size="large">
                    <ChangeInfoButton />
                    <ChangePasswordButton />
                </Space>
            </div>
        )
    }
}
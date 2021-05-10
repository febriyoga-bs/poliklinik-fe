import React, { useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col, Typography } from 'antd';

const { Content } = Layout;
const { Text } = Typography;

const LoginUser = () => {

    return(
        <Layout>
            <Content className="layout-content">
                <Row style={{minHeight: 600}}>
                    <Text className="title">
                        TES
                    </Text>
                </Row>
            </Content>
        </Layout>
    )
}

export default withRouter(LoginUser)
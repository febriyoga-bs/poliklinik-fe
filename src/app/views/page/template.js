import React from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';

const { Content } = Layout;

const Template = () => {

    return(
        <Layout>
            <Content className="layout-home">
                <Row style={{minHeight:600}} justify="center">
                    <Col xs={12} md={8} lg={6}>
                        PAGE NOT FOUND
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(Template)
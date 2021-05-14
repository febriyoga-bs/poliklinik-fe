import React, { useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';

const { Content } = Layout;

const Template = () => {
    const test = "INI TEMPLATE"

    return(
        <Layout>
            <Content className="layout-home">
                <Row style={{minHeight:600}}>
                    <Col xs={12} md={8} lg={6}>
                        {test}
                    </Col>
                    <Col xs={12} md={16} lg={18}>
                        {test + " ... "}
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(Template)
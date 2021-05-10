import React, { useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import Fade from 'react-reveal/Fade';

const { Content } = Layout;

const LandingPage = () => {
    const test = "PROFIL POLIKLINIK"
    const test2 = "GAMBAR"

    return(
        <Layout>
            <Content className="layout-home">
                <Row style={{minHeight:600}}>
                    <Col xs={12} md={8} lg={6}>
                        {test}
                    </Col>
                    <Col xs={12} md={16} lg={18}>
                        {test2}
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(LandingPage)
import React from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Text } = Typography;

const Konsultasi = () => {

    return(
        <Layout style={{backgroundColor: "#072A6F"}}>
            <Content className="layout-content">
                <Breadcrumb style={{marginLeft:40, marginBottom:20, color:"#FFF"}} separator=">">
                    <Breadcrumb.Item href="/">
                        <Text className="title">
                            <HomeOutlined />
                        </Text>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/konsultasi-online">
                        <Text className="title">
                            <span>Konsultasi Online</span>
                        </Text>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Row style={{minHeight:600}} justify="center">
                    <Col xs={12} md={8} lg={6}>
                        KONSULTASI
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(Konsultasi)
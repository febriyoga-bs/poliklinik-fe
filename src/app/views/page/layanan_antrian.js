import React, { useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Text } = Typography;
 
const Antrian = () => {

    return(
        <Layout style={{backgroundColor: "#072A6F"}}>
            <Content className="layout-content">
                <Breadcrumb style={{marginLeft:40, marginBottom:20, color:"#FFF"}} separator=">">
                    <Breadcrumb.Item href="/">
                        <Text className="title">
                            <HomeOutlined />
                        </Text>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/#/antrian-poliklinik">
                        <Text className="title">
                            <span>Antrian Poliklinik</span>
                        </Text>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Row style={{minHeight:600}} justify="center">
                    <Col xs={12} md={8} lg={6}>
                        ANTRIAN
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(Antrian)
import React, { useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Breadcrumb, Row, Col, Card, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Text } = Typography;

const KelolaInformasi = () => {
    const test = "PROFIL POLIKLINIK"
    const test2 = "GAMBAR"

    return(
        <Layout style={{backgroundColor: "#072A6F"}}>
            <Content className="layout-content">
                <Breadcrumb style={{marginLeft:40, marginBottom:20, color:"#FFF"}} separator=">">
                    <Breadcrumb.Item href="/">
                        <Text className="title">
                            <HomeOutlined />
                        </Text>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/#/profil-staf">
                        <Text className="title">
                            <span>Profil Staf</span>
                        </Text>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/#/kelola-informasi">
                        <Text className="title">
                            <span>Kelola Informasi Poliklinik</span>
                        </Text>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Row style={{marginBottom:20}}>
                    <Card className="informasi-card">
                        <Row>
                            <Text>
                                Profil Poliklinik
                            </Text>
                        </Row>
                    </Card>
                </Row>
                <Row style={{marginBottom:20}}>
                    <Card className="informasi-card">
                        <Row>
                            <Text>
                                Jadwal Pelayanan Poliklinik
                            </Text>
                        </Row>
                    </Card>
                </Row>
                <Row style={{marginBottom:20}}>
                    <Card className="informasi-card">
                        <Row>
                            <Text>
                                Data Pelayanan Poliklinik
                            </Text>
                        </Row>
                    </Card>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(KelolaInformasi)
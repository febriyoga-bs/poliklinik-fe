import React, { useEffect } from "react";
import { withRouter, NavLink } from 'react-router-dom';
import { Layout, Breadcrumb, Row, Col, Card, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Text, Title } = Typography;

const KelolaDokterStaf = () => {
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
                    <Breadcrumb.Item href="/#/kelola-data-petugas">
                        <Text className="title">
                            <span>Kelola Data Dokter & Staf Poliklinik</span>
                        </Text>
                    </Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{marginLeft:40}}>
                    <Col>
                        <NavLink to="/kelola-data-pasien" className="text-heading">
                            <Title level={1} style={{color: '#FFF'}}>
                                DATA PASIEN
                            </Title>
                        </NavLink>
                    </Col>
                    <Col style={{marginLeft:48}}>
                        <NavLink to="/kelola-data-petugas" className="text-heading" activeStyle={{color: '#EB3D00'}}>
                            <Title level={1} style={{color: '#EB3D00'}}>
                                DATA DOKTER & STAF
                            </Title>
                        </NavLink>
                    </Col>
                </Row>

                <Row style={{marginBottom:20}}>
                    <Card className="informasi-card">
                        <Row>
                            <Text>
                                Data Dokter
                            </Text>
                        </Row>
                    </Card>
                </Row>
                <Row style={{marginBottom:20}}>
                    <Card className="informasi-card">
                        <Row>
                            <Text>
                                Data Staf
                            </Text>
                        </Row>
                    </Card>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(KelolaDokterStaf)
import React, { useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Card, Typography, Form, Input, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Text } = Typography;

const UbahDataPasien = () => {
    const test = "UBAH DATA PASIEN"
    const [form] = Form.useForm();
    const onFinish= () => {}
    
    return(
        <Layout style={{backgroundColor: "#072A6F"}}>
        <Content className="layout-content">
        <Breadcrumb style={{marginLeft:40, marginBottom:20}}>
                <Breadcrumb.Item href="/">
                    <Text className="title">
                        <HomeOutlined />
                    </Text>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/">
                    <Text className="title">
                        Admin
                    </Text>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/informasi">
                    <Text className="title">
                        Kelola data Pasien
                    </Text>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/informasi">
                    <Text className="title">
                        ID Pasien
                    </Text>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card className="form-card">
                <Row>
                        <Text className="title-tabel">
                            Ubah Data Pasien
                        </Text>
                    </Row>
                <Row >
                <Form form={form} name="control-hooks" onFinish={onFinish}></Form>
                    <Col span={12}>
                    <Col lg={15}>
                            <Text className="title-label">ID Pasien</Text>
                            <Form.Item name="id_pasien" >
                                    <Input className="input-form secondary" />
                            </Form.Item>
                        </Col>
                    </Col>
                    <Col span={12}>
                    <Col lg={15}>
                        <Text className="title-label">Nama Pasien</Text>
                            <Form.Item name="nama_pasien" rules={[{ required: true }]}>
                                    <Input className="input-form secondary" />
                            </Form.Item>
                    </Col>
                    </Col>
                    <Col span={12}>
                    <Col lg={15}>
                    <Text className="title-label">Kategori Pasien</Text>
                            <Form.Item name="kategori_pasien" rules={[{ required: true }]}>
                                    <Input className="input-form secondary" />
                            </Form.Item>
                    </Col>
                    </Col>
                    <Col span={12}>
                    <Col lg={15}>
                    <Text className="title-label">Nomor Telepon</Text>
                            <Form.Item name="no_telepon" rules={[{ required: true }]}>
                                    <Input className="input-form secondary" />
                            </Form.Item>
                    </Col>
                    </Col>
                    <Col span={12}>
                    <Col lg={15}>
                    <Text className="title-label">Tanggal Lahir</Text>
                            <Form.Item name="tanggal_lahir" rules={[{ required: true }]}>
                                    <Input className="input-form secondary" />
                            </Form.Item>
                    </Col>
                    </Col>
                    <Col span={12}>
                    <Col lg={15}>
                        <Text className="title-label">Alamat</Text>
                            <Form.Item name="alamat" rules={[{ required: true }]}>
                                    <Input className="input-form secondary" />
                            </Form.Item>
                    </Col>
                    </Col>
                </Row>
                <Button type="grey" shape="round" >
                    Cancel
                </Button>
                &nbsp;
                <Button type="primary" shape="round" >
                    Submit
                </Button>
            </Card>
        </Content>
        </Layout>
    );
    
}

export default withRouter(UbahDataPasien)
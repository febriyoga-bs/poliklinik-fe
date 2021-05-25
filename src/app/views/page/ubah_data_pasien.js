import React, { useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Card, Typography, Form, Input, Button } from 'antd';

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
                        Admin
                    </Text>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/informasi">
                    <Text className="title">
                        Kelola data Passien
                    </Text>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/informasi">
                    <Text className="title">
                        ID Pasien
                    </Text>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row justify="center" align="middle" style={{marginBottom:20}}>
                <Card className="form-card">
                    <Row>
                        <Text>
                            Ubah Data Pasien
                        </Text>
                    </Row>
                    <Row style={{width:1000}}>
                        <Form form={form} name="control-hooks" onFinish={onFinish}>
                            <Col lg={10}>
                                <Form.Item name="note" label="ID Pasien" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col lg={10}>
                                <Form.Item name="note" label="Kategori Pasien" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col lg={10}>
                                <Form.Item name="note" label="Nomor Telepon" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col lg={10}>
                                <Form.Item name="note" label="Nama Pasien" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col lg={10}>
                                <Form.Item name="note" label="Nomor identitas" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col lg={10}>
                                <Form.Item name="note" label="Tanggal Lahir" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col lg={10}>
                                <Form.Item name="note" label="Alamat" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Form>
                    </Row>
                    <Button>Cancel</Button>
                    &nbsp;
                    <Button type="primary">Submit</Button>
                    
                </Card>
            </Row>
            </Content>
            
        </Layout>
        
    );
    
}

export default withRouter(UbahDataPasien)
import React, { useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Card, Typography, Form, Input, Button } from 'antd';

const { Content } = Layout;
const { Text } = Typography;

const UbahDataLayanan = () => {
    const test = "UBAH DATA LAYANAN"
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
                        Kelola Data Pelayanan
                    </Text>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/informasi">
                    <Text className="title">
                        Tambah data Pelayanan
                    </Text>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row justify="center" align="middle" style={{marginBottom:20}}>
                <Card className="form-card">
                    <Row>
                        <Text>
                            Tambah Data Pelayanan
                        </Text>
                    </Row>
                    <Row style={{width:1000}}>
                        <Form form={form} name="control-hooks" onFinish={onFinish}>
                            <Col lg={10}>
                                <Form.Item name="note" label="Nama Pelayanan" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col lg={10}>
                                <Form.Item name="note" label="Jenis Poli" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col lg={10}>
                                <Form.Item name="note" label="Tarif Mahasiswa" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col lg={10}>
                                <Form.Item name="note" label="Tarif Staf/Dosen" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col lg={10}>
                                <Form.Item name="note" label="Tarif keluarga Staf/Dosen" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col lg={10}>
                                <Form.Item name="note" label="Tarif Umum" rules={[{ required: true }]}>
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

export default withRouter(UbahDataLayanan)
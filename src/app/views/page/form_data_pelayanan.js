import React, { useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Card, Typography, Form, Input, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Text } = Typography;

const UbahDataPelayanan = () => {
    const test = "UBAH DATA LAYANAN"
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
                <Breadcrumb.Item href="/#/kelola-informasi">
                    <Text className="title">
                        Kelola Data Pelayanan
                    </Text>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/#/kelola-informasi/data-pelayanan">
                    <Text className="title">
                        Tambah data Pelayanan
                    </Text>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row justify="center" align="middle" style={{marginBottom:20}}>
                <Card className="form-card" style={{textAlign:"left"}}>
                    <Row style={{marginBottom:20}}>
                        <Text className="title-tabel">
                            Tambah Data Pelayanan
                        </Text>
                    </Row>
                   
                        <Form form={form} onFinish={onFinish}>
                            <Row justify="space-between">
                                <Col span={12}>
                                    <Text className="title-label">Nama Pelayanan</Text>
                                    <Form.Item name="nama_pelayanan" rules={[{ required: true }]}>
                                        <Input className="input-form secondary" />
                                    </Form.Item>
                                    
                                    <Text className="title-label">Jenis Poli</Text>
                                    <Form.Item name="jenis_poli" rules={[{ required: true }]}>
                                        <Input className="input-form secondary" />
                                    </Form.Item>
                                </Col>

                                <Col span={12} style={{justifyContent:"center"}}>
                                    <Text className="title-label">Tarif Mahasiswa</Text>
                                    <Form.Item name="tarif_mahasiswa" rules={[{ required: true }]}>
                                        <Input className="input-form secondary"/>
                                    </Form.Item>

                                    <Text className="title-label">Tarif Staf/Dosen</Text>
                                    <Form.Item name="tarif_staf_dosen" rules={[{ required: true }]}>
                                        <Input className="input-form secondary" />
                                    </Form.Item>

                                    <Text className="title-label">Tarif Keluarga Staf/Dosen</Text>
                                    <Form.Item name="tarif_keluarga_staf" rules={[{ required: true }]}>
                                        <Input className="input-form secondary" />
                                    </Form.Item>

                                    <Text className="title-label">Tarif Umum</Text>
                                    <Form.Item name="tarif_umum" rules={[{ required: true }]}>
                                        <Input className="input-form secondary" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify="center">
                                <Button type="grey" shape="round" >
                                    Cancel
                                </Button>
                                &nbsp;
                                <Button type="primary" shape="round" >
                                    Submit
                                </Button>
                            </Row>
                        </Form>
                </Card>
            </Row>
            </Content>
            
        </Layout>
        
    );
    
}

export default withRouter(UbahDataPelayanan)
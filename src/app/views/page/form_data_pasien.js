import React, { useEffect, useState } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Card, Typography, Form, Input, Button } from 'antd';
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Text } = Typography;

const UbahDataPasien = (props) => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        console.log(props.location)
        if(props.location.state){
          form.setFieldsValue(props.location.state);
        }else{
          form.resetFields()
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onFinish= (values) => {
        setLoading(true);

    }
    
    return(
        <Layout style={{backgroundColor: "#072A6F"}}>
        <Content className="layout-content">
        <Breadcrumb style={{marginLeft:40, marginBottom:20}}>
                <Breadcrumb.Item href="/">
                    <Text className="title">
                        <HomeOutlined />
                    </Text>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/#/profil-staf">
                    <Text className="title">
                        Admin
                    </Text>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/#/kelola-data-pengguna/pasien">
                    <Text className="title">
                        Kelola Data Pasien
                    </Text>
                </Breadcrumb.Item>
                <Breadcrumb.Item >
                    <Text className="title">
                        {props.match.params.aksi === "ubah-data" ? "Ubah Data" : "Tambah Data"}
                    </Text>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row justify="center">
            <Card className="form-card" style={{textAlign:"left"}}>
                <Row>
                    <Text className="title-tabel">
                        Ubah Data Pasien
                    </Text>
                </Row>
                <Form form={form} name="control-hooks" onFinish={onFinish}>
                <Row justify="space-between" gutter={30}>
                    <Col span={12}>
                        <Text className="title-label">ID Pasien</Text>
                        <Form.Item name="id_pasien" >
                                <Input className="input-form secondary" disabled/>
                        </Form.Item>

                            
                        <Text className="title-label">Kategori Pasien</Text>
                            <Form.Item name="kategori" rules={[{ required: true }]}>
                                    <Input className="input-form secondary" />
                            </Form.Item>

                            
                        <Text className="title-label">Nomor Telepon</Text>
                            <Form.Item name="no_telepon" rules={[{ required: true }]}>
                                    <Input className="input-form secondary" />
                            </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Text className="title-label">Nama Pasien</Text>
                            <Form.Item name="nama" rules={[{ required: true }]}>
                                    <Input className="input-form secondary" />
                            </Form.Item>

                        <Text className="title-label">Nomor Identitas</Text>
                            <Form.Item name="nomor_identitas" rules={[{ required: true }]}>
                                    <Input className="input-form secondary" />
                            </Form.Item>
                            
                        <Text className="title-label">Tanggal Lahir</Text>
                            <Form.Item name="tanggal_lahir" rules={[{ required: true }]}>
                                    <Input className="input-form secondary" />
                            </Form.Item>
                            
                        <Text className="title-label">Alamat</Text>
                            <Form.Item name="alamat" rules={[{ required: true }]}>
                                    <Input className="input-form secondary" />
                            </Form.Item>
                    </Col>
                </Row>
                <Row justify="center">
                    <Button className="app-btn tertiary" onClick={()=> {history.goBack()}}>
                        Cancel
                    </Button>
                    &nbsp;
                    <Button className="app-btn secondary" 
                        type="primary"
                        htmlType="submit"
                        disabled={loading}
                    >
                        {loading && <LoadingOutlined />}
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

export default withRouter(UbahDataPasien)
import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Card, Typography, Form, Input, Button } from 'antd';
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Text } = Typography;

const UbahDataPelayanan = (props) => {
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
                        {props.match.params.aksi === "ubah-data" ? "Ubah Data" : "Tambah Data"}
                    </Text>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row justify="center" align="middle" style={{marginBottom:20}}>
                <Card className="form-card" style={{textAlign:"left"}}>
                    <Row style={{marginBottom:20}}>
                        <Text className="title-tabel">
                            {props.match.params.aksi === "ubah-data" ? "Ubah Data" : "Tambah Data"}
                        </Text>
                    </Row>
                   
                        <Form form={form} onFinish={onFinish}>
                            <Row justify="space-between" gutter={20}>
                                <Col span={12}>
                                    <Text className="title-label">Nama Pelayanan</Text>
                                    <Form.Item name="nama" rules={[{ required: true }]}>
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
                                    <Form.Item name="tarif_staf_kampus" rules={[{ required: true }]}>
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

export default withRouter(UbahDataPelayanan)
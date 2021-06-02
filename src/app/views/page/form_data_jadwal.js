import React, { useEffect, useState } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Card, Typography, Form, Input, Button } from 'antd';
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Text } = Typography;

const FormDataJadwal = (props) => {
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
                <Breadcrumb.Item href="/#/kelola-informasi">
                    <Text className="title">
                        Kelola Informasi
                    </Text>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Text className="title">
                        Ubah Jadwal Pelayanan
                    </Text>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row justify="center">
            <Card className="form-card" style={{textAlign:"left"}}>
                <Row>
                        <Text className="title-tabel">
                            Ubah Jadwal Pelayanan
                        </Text>
                    </Row>
                <Form form={form} name="control-hooks" onFinish={onFinish}>
                    <Row justify="center">
                        <Col span={24}>
                                <Text className="title-label">Hari</Text>
                                <Form.Item name="hari" >
                                        <Input className="input-form secondary" disabled/>
                                </Form.Item>

                                <Text className="title-label">Jam Operasional</Text>
                                <Form.Item name="jam_operasional">
                                        <Input className="input-form secondary" />
                                </Form.Item>

                                <Text className="title-label">Poli</Text>
                                <Form.Item name="poli" rules={[{ required: true }]}>
                                        <Input className="input-form secondary" />
                                </Form.Item>

                                <Text className="title-label">Dokter</Text>
                                        <Form.Item name="dokter" rules={[{ required: true }]}>
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

export default withRouter(FormDataJadwal)
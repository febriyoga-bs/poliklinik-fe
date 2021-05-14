import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import { Layout, Row, Col, Typography, Card, Form, Input, Button, message } from 'antd';

const { Content } = Layout;
const { Text } = Typography;

const Register = () => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [isLoading, setLoading] = useState(false);

    //
    const [fieldActive, setFieldActive] = useState(false);
    //

    const onFinish = () => {

    }

    return(
        <Layout style={{backgroundColor: "#072A6F"}}>
            <Content className="layout-content">
                <Row justify="center" align="middle" style={{minHeight: 540}}>
                    <Col md={14} lg={14}>
                        <Row justify="center">
                            <Text className="title-welcome">
                                Selamat datang di Website <br></br>
                                Unit Pelayanan Kesehatan (Poliklinik) <br></br>
                                POLBAN
                            </Text>
                        </Row>
                    </Col>
                    <Col md={10} lg={10}>
                    <Row justify="center">
                            <Card className="registrasi-card">
                                <Row justify="center" style={{marginBottom:30}}>
                                    <Text className="title bold">
                                        REGISTRASI
                                    </Text>
                                </Row>
                                <Row>
                                    <Form form={form} onFinish={onFinish}>
                                        <Col span={24}>
                                            <Text className={fieldActive ? "form-label active" : "form-label"}>No. Telepon</Text>
                                            <Form.Item
                                                name="no_telepon"
                                                required
                                                rules={[
                                                {
                                                    required: true,
                                                    message: 'Harap masukkan Nomor Telepon Anda!'
                                                },
                                                {
                                                    type:'email', 
                                                    message: 'Harap hanya masukkan angka!',
                                                }]}
                                                style={{marginBottom:30}}
                                                >
                                                
                                                <Input className="input-form" 
                                                    onFocus={() => setFieldActive(true)}
                                                    onBlur={(e) => {if(e.target.value === ""){setFieldActive(false)} }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Text className={fieldActive ? "form-label active" : "form-label"}>Password</Text>
                                            <Form.Item
                                                name="password"
                                                required
                                                rules={[{
                                                    required: true,
                                                    message: 'Harap masukkan password Anda!'
                                                }]}
                                                >
                                                <Input className="input-form" 
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}> 
                                            <Row justify="center" style={{marginBottom:10}}>
                                                <Button
                                                    block
                                                    type="primary"
                                                    htmlType="submit"
                                                    className="app-btn lg block secondary"
                                                    style={{width:290}}
                                                    disabled={isLoading}
                                                >
                                                    Konfirmasi
                                                </Button>
                                            </Row>
                                        </Col>
                                    </Form>
                                </Row>
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(Register)
import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import { Layout, Row, Col, Typography, Card, Form, Input, Button, message } from 'antd';
import { LockOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import Auth from '../../service/auth'

const { Content } = Layout;
const { Text } = Typography;

const LoginUser = () => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [isLoading, setLoading] = useState(false);

    //
    const [fieldActive, setFieldActive] = useState(false);
    //

    const gotoForgotPassword = () => {
        const loc = '/lupa-password';
        history.push(loc);
    }

    const gotoRegistrasi = () => {
        const loc = '/registrasi';
        history.push(loc);
    }

    const onFinish = () => {
        setLoading(true)
        let loginData = {

        }

        Auth.login(loginData).then((response) => {
            var res = response.data
        
            setLoading(false);
            if(res.status=== 3){
                localStorage.setItem('email', JSON.stringify(res.session.email));
                localStorage.setItem('role', JSON.stringify(res.session.role));
                localStorage.setItem('token', JSON.stringify(res.session.__ci_last_regenerate));
            } else if(res.status === 6){
                message.error("Nomor Telepon tidak terdaftar");
            } 
        
            if(Auth.isLogin()){
                const loc = '/my-account';
                history.push(loc);
            }
        }).catch(err => {
            setLoading(false);
        
            message.error("Terjadi Kesalahan");
            if(err.response){
                console.log(err);
            }
        });
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
                            <Card className="login-card">
                                <Row justify="center" style={{marginBottom:30}}>
                                    <Text className="title bold">
                                        LOGIN
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
                                                    prefix={<UserOutlined />}
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
                                                    prefix={<LockOutlined />}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Row justify="end" style={{marginBottom:10}}>
                                                <Button type="text" onClick={gotoForgotPassword}>
                                                    <Text className="title-button" style={{color: "#777"}}>
                                                        Lupa Password?
                                                    </Text>
                                                </Button>
                                            </Row>
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
                                                    {isLoading && <LoadingOutlined />}
                                                    Masuk ke Akun
                                                </Button>
                                            </Row>
                                            <Row justify="center">
                                                <Text className="title bold">
                                                    Belum Punya Akun?
                                                </Text>
                                            </Row>
                                            <Row justify="center">
                                                <Button type="text" onClick={gotoRegistrasi}>
                                                    <Text className="title-button" style={{color: "#777", marginBottom:20}}>
                                                        Registrasi
                                                    </Text>
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
    )
}

export default withRouter(LoginUser)
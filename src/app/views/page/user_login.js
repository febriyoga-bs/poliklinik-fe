import React, { useState } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import { Layout, Row, Col, Typography, Card, Form, Input, Button, message } from 'antd';
import { LockOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import VerifikasiAkun from '../modal/verifikasi_akun'
import Auth from '../../service/auth'
import moment from 'moment';

const { Content } = Layout;
const { Text } = Typography;

const LoginUser = () => {
    const history = useHistory();
    const [formLoginInput] = Form.useForm();
    const [isLoading, setLoading] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [record, setRecord] = useState([]);
    
    const handleModal = () => {
        setVisibleModal(!visibleModal);
    };

    //
    const [fieldPhoneActive, setFieldPhoneActive] = useState(false);
    const [fieldPasswordActive, setFieldPasswordActive] = useState(false);
    //

    const gotoForgotPassword = () => {
        message.info("Laman Lupa Password belum tersedia");
        // const loc = '/lupa-password';
        // history.push(loc);
    }

    const gotoPendaftaran = () => {
        const loc = '/pendaftaran';
        history.push(loc);
    }

    const onFinish = (values) => {
        setLoading(true)
        let loginData = {
            var_login: values.var_login,
            password: values.password
        }
        // // Login Test
        //     if(values.no_telepon === "1" && values.password === "1"){
        //         localStorage.setItem('role', JSON.stringify("123"));
        //         const loc = 'profil-staf';
        //         history.push(loc);
        //     } else if (values.no_telepon === "2" && values.password === "2"){
        //         localStorage.setItem('role', JSON.stringify("234"));
        //         const loc = 'profil-dokter';
        //         history.push(loc);
        //     } else if(values.no_telepon === "3" && values.password === "3"){
        //         localStorage.setItem('role', JSON.stringify("pasien"));
        //         const loc = 'profil-pasien';
        //         history.push(loc);
        //     }
        // //

        Auth.login(loginData).then((response) => {
            setLoading(false);
            let res = response.data;
            let status = JSON.parse(res.data.status);
            let login_time = moment().unix();
            console.log("login time: ", login_time);

            if(res && status === 1){
                localStorage.setItem('no_identitas', JSON.stringify(res.data.no_identitas));
                localStorage.setItem('no_telepon', JSON.stringify(res.data.no_telepon));
                localStorage.setItem('role', JSON.stringify(res.meta.role * login_time));
                localStorage.setItem('token', JSON.stringify(res.meta.api_token));
                localStorage.setItem('login', JSON.stringify(login_time));
            } else if(status === 0){
                message.info("Akun Belum Terverifikasi");
                let record = {
                    no_identitas: res.data.no_identitas,
                    no_telepon: res.data.no_telepon,
                    role: res.meta.role * login_time,
                    token: res.meta.api_token,
                    login: login_time
                }
                setRecord(record)
                handleModal();
            } 
        
            if(Auth.isLogin()){
                let role = JSON.parse(localStorage.getItem('role'));
                let login_time = JSON.parse(localStorage.getItem('login'));
                if (role/login_time === 1){
                    history.push('/dashboard-admin');
                } else if (role/login_time === 2){
                    history.push('/dashboard-dokter');
                } else if (role/login_time === 3){
                    history.push('/dashboard-pasien');
                } else if (role/login_time === 4){
                    history.push('/dashboard-staf-umum');
                } else if (role/login_time === 5){
                    history.push('/dashboard-perawat');
                }
            }
        }).catch(err => {
            console.log(err)
            setLoading(false);
            if(err.response){
                message.error("Nomor Identitas atau Password yang Anda masukkan salah!");
            } else {
                message.error("Terjadi kesalahan, periksa koneksi Anda!");
            }
        });
    }

    return(
        <Layout style={{backgroundColor: "#072A6F"}}>
            <Content className="layout-content">
                <VerifikasiAkun
                    data={record}
                    buttonCancel={handleModal}
                    visible={visibleModal}
                />
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
                                    <Form form={formLoginInput} onFinish={onFinish}>
                                        <Col span={24}>
                                            <Text className={fieldPhoneActive ? "form-label active" : "form-label"}>No. Identitas/No. Telepon</Text>
                                            <Form.Item
                                                name="var_login"
                                                required
                                                rules={[
                                                {
                                                    required: true,
                                                    message: 'Harap masukkan Nomor Identitas/Nomor Telepon Anda!'
                                                },
                                                {
                                                    pattern: new RegExp('^[0-9]+$'),  
                                                    message: 'Harap hanya masukkan angka!',
                                                }]}
                                                style={{marginBottom:30}}
                                                >
                                                
                                                <Input className="input-form" 
                                                    placeholder={fieldPhoneActive ? "" : "No. Identitas/No. Telepon"}
                                                    prefix={<UserOutlined />}
                                                    onFocus={() => setFieldPhoneActive(true)}
                                                    onBlur={(e) => {if(e.target.value === ""){setFieldPhoneActive(false)} }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Text className={fieldPasswordActive ? "form-label active" : "form-label"}>Password</Text>
                                            <Form.Item
                                                name="password"
                                                required
                                                rules={[{
                                                    required: true,
                                                    message: 'Harap masukkan password Anda!'
                                                }]}
                                                >
                                                <Input.Password className="input-form" 
                                                    prefix={<LockOutlined />}
                                                    placeholder={fieldPasswordActive ? "" : "Password"}
                                                    onFocus={() => setFieldPasswordActive(true)}
                                                    onBlur={(e) => {if(e.target.value === ""){setFieldPasswordActive(false)} }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Row justify="end" style={{marginBottom:10}}>
                                                <Button type="text" onClick={gotoForgotPassword}>
                                                    <Text className="title-button" style={{color: "#FFE600"}}>
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
                                                <Button type="text" onClick={gotoPendaftaran}>
                                                    <Text className="title-button" style={{color: "#FFE600", marginBottom:20}}>
                                                        Daftar
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
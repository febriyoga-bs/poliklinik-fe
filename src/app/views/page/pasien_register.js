import React, { useState } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import { Layout, Row, Col, Typography, Card, Form, Input, Button, Select, DatePicker} from 'antd';
import { verifDialog, dialog } from '../../component/alert'
import { APIServices } from '../../service'

const { Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

const Register = () => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [regisStep, setRegisStep] = useState(1);
    const dateFormat = 'DD/MM/YYYY';

    const gotoLogin = () => {
        const loc = '/login';
        history.push(loc);
    }

    const onFinish = (values) => {
        setLoading(true);
        values.role = 3;

        APIServices.register(values).then(res => {
            console.log(res);
            setLoading(false);
            if(res.data){
                gotoLogin()
                dialog({icon: "success", title:"Pendaftaran Berhasil", text:"Anda dapat login menggunakan akun yang telah terdaftar"}).then(()=>{
                    console.log("Berhasil");
                })
                // verifDialog().then((kode_otp)=>{
                //     console.log("Testing Kode OTP: ", kode_otp);
                //     let body = [];
                //     body.no_telepon = values.no_telepon;
                //     body.kode_otp = kode_otp;
                //     APIServices.verifikasi(body).then(res => {
                //         setLoading(false);
                //         if(res.data){
                //             dialog({icon: "success", title:"Verifikasi Berhasil"}).then(()=>{
                //                 console.log("Berhasil");
                //             })
                //         }
                //       }).catch(err => {
                //         setLoading(false);
                //         if(err){
                //             dialog({icon: "error", title:"Verifikasi Gagal"}).then(()=>{
                //                 console.log("Gagal");
                //             })
                //         }
                //       })
                // })
            }
          }).catch(err => {
            setLoading(false);
            console.log(err);
            if(err){
                dialog({icon: "error", title:"Pendaftaran Gagal", text:"Nomor Telepon sudah digunakan!"}).then(()=>{
                    console.log("Gagal");
                })
            }
          })
    }

    const regisForm = () =>{
        if (regisStep === 1){
            return(
                <Row>
                    {/* <Col span={24}>
                        <Text className="form-label active">Kategori Pasien</Text>
                        <Form.Item
                            name="kategori"
                            required
                            initialValue="Umum"
                            rules={[{
                                required: true,
                                message: 'Harap pilih kategori pasien!'
                            }]}
                            style={{marginBottom:30}}
                            >
                            <Select defaultValue="Umum" className="input-form">
                                <Option value="Umum">Umum</Option>
                                <Option value="Mahasiswa">Mahasiswa</Option>
                                <Option value="Staf/Dosen">Staf/Dosen</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Text className="form-label active">Nama Lengkap</Text>
                        <Form.Item
                            name="nama"
                            required
                            rules={[
                            {
                                required: true,
                                message: 'Harap masukkan Nama Lengkap Anda!'
                            },
                            ]}
                            style={{marginBottom:30}}
                            >
                            
                            <Input className="input-form" 
                                placeholder="Masukkan nama lengkap"
                            />
                        </Form.Item>
                    </Col> */}
                    <Col span={24}>
                        <Text className="form-label active">No. Telepon</Text>
                        <Form.Item
                            name="no_telepon"
                            required
                            rules={[
                            {
                                required: true,
                                message: 'Harap masukkan Nomor Telepon Anda!'
                            },
                            {
                                pattern: new RegExp('^[0-9]+$'), 
                                message: 'Harap hanya masukkan angka!',
                            },
                            ]}
                            style={{marginBottom:30}}
                            >
                            
                            <Input className="input-form" maxLength={15} minLength={10}
                                placeholder="Contoh: 081234567890"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Text className="form-label active">Password</Text>
                        <Form.Item
                            name="password"
                            required
                            rules={[
                                {
                                    required: true,
                                    message: 'Harap masukkan password Anda!'
                                },
                                {
                                    pattern: new RegExp('[a-zA-Z0-9]{8,}$'),
                                    message: "Harap masukkan 8 karakter atau lebih"
                                }
                            ]}
                            style={{marginBottom:30}}
                            >
                            <Input.Password className="input-form"
                                placeholder="Masukkan 8 karakter atau lebih" 
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Text className="form-label active">Konfirmasi Password</Text>
                        <Form.Item
                            name="confirmPassword"
                            required
                            dependencies={['password']}
                            rules={[
                                { 
                                    required: true, message: 'Harap konfirmasi password Anda!' 
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                        }
                        
                                        return Promise.reject('Password tidak cocok!');
                                    },
                                }),
                            ]}
                            style={{marginBottom:30}}
                            >
                            <Input.Password className="input-form" 
                                placeholder="Masukkan ulang password"
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
                                loading={loading}
                                // onClick={()=> {
                                //     form.validateFields().then(() => {
                                //         setRegisStep(2)
                                //     })
                                // }}
                            >
                                Daftar
                            </Button>
                        </Row>
                    </Col>
                </Row>
            )
        } else if (regisStep === 2){
            return(
                <Row>
                    
                    <Col span={24}>
                        <Text className="form-label active">Nomor Identitas 
                            { (form.getFieldValue("kategori")==="Umum") ? " (NIK)" : 
                              (form.getFieldValue("kategori")==="Mahasiswa") ? " (NIM)" : " (NIP)"}
                        </Text>
                        <Form.Item
                            name="nomor_identitas"
                            required
                            rules={[
                            {
                                required: true,
                                message: 'Harap masukkan Nomor Identitas Anda!'
                            },
                            {
                                pattern: new RegExp('^[0-9]+$'), 
                                message: 'Harap hanya masukkan angka!',
                            }]}
                            style={{marginBottom:30}}
                            >
                            
                            <Input className="input-form"
                                placeholder={
                                    (form.getFieldValue("kategori")==="Umum") ? ("Masukkan nomor induk kependudukan") :
                                    (form.getFieldValue("kategori")==="Mahasiswa") ? "Masukkan nomor induk mahasiswa" : "Masukkan nomor induk pegawai" }
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Text className="form-label active">Tanggal Lahir</Text>
                        <Form.Item
                            name="tanggal_lahir"
                            required
                            rules={[
                            {
                                required: true,
                                message: 'Harap masukkan Tanggal Lahir Anda!'
                            },]}
                            style={{marginBottom:30}}
                            >
                            <DatePicker className="input-form" format={dateFormat} placeholder="01/01/2021"/>
    
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Text className="form-label active">Alamat</Text>
                        <Form.Item
                            name="alamat"
                            required
                            rules={[
                            {
                                required: true,
                                message: 'Harap masukkan Alamat Anda!'
                            },
                            ]}
                            style={{marginBottom:30}}
                            >
                            
                            <Input className="input-form" 
                                placeholder="Masukkan alamat"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Text className="form-label active">Jenis Kelamin</Text>
                        <Form.Item
                            name="jenis_kelamin"
                            required
                            rules={[
                            {
                                required: true,
                                message: 'Harap pilih Jenis Kelamin Anda!'
                            },
                            ]}
                            style={{marginBottom:30}}
                            >
                            
                            <Select className="input-form" placeholder="Pilih jenis kelamin">
                                <Option value="Laki-laki">Laki-laki</Option>
                                <Option value="Perempuan">Perempuan</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}> 
                        <Row justify="center" style={{marginBottom:10}}>
                            <Button
                                block
                                type="primary"
                                className="app-btn lg block tertiary"
                                style={{width:290, marginRight:5}}
                                onClick={()=> setRegisStep(1)}
                            >
                                Sebelumnya
                            </Button>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row justify="center" style={{marginBottom:10}}>
                            <Button
                                block
                                type="primary"
                                htmlType="submit"
                                className="app-btn lg block secondary"
                                style={{width:290, marginLeft:5}}
                            >
                                Daftar
                            </Button>
                        </Row>
                    </Col>
                </Row>
            )
        }
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
                            <Card className="registrasi-card" style={{marginBottom:40}}>
                                <Row justify="center" style={{marginBottom:40}}>
                                    <Text className="title bold" style={{textAlign:"center"}}>
                                        REGISTRASI PASIEN POLIKLINIK <br></br>
                                        {(regisStep===2) ? "("+form.getFieldValue("kategori")+")" : ""}
                                    </Text>
                                </Row>
                                <Row>
                                    <Form form={form} onFinish={onFinish}>
                                        {regisForm}
                                    </Form>
                                </Row>
                                {(regisStep===1) ?
                                    <div>
                                    <Row justify="center">
                                        <Text className="title bold">
                                            Sudah Punya Akun?
                                        </Text>
                                    </Row>
                                    <Row justify="center">
                                        <Button type="text" onClick={gotoLogin}>
                                            <Text className="title-button" style={{color: "#FFE600", marginBottom:20}}>
                                                Login
                                            </Text>
                                        </Button>
                                    </Row>
                                    </div>
                                    :
                                    <div></div>
                                }
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(Register)
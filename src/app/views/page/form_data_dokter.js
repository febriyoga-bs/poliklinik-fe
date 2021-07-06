import React, { useEffect, useState } from "react";
import { withRouter, useHistory, NavLink } from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Card, Typography, Form, Input, Upload, Select, Button, message } from 'antd';
import { HomeOutlined, LoadingOutlined, UploadOutlined, CheckCircleFilled } from '@ant-design/icons';
import { dialog } from '../../component/alert'
import { APIServices } from '../../service'
import CONFIG from '../../service/config';

const { Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

const FormDataDokter = (props) => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [uploadInfo, setUploadInfo] = useState("");

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
        let registerBody ={
            no_telepon: values.no_telepon,
            password: values.password,
            role: 2,
            status: 1
        }

        let body ={
            no_telepon: values.no_telepon,
            avatar: uploadInfo.response && uploadInfo.response.url,
            nama: values.nama,
            spesialisasi: values.spesialisasi,
        }
        console.log("Body: ", body);

        //
        if(props.location.state){
            body.no_telepon = props.location.state.no_telepon;
            APIServices.putDataDokter(body).then(res => {
                setLoading(false);
                if(res.data){
                    history.goBack();
                    dialog({icon: "success", title:"Ubah Data Dokter Berhasil!"}).then(()=>{
                        console.log("Berhasil");
                    })
                }
              }).catch(err => {
                setLoading(false);
                if(err){
                    dialog({icon: "error", title:"Ubah Data Dokter Gagal!"}).then(()=>{
                        console.log("Gagal");
                    })
                }
              })
        } else {
            APIServices.register(registerBody).then(res => {
                console.log("Akun Created")
                if(res.data){
                    APIServices.postDataDokter(body).then(res => {
                        setLoading(false);
                        if(res.data){
                            history.goBack();
                            dialog({icon: "success", title:"Tambah Data Dokter Berhasil!"}).then(()=>{
                                console.log("Berhasil");
                            })
                        }
                    }).catch(err => {
                        setLoading(false);
                        if(err){
                            dialog({icon: "error", title:"Tambah Data Dokter Gagal!"}).then(()=>{
                                console.log("Gagal");
                            })
                        }
                    })
                }
            }).catch(err => {
                setLoading(false);
                if(err){
                    console.log(err);
                    dialog({icon: "error", title:"Buat Akun Dokter Gagal!"}).then(()=>{
                        console.log("Gagal");
                    })
                }
            })
        }
    }

    const UploadProps = {
        name: 'image',
        action: CONFIG.BASE_URL+'/api/upload/postUploadAvatar',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            setUploadInfo(info.file);
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };
    
    return(
        <Layout style={{backgroundColor: "#072A6F"}}>
        <Content className="layout-content">
            {props.location.pathname !== "/dashboard-dokter/edit-profil" &&
                <Breadcrumb style={{marginLeft:40, marginBottom:20}} separator=">">
                    <Breadcrumb.Item >
                        <NavLink to="/"> 
                            <Text className="title">
                                <HomeOutlined />
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <NavLink to="/dashboard-staf">  
                            <Text className="title">
                                Admin
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/dashboard-staf/kelola-data-pengguna/dokter"> 
                            <Text className="title">
                                Kelola Data Dokter
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Text className="title">
                            {props.match.params.aksi === "ubah-data" ? "Ubah Data" : "Tambah Data"}
                        </Text>
                    </Breadcrumb.Item>
                </Breadcrumb>
            }


            <Row justify="center">
            <Card className="form-card" style={{width: 400, textAlign:"left"}}>
                <Row>
                        <Text className="title-tabel">
                            {   props.location.pathname === "/dashboard-dokter/edit-profil"  ? "Edit Profil" 
                                :
                                props.match.params.aksi === "ubah-data" ? "Ubah Data" : "Tambah Data"
                            }
                        </Text>
                    </Row>
                <Form form={form} name="control-hooks" onFinish={onFinish}>
                    <Row justify="center">
                        <Col span={24}>
                                {props.location.state &&
                                    <div>
                                    <Text className="title-label">ID Dokter</Text>
                                    <Form.Item name="id_dokter" >
                                            <Input className="input-form secondary" disabled/>
                                    </Form.Item>
                                    </div>
                                }

                                <Text className="title-label">Nomor Telepon</Text>
                                <Form.Item name="no_telepon"
                                    rules={[{ required: true, message: "Harap masukkan nomor telepon" }]}
                                >
                                        <Input className="input-form secondary" disabled={props.location.state}/>
                                </Form.Item>

                                {!props.location.state &&
                                    <div>
                                    <Text className="title-label">Password</Text>
                                    <Form.Item name="password"
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
                                    >
                                        <Input.Password className="input-form secondary"
                                            placeholder="Masukkan 8 karakter atau lebih" 
                                        />
                                    </Form.Item>

                                    <Text className="title-label">Konfirmasi Password</Text>
                                    <Form.Item name="confirmPassword"
                                        dependencies={['password']}
                                        rules={[
                                            { 
                                                required: true, message: 'Harap konfirmasi password!' 
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
                                        >
                                        <Input.Password className="input-form secondary" 
                                            placeholder="Masukkan ulang password"
                                        />
                                    </Form.Item>
                                    </div>
                                }

                                <Text className="title-label">Foto</Text>
                                <Form.Item name="avatar" 
                                    rules={[{ required: true, message: "Harap unggah foto" }]}
                                >
                                    <Upload {...UploadProps}>
                                        <Button>
                                            <UploadOutlined /> {(!!form.getFieldValue(['avatar']) || props.location.state) ? "Ubah Foto" : "Unggah Foto"}
                                            {(!!form.getFieldValue(['avatar']) || props.location.state) && <CheckCircleFilled style={{ color: '#27ae60', marginLeft: '1em'}}/>}
                                        </Button>
                                    </Upload>
                                </Form.Item>

                                <Text className="title-label">Nama Dokter</Text>
                                <Form.Item name="nama" 
                                    rules={[{ required: true, message: "Harap masukkan nama"  }]}
                                >
                                        <Input className="input-form secondary" />
                                </Form.Item>

                                <Text className="title-label">Spesialisasi</Text>
                                    <Form.Item name="spesialisasi" 
                                        rules={[{ required: true, message: "Harap masukkan spesialisasi"  }]}
                                    >
                                        <Select defaultValue="Pilih Spesialisasi" className="input-form" >
                                            <Option key={1} value="Umum">Umum</Option>
                                            <Option key={2} value="Gigi">Gigi</Option>
                                        </Select>
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

export default withRouter(FormDataDokter)
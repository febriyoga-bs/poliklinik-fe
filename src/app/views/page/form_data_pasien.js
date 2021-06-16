import React, { useEffect, useState } from "react";
import { withRouter, useHistory, NavLink} from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Card, Typography, Form, Input, Select, Button, DatePicker } from 'antd';
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons';
import { dialog } from '../../component/alert'
import { APIServices } from '../../service'
import moment from 'moment';

import Dummy from '../../dummy/dummy'

const { Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

const UbahDataPasien = (props) => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [dataJurusan, setDataJurusan] = useState([]);
    const [dataProdi, setDataProdi] = useState([]);
    const [kategori, setKategori] = useState("");
    const [jurusan, setJurusan] = useState(0);

    //const dataJurusan = Dummy.listJurusan;
    //const dataProdi = Dummy.listProdi;

    useEffect(()=>{
        console.log(props.location)
        getDataJurusan();
        if(props.location.state){
            console.log(props.location)
          form.setFieldsValue(props.location.state);

          if(props.location.state.tanggal_lahir){
            let tanggal = props.location.state.tanggal_lahir;
            form.setFieldsValue({tanggal_lahir: (moment(tanggal, 'YYYY-MM-DD')) });
          }
          setKategori(props.location.state.kategori)
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
            role: 3,
            status: 1
        }

        let body = {
            no_telepon: props.location.state.no_telepon,
            kategori: values.kategori,
            jurusan: values.jurusan,
            prodi: values.prodi,
            nama: values.nama,
            nomor_identitas: values.nomor_identitas,
            jenis_kelamin: values.jenis_kelamin,
            tanggal_lahir: values.tanggal_lahir.format('YYYY-MM-DD'),
            alamat: values.alamat
        }

        if(props.location.state){
            if (props.location.pathname === "/profil-pasien/data-diri"){
                APIServices.postDataPasien(body).then(res => {
                    setLoading(false);
                    if(res.data){
                        history.push('/profil-pasien');
                        dialog({icon: "success", title:"Lengkapi Data Diri Berhasil!"}).then(()=>{
                            console.log("Berhasil");
                        })
                    }
                }).catch(err => {
                    setLoading(false);
                    if(err){
                        dialog({icon: "error", title:"Lengkapi Data Diri Gagal!"}).then(()=>{
                            console.log("Gagal");
                        })
                    }
                })
            } else {
                body.no_telepon = props.location.state.no_telepon;
                APIServices.putDataPasien(body).then(res => {
                    setLoading(false);
                    if(res.data){
                        history.goBack();
                        dialog({icon: "success", title:"Ubah Data Pasien Berhasil!"}).then(()=>{
                            console.log("Berhasil");
                        })
                    }
                }).catch(err => {
                    setLoading(false);
                    if(err){
                        dialog({icon: "error", title:"Ubah Data Pasien Gagal!"}).then(()=>{
                            console.log("Gagal");
                        })
                    }
                })
            }
        } else {
            APIServices.register(registerBody).then(res => {
                console.log("Akun Created")
                if(res.data){
                    APIServices.postDataPasien(body).then(res => {
                        setLoading(false);
                        if(res.data){
                            history.goBack();
                            dialog({icon: "success", title:"Tambah Data Pasien Berhasil!"}).then(()=>{
                                console.log("Berhasil");
                            })
                        }
                    }).catch(err => {
                        setLoading(false);
                        if(err){
                            dialog({icon: "error", title:"Tambah Data Pasien Gagal!"}).then(()=>{
                                console.log("Gagal");
                            })
                        }
                    })
                }
            }).catch(err => {
                setLoading(false);
                if(err){
                    console.log(err);
                    dialog({icon: "error", title:"Buat Akun Pasien Gagal!"}).then(()=>{
                        console.log("Gagal");
                    })
                }
            })
        }
    }

    const getDataJurusan = () => {
        setLoading(true);
        APIServices.getJurusan().then(res => {
                if(res.data){
                    setDataJurusan(res.data.data);
                    setLoading(false)
                }
            }).catch(err => {
                //setDataStaf(Dummy.dataStaf);
                if(err){
                    console.log(err.response)
                    setLoading(false)
                }
            })
        }

    const getDataProdi = (id_jurusan) => {
        setLoading(true);
        APIServices.getProdi(id_jurusan).then(res => {
                if(res.data){
                    setDataProdi(res.data.data);
                    setLoading(false)
                }
            }).catch(err => {
                //setDataStaf(Dummy.dataStaf);
                if(err){
                    console.log(err.response)
                    setLoading(false)
                }
            })
        }
    
    return(
        <Layout style={{backgroundColor: "#072A6F"}}>
        <Content className="layout-content">
            { (props.location.pathname !== "/profil-pasien/data-diri" &&
                props.location.pathname !== "/profil-pasien/edit-profil") 
                &&
                <Breadcrumb style={{marginLeft:40, marginBottom:20}} separator=">">
                    <Breadcrumb.Item >
                        <NavLink to="/"> 
                            <Text className="title">
                                <HomeOutlined />
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <NavLink to="/profil-staf">  
                            <Text className="title">
                            Admin
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/kelola-data-pengguna/pasien"> 
                            <Text className="title">
                                Kelola Data Pasien
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
            }

            <Row justify="center">
            <Card className="form-card" style={{width: 600, textAlign:"left"}}>
                <Row>
                    <Text className="title-tabel">
                        { props.location.state === undefined ?
                            "Tambah Data Pasien"
                            :
                            (props.location.pathname !== "/profil-pasien/data-diri") ?
                            "Ubah Data Pasien"
                            :
                            "Lengkapi Data Diri"
                        }
                    </Text>
                </Row>
                <Form form={form} name="control-hooks" onFinish={onFinish}>
                <Row justify="space-between" gutter={30}>
                    <Col span={12}>
                        {!!props.location.state.id_pasien &&
                            <div>
                            <Text className="title-label">ID Pasien</Text>
                                <Form.Item name="id_pasien" >
                                        <Input className="input-form secondary" disabled/>
                                </Form.Item>
                            </div>
                        }
                        
                        <Text className="title-label">Nomor Telepon</Text>
                            <Form.Item name="no_telepon" rules={[{ required: true }]}>
                                    <Input className="input-form secondary" disabled/>
                            </Form.Item>
                            
                        <Text className="title-label">Kategori Pasien</Text>
                            <Form.Item name="kategori" rules={[{ required: true, message: "Harap pilih kategori pasien!" }]}>
                                <Select defaultValue="Umum" className="input-form" onChange={(e)=>setKategori(e)}>
                                    <Option value="Umum">Umum</Option>
                                    <Option value="Mahasiswa">Mahasiswa</Option>
                                    <Option value="Staf/Dosen">Staf/Dosen</Option>
                                    <Option value="Keluarga Staf/Dosen">Keluarga Staf/Dosen</Option>
                                </Select>
                            </Form.Item>
                        
                        {kategori==="Mahasiswa" &&
                            <div>
                                <Text className="title-label">Jurusan</Text>
                                <Form.Item name="jurusan" rules={[{ required: true, message: "Harap pilih jurusan!" }]}>
                                    <Select defaultValue="Pilih Jurusan" className="input-form" 
                                        onChange={(e, a)=>{
                                            setJurusan(a.key); 
                                            form.setFieldsValue({ prodi: ""})
                                            getDataProdi(a.key);
                                        }}
                                    >
                                        {dataJurusan.map(item => (
                                            <Option key={item.id_jurusan} value={item.nama}>
                                                {item.nama}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Text className="title-label">Program Studi</Text>
                                <Form.Item name="prodi" rules={[{ required: true, message: "Harap pilih program studi!" }]}>
                                    <Select defaultValue="Pilih Prodi" className="input-form" disabled={loading}>
                                        {dataProdi.map((item) => {
                                            return(
                                                <Option key={item.id_prodi} value={item.nama}>
                                                    {item.nama}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                </Form.Item>
                            </div>
                        }
                        
                    </Col>
                    <Col span={12}>
                        
                        <Text className="title-label">Nama Pasien</Text>
                            <Form.Item name="nama" rules={[{ required: true, message: "Harap masukkan nama!" }]}>
                                    <Input className="input-form secondary" />
                            </Form.Item>
                        

                        <Text className="title-label">Nomor Identitas</Text>
                            <Form.Item name="nomor_identitas" rules={[{ required: true, message: "Harap masukkan nomor identitas!" }]}>
                                    <Input className="input-form secondary" />
                            </Form.Item>

                        <Text className="title-label">Jenis Kelamin</Text>
                            <Form.Item name="jenis_kelamin" rules={[{ required: true, message: "Harap pilih jenis kelamin!" }]}>
                                <Select defaultValue="Pilih Jenis Kelamin" className="input-form" >
                                    <Option key={1} value="Laki-laki">Laki-laki</Option>
                                    <Option key={2} value="Perempuan">Perempuan</Option>
                                </Select>
                            </Form.Item>
                            
                        <Text className="title-label">Tanggal Lahir</Text>
                            <Form.Item name="tanggal_lahir" rules={[{ required: true, message: "Harap masukkan tanggal lahir!" }]}>
                                    <DatePicker className="input-form secondary" format='DD/MM/YYYY' placeholder="" style={{width:256}}/>

                            </Form.Item>
                            
                        <Text className="title-label">Alamat</Text>
                            <Form.Item name="alamat" rules={[{ required: true, message: "Harap masukkan alamat sesuai KTP!" }]}>
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
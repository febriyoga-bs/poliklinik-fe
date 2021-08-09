import React, { useEffect, useState } from "react";
import { withRouter, useHistory, NavLink} from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Card, Typography, Form, Input, Select, Button, DatePicker } from 'antd';
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons';
import { dialog } from '../../component/alert'
import { APIServices } from '../../service'
import moment from 'moment';

//import Dummy from '../../dummy/dummy'

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
            kategori: values.kategori,
            no_identitas : values.no_identitas,
            no_telepon: values.no_telepon,
            nama: values.nama,
            jenis_kelamin: values.jenis_kelamin,
            tanggal_lahir: values.tanggal_lahir.format('YYYY-MM-DD'),
            alamat: values.alamat
        }
        if(props.location.state){
            if (values.kategori !== props.location.state.kategori && (values.kategori === 'Umum' || values.kategori === 'Keluarga')){
                body.jurusan = ""
                body.prodi = ""
            } else if (values.kategori !== props.location.state.kategori && (values.kategori === 'Staf/Dosen')) {
                body.jurusan = ""
                body.prodi = ""
            } else {
                body.jurusan = values.jurusan
                body.prodi = values.prodi
            }
        }
        if(props.location.state){
            if (props.location.pathname === "/dashboard-pasien/lengkapi-data-diri"){
                APIServices.postDataPasien(body).then(res => {
                    setLoading(false);
                    if(res.data){
                        history.push('/dashboard-pasien');
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
                body.id_pasien = props.location.state.id_pasien;
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
                if(err){
                    console.log(err.response)
                    setLoading(false)
                }
            })
        }
    
    return(
        <Layout style={{backgroundColor: "#072A6F"}}>
        <Content className="layout-content">
            { (props.location.pathname !== "/dashboard-pasien/data-diri" &&
                props.location.pathname !== "/dashboard-pasien/edit-profil") 
                ?
                <Breadcrumb style={{marginLeft:20, marginBottom:20}} separator=">">
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
                                Pasien
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/kelola-data-pengguna/pasien"> 
                            <Text className="title">
                                Lengkapi Data Diri
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
                :
                <div style={{marginBottom:20}}></div>
            }

            <Row justify="center">
            <Card className="form-card" style={{width: 650, textAlign:"left"}}>
                <Row>
                    <Text className="title-tabel">
                        { props.location.state === undefined ?
                            "Tambah Data Pasien"
                            :
                            (props.location.pathname === "/dashboard-pasien/lengkapi-data-diri") ?
                            "Lengkapi Data Diri"
                            :
                            (props.location.pathname === "/dashboard-pasien/edit-profil") ?
                            "Edit Profil"
                            :
                            "Ubah Data Pasien"
                        }
                    </Text>
                </Row>
                <Form form={form} name="control-hooks" onFinish={onFinish}>
                <Row justify="space-between" gutter={30}>
                    <Col span={12}>
                        {!!props.location.state &&
                            <div>
                            <Text className="title-label">ID Pasien</Text>
                                <Form.Item name="id_pasien" >
                                        <Input className="input-form secondary" disabled/>
                                </Form.Item>
                                     
                            </div>
                        }
                        <Text className="title-label">{kategori==="Mahasiswa" ? "Nomor Identitas (NIM)" : kategori === "Staf/Dosen" ? "Nomor Identitas (NIP)" : "Nomor Identitas (NIK)"}</Text>
                            <Form.Item name="no_identitas" rules={[{ required: true, message: "Harap masukkan nomor identitas!" }]}>
                                    <Input className="input-form secondary" 
                                    disabled={props.location.state}
                                    placeholder="Masukkan nomor identitas"/>
                            </Form.Item>  

                        <Text className="title-label">Nomor Telepon</Text>
                            <Form.Item name="no_telepon" 
                            rules={[
                                { required: true, message: 'Harap masukkan nomor telepon!' },
                                { pattern: new RegExp('^[0-9]+$'),  message: 'Harap hanya masukkan angka!' },
                                ]}>
                                    <Input className="input-form secondary" 
                                        placeholder="Masukkan nomor telepon"
                                    />
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

                            
                          
                        <Text className="title-label">Kategori Pasien</Text>
                            <Form.Item name="kategori" rules={[{ required: true, message: "Harap pilih kategori pasien!" }]}>
                                <Select defaultValue="Pilih Kategori" className="input-form" onChange={(e)=>setKategori(e)}
                                    disabled={props.location.pathname === "/dashboard-pasien/edit-profil"}
                                >
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
                            <Form.Item name="nama" 
                            rules={[
                                { required: true, message: "Harap masukkan nama!" },
                                { pattern: new RegExp('[a-zA-Z]$'), message: "Harap hanya masukkan huruf!" },
                                ]}>
                                    <Input className="input-form secondary" 
                                        placeholder="Masukkan nama"
                                    />
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
                                    <DatePicker className="input-form secondary" format='DD/MM/YYYY' 
                                        placeholder="Masukkan Tanggal Lahir" style={{width:256}}
                                    />

                            </Form.Item>
                            
                        <Text className="title-label">Alamat</Text>
                            <Form.Item name="alamat" rules={[{ required: true, message: "Harap masukkan alamat lengkap sesuai KTP!" }]}>
                                    <Input className="input-form secondary" 
                                        placeholder="Masukkan alamat lengkap sesuai KTP!"
                                    />
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
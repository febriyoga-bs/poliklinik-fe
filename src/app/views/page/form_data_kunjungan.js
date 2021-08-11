import React, { useEffect, useState } from "react";
import { withRouter, useHistory, NavLink} from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Card, Typography, Form, Input, Select, Button, DatePicker, TimePicker } from 'antd';
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons';
import { dialog } from '../../component/alert'
import { APIServices } from '../../service'
import moment from 'moment';

//import Dummy from '../../dummy/dummy'

const { Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

const FormDataKunjungan = (props) => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [dataDokter, setDataDokter] = useState([]);

    //const dataJurusan = Dummy.listJurusan;
    //const dataProdi = Dummy.listProdi;

    useEffect(()=>{
        console.log(props.location)
        getDataDokter();
        if(props.location.state){
            console.log(props.location)
          form.setFieldsValue(props.location.state);

          if(props.location.state.tanggal_lahir){
            let tanggal = props.location.state.tanggal_lahir;
            form.setFieldsValue({tanggal_lahir: (moment(tanggal, 'YYYY-MM-DD')) });
          }
        }else{
          form.resetFields()
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDataDokter = () => {
        setLoading(true);
        APIServices.getAllDokter().then(res => {
                if(res.data){
                    setDataDokter(res.data.data);
                    setLoading(false)
                }
            }).catch(err => {
                if(err){
                    //setDataDokter(Dummy.dataDokter);
                    console.log(err)
                    setLoading(false)
                }
            })
        }

    const onFinish= (values) => {
        setLoading(true);
        let id_rekam_medis = props.location.state.id_rekam_medis;
        let body = {
            id_rekam_medis: id_rekam_medis,
            id_dokter: values.dokter,
            tanggal: values.tanggal_kunjungan.format('YYYY-MM-DD'),
            jam_masuk: values.jam_masuk.format('HH:mm'),
            jam_keluar: values.jam_keluar.format('HH:mm'),
            anamnesa: values.anamnesa,
            diagnosis: values.diagnosis,
            terapi: values.terapi,
            keterangan: values.keterangan
        }

        APIServices.postKunjungan(body).then(res => {
            setLoading(false);
            if(res.data){
                history.goBack();
                dialog({icon: "success", title:"Tambah Data Kunjungan Berhasil!"}).then(()=>{
                    console.log("Berhasil");
                })
            }
        }).catch(err => {
            setLoading(false);
            if(err){
                dialog({icon: "error", title:"Tambah Data Kunjungan Gagal!"}).then(()=>{
                    console.log("Gagal");
                })
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
                        <NavLink to="/dashboard-dokter">  
                            <Text className="title">
                                Dashboard
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/dashboard-dokter/kelola-rekam-medis"> 
                            <Text className="title">
                                Kelola Rekam Medis
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/dashboard-dokter/kelola-rekam-medis"> 
                            <Text className="title">
                                Catat Kunjungan
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
            }

            <Row justify="center">
            <Card className="form-card" style={{width: 600, textAlign:"left"}}>
                <Row style={{marginBottom:10}}>
                    <Text className="title-tabel">
                        Catat Kunjungan
                    </Text>
                </Row>
                <Form form={form} name="control-hooks" onFinish={onFinish}>
                <Row justify="space-between" gutter={30}>
                    <Col span={12}>
                        <Text className="title-label">Tanggal Kunjungan</Text>
                            <Form.Item name="tanggal_kunjungan" rules={[{ required: true, message: "Harap masukkan tanggal kunjungan!" }]}>
                                    <DatePicker className="input-form secondary" format='DD/MM/YYYY' 
                                        placeholder="Masukkan Tanggal Kunjungan" style={{width:256}}
                                    />

                            </Form.Item>

                        
                        <Text className="title-label">Dokter</Text>
                            <Form.Item name="dokter" rules={[{ required: true, message: "Harap pilih dokter" }]}>
                                <Select className="input-form secondary" allowClear style={{minHeight:"100%"}}
                                    placeholder={loading ? "Memuat Data Dokter" : "Pilih Dokter"}
                                >
                                {dataDokter.map(item => (
                                    <Option key={item.id_dokter} value={item.id_dokter}>
                                        {item.nama}
                                    </Option>
                                ))}
                                </Select>
                            </Form.Item>

                        
                        <Text className="title-label">Jam Masuk</Text>
                            <Form.Item name="jam_masuk" rules={[{ required: true, message: "Harap masukkan jam masuk!" }]}>
                                <TimePicker className="input-form secondary" 
                                    clearIcon
                                    clearText
                                    allowClear={false}
                                    showNow={false}
                                    format='HH:mm'
                                    disabledHours={() => {
                                        let arr = []
                                        for(let i=0; i<8; i++){
                                            arr.push(i)
                                        }
                                        for(let i=16; i<24; i++){
                                            arr.push(i)
                                        }
                                        return arr
                                    }}
                                    placeholder="Jam Masuk"/>
                            </Form.Item>

                        <Text className="title-label">Jam Keluar</Text>
                            <Form.Item name="jam_keluar" rules={[{ required: true, message: "Harap masukkan jam keluar!" }]}>
                                <TimePicker className="input-form secondary" 
                                    clearIcon
                                    clearText
                                    allowClear={false}
                                    showNow={false}
                                    format='HH:mm'
                                    disabledHours={() => {
                                        let jam_masuk = Number(form.getFieldValue('jam_masuk').format('HH'))
                                        let arr = []
                                        for(let i=0; i<jam_masuk; i++){
                                            arr.push(i)
                                        }
                                        for(let i=16; i<24; i++){
                                            arr.push(i)
                                        }
                                        return arr
                                    } }
                                    placeholder="Jam Keluar"/>
                            </Form.Item>
                        
                        
                    </Col>
                    <Col span={12}>
                        
                        <Text className="title-label">Anamnesis</Text>
                            <Form.Item name="anamnesa" rules={[{ required: true, message: "Harap masukkan anamnesis!" }]}>
                                    <Input.TextArea className="input-form secondary" 
                                        placeholder="Catat anamnesa"
                                    />
                            </Form.Item>
                            
                        <Text className="title-label">Diagnosis</Text>
                            <Form.Item name="diagnosis" rules={[{ required: true, message: "Harap masukkan diagnosis!" }]}>
                                    <Input.TextArea className="input-form secondary" 
                                        placeholder="Catat diagnosis"
                                    />
                            </Form.Item>
                        
                        <Text className="title-label">Terapi</Text>
                            <Form.Item name="terapi" rules={[{ required: true, message: "Harap masukkan terapi!" }]}>
                                    <Input.TextArea className="input-form secondary" 
                                        placeholder="Catat terapi"
                                    />
                            </Form.Item>
                        
                        <Text className="title-label">Keterangan</Text>
                            <Form.Item name="keterangan" rules={[{ required: true, message: "Harap masukkan keterangan!" }]}>
                                    <Input.TextArea className="input-form secondary" 
                                        placeholder="Catat keterangan"
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

export default withRouter(FormDataKunjungan)
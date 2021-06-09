import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Card, Typography, Form, Input, Select, Button } from 'antd';
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons';
import { dialog } from '../../component/alert'
import { APIServices } from '../../service'

const { Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

const UbahDataPelayanan = (props) => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const dataPoli = [
        {
            id: 1,
            nama: "Umum"
        }, 
        {
            id: 2,
            nama: "Gigi"
        }
    ]

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
        let body = values;

        if(props.location.state){
            body.id_pelayanan=props.location.state.id_pelayanan;
            APIServices.putDataPelayanan(body).then(res => {
                setLoading(false);
                if(res.data){
                    history.goBack();
                    dialog({icon: "success", title:"Ubah Data Pelayanan Berhasil!"}).then(()=>{
                        console.log("Berhasil");
                    })
                }
              }).catch(err => {
                setLoading(false);
                if(err){
                    dialog({icon: "error", title:"Ubah Data Pelayanan Gagal!"}).then(()=>{
                        console.log(err);
                    })
                }
              })
        } else {
            APIServices.postDataPelayanan(body).then(res => {
                setLoading(false);
                if(res.data){
                    history.goBack();
                    dialog({icon: "success", title:"Tambah Data Pelayanan Berhasil!"}).then(()=>{
                        console.log("Berhasil");
                    })
                }
              }).catch(err => {
                setLoading(false);
                if(err){
                    dialog({icon: "error", title:"Tambah Data Pelayanan Gagal!"}).then(()=>{
                        console.log(err);
                    })
                }
              })
        }
    }
    
    return(
        <Layout style={{backgroundColor: "#072A6F"}}>
        <Content className="layout-content">
            <Breadcrumb style={{marginLeft:40, marginBottom:20}} separator=">">
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
                <Card className="form-card" style={{width:600, textAlign:"left"}}>
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
                                    <Form.Item name="poli" rules={[{ required: true }]}>
                                        
                                        <div className="input-form secondary">
                                        <Select defaultValue={props.location.state ? props.location.state.poli : ""}>
                                            {dataPoli.map(item => (
                                                <Option key={item.id} value={item.id}>
                                                    {item.nama}
                                                </Option>
                                            ))}
                                        </Select>
                                        </div>
                                    </Form.Item>
                                </Col>

                                <Col span={12} style={{justifyContent:"center"}}>
                                    <Text className="title-label">Tarif Mahasiswa</Text>
                                    <Form.Item name="tarif_mahasiswa" rules={[{ required: true }]}>
                                        <Input className="input-form secondary" prefix="Rp."/>
                                    </Form.Item>

                                    <Text className="title-label">Tarif Staf/Dosen</Text>
                                    <Form.Item name="tarif_staf_kampus" rules={[{ required: true }]}>
                                        <Input prefix="Rp." className="input-form secondary" />
                                    </Form.Item>

                                    <Text className="title-label">Tarif Keluarga Staf/Dosen</Text>
                                    <Form.Item name="tarif_keluarga_staf" rules={[{ required: true }]}>
                                        <Input className="input-form secondary" prefix="Rp."/>
                                    </Form.Item>

                                    <Text className="title-label">Tarif Umum</Text>
                                    <Form.Item name="tarif_umum" rules={[{ required: true }]}>
                                        <Input className="input-form secondary" prefix="Rp."/>
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
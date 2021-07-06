import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Typography, Card, Table, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { APIServices } from '../../service'
import { dialog } from '../../component/alert'

const { Content } = Layout;
const { Text } = Typography;
 
const AmbilAntrean = () => {
    const {loading, setLoading} = useState(false);
    const {dataAntreanUmum, setDataAntreanUmum} = useState([]);
    const {dataAntreanGigi, setDataAntreanGigi} = useState([]);

    const ambilAntrean = (data) => {
        let body = {
            id_poli: 1,
            id_pasien: 17,
        }
        APIServices.postDataPasien(body).then(res => {
            setLoading(false);
            if(res.data){
                dialog({icon: "success", title:"Ambil Nomor Antrean Berhasil!"}).then(()=>{
                    console.log("Berhasil");
                })
            }
        }).catch(err => {
            setLoading(false);
            if(err){
                dialog({icon: "error", title:"Ambil Nomor Antrean Gagal!"}).then(()=>{
                    console.log("Gagal");
                })
            }
        })
    }

    const columnsAntrean = [
        {
            title: "Nomor Antrean",
            dataIndex: 'nomor',
            key: 'nomor',
            width: '25',
            align: 'center',
            
        },
        {
            title: "Nama Pasien",
            dataIndex: 'nama',
            key: 'nama',
            width: '25',
            align: 'center',
        },
    ]

    return(
        <Layout style={{backgroundColor: "#072A6F"}}>
            <Content className="layout-content-new">
                <Breadcrumb style={{marginTop: 20, marginLeft:40, marginBottom:20, color:"#FFF"}} separator=">">
                    <Breadcrumb.Item href="/">
                        <Text className="title">
                            <HomeOutlined />
                        </Text>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/antrian-poliklinik">
                        <Text className="title">
                            <span>Antrean Poliklinik</span>
                        </Text>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={10} style={{minHeight:600, marginRight:40}} justify="space-between">
                    <Col xs={24} md={12} lg={8}>
                        <Card className="button-card" >
                            <Row justify="center">
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>
                                    AMBIL ANTREAN BARU
                                </Text>
                            </Row>
                            <Card justify="center" style={{marginTop:20, borderColor: "#EB3D00", borderWidth: 5, borderRadius: 15}}>
                                <Row justify="center">
                                    <Text style={{color:"#EB3D00", fontWeight:"bold", fontSize: "3em"}}>
                                        U-029
                                    </Text>
                                </Row>
                            </Card>
                            <Row justify="center">
                                <Button type='primary' className="app-btn secondary" info style={{marginTop: 10}} 
                                    onClick={() => {
                                        ambilAntrean();
                                    }}
                                >
                                    Ambil Nomor Antrean
                                </Button>
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <Card className="button-card" >
                            <Row justify="center">
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>
                                    SEDANG DILAYANI
                                </Text>
                            </Row>
                            <Card justify="center" style={{marginTop:20, borderColor: "#EB3D00", borderWidth: 5, borderRadius: 15}}>
                                <Row justify="center">
                                    <Text style={{color:"#EB3D00", fontWeight:"bold", fontSize: "3em"}}>
                                        U-029
                                    </Text>
                                </Row>
                            </Card>
                            <Row justify="center" style={{marginTop:20}}>
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>
                                    Jam Masuk
                                </Text>
                            </Row>
                            <Row justify="center">
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>
                                    09:25
                                </Text>
                            </Row>
                            <Row justify="center" style={{marginTop:20}}>
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>
                                    Poli Umum
                                </Text>
                            </Row>
                            <Row justify="center">
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>
                                    dr. Eva Dianita
                                </Text>
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Card className="button-card" >
                            <Row justify="center">
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>
                                    LIST ANTREAN
                                </Text>
                            </Row>
                            <Table
                                columns={columnsAntrean}
                                size="middle"
                                bordered={false}
                                loading={loading}
                                dataSource={dataAntreanUmum}
                                // onChange={handleTableChange}
                            />
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(AmbilAntrean)
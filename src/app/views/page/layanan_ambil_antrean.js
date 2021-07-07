import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Typography, Card, Table, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { APIServices } from '../../service'
import { dialog } from '../../component/alert'

import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');

const { Content } = Layout;
const { Text } = Typography;
 
const AmbilAntrean = () => {
    const [loading, setLoading] = useState(false);
    const [dataAntreanUmum, setDataAntreanUmum] = useState([]);
    const [dataAntreanGigi, setDataAntreanGigi] = useState([]);
    const [dataAntrean, setDataAntrean] = useState([]);

    useEffect(()=>{
        window.Echo = new Echo({
            authEndpoint: "http://25.70.2.196:8000/laravel-websockets/auth",
            broadcaster: 'pusher',
            key: "anyKey",
            wsHost: "25.70.2.196",
            wsPort: 6001,
            disableStats: true,
            forceTLS: false // Critical if you want to use a non-secure WebSocket connection
        });

        console.log("Tes: ", window.Echo);
        let echo = window.Echo;
        /* LISTENING FOR EVENT BROADCAST */
        // echo.private(`antre`)
        //     .listen('AntreanSent', (e) => {
        //         console.log(e);
        //     });
        echo.channel('antre')
            .listen('AntreanSent', (e) => {
                console.log(e);
                let arr = []
                arr.push(e.antrean)
                console.log(arr)
                setDataAntrean(arr)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const ambilAntrean = (data) => {
        let body1 = {
            id_poli: 1,
            id_pasien: 1,
        }
        setLoading(true);

        // Promise.all([
        //     APIServices.postAntrean(body1),
        //     APIServices.postAntrean(body2),
        //     APIServices.postAntrean(body3),
        //     APIServices.postAntrean(body4),
        //     APIServices.postAntrean(body1),
        //     APIServices.postAntrean(body2),
        //     APIServices.postAntrean(body3),
        //     APIServices.postAntrean(body4),
        //     APIServices.postAntrean(body1),
        //     APIServices.postAntrean(body2),
        //     APIServices.postAntrean(body3),
        //     APIServices.postAntrean(body4)
        // ]).then((res) =>{
        //     setLoading(false);
        // })

        APIServices.postAntrean(body1).then(res => {
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
            dataIndex: 'no_antrean',
            key: 'nomor',
            width: '25',
            align: 'center',
            
        },
        {
            title: "Nama Pasien",
            dataIndex: ["pasiens", "nama"],
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
                        <Card className="button-card" style={{height:350}}>
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
                                <Button type='primary' className="app-btn secondary" info style={{marginTop: 20}} 
                                    loading={loading}
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
                        <Card className="button-card" style={{height:350}}>
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
                        <Card className="button-card" style={{height:350}}>
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
                                dataSource={dataAntrean}
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
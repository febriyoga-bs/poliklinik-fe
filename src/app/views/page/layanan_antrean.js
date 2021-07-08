import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Typography, Card, Table, Button, message } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Auth from "../../service/auth";
import moment from 'moment';

import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');

const { Content } = Layout;
const { Text } = Typography;
 
const Antrean = () => {
    const history = useHistory();
    const {loading, setLoading} = useState(false);
    const {dataAntreanUmum, setDataAntreanUmum} = useState([]);
    const {dataAntreanGigi, setDataAntreanGigi} = useState([]);
    const [currentTime, setCurrentTime] = useState(moment().format("DD/MM/YYYY HH:mm:ss"));
    
    useEffect(()=>{
        const interval = setInterval(() => {
            console.log('This will run every second!');
            setCurrentTime(moment().format("DD/MM/YYYY HH:mm:ss"))
          }, 1000);
          return () => clearInterval(interval);
    }, [])

    const gotoAmbilAntreanUmum= () => {
        let data = {poli: "umum"}
        const loc = '/antrean-poliklinik/poli-umum';

        if(Auth.isLogin()){
            history.push({pathname:loc, state:data});
        }else{
            message.info("Anda perlu login untuk mengakses layanan ini!")
        }
    }

    const gotoAmbilAntreanGigi= () => {
        let data = {poli: "gigi"}
        const loc = '/antrean-poliklinik/poli-gigi';

        if(Auth.isLogin()){
            history.push({pathname:loc, state:data});
        }else{
            message.info("Anda perlu login untuk mengakses layanan ini!")
        }
    }

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
        echo.channel('antre')
            .listen('AntreanSent', (e) => {
                console.log(e);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

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
                <Row>
                    <Col span={20}>
                        <marquee direction="" onmouseover="this.stop();" onmouseout="this.start();">
                            Layanan Ambil Nomor Antrean hanya dapat dilakukan pukul 08.00 s.d. 11.00
                        </marquee>
                    </Col>
                    <Col offset={1} span={3}>
                        {currentTime}
                    </Col>
                </Row>
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
                    <Col xs={12} md={12} lg={12}>
                        <Card className="button-card" >
                            <Row justify="center">
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>
                                    POLI UMUM
                                </Text>
                            </Row>
                            <Row justify="center">
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>
                                    SEDANG DIPERIKSA: --
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
                            <Row justify="center">
                                <Button type='primary' className="app-btn secondary" info style={{marginTop: 10}} 
                                    onClick={() => {
                                        gotoAmbilAntreanUmum();
                                    }}
                                >
                                    Ambil Nomor Antrean
                                </Button>
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={12} md={12} lg={12}>
                        <Card className="button-card" >
                            <Row justify="center">
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>
                                    POLI GIGI
                                </Text>
                            </Row>
                            <Row justify="center">
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>
                                    SEDANG DIPERIKSA: --
                                </Text>
                            </Row>
                            <Table
                                columns={columnsAntrean}
                                size="middle"
                                bordered={false}
                                loading={loading}
                                dataSource={dataAntreanGigi}
                                // onChange={handleTableChange}
                            />
                            <Row justify="center">
                                <Button type='primary' className="app-btn secondary" info style={{marginTop: 10}} 
                                    onClick={() => {
                                        gotoAmbilAntreanGigi();
                                    }}
                                >
                                    Ambil Nomor Antrean
                                </Button>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(Antrean)
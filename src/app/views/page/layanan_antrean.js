import React, { useState, useEffect } from "react";
import { withRouter, useHistory, NavLink } from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Typography, Card, Table, Button, message } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { APIServices } from '../../service'
import Auth from "../../service/auth";
import moment from 'moment';

import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');

const { Content } = Layout;
const { Text } = Typography;
 
const Antrean = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [dataAntreanUmum, setDataAntreanUmum] = useState([]);
    const [dataAntreanGigi, setDataAntreanGigi] = useState([]);
    const [lastAntreanUmum, setLastAntreanUmum] = useState("--");
    const [lastAntreanGigi, setLastAntreanGigi] = useState("--");
    const [currentTime, setCurrentTime] = useState(moment().format("DD/MM/YYYY HH:mm:ss"));
    
    useEffect(()=>{
        const interval = setInterval(() => {
            setCurrentTime(moment().format("DD/MM/YYYY HH:mm:ss"))
          }, 1000);
          return () => clearInterval(interval);
    }, [])

    const gotoPanggilAntreanUmum= () => {
        let data = {poli: "umum"}
        const loc = '/antrean-poliklinik/poli-umum/panggil';

        if(Auth.isLogin()){
            history.push({pathname:loc, state:data});
        }else{
            message.info("Anda perlu login untuk mengakses layanan ini!")
        }
    }

    const gotoAmbilAntreanUmum= () => {
        let data = {poli: "umum"}
        const loc = '/antrean-poliklinik/poli-umum';

        if(Auth.isLogin()){
            history.push({pathname:loc, state:data});
        }else{
            message.info("Anda perlu login untuk mengakses layanan ini!")
        }
    }

    const gotoPanggilAntreanGigi= () => {
        let data = {poli: "gigi"}
        const loc = '/antrean-poliklinik/poli-gigi/panggil';

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

    /* RENDER WHEN EVENT PUSH */
    useEffect(()=>{
        window.Echo = new Echo({
            // authEndpoint: "http://25.70.2.196:8000/laravel-websockets/auth",
            broadcaster: 'pusher',
            key: "anyKey",
            wsHost: "kota101.studio",
            wsPort: 6001,
            disableStats: true,
            forceTLS: false // Critical if you want to use a non-secure WebSocket connection
        });

        console.log("Tes: ", window.Echo);
        let echo = window.Echo;
        // echo.channel('antre')
        //     .listen('AntreanSentUmum', (e) => {
        //         getAntreanUmum()
        //         console.log(e);
        //     })
        //     .listen('AntreanUpdateUmum', (e) => {
        //         console.log(e);
        //         getAntreanUmum()
        //     })

        // echo.channel('antre')
        //     .listen('AntreanSentGigi', (e) => {
        //         getAntreanGigi()
        //         console.log(e);
        //     })
        //     .listen('AntreanUpdateGigi', (e) => {
        //         console.log(e);
        //         getAntreanGigi()
        //     })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const [role, setRole] = useState(0);
    /* RENDER WHEN PAGE OPEN */
    useEffect(()=>{
        let _role = JSON.parse(localStorage.getItem('role'));
        let login_time = JSON.parse(localStorage.getItem('login'));
        setRole(_role/login_time)

        getAntreanUmum();
        getAntreanGigi();
        getLastAntreanUmum();
        getLastAntreanGigi();
    }, []);

    const getAntreanUmum = () => {
        setLoading(true);
        APIServices.getAntreanUmum().then(res => {
                console.log("AU: ", res.data.data.data)
                setDataAntreanUmum(res.data.data.data);
                if(res.data){
                    setLoading(false)
                }
            }).catch(err => {
                if(err){
                    console.log(err)
                    setLoading(false)
                }
            })
        }

    const getLastAntreanUmum = () => {
        setLoading(true);
        APIServices.getLastAntreanUmum().then(res => {
                console.log("LA: ", res)
                if(res.data){
                    if(res.data.data.data.length > 0){
                        setLastAntreanUmum(res.data.data.data[0].no_antrean)
                    }
                    setLoading(false)
                }
            }).catch(err => {
                if(err){
                    console.log(err)
                    setLoading(false)
                }
            })
        }

    const getAntreanGigi = () => {
        setLoading(true);
        APIServices.getAntreanGigi().then(res => {
                console.log("AG: ", res.data.data.data)
                setDataAntreanGigi(res.data.data.data);
                if(res.data){
                    setLoading(false)
                }
            }).catch(err => {
                if(err){
                    console.log(err)
                    setLoading(false)
                }
            })
        }

    const getLastAntreanGigi = () => {
        setLoading(true);
        APIServices.getLastAntreanGigi().then(res => {
                console.log("LG: ", res)
                if(res.data){
                    if(res.data.data.data.length > 0){
                        setLastAntreanGigi(res.data.data.data[0].no_antrean)
                    }
                    setLoading(false)
                }
            }).catch(err => {
                if(err){
                    console.log(err)
                    setLoading(false)
                }
            })
        }
    

    const columnsAntreanUmum = [
        {
            title: "Nomor Antrean",
            dataIndex: 'no_antrean',
            key: 'no_antrean',
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

    const columnsAntreanGigi= [
        {
            title: "Nomor Antrean",
            dataIndex: 'no_antrean',
            key: 'no_antrean',
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
                <Row style={{color:"#FFF"}}>
                    <Col span={20} lg={20} xs={16}>
                        {/* eslint-disable-next-line jsx-a11y/no-distracting-elements */}
                        <marquee direction="" onmouseover="this.stop();" onmouseout="this.start();">
                            Layanan Ambil Nomor Antrean hanya dapat dilakukan pukul 08.00 s.d. 11.00
                        </marquee>
                    </Col>
                    <Col offset={1} span={3} lg={3} xs={7}>
                        {currentTime}
                    </Col>
                </Row>
                <Breadcrumb style={{marginTop: 10, marginLeft:40, marginBottom:20, color:"#FFF"}} separator=">">
                    <Breadcrumb.Item>
                        <NavLink to="/"> 
                            <Text className="title">
                                <HomeOutlined />
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/antrean-poliklinik">  
                            <Text className="title">
                                <span>Antrean Poliklinik</span>
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={10} style={{minHeight:600, marginRight:40}} justify="space-between">
                    <Col xs={24} md={12} lg={12}>
                        <Card className="button-card" style={{minHeight:475}}>
                            <Row justify="center">
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>
                                    POLI UMUM
                                </Text>
                            </Row>
                            <Row justify="center">
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>
                                    SEDANG DILAYANI: {lastAntreanUmum}
                                </Text>
                            </Row>
                            <Table
                                columns={columnsAntreanUmum}
                                size="middle"
                                bordered={false}
                                loading={loading}
                                dataSource={dataAntreanUmum}
                                style={{height:300}}
                                // onChange={handleTableChange}
                            />
                            <Row justify="center" gutter={10}>
                                <Col>
                                    <Button type='primary' className="app-btn secondary" info style={{marginTop: 10}} 
                                        onClick={() => {
                                            gotoAmbilAntreanUmum();
                                        }}
                                    >
                                        Ambil Nomor Antrean
                                    </Button>
                                </Col>
                                {Auth.isLogin() && (role === 1 || role === 2 || role === 4 || role === 5) &&
          
                                    <Col>
                                        <Button type='primary' className="app-btn tertiary" info style={{marginTop: 10}} 
                                            onClick={() => {
                                                gotoPanggilAntreanUmum();
                                            }}
                                        >
                                            Panggil Nomor Antrean
                                        </Button>
                                    </Col>
                                }
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={24} md={12} lg={12}>
                        <Card className="button-card" style={{minHeight:475}}>
                            <Row justify="center">
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>
                                    POLI GIGI
                                </Text>
                            </Row>
                            <Row justify="center">
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>
                                    SEDANG DILAYANI: {lastAntreanGigi}
                                </Text>
                            </Row>
                            <Table
                                columns={columnsAntreanGigi}
                                size="middle"
                                bordered={false}
                                loading={loading}
                                dataSource={dataAntreanGigi}
                                style={{height:300}}
                                // onChange={handleTableChange}
                            />
                            <Row justify="center" gutter={10}>
                                <Col>
                                    <Button type='primary' className="app-btn secondary" info style={{marginTop: 10}} 
                                        onClick={() => {
                                            gotoAmbilAntreanGigi();
                                        }}
                                    >
                                        Ambil Nomor Antrean
                                    </Button>
                                </Col>
                                {Auth.isLogin() && (role === 1 || role === 2 || role === 4 || role === 5) &&
          
                                    <Col>
                                        <Button type='primary' className="app-btn tertiary" info style={{marginTop: 10}} 
                                            onClick={() => {
                                                gotoPanggilAntreanGigi();
                                            }}
                                        >
                                            Panggil Nomor Antrean
                                        </Button>
                                    </Col>
                                }
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(Antrean)
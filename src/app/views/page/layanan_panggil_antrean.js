import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import Speech from 'react-speech';
import { Layout, Row, Col, Breadcrumb, Typography, Card, Table, Button, Spin } from 'antd';
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons';
import { APIServices } from '../../service'
import { dialog } from '../../component/alert'
import moment from 'moment';

import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');

const { Content } = Layout;
const { Text } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
 
const PanggilAntrean = (props) => {
    const [loading, setLoading] = useState(false);
    const [dataAntrean, setDataAntrean] = useState([]);
    const [lastAntrean, setLastAntrean] = useState([]);
    const [jamMasuk, setJamMasuk] = useState(null);

    useEffect(()=>{
        window.Echo = new Echo({
            authEndpoint: "http://25.70.2.196:8000/laravel-websockets/auth",
            broadcaster: 'pusher',
            key: "anyKey",
            wsHost: "25.70.2.196",
            wsPort: 6001,
            wssHost: "25.70.2.196",
            wssPort: 6001,
            disableStats: true,
            forceTLS: true // Critical if you want to use a non-secure WebSocket connection
        });

        console.log("Tes: ", window.Echo);
        let echo = window.Echo;

        if(props.location.state.poli === "umum"){
            echo.channel('antre')
                .listen('AntreanSentUmum', (e) => {
                    console.log(e);
                    getAntreanUmum()
                    getLastAntreanUmum()
                })
                .listen('AntreanUpdateUmum', (e) => {
                    console.log(e);
                    getAntreanUmum()
                    getLastAntreanUmum()
                })
        } else {
            echo.channel('antre')
                .listen('AntreanSentGigi', (e) => {
                    console.log(e);
                    getAntreanGigi()
                    getLastAntreanGigi()
                })
                .listen('AntreanUpdateGigi', (e) => {
                    console.log(e);
                    getAntreanGigi()
                    getLastAntreanGigi()
                })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* RENDER WHEN PAGE OPEN */
    useEffect(()=>{
        if(props.location.state.poli === "umum"){
            getAntreanUmum()
            getLastAntreanUmum()
        } else {
            getAntreanGigi()
            getLastAntreanGigi()
        }
    }, []);

    const getAntreanUmum = () => {
        setLoading(true);
        APIServices.getAntreanUmum().then(res => {
                console.log("AU: ", res.data.data.data)
                setDataAntrean(res.data.data.data);
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
                        setLastAntrean(res.data.data.data[0])
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
                setDataAntrean(res.data.data.data);
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
                        setLastAntrean(res.data.data.data[0])
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


    const panggilAntrean = (data) => {
        console.log("data: ", data);
        let body = {
            id_poli: props.location.state.poli === "umum" ? 1 : 2,
            id_antrean: data.id_antrean,
            status: data.status
        }
        setLoading(true);

        APIServices.putAntrean(body).then(res => {
            setLoading(false);
            if(res.data){
                if(props.location.state.poli === "umum"){
                    getAntreanUmum()
                    getLastAntreanUmum()
                } else {
                    getAntreanGigi()
                    getLastAntreanGigi()
                }
                dialog({icon: "success", title:"Panggil Nomor Antrean Berhasil!"}).then(()=>{
                    console.log("Berhasil");
                })
            }
        }).catch(err => {
            setLoading(false);
            if(err){
                dialog({icon: "error", title:"Panggil Nomor Antrean Gagal!"}).then(()=>{
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
            width: '15%',
            align: 'center',
            
        },
        {
            title: "Nama Pasien",
            dataIndex: "nama",
            key: 'nama',
            width: '25%',
            align: 'center',
        },
        {
            title: 'Aksi',
            width: '60%',
            align: 'center',
            render: (record) => {
                return (
                <Row justify="center" gutter={[20,0]}>
                  <Col>
                    <Button
                        onClick={() => {
                            record.status = 1
                            panggilAntrean(record)
                        }}
                    >
                        <Text style={{color: "#000"}}>
                            Periksa
                        </Text>
                    </Button>
                  </Col>
                  <Col>
                    <Speech 
                        styles={{
                            play: {
                              hover: {
                                backgroundColor: 'black',
                                color:'white'
                              },
                              button: {
                                padding:'4',
                                fontFamily: 'Helvetica',
                                fontSize: '1.0em',
                                cursor: 'pointer',
                                pointerEvents: 'none',
                                outline: 'none',
                                backgroundColor: 'inherit',
                                border: 'none'
                              },
                            }
                        }}
                        displayText="Panggil" 
                        text={`Nomor Antrian ${record.no_antrean} dengan nama ${record.nama} harap memasuki ruang pemeriksaan`} 
                        lang="id-ID"
                        voice="Andika" />
                    {/* <Button 
                        onClick={(rec) => {
                            
                        }}
                    >
                        <Text style={{color: "#000"}}>
                            Panggil
                        </Text>
                    </Button> */}
                  </Col>
                  <Col>
                    <Button 
                        onClick={() => {
                            record.status = 2
                            panggilAntrean(record)
                        }}
                    >
                        <Text style={{color: "#000"}}>
                            Lewat
                        </Text>
                    </Button>
                  </Col>
                </Row>
                );
            },
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
                    <Breadcrumb.Item href="/antrean-poliklinik">
                        <Text className="title">
                            <span>Antrean Poliklinik</span>
                        </Text>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/antrean-poliklinik">
                        <Text className="title">
                            {props.location.state.poli === "umum" ? "Poli Umum" : "Poli Gigi"}
                        </Text>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={10} style={{minHeight:600, marginRight:40}} justify="space-between">
                    
                    <Col xs={24} md={8} lg={8}>
                        <Card className="button-card" style={{height:350}}>
                        <Row justify="center">
                            <Text style={{color:"#EB3D00", fontWeight:"bold"}}>
                                SEDANG DILAYANI
                            </Text>
                        </Row>
                        {loading ?
                            <Row justify="center" align="middle" style={{marginTop:40}}>
                                <Spin indicator={antIcon} /> 
                            </Row>
                        :
                        <>
                            <Card justify="center" style={{marginTop:20, borderColor: "#EB3D00", borderWidth: 5, borderRadius: 15}}>
                                <Row justify="center">
                                    <Text style={{color:"#EB3D00", fontWeight:"bold", fontSize: "3em"}}>
                                        {lastAntrean.no_antrean ? lastAntrean.no_antrean : "-"}
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
                                    {lastAntrean.jam_masuk ? moment(lastAntrean.jam_masuk, 'YYYY-MM-DD HH:mm:ss.S').format('HH:mm:ss') : "-"}
                                </Text>
                            </Row>
                            <Row justify="center" style={{marginTop:20}}>
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>
                                    {props.location.state.poli === "umum" ? "Poli Umum" : "Poli Gigi"}
                                </Text>
                            </Row>
                            <Row justify="center">
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>
                                    dr. Eva Dianita
                                </Text>
                            </Row>
                        </>
                        }
                        </Card>
                    </Col>
                    <Col xs={24} md={16} lg={16}>
                        <Card className="button-card" style={{minHeight:350}}>
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

export default withRouter(PanggilAntrean)
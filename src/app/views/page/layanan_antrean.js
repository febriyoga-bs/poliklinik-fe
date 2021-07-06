import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Typography, Card, Table, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });

// const client = require('pusher-js');
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-channels-key',
//     client: client
// });

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_ABLY_PUBLIC_KEY,
//     wsHost: 'realtime-pusher.ably.io',
//     wsPort: 443,
//     disableStats: true,
//     encrypted: true,
// });

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     wsHost: window.location.hostname,
//     wsPort: 6001,
//     wssHost: window.location.hostname,
//     wssPort: 6001,
//     key: 'client',
//     disableStats: true,
//     enabledTransports: ['ws', 'wss'],
//     forceTLS: false,
//   });



/* JOINING PRESENCE CHANNEL */
// Echo.join(`chat.${roomId}`)
//     .here((users) => {
//         //
//     })
//     .joining((user) => {
//         console.log(user.name);
//     })
//     .leaving((user) => {
//         console.log(user.name);
//     })
//     .error((error) => {
//         console.error(error);
//     });

const { Content } = Layout;
const { Text } = Typography;
 
const Antrean = () => {
    const history = useHistory();
    const {loading, setLoading} = useState(false);
    const {dataAntreanUmum, setDataAntreanUmum} = useState([]);
    const {dataAntreanGigi, setDataAntreanGigi} = useState([]);

    const gotoAmbilAntrean= () => {
        const loc = '/antrean-poliklinik/poli-umum';
        history.push(loc);
    }

    useEffect(()=>{
        window.Echo = new Echo({
            authEndpoint: "http://25.70.2.196:8000/public/broadcasting/auth",
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
        echo.private(`antre`)
            .listen('AntreanSent', (e) => {
                console.log(e);
            });
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
                                        gotoAmbilAntrean();
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
                                        gotoAmbilAntrean();
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
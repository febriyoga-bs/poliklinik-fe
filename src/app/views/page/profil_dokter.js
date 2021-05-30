import React, { useState, useEffect } from "react";
import Fade from 'react-reveal/Fade';
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col, Typography, Button, Image, Card, message} from 'antd';
import { APIServices }  from '../../service';
import Auth from '../../service/auth'

const { Content } = Layout;
const {Title, Text} = Typography;

const ProfilDokter = () => {
    const [dokterInfo, setDokterInfo] = useState([]);

    useEffect(()=>{
        getDataDokter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDataDokter = () => {
        APIServices.getDataDokter().then(res => {
            if(res.data){
            setDokterInfo(res.data.data);
            //setLoading(false)
            }
        }).catch(err => {
            if(err){
            console.log(err.response)
            //("Internal Server Error (Refresh the Page!");
            //setLoading(false)
            }
        })
    }

    return(
        <Layout style={{backgroundColor: '#072A6F'}}>
            <Content className="layout-content">
                <Fade top>
                <Row style={{marginLeft: 30}}>
                    <Title style={{ color: '#FFFFFF' }} level={4} className="title-frame">
                        Informasi Dokter
                    </Title>
                </Row>
                <Row style={{marginLeft: 30}}>
                    <Col xs={8} md={5} lg={4}>
                        <Row>
                            <Image
                                style={{width: 200, height: 200, borderRadius: 20}}
                                alt={dokterInfo.avatar}
                            />
                        </Row>
                        <Row>
                            <Button type='primary' className="app-btn secondary" info style={{marginTop: 10, backgroundColor:"#FFA500"}} 
                                >
                                Edit Profile
                            </Button>
                            <Button onClick={Auth.logout} type='primary' className="app-btn secondary" danger style={{marginLeft: 10, marginTop: 10, backgroundColor:"#FF0000"}} >
                                LOGOUT
                            </Button>
                        </Row>
                    </Col>
                    <Col xs={16} md={14} lg={18}>
                        <Row>
                            <Col span={8} lg={4}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    ID Dokter
                                </Title>
                            </Col>
                            <Col span={1}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    :
                                </Title>
                            </Col>
                            <Col lg={10}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                   DK0000{dokterInfo.id_dokter ? dokterInfo.nama_user : "-"}
                                </Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8} lg={4}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    No. Telepon
                                </Title>
                            </Col>
                            <Col span={1}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    :
                                </Title>
                            </Col>
                            <Col lg={10}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    {dokterInfo.no_telepon ? dokterInfo.no_telepon : "-"}
                                </Title>
                            </Col>
                        </Row>  
                        <Row>
                            <Col span={8} lg={4}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    Nama
                                </Title>
                            </Col>
                            <Col span={1}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    :
                                </Title>
                            </Col>
                            <Col lg={10}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    {dokterInfo.nama ? dokterInfo.nama : "-"}
                                </Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8} lg={4}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    Spealisasi
                                </Title>
                            </Col>
                            <Col span={1}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    :
                                </Title>
                            </Col>
                            <Col lg={10}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    {dokterInfo.spesialisasi ? dokterInfo.spesialisasi : "-"}
                                </Title>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col>
                        <Card className="featured-card">
                            <Row className="featured-row" justify="center" align="middle">
                                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center'}}>KELOLA DATA REKAM MEDIS</Text>
                            </Row>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="featured-card">
                            <Row className="featured-row" justify="center" align="middle">
                                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center'}}>ANTREAN POLIKLINIK</Text>
                            </Row>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="featured-card">
                            <Row className="featured-row" justify="center" align="middle">
                                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center'}}>RUANG OBROLAN (KONSULTASI)</Text>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                </Fade>
            </Content>
        </Layout>
    );
}

export default withRouter(ProfilDokter)
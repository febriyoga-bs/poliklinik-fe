import React, { useState, useEffect } from "react";
import Fade from 'react-reveal/Fade';
import { withRouter, useHistory } from 'react-router-dom';
import { Layout, Row, Col, Typography, Button, Image, Card, Spin, message} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { APIServices }  from '../../../service';
import Auth from '../../../service/auth'
import UserImage from "../../../../assets/userimage.jpg";
//import Dummy from '../../dummy/dummy'

const { Content } = Layout;
const {Title, Text} = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

const ProfilDokter = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [dataDokter, setDataDokter] = useState([]);

    const gotoEditProfil = (data) => {
        const loc = '/profil-dokter/edit-profil';
        history.push({pathname:loc, state:data});
    }

    useEffect(()=>{
        getDataDokter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDataDokter = () => {
        setLoading(true)
        APIServices.getDataDokter().then(res => {
            if(res.data){
                setDataDokter(res.data.data);
                setLoading(false)
            }
        }).catch(err => {
            if(err){
                //setDataDokter(Dummy.dataDokter[1]);
                message.error("Gagal memuat informasi profil!");
                console.log(err.response)
                setLoading(false)
            }
        })
    }

    return(
        <Layout style={{backgroundColor: '#072A6F'}}>
            <Content className="layout-content">
            {loading ?
                <Row justify="center" align="middle" style={{minHeight:580}}>
                    <Spin indicator={antIcon} /> 
                </Row>
            :
                <Fade>
                <Row style={{marginLeft: 30}}>
                    <Title style={{ color: '#FFFFFF' }} level={4} className="title-frame">
                        Informasi Dokter
                    </Title>
                </Row>
                <Row style={{marginLeft: 30}}>
                    <Col xs={12} sm={12} md={8} lg={6} xl={4}>
                        <Row>
                            <Image
                                style={{width: 200, height: 200, borderRadius: 20}}
                                alt={dataDokter.avatar}
                                src={UserImage}
                            />
                        </Row>
                        <Row style={{marginRight:10}}>
                            <Button type='primary' className="app-btn secondary" info style={{marginTop: 10, backgroundColor:"#FFA500"}} 
                                onClick={()=> gotoEditProfil(dataDokter)}
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
                                   {dataDokter.id_dokter ? dataDokter.id_dokter : "-"}
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
                                    {dataDokter.no_telepon ? dataDokter.no_telepon : "-"}
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
                                    {dataDokter.nama ? dataDokter.nama : "-"}
                                </Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8} lg={4}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    Spesialisasi
                                </Title>
                            </Col>
                            <Col span={1}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    :
                                </Title>
                            </Col>
                            <Col lg={10}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    {dataDokter.spesialisasi ? dataDokter.spesialisasi : "-"}
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
            }
            </Content>
        </Layout>
    );
}

export default withRouter(ProfilDokter)
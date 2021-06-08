import React, { useState, useEffect } from "react";
import Fade from 'react-reveal/Fade';
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col, Typography, Button, Image, Card, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { APIServices }  from '../../service';
import Auth from '../../service/auth'
import UserImage from "../../../assets/userimage.jpg";
import Dummy from '../../dummy/dummy'

const { Content } = Layout;
const {Title, Text} = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

const ProfilPasien = () => {
    const [loading, setLoading] = useState(false);
    const [pasienInfo, setPasienInfo] = useState([]);

    useEffect(()=>{
        getDataPasien();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDataPasien = () => {
        setLoading(true);
        APIServices.getDataPasien().then(res => {
            if(res.data){
                setPasienInfo(res.data.data);
                setLoading(false)
            }
        }).catch(err => {
            if(err){
                setPasienInfo(Dummy.dataPasien[0])
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
                       Pasien
                    </Title>
                </Row>
                <Row style={{marginLeft: 30}}>
                    <Col xs={12} sm={12} md={8} lg={6} xl={4}>
                        <Row>
                            <Image
                                style={{width: 200, height: 200, borderRadius: 20}}
                                alt={pasienInfo.avatar}
                                src={UserImage}
                            />
                        </Row>
                        <Row style={{marginLeft:10}}>
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
                                    ID Pasien
                                </Title>
                            </Col>
                            <Col span={1}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    :
                                </Title>
                            </Col>
                            <Col lg={10}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                   {pasienInfo.id_pasien ? pasienInfo.id_pasien : "-"}
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
                                    {pasienInfo.no_telepon ? pasienInfo.no_telepon : "-"}
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
                                    {pasienInfo.nama ? pasienInfo.nama : "-"}
                                </Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8} lg={4}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    Kategori
                                </Title>
                            </Col>
                            <Col span={1}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    :
                                </Title>
                            </Col>
                            <Col lg={10}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    {pasienInfo.kategori ? pasienInfo.kategori : "-"}
                                </Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8} lg={4}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    No. Identitas
                                </Title>
                            </Col>
                            <Col span={1}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    :
                                </Title>
                            </Col>
                            <Col lg={10}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    {pasienInfo.nomor_identitas ? pasienInfo.nomor_identitas : "-"}
                                </Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8} lg={4}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    Tanggal Lahir
                                </Title>
                            </Col>
                            <Col span={1}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    :
                                </Title>
                            </Col>
                            <Col lg={10}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    {pasienInfo.tanggal_lahir ? pasienInfo.tanggal_lahir : "-"}
                                </Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8} lg={4}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                   Jenis Kelamin
                                </Title>
                            </Col>
                            <Col span={1}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    :
                                </Title>
                            </Col>
                            <Col lg={10}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    {pasienInfo.jenis_kelamin ? pasienInfo.jenis_kelamin : "-"}
                                </Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8} lg={4}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                   Alamat
                                </Title>
                            </Col>
                            <Col span={1}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    :
                                </Title>
                            </Col>
                            <Col lg={10}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    {pasienInfo.alamat ? pasienInfo.alamat : "-"}
                                </Title>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col>
                        <Card className="featured-card">
                            <Row className="featured-row" justify="center" align="middle">
                                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center'}}>REKAM MEDIS PASIEN</Text>
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

export default withRouter(ProfilPasien)
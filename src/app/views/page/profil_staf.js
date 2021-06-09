import React, { useState, useEffect } from "react";
import Fade from 'react-reveal/Fade';
import { withRouter, useHistory } from 'react-router-dom';
import { Layout, Row, Col, Typography, Button, Image, Card, message, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { APIServices }  from '../../service';
import Auth from '../../service/auth'
import UserImage from "../../../assets/userimage.jpg";
//import Dummy from '../../dummy/dummy'

const { Content } = Layout;
const {Title, Text} = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

const ProfilStaf = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [dataStaf, setDataStaf] = useState([]);

    const gotoKelolaInformasi = () => {
        const loc = '/kelola-informasi';
        history.push(loc);
    }

    const gotoKelolaDataPengguna = () => {
        const loc = '/kelola-data-pengguna/pasien';
        history.push(loc);
    }

    const gotoRiwayatKunjungan = () => {
        message.info("Laman Riwayat Kunjungan Belum Tersedia");
        // const loc = '/riwayat-kunjungan';
        // history.push(loc);
    }

    useEffect(()=>{
        getDataStaf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDataStaf = () => {
        setLoading(true)
        APIServices.getDataStaf().then(res => {
            if(res.data){
                setDataStaf(res.data.data);
                setLoading(false)
            }
        }).catch(err => {
            if(err){
                //setdataStaf(Dummy.dataStaf[1]);
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
                        Informasi Staf
                    </Title>
                </Row>
                <Row style={{marginLeft: 30}}>
                    <Col xs={12} sm={12} md={8} lg={6} xl={4}>
                        <Row>
                            <Image
                                style={{width: 200, height: 200, borderRadius: 20}}
                                alt={dataStaf.avatar}
                                src={UserImage}
                            />
                        </Row>
                        <Row style={{marginLeft:10}}>
                            <Button className="app-btn secondary" style={{marginTop: 10, backgroundColor:"#FFA500"}} 
                                >
                                Edit Profil
                            </Button>
                            <Button onClick={Auth.logout} className="app-btn secondary" style={{marginLeft: 10, marginTop: 10, backgroundColor:"#FF0000"}} >
                                LOGOUT
                            </Button>
                        </Row>
                    </Col>
                    <Col xs={16} md={14} lg={18}>
                        <Row>
                            <Col span={8} lg={4}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    ID Staf
                                </Title>
                            </Col>
                            <Col span={1}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    :
                                </Title>
                            </Col>
                            <Col lg={10}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                   {dataStaf.id_staf ? dataStaf.id_staf: "-"}
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
                                    {dataStaf.no_telepon ? dataStaf.no_telepon : "-"}
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
                                    {dataStaf.nama ? dataStaf.nama : "-"}
                                </Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8} lg={4}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    Jabatan
                                </Title>
                            </Col>
                            <Col span={1}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    :
                                </Title>
                            </Col>
                            <Col lg={10}>
                                <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                                    {dataStaf.jabatan ? dataStaf.jabatan : "-"}
                                </Title>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col>
                        <Card onClick={gotoKelolaInformasi} className="featured-card">
                            <Row className="featured-row" justify="center" align="middle">
                                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center'}}>KELOLA INFORMASI POLIKLINIK</Text>
                            </Row>
                        </Card>
                    </Col>
                    <Col>
                        <Card onClick={gotoKelolaDataPengguna} className="featured-card">
                            <Row className="featured-row" justify="center" align="middle">
                                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center'}}>KELOLA DATA PENGGUNA <br></br> (PASIEN, DOKTER, STAF)</Text>
                            </Row>
                        </Card>
                    </Col>
                    <Col>
                        <Card onClick={gotoRiwayatKunjungan} className="featured-card">
                            <Row className="featured-row" justify="center" align="middle">
                                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center'}}>RIWAYAT KUNJUNGAN PASIEN</Text>
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

export default withRouter(ProfilStaf)
import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import { Layout, Row, Col, Typography, Button, Image, Card, message, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { APIServices }  from '../../../service';
import UserImage from "../../../../assets/userimage.jpg";
//import Dummy from '../../dummy/dummy'

const { Content } = Layout;
const {Title } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

const ProfilDokter = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [dataDokter, setDataDokter] = useState([]);

    const gotoEditProfil = (data) => {
        const loc = '/dashboard-dokter/edit-profil';
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
                setDataDokter(res.data.data[0]);
                localStorage.setItem('id_dokter', JSON.stringify(res.data.data[0].id_dokter));
                setLoading(false)
            }
        }).catch(err => {
            if(err){
                //setdataDokter(Dummy.dataDokter[1]);
                message.error("Gagal memuat informasi profil!");
                console.log(err.response)
                setLoading(false)
            }
        })
    }

    return(
    <Content className="layout-content">
                
        {loading ?
            <Row justify="center" align="middle" style={{minHeight:580}}>
                <Spin indicator={antIcon} /> 
            </Row>

            :
            <Row justify="center">
            <Card className="dashboard-card">
                <Row justify="center">
                    <Image
                        style={{width: 180, height: 180, borderRadius: 90}}
                        alt={dataDokter.avatar}
                        src={UserImage}
                    />
                </Row>
                <Row justify="center">
                    <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                        {dataDokter.nama ? dataDokter.nama : "-"}
                    </Title>
                </Row>
                <Row justify="center">
                    <Button className="app-btn secondary" style={{marginBottom: 10, backgroundColor:"#FFA500"}} 
                        onClick={()=> gotoEditProfil(dataDokter)}
                    >
                        Edit Profil
                    </Button>
                </Row>
                
                <Row>
                    <Col span={8} lg={6}>
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
                    <Col span={8} lg={6}>
                        <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                            Nomor Identitas
                        </Title>
                    </Col>
                    <Col span={1}>
                        <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                            :
                        </Title>
                    </Col>
                    <Col lg={10}>
                        <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                            {dataDokter.no_identitas ? dataDokter.no_identitas : "-"}
                        </Title>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} lg={6}>
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
                    <Col span={8} lg={6}>
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
            </Card>
            </Row>
        }
    </Content>
    )
}

export default withRouter(ProfilDokter)
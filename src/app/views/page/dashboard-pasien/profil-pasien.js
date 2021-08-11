import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import { Layout, Row, Col, Typography, Button, Image, Card, message, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { APIServices }  from '../../../service';
import UserImage from "../../../../assets/userimage.jpg";
import moment from 'moment';
//import Dummy from '../../dummy/dummy'

const { Content } = Layout;
const { Title } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

const ProfilStaf = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [dataPasien, setDataPasien] = useState([]);

    const gotoEditProfil = (data) => {
        const loc = '/dashboard-pasien/edit-profil';
        history.push({pathname:loc, state:data});
    }

    useEffect(()=>{
        getDataPasien();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDataPasien = () => {
        setLoading(true);
        APIServices.getDataPasien().then(res => {
            if(res.data){
                console.log(res.data.data)
                if(Object.entries(res.data.data).length === 0){
                    let loc = '/dashboard-pasien/lengkapi-data-diri';
                    let data = {no_telepon: JSON.parse(localStorage.getItem('no_telepon'))}
                    history.push({pathname:loc, state:data});
                    message.info("Harap lengkapi data diri Anda!");
                }
                setDataPasien(res.data.data[0]);
                if(res.data.data[0]){
                    localStorage.setItem('id_pasien', JSON.stringify(res.data.data[0].id_pasien));
                }
                setLoading(false)
            }
        }).catch(err => {
            console.log("err: ", err)
            if(err.response){
                //setdataPasien(Dummy.dataPasien[0])
                
            } else {
                message.error("Gagal memuat informasi profil. Periksa koneksi internet Anda!");
            }
            setLoading(false)
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
                        alt={dataPasien.avatar}
                        src={UserImage}
                    />
                </Row>
                <Row justify="center">
                    <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                        {dataPasien.nama ? dataPasien.nama : "-"}
                    </Title>
                </Row>
                <Row justify="center">
                    <Button className="app-btn secondary" style={{marginBottom: 10, backgroundColor:"#FFA500"}} 
                        onClick={()=> gotoEditProfil(dataPasien)}
                    >
                        Edit Profil
                    </Button>
                </Row>
                
                <Row>
                    <Col span={8} lg={6}>
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
                            {dataPasien.id_pasien ? dataPasien.id_pasien : "-"}
                        </Title>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} lg={6}>
                        <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                            Kode Pasien
                        </Title>
                    </Col>
                    <Col span={1}>
                        <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                            :
                        </Title>
                    </Col>
                    <Col lg={10}>
                        <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                            {dataPasien.kode_pasien ? dataPasien.kode_pasien : "-"}
                        </Title>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} lg={6}>
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
                            {dataPasien.no_identitas ? dataPasien.no_identitas : "-"}
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
                            {dataPasien.no_telepon ? dataPasien.no_telepon : "-"}
                        </Title>
                    </Col>
                </Row>  
                <Row>
                    <Col span={8} lg={6}>
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
                            {dataPasien.kategori ? dataPasien.kategori : "-"}
                        </Title>
                    </Col>
                </Row>
                {dataPasien.kategori === "Mahasiswa" &&
                <>
                <Row>
                    <Col span={8} lg={6}>
                        <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                            Jurusan
                        </Title>
                    </Col>
                    <Col span={1}>
                        <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                            :
                        </Title>
                    </Col>
                    <Col lg={10}>
                        <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                            {dataPasien.jurusan ? dataPasien.jurusan : "-"}
                        </Title>
                    </Col>
                </Row>
                <Row>
                <Col span={8} lg={6}>
                    <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                        Prodi
                    </Title>
                </Col>
                <Col span={1}>
                    <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                        :
                    </Title>
                </Col>
                <Col lg={10}>
                    <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                        {dataPasien.prodi ? dataPasien.prodi : "-"}
                    </Title>
                </Col>
                </Row>
                </>
                }
                <Row>
                    <Col span={8} lg={6}>
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
                            {dataPasien.tanggal_lahir ? 
                            moment(dataPasien.tanggal_lahir, 'YYYY-MM-DD').format('DD-MM-YYYY') : "-"}
                        </Title>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} lg={6}>
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
                            {dataPasien.jenis_kelamin ? dataPasien.jenis_kelamin : "-"}
                        </Title>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} lg={6}>
                        <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                            Alamat
                        </Title>
                    </Col>
                    <Col span={1}>
                        <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                            :
                        </Title>
                    </Col>
                    <Col lg={12}>
                        <Title style={{ color: '#FFFFFF' }} level={5} className="title-frame">
                            {dataPasien.alamat ? dataPasien.alamat : "-"}
                        </Title>
                    </Col>
                </Row>
            </Card>
            </Row>
        }
    </Content>
    )
}

export default withRouter(ProfilStaf)
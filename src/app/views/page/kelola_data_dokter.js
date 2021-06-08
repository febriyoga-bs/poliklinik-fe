import React, { useEffect, useState } from "react";
import { withRouter, NavLink, useHistory } from 'react-router-dom';
import { Layout, Breadcrumb, Row, Col, Card, Typography, Table, Button } from 'antd';
import { HomeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { dialog } from '../../component/alert'
import { APIServices }  from '../../service';

import Dummy from '../../dummy/dummy'

const { Content } = Layout;
const { Text, Title } = Typography;

const KelolaDokter = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [dataDokter, setDataDokter] = useState([]);

    const gotoTambahDataDokter= () => {
        const loc = '/kelola-data-pengguna/dokter/tambah-data';
        history.push(loc);
    }

    const gotoUbahDataDokter = (data) => {
        const loc = '/kelola-data-pengguna/dokter/ubah-data';
        history.push({pathname:loc, state:data});
    }

    useEffect(()=>{
        getDataDokter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDataDokter = () => {
        setLoading(true);
        APIServices.getAllDataDokter().then(res => {
                if(res.data){
                    setDataDokter(res.data.data);
                    setLoading(false)
                }
            }).catch(err => {
                if(err){
                    setDataDokter(Dummy.dataDokter);
                    console.log(err.response)
                    setLoading(false)
                }
            })
        }

    const columnsDokter = [
        {
            title: "ID Dokter",
            dataIndex: 'id_dokter',
            key: 'id_dokter',
            width: '25%',
            sorter: (a, b) => a.id_pasien - b.id_pasien,
        },
        {
            title: "Foto",
            dataIndex: 'avatar',
            key: 'avatar',
            width: '25%',
        },
        {
            title: "Nama Dokter",
            dataIndex: 'nama',
            key: 'nama',
            width: '25%',
            sorter: (a, b) => a.nama - b.nama,
        },
        {
            title: "Spesialisasi",
            dataIndex: 'spesialisasi',
            key: 'spesialisasi',
            width: '25%',
            sorter: (a, b) => a.nama - b.nama,
        },
        {
            title: 'Kelola',
            width: '20%',
            align: 'center',
            render: (record) => {
                return (
                <Row justify="center" gutter={[20,0]}>
                  <Col>
                    <Button
                        onClick={() => {
                            gotoUbahDataDokter(record);
                        }
                    }>
                        <Text style={{color: "#000"}}>
                            <EditOutlined style={{fontSize:20}}/>
                        </Text>
                    </Button>
                  </Col>
                  <Col>
                    <Button 
                        onClick={() => {
                            dialog({icon: "info", title:"Hapus Data Dokter", text: "Apakah Anda yakin akan menghapus data dokter ini?"}).then(()=>{
                                console.log("deleted");
                            })
                        }}
                    >
                        <Text style={{color: "#000"}}>
                            <DeleteOutlined style={{fontSize:20}}/>
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
            <Content className="layout-content">
                <Breadcrumb style={{marginLeft:40, marginBottom:20, color:"#FFF"}} separator=">">
                    <Breadcrumb.Item href="/">
                        <Text className="title">
                            <HomeOutlined />
                        </Text>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/#/profil-staf">
                        <Text className="title">
                            <span>Admin</span>
                        </Text>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/#/kelola-data-pengguna/dokter">
                        <Text className="title">
                            <span>Kelola Data Dokter</span>
                        </Text>
                    </Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{marginLeft:40}}>
                    <Col>
                        <NavLink to="/kelola-data-pengguna/pasien" className="text-heading">
                            <Title level={1} style={{color: '#FFF'}}>
                                DATA PASIEN
                            </Title>
                        </NavLink>
                    </Col>
                    <Col style={{marginLeft:48}}>
                        <NavLink to="/kelola-data-pengguna/dokter" className="text-heading" activeStyle={{color: '#EB3D00'}}>
                            <Title level={1} style={{color: '#EB3D00'}}>
                                DATA DOKTER 
                            </Title>
                        </NavLink>
                    </Col>
                    <Col style={{marginLeft:48}}>
                        <NavLink to="/kelola-data-pengguna/staf" className="text-heading">
                            <Title level={1} style={{color: '#FFF'}}>
                                DATA STAF
                            </Title>
                        </NavLink>
                    </Col>
                </Row>

                <Row style={{marginBottom:20, marginRight:40}}>
                    <Card className="informasi-card" style={{width:"100%"}}>
                        <Row>
                            <Text className="title-tabel">
                                Data Dokter
                            </Text>
                        </Row>
                        <Row justify="end">
                            <Button type='primary' className="app-btn secondary" info style={{marginTop: 10}} 
                                onClick={() => {
                                    gotoTambahDataDokter();
                                }}
                            >
                                Tambah Data Dokter
                            </Button>
                        </Row>
                        <Table
                            columns={columnsDokter}
                            size="middle"
                            bordered={false}
                            loading={loading}
                            dataSource={dataDokter}
                            // onChange={handleTableChange}
                        />
                    </Card>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(KelolaDokter)
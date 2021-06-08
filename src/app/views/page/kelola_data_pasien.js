import React, { useEffect, useState } from "react";
import { withRouter, NavLink, useHistory } from 'react-router-dom';
import { Layout, Breadcrumb, Row, Col, Card, Typography, Table, Button } from 'antd';
import { HomeOutlined, EditOutlined, DeleteOutlined, InfoOutlined } from '@ant-design/icons';
import { dialog } from '../../component/alert'
import { APIServices }  from '../../service';

import Dummy from '../../dummy/dummy'

const { Content } = Layout;
const { Text, Title } = Typography;

const KelolaPasien = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [dataPasien, setDataPasien] = useState([]);

    const gotoUbahDataPasien = (data) => {
        const loc = '/kelola-data-pengguna/pasien/ubah-data';
        history.push({pathname:loc, state:data});
    }

    useEffect(()=>{
        getDataPasien()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDataPasien = () => {
        setLoading(true);
        APIServices.getAllDataPasien().then(res => {
                if(res.data){
                    setDataPasien(res.data.data);
                    setLoading(false)
                }
            }).catch(err => {
                if(err){
                    setDataPasien(Dummy.dataPasien);
                    console.log(err.response)
                    setLoading(false)
                }
            })
        }

    const columnsPasien = [
        {
            title: "ID Pasien",
            dataIndex: 'id_pasien',
            key: 'id_pasien',
            width: '20',
            align: 'center',
            sorter: (a, b) => a.id_pasien - b.id_pasien,
        },
        {
            title: "Nama Pasien",
            dataIndex: 'nama',
            key: 'nama',
            width: '20',
            align: 'center',
            sorter: (a, b) => a.nama - b.nama,
        },
        {
            title: "Kategori",
            dataIndex: 'kategori',
            key: 'kategori',
            width: '20',
            align: 'center',
            sorter: (a, b) => a.nama - b.nama,
        },
        {
            title: "Usia",
            dataIndex: 'usia',
            key: 'usia',
            align: 'center',
            sorter: (a, b) => a.usia - b.usia,
        },
        {
            title: "Nomor Rekam Medis",
            children: [
                {
                    title: "Poli Gigi",
                    dataIndex: 'gigi',
                    key: 'gigi',
                    align: 'center',
                    sorter: (a, b) => a.usia - b.usia,
                },
                {
                    title: "Poli Umum",
                    dataIndex: 'umum',
                    key: 'umum',
                    align: 'center',
                    sorter: (a, b) => a.usia - b.usia,
                }
            ]
        },
        {
            title: "Detail",
            align: 'center',
            render: (record) => {
                return (
                    <Row justify="center">
                        <Button
                            onClick={() => {
                                console.log(record);
                            }}
                        >
                            <Text style={{color: "#000"}}>
                                <InfoOutlined style={{fontSize:20}}/>
                            </Text>
                        </Button>
                    </Row>
                )
            }
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
                            console.log(record);
                            gotoUbahDataPasien(record);
                        }}
                    >
                        <Text style={{color: "#000"}}>
                            <EditOutlined style={{fontSize:20}}/>
                        </Text>
                    </Button>
                  </Col>
                  <Col>
                    <Button 
                        onClick={() => {
                            dialog({icon: "info", title:"Hapus Data Pasien", text: "Apakah Anda yakin akan menghapus data pasien ini?"}).then(()=>{
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
                    <Breadcrumb.Item href="/#/kelola-data-pengguna/pasien">
                        <Text className="title">
                            <span>Kelola Data Pasien</span>
                        </Text>
                    </Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{marginLeft:40}}>
                    <Col>
                        <NavLink to="/kelola-data-pengguna/pasien" className="text-heading" activeStyle={{color: '#EB3D00'}}>
                            <Title level={1} style={{color: '#EB3D00'}}>
                                DATA PASIEN
                            </Title>
                        </NavLink>
                    </Col>
                    <Col style={{marginLeft:48}}>
                        <NavLink to="/kelola-data-pengguna/dokter" className="text-heading">
                            <Title level={1} style={{color: '#FFF'}}>
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
                        <Row style={{marginBottom:20}}>
                            <Text className="title-tabel">
                                Data Pasien
                            </Text>
                        </Row>
                        <Table
                            columns={columnsPasien}
                            size="middle"
                            bordered={false}
                            loading={loading}
                            dataSource={dataPasien}
                            // onChange={handleTableChange}
                        />
                    </Card>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(KelolaPasien)
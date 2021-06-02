import React, { useEffect, useState } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import { Layout, Breadcrumb, Row, Col, Card, Typography, Table, Button } from 'antd';
import { HomeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import Dummy from '../../dummy/dummy'

const { Content } = Layout;
const { Text } = Typography;

const KelolaInformasi = () => {
    const history = useHistory();
    const [dataProfil, setDataProfil] = useState([]);
    const [dataJadwal, setDataJadwal] = useState([]);
    const [dataPelayanan, setDataPelayanan] = useState([]);
    const [loading, setLoading] = useState(false);

    const gotoTambahDataPelayanan= () => {
        const loc = '/kelola-informasi/pelayanan/tambah-data';
        history.push(loc);
    }

    const gotoUbahDataPelayanan = (data) => {
        const loc = '/kelola-informasi/pelayanan/ubah-data';
        history.push({pathname:loc, state:data});
    }

    const gotoUbahProfilPoliklinik = (data) => {
        const loc = '/kelola-informasi/profil-poliklinik';
        history.push({pathname:loc, state:data});
    }

    const gotoUbahJadwal = (data) => {
        const loc = '/kelola-informasi/jadwal';
        history.push({pathname:loc, state:data});
    }

    const columnsProfil = [
        {
            title: "Gambar",
            dataIndex: 'gambar',
            key: 'gambar',
            width: '20%',
            align: 'center',
        },
        {
            title: "Deskripsi",
            dataIndex: 'deskripsi',
            key: 'deskripsi',
            width: '60%',
            align: 'center',
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
                            gotoUbahProfilPoliklinik(record);
                        }
                    }>
                        <Text style={{color: "#000"}}>
                            <EditOutlined style={{fontSize:20}}/>
                        </Text>
                    </Button>
                  </Col>
                </Row>
                );
            },
        },
    ]

    const columnsJadwal = [
        {
            title: "Hari",
            dataIndex: 'hari',
            key: 'hari',
            width: '10%',
            align: 'center',
        },
        {
            title: "Jam Operasional",
            dataIndex: 'jam_operasional',
            key: 'jam_operasional',
            width: '20%',
            align: 'center',
        },
        {
            title: "Poli",
            dataIndex: 'jenis_poli',
            key: 'jenis_poli',
            width: '10%',
            align: 'center',
        },
        {
            title: "Dokter",
            dataIndex: 'dokter',
            key: 'dokter',
            width: '15%',
            align: 'center',
        },
        {
            title: 'Kelola',
            width: '25%',
            align: 'center',
            render: (record) => {
                return (
                <Row justify="center" gutter={[10,0]}>
                  <Col>
                    <Button
                        onClick={() => {
                            gotoUbahJadwal(record);
                        }
                    }>
                        <Text style={{color: "#000"}}>
                            <EditOutlined style={{fontSize:20}}/>
                        </Text>
                    </Button>
                  </Col>
                </Row>
                );
            },
        },
    ]

    const columnsPelayanan = [
        {
            title: "Nama Pelayanan",
            dataIndex: 'nama',
            key: 'nama',
            width: '25%',
            align: 'center',
            sorter: (a, b) => a.nama - b.nama,
        },
        {
            title: "Jenis Poli",
            dataIndex: 'jenis_poli',
            key: 'jenis_poli',
            width: '15%',
            align: 'center',
            sorter: (a, b) => a.jenis_poli - b.jenis_poli,
        },
        {
            title: "Tarif",
            align: 'center',
            children: [
                {
                    title: "Tarif Mahasiswa",
                    dataIndex: 'tarif_mahasiswa',
                    key: 'tarif_mahasiswa',
                    width: '15%',
                    align: 'center',
                    sorter: (a, b) => a.tarif_mahasiswa - b.tarif_mahasiswa, 
                    render: (harga) => {
                        if(harga === null){
                            harga = 0
                        }
                        let currency = "";
                        currency = "Rp. " + (Number(harga)).toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&.');
                        return (
                            <Text>{currency}</Text>
                        )
                    }
                },
                {
                    title: "Tarif Staf/Dosen",
                    dataIndex: 'tarif_staf_kampus',
                    key: 'tarif_staf_dosen',
                    width: '15%',
                    align: 'center',
                    sorter: (a, b) => a.tarif_staf_dosen - b.tarif_staf_dosen,
                    render: (harga) => {
                        if(harga === null){
                            harga = 0
                        }
                        let currency = "";
                        currency = "Rp. " + (Number(harga)).toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&.');
                        return (
                            <Text>{currency}</Text>
                        )
                    }
                },
                {
                    title: "Tarif Keluarga",
                    dataIndex: 'tarif_keluarga_staf',
                    key: 'tarif_keluarga_staf',
                    width: '15%',
                    align: 'center',
                    sorter: (a, b) => a.tarif_keluarga - b.tarif_keluarga, 
                    render: (harga) => {
                        if(harga === null){
                            harga = 0
                        }
                        let currency = "";
                        currency = "Rp. " + (Number(harga)).toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&.');
                        return (
                            <Text>{currency}</Text>
                        )
                    }
                },
                {
                    title: "Tarif Umum",
                    dataIndex: 'tarif_umum',
                    key: 'tarif_umum',
                    width: '15%',
                    align: 'center',
                    sorter: (a, b) => a.tarif_umum - b.tarif_umum, 
                    render: (harga) => {
                        if(harga === null){
                            harga = 0
                        }
                        let currency = "";
                        currency = "Rp. " + (Number(harga)).toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&.');
                        return (
                            <Text>{currency}</Text>
                        )
                    }
                },
            ]
        },
        {
            title: 'Kelola',
            width: '15%',
            align: 'center',
            render: (record) => {
                return (
                <Row justify="center" gutter={[20,0]}>
                  <Col>
                    <Button
                        onClick={() => {
                            gotoUbahDataPelayanan(record);
                        }
                    }>
                        <Text style={{color: "#000"}}>
                            <EditOutlined style={{fontSize:20}}/>
                        </Text>
                    </Button>
                  </Col>
                  <Col>
                    <Button >
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
                    <Breadcrumb.Item href="/#/kelola-informasi">
                        <Text className="title">
                            <span>Kelola Informasi Poliklinik</span>
                        </Text>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Row style={{marginBottom:20, marginRight:40}}>
                    <Col lg={12}>
                    <Card className="informasi-card" style={{minHeight:450}}>
                        <Row style={{marginBottom:20}}>
                            <Text className="title-tabel">
                                Profil Poliklinik
                            </Text>
                        </Row>
                        <Table
                            columns={columnsProfil}
                            size="middle"
                            bordered={false}
                            loading={loading}
                            dataSource={Dummy.dataProfil}
                            pagination={false}
                            // onChange={handleTableChange}
                        />
                    </Card>
                    </Col>

                    <Col lg={12}>
                    <Card className="informasi-card" style={{minHeight:450}}>
                        <Row style={{marginBottom:20}}>
                            <Text className="title-tabel">
                                Jadwal Pelayanan Poliklinik
                            </Text>
                        </Row>
                        <Table
                            columns={columnsJadwal}
                            size="middle"
                            bordered={false}
                            loading={loading}
                            dataSource={Dummy.dataJadwal}
                            pagination={false}
                            // onChange={handleTableChange}
                        />
                    </Card>
                    </Col>
                </Row>
                <Row style={{marginBottom:20, marginRight:40}}>
                    <Card className="informasi-card" style={{width:"100%"}}>
                        <Row>
                            <Text className="title-tabel">
                                Data Pelayanan Poliklinik
                            </Text>
                        </Row>
                        <Row justify="end">
                            <Button type='primary' className="app-btn secondary" info 
                                style={{marginTop: 10, marginBottom:10}} 
                                onClick={() => {
                                    gotoTambahDataPelayanan();
                                }}
                            >
                                Tambah Data Pelayanan
                            </Button>
                        </Row>
                        <Table
                            columns={columnsPelayanan}
                            size="middle"
                            bordered={false}
                            loading={loading}
                            dataSource={Dummy.dataPelayanan}
                            // onChange={handleTableChange}
                        />
                    </Card>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(KelolaInformasi)
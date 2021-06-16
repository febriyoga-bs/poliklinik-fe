import React, { useEffect, useState } from "react";
import { withRouter, useHistory, NavLink } from 'react-router-dom';
import { Layout, Breadcrumb, Row, Col, Card, Typography, Table, Button } from 'antd';
import { HomeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { APIServices }  from '../../service';

import Dummy from '../../dummy/dummy'

const { Content } = Layout;
const { Text } = Typography;

const KelolaInformasi = () => {
    const history = useHistory();
    const [dataProfil, setDataProfil] = useState([]);
    const [dataJadwal, setDataJadwal] = useState([]);
    const [dataPelayanan, setDataPelayanan] = useState([]);
    const [dataDokter, setDataDokter] = useState([]);
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

    useEffect(()=>{
        getDataProfil();
        getDataPelayanan();
        getDataJadwal();
        getDataDokter();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDataProfil = () => {
        setLoading(true)
        APIServices.getDataProfil().then(res => {
            if(res.data){
                setDataProfil(res.data.data);
                setLoading(false)
            }
        }).catch(err => {
            if(err){
                console.log(dataProfil)
                setLoading(false)
            }
        })
    }

    const getDataPelayanan = () => {
        setLoading(true);
        APIServices.getDataPelayanan().then(res => {
                if(res.data){
                    setDataPelayanan(res.data.data);
                    setLoading(false)
                }
            }).catch(err => {
                //setDataPelayanan(Dummy.dataPelayanan);
                if(err){
                    console.log(err.response)
                    setLoading(false)
                }
            })
        }

    const getDataJadwal = () => {
        setLoading(true);
        APIServices.getDataJadwal().then(res => {
                if(res.data){
                    setDataJadwal(res.data.data)
                    setLoading(false)
                }
            }).catch(err => {
                //setDataJadwal(Dummy.dataJadwal)
                if(err){
                    console.log(err.response)
                    setLoading(false)
                }
            })
        }
    
    const getDataDokter = () => {
        setLoading(true);
        APIServices.getAllDokter().then(res => {
                if(res.data){
                    setDataDokter(res.data.data);
                    setLoading(false)
                }
            }).catch(err => {
                if(err){
                    //setDataDokter(Dummy.dataDokter);
                    console.log(err.response)
                    setLoading(false)
                }
            })
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
            width: '10%',
            align: 'center',
            render: (value, record, rowIndex) => {
                let poli = [];
                record.poli.forEach(res => {
                    if(res.id_poli === 1){
                        poli.push("Umum")
                    } else if(res.id_poli === 2){
                        poli.push("Gigi")
                    }
                })          
                return (
                    <Text>
                        {poli.map(res=>{
                            return(<span>{res}<br></br></span>)
                        })}
                    </Text>
                )
            } 
        },
        {
            title: "Dokter",
            width: '25%',
            align: 'center',
            render: (value, record, rowIndex) => {
                let dokter = [];
                record.dokter.forEach(res => {
                    dataDokter.forEach(res2 =>{
                        if(res.id_dokter === res2.id_dokter){
                            dokter.push(res2.nama)
                        }
                    })
                })          
                return (
                    <Text>
                        {dokter.map(res=>{
                            return(<span>{res}<br></br></span>)
                        })}
                    </Text>
                )
            } 
        },
        {
            title: 'Kelola',
            width: '10%',
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
            dataIndex: 'poli',
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
                <Breadcrumb style={{marginLeft:40, marginBottom:20}} separator=">">
                    <Breadcrumb.Item>
                        <NavLink to="/">  
                            <Text className="title">
                                <HomeOutlined />
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/profil-staf">  
                            <Text className="title">
                                Admin
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="kelola-informasi">  
                            <Text className="title">
                                Kelola Informasi
                            </Text>
                        </NavLink>
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
                            dataSource={dataProfil}
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
                            dataSource={dataJadwal}
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
                            dataSource={dataPelayanan}
                            // onChange={handleTableChange}
                        />
                    </Card>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(KelolaInformasi)
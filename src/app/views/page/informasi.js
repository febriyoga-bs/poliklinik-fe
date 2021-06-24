import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Breadcrumb, Row, Card, Typography, Table, List, Image } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import CONFIG from '../../service/config';
import { APIServices }  from '../../service';

import Dummy from '../../dummy/dummy'

const { Content } = Layout;
const { Text } = Typography;

const Informasi = () => {
    const [dataPelayanan, setDataPelayanan] = useState([]);
    const [dataDokter, setDataDokter] = useState([]);
    const [dataStaf, setDataStaf] = useState([]);
    const [dataJadwal, setDataJadwal] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        getDataPelayanan();
        getDataJadwal();
        getDataStaf();
        getDataDokter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
    
    const getDataStaf = () => {
        setLoading(true);
        APIServices.getAllStaf().then(res => {
                if(res.data){
                    setDataStaf(res.data.data);
                    setLoading(false)
                }
            }).catch(err => {
                //setDataStaf(Dummy.dataStaf);
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
                    setDataJadwal(res.data.data);
                    setLoading(false)
                }
            }).catch(err => {
                if(err){
                    //setDataJadwal(Dummy.dataJadwal)
                    console.log(err.response)
                    setLoading(false)
                }
            })
        }
    
    const _dataJadwal = [
        {
            id_poli: 1,
            poli: "Umum",
            jadwal: dataJadwal ? dataJadwal : [1,2,3,4,5]
        },
        {
            id_poli: 2,
            poli: "Gigi",
            jadwal: dataJadwal ? dataJadwal : [1,2,3,4,5]
        }
    ]

    const columnsJadwal = [
        {
            title: "Poli",
            dataIndex: 'poli',
            key: 'poli',
            width: '10%',
            align: 'center',
        },
        {
            title: "Hari",
            width: '90%',
            align: 'center',
            children: [
                {
                    title: "Senin",
                    width: '100px',
                    align: 'center',
                    render: (value, record, rowIndex) => {
                        let jam = "-";
                        let dokter = [];

                        if(record.jadwal[0] !== null){
                            let isPoli = 0;
                            if(record.jadwal[0].poli){
                                record.jadwal[0].poli.forEach((res)=>{
                                    if(res.id_poli === record.id_poli){
                                        isPoli++;
                                    }
                                })
                            }
                            
                            if(isPoli>0){
                                jam = record.jadwal[0].jam_operasional;
                                record.jadwal[0].dokter.forEach((res1)=>{
                                    dataDokter.forEach((res2)=>{
                                        if(res1.id_dokter === res2.id_dokter){
                                            dokter.push(res2.nama);
                                        }
                                    })
                                })
                            }
                        }

                        return (
                            <Text>
                                {jam}
                                {dokter.length>1 ? 
                                    dokter.map(res=>{
                                        return(<span><br></br>{res}</span>)
                                    }) 
                                    : <span><br></br>{dokter}</span>
                                }
                            </Text>
                        )
                    } 
                },
                {
                    title: "Selasa",
                    width: '100px',
                    align: 'center',
                    render: (value, record, rowIndex) => {
                        let jam = "-";
                        let dokter = [];

                        if(record.jadwal[1] !== null){
                            let isPoli = 0;
                            if(record.jadwal[1].poli){
                                record.jadwal[1].poli.forEach((res)=>{
                                    if(res.id_poli === record.id_poli){
                                        isPoli++;
                                    }
                                })
                            }
                            if(isPoli>0){
                                jam = record.jadwal[1].jam_operasional;
                                record.jadwal[1].dokter.forEach((res1)=>{
                                    dataDokter.forEach((res2)=>{
                                        if(res1.id_dokter === res2.id_dokter){
                                            dokter.push(res2.nama);
                                        }
                                    })
                                })
                            }
                        }
                        return (
                            <Text>
                                {jam}
                                {dokter.length>1 ? 
                                    dokter.map(res=>{
                                        return(<span><br></br>{res}</span>)
                                    }) 
                                    : <span><br></br>{dokter}</span>
                                }
                            </Text>
                        )
                    } 
                },
                {
                    title: "Rabu",
                    width: '100px',
                    align: 'center',
                    render: (value, record, rowIndex) => {
                        let jam = "-";
                        let dokter = [];

                        if(record.jadwal[2] !== null){
                            let isPoli = 0;
                            if(record.jadwal[2].poli){
                                record.jadwal[2].poli.forEach((res)=>{
                                    if(res.id_poli === record.id_poli){
                                        isPoli++;
                                    }
                                })
                            }
                            if(isPoli>0){
                                jam = record.jadwal[2].jam_operasional;
                                record.jadwal[2].dokter.forEach((res1)=>{
                                    dataDokter.forEach((res2)=>{
                                        if(res1.id_dokter === res2.id_dokter){
                                            dokter.push(res2.nama);
                                        }
                                    })
                                })
                            }
                        }
                        return (
                            <Text>
                                {jam}
                                {dokter.length>1 ? 
                                    dokter.map(res=>{
                                        return(<span><br></br>{res}</span>)
                                    }) 
                                    : <span><br></br>{dokter}</span>
                                }
                            </Text>
                        )
                    } 
                },
                {
                    title: "Kamis",
                    width: '100px',
                    align: 'center',
                    render: (value, record, rowIndex) => {
                        let jam = "-";
                        let dokter = [];

                        if(record.jadwal[3] !== null){
                            let isPoli = 0;
                            if(record.jadwal[3].poli){
                                record.jadwal[3].poli.forEach((res)=>{
                                    if(res.id_poli === record.id_poli){
                                        isPoli++;
                                    }
                                })
                            }
                            if(isPoli>0){
                                jam = record.jadwal[3].jam_operasional;
                                record.jadwal[3].dokter.forEach((res1)=>{
                                    dataDokter.forEach((res2)=>{
                                        if(res1.id_dokter === res2.id_dokter){
                                            dokter.push(res2.nama);
                                        }
                                    })
                                })
                            }
                        }
                        return (
                            <Text>
                                {jam}
                                {dokter.length>1 ? 
                                    dokter.map(res=>{
                                        return(<span><br></br>{res}</span>)
                                    }) 
                                    : <span><br></br>{dokter}</span>
                                }
                            </Text>
                        )
                    } 
                },
                {
                    title: "Jumat",
                    width: '100px',
                    align: 'center',
                    render: (value, record, rowIndex) => {
                        let jam = "-";
                        let dokter = [];

                        if(record.jadwal[4] !== null){
                            let isPoli = 0;
                            if(record.jadwal[4].poli){
                                record.jadwal[4].poli.forEach((res)=>{
                                    if(res.id_poli === record.id_poli){
                                        isPoli++;
                                    }
                                })
                            }
                            if(isPoli>0){
                                jam = record.jadwal[4].jam_operasional;
                                record.jadwal[4].dokter.forEach((res1)=>{
                                    dataDokter.forEach((res2)=>{
                                        if(res1.id_dokter === res2.id_dokter){
                                            dokter.push(res2.nama);
                                        }
                                    })
                                })
                            }
                        }
                        return (
                            <Text>
                                {jam}
                                {dokter.length>1 ? 
                                    dokter.map(res=>{
                                        return(<span><br></br>{res}</span>)
                                    }) 
                                    : <span><br></br>{dokter}</span>
                                }
                            </Text>
                        )
                    } 
                },
            ]
        }
    ]

    const columnsPelayanan = [
        {
            title: "Nama Pelayanan",
            dataIndex: 'nama',
            key: 'nama',
            width: '25',
            align: 'center',
            showSorterTooltip: false,
            sorter: (a, b) => a.nama - b.nama,
        },
        {
            title: "Jenis Poli",
            dataIndex: 'poli',
            key: 'poli',
            width: '15%',
            align: 'center',
            showSorterTooltip: false,
            sorter: (a, b) => a.poli - b.poli, 
        },
        {
            title: "Tarif",
            children: [
                {
                    title: "Tarif Mahasiswa",
                    dataIndex: 'tarif_mahasiswa',
                    key: 'tarif_mahasiswa',
                    width: '15%',
                    align: 'center',
                    render: (harga) => {
                        if(harga === null){
                            harga = 0
                        }
                        let currency = "";
                        if(harga===0){
                            currency = "Gratis";
                        } else {
                            currency = "Rp. " + (Number(harga)).toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&.');
                        }return (
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
                    render: (harga) => {
                        if(harga === null){
                            harga = 0
                        }
                        let currency = "";
                        if(harga===0){
                            currency = "Gratis";
                        } else {
                            currency = "Rp. " +(Number(harga)).toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&.');
                        }return (
                            <Text>{currency}</Text>
                        )
                    } 
                },
                {
                    title: "Tarif Keluarga Staf",
                    dataIndex: 'tarif_keluarga_staf',
                    key: 'tarif_keluarga',
                    width: '15%',
                    align: 'center',
                    render: (harga) => {
                        if(harga === null){
                            harga = 0
                        }
                        let currency = "";
                        if(harga===0){
                            currency = "Gratis";
                        } else {
                            currency = "Rp. " +(Number(harga)).toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&.');
                        }return (
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
                    render: (harga) => {
                        if(harga === null){
                            harga = 0
                        }

                        let currency = "";
                        if(harga===0){
                            currency = "Gratis";
                        } else {
                            currency = "Rp. " +(Number(harga)).toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&.');
                        }
                        return (
                            <Text>{currency}</Text>
                        )
                    } 
                },
            ]
        }
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
                    <Breadcrumb.Item href="/informasi">
                        <Text className="title">
                            <span>Informasi</span>
                        </Text>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Row style={{marginBottom:20, marginRight:40}}>
                    <Card className="informasi-card" style={{width:"100%"}}>
                        <Row style={{marginBottom:20}}>
                            <Text className="title-tabel">
                                Jadwal Poliklinik
                            </Text>
                        </Row>
                        <Table
                            columns={columnsJadwal}
                            size="middle"
                            bordered
                            loading={loading}
                            dataSource={_dataJadwal}
                            pagination={false}
                            scroll={{ x: "100%" }}
                            // onChange={handleTableChange}
                        />
                    </Card>
                </Row>
                <Row style={{marginBottom:20, marginRight:40}}>
                    <Card className="informasi-card" style={{width:"100%"}}>
                        <Row style={{marginBottom:20}}>
                            <Text className="title-tabel">
                                Pelayanan Poliklinik
                            </Text>
                        </Row>
                        <Table
                            columns={columnsPelayanan}
                            size="middle"
                            bordered
                            loading={loading}
                            dataSource={dataPelayanan}
                            scroll={{ x: "100%" }}
                            // onChange={handleTableChange}
                        />
                    </Card>
                </Row>
                <Row style={{marginBottom:20, marginRight:40}}>
                    <Card className="informasi-card" style={{width:"100%"}}>
                        <Row style={{marginBottom:20}}>
                            <Text className="title-tabel">
                                Profil Dokter Poliklinik
                            </Text>
                        </Row>
                        <Row>
                        <List 
                            grid={{ gutter: 30, 
                                xl: (dataDokter.length < 5) ? dataDokter.length : 5, 
                                lg: (dataDokter.length < 4) ? dataDokter.length : 4, 
                                md: (dataDokter.length < 3) ? dataDokter.length : 3, 
                                sm: (dataDokter.length < 2) ? dataDokter.length : 2, 
                                xs: (dataDokter.length < 1) ? dataDokter.length : 1
                            }}
                            dataSource={dataDokter}
                            renderItem={item => (
                                <List.Item>
                                    <Row>
                                      <Card className="profil-card" >
                                          <Row justify="center">
                                            <Image src={CONFIG.BASE_URL+"/"+item.avatar}  
                                                preview={false}
                                                className="image-profil"
                                            />
                                          </Row>
                                          <Row justify="center">
                                              <Text className="title-profil" ellipsis={{ rows: 1}}>
                                                {item.nama}
                                              </Text>
                                          </Row>
                                          <Row justify="center">
                                            <Text className="title-profil">
                                                Dokter {item.spesialisasi}
                                            </Text>
                                          </Row>
                                      </Card>
                                    </Row>
                                </List.Item>
                            )}
                        />
                        </Row>
                        <Row style={{marginBottom:20}}>
                            <Text className="title-tabel">
                                Profil Staf Poliklinik
                            </Text>
                        </Row>
                        <Row>
                        <List 
                            grid={{ gutter: 30, 
                                xl: (dataStaf.length < 5) ? dataStaf.length : 5, 
                                lg: (dataStaf.length < 4) ? dataStaf.length : 4, 
                                md: (dataStaf.length < 3) ? dataStaf.length : 3, 
                                sm: (dataStaf.length < 2) ? dataStaf.length : 2, 
                                xs: (dataStaf.length < 1) ? dataStaf.length : 1
                            }}
                            dataSource={dataStaf}
                            renderItem={item => (
                                <List.Item>
                                    <Row>
                                      <Card className="profil-card" >
                                          <Row justify="center">
                                            <Image src={CONFIG.BASE_URL+"/"+item.avatar}  
                                                preview={false}
                                                className="image-profil"
                                            />
                                          </Row>
                                          <Row justify="center">
                                              <Text className="title-profil" ellipsis={{ rows: 1}}>
                                                {item.nama}
                                              </Text>
                                          </Row>
                                          <Row justify="center">
                                            <Text className="title-profil">
                                                {item.jabatan}
                                            </Text>
                                          </Row>
                                      </Card>
                                    </Row>
                                </List.Item>
                            )}
                        />
                        </Row>
                    </Card>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(Informasi)
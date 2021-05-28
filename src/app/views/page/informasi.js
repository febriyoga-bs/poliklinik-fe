import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Breadcrumb, Row, Col, Card, Typography, Table, List, Image, Tooltip } from 'antd';
import { HomeOutlined, SendOutlined } from '@ant-design/icons';
import CONFIG_INITIAL_STATE  from '../../service/config';

import Dummy from '../../dummy/dummy'

const { Content } = Layout;
const { Text } = Typography;

const Informasi = () => {
    const [dataPelayanan, setDataPelayanan] = useState([]);
    const [dataDokter, setDataDokter] = useState(Dummy.dataDokter);
    const [dataStaf, setDataStaf] = useState([]);
    const [loading, setLoading] = useState(false);

    const dataJadwal = [
        {
            poli: "Umum",
            jadwal: Dummy.dataJadwal
        },
        {
            poli: "Gigi",
            jadwal: Dummy.dataJadwal
        }
    ]

    const columnsJadwal = [
        {
            title: "Poli",
            dataIndex: 'poli',
            key: 'poli',
            width: '15%',
            align: 'center',
        },
        {
            title: "Hari",
            width: '85%',
            align: 'center',
            children: [
                {
                    title: "Senin",
                    align: 'center',
                    render: (value, record, rowIndex) => {
                        let jam = "-";
                        let dokter = "";

                        if(record.jadwal[0] !== null){
                            if((record.jadwal[0].id_poli - rowIndex) === 1){
                                jam = record.jadwal[0].jam_operasional;
                                record.jadwal[0].id_dokter.map((res1)=>{
                                    dataDokter.map((res2)=>{
                                        if(res1 === res2.id_dokter){
                                            //dokter.push(res2.nama);
                                            dokter = dokter + " " + res2.nama;
                                        }
                                    })
                                })
                            }
                        }

                        return (
                            <Text>{jam} <br></br> {dokter}</Text>
                        )
                    } 
                },
                {
                    title: "Selasa",
                    align: 'center',
                    render: (value, record, rowIndex) => {
                        let jam = "-";
                        let dokter = "";

                        if(record.jadwal[1] !== null){
                            if((record.jadwal[1].id_poli - rowIndex) === 1){
                                jam = record.jadwal[1].jam_operasional;
                                record.jadwal[1].id_dokter.map((res1)=>{
                                    dataDokter.map((res2)=>{
                                        if(res1 === res2.id_dokter){
                                            dokter = res2.nama;
                                        }
                                    })
                                })
                            }
                        }
                        return (
                            <Text>{jam} <br></br> {dokter}</Text>
                        )
                    } 
                },
                {
                    title: "Rabu",
                    align: 'center',
                    render: (value, record, rowIndex) => {
                        let jam = "-";
                        let dokter = "";

                        if(record.jadwal[2] !== null){
                            if((record.jadwal[2].id_poli - rowIndex) === 1){
                                jam = record.jadwal[2].jam_operasional;
                                record.jadwal[2].id_dokter.map((res1)=>{
                                    dataDokter.map((res2)=>{
                                        if(res1 === res2.id_dokter){
                                            dokter = res2.nama;
                                        }
                                    })
                                })
                            }
                        }
                        return (
                            <Text>{jam} <br></br> {dokter}</Text>
                        )
                    } 
                },
                {
                    title: "Kamis",
                    align: 'center',
                    render: (value, record, rowIndex) => {
                        let jam = "-";
                        let dokter = "";

                        if(record.jadwal[3] !== null){
                            if((record.jadwal[3].id_poli - rowIndex) === 1){
                                jam = record.jadwal[3].jam_operasional;
                                record.jadwal[3].id_dokter.map((res1)=>{
                                    dataDokter.map((res2)=>{
                                        if(res1 === res2.id_dokter){
                                            dokter = res2.nama;
                                        }
                                    })
                                })
                            }
                        }
                        return (
                            <Text>{jam} <br></br> {dokter}</Text>
                        )
                    } 
                },
                {
                    title: "Jumat",
                    align: 'center',
                    render: (value, record, rowIndex) => {
                        let jam = "-";
                        let dokter = "";

                        if(record.jadwal[4] !== null){
                            if((record.jadwal[4].id_poli - rowIndex) === 1){
                                jam = record.jadwal[4].jam_operasional;
                                record.jadwal[4].id_dokter.map((res1)=>{
                                    dataDokter.map((res2)=>{
                                        if(res1 === res2.id_dokter){
                                            dokter = res2.nama;
                                        }
                                    })
                                })
                            }
                        }
                        return (
                            <Text>{jam} <br></br> {dokter}</Text>
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
            dataIndex: 'id_poli',
            key: 'id_poli',
            width: '15%',
            align: 'center',
            showSorterTooltip: false,
            sorter: (a, b) => a.id_poli - b.id_poli,
            render: (value) => {
                let poli = "";

                if(value === 1){
                    poli = "Poli Umum";
                } else {
                    poli = "Poli Gigi";
                }
                return (
                    <Text>{poli}</Text>
                )
            } 
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
                    showSorterTooltip: false,
                    sorter: (a, b) => a.tarif_mahasiswa - b.tarif_mahasiswa, 
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
                    showSorterTooltip: false,
                    sorter: (a, b) => a.tarif_staf_dosen - b.tarif_staf_dosen,
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
                    showSorterTooltip: false,
                    sorter: (a, b) => a.tarif_keluarga - b.tarif_keluarga,
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
                    showSorterTooltip: false,
                    sorter: (a, b) => a.tarif_umum - b.tarif_umum,
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
                    <Breadcrumb.Item href="/#/informasi">
                        <Text className="title">
                            <span>Informasi</span>
                        </Text>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Row style={{marginBottom:20}}>
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
                            dataSource={dataJadwal}
                            // onChange={handleTableChange}
                        />
                    </Card>
                </Row>
                <Row style={{marginBottom:20}}>
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
                                dataSource={Dummy.dataPelayanan}
                                // onChange={handleTableChange}
                            />
                    </Card>
                </Row>
                <Row style={{marginBottom:20}}>
                    <Card className="informasi-card" style={{width:"100%"}}>
                        <Row style={{marginBottom:20}}>
                            <Text className="title-tabel">
                                Profil Dokter Poliklinik
                            </Text>
                        </Row>
                        <Row>
                        <List 
                            grid={{ gutter: 20, 
                                xl: (dataDokter.length < 5) ? dataDokter.length : 5, 
                                lg: (dataDokter.length < 4) ? dataDokter.length : 4, 
                                md: (dataDokter.length < 3) ? dataDokter.length : 3, 
                                sm: (dataDokter.length < 2) ? dataDokter.length : 2, 
                                xs: (dataDokter.length < 2) ? dataDokter.length : 2
                            }}
                            dataSource={dataDokter}
                            renderItem={item => (
                                <List.Item>
                                    <Row>
                                      <Card className="profil-card" >
                                          <Image src={CONFIG_INITIAL_STATE.BASE_URL+"/uploaded/upload_items/" + item.gmbr_barang}  
                                              preview={false}
                                              className="image-profil"
                                          />
                                          <Row justify="center">
                                              <Text className="title-profil" ellipsis={{ rows: 1}}>
                                                {item.nama}
                                              </Text>
                                          </Row>
                                          <Row justify="center">
                                            <Text className="title-profil">
                                                {item.spesialisasi}
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
                            grid={{ gutter: 20, 
                                xl: (dataStaf.length < 5) ? dataStaf.length : 5, 
                                lg: (dataStaf.length < 4) ? dataStaf.length : 4, 
                                md: (dataStaf.length < 3) ? dataStaf.length : 3, 
                                sm: (dataStaf.length < 2) ? dataStaf.length : 2, 
                                xs: (dataStaf.length < 2) ? dataStaf.length : 2
                            }}
                            dataSource={Dummy.dataStaf}
                            renderItem={item => (
                                <List.Item>
                                    <Row justify="center">
                                      <Card className="profil-card" >
                                          <Image src={CONFIG_INITIAL_STATE.BASE_URL+"/uploaded/upload_items/" + item.gmbr_barang}  
                                              preview={false}
                                              className="image-profil"
                                          />
                                          <Row justify="center">
                                              <Text className="title-profil" ellipsis={{ rows: 1}}>
                                                Edwin
                                              </Text>
                                          </Row>
                                          <Row justify="center">
                                            <Text className="title-profil">
                                                Petugas Administrasi
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
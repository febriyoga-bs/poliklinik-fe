import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Breadcrumb, Row, Col, Card, Typography, Table, List, Image, Tooltip } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import CONFIG_INITIAL_STATE  from '../../service/config';

import Dummy from '../../dummy/dummy'

const { Content } = Layout;
const { Text } = Typography;

const Informasi = () => {
    const [dataPelayanan, setDataPelayanan] = useState([]);
    const [dataDokter, setDataDokter] = useState([]);
    const [dataStaf, setDataStaf] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: "Nama Pelayanan",
            dataIndex: 'nama',
            key: 'nama',
            width: '25',
            sorter: (a, b) => a.nama - b.nama,
        },
        {
            title: "Jenis Poli",
            dataIndex: 'jenis_poli',
            key: 'jenis_poli',
            width: '15%',
            sorter: (a, b) => a.jenis_poli - b.jenis_poli,
        },
        {
            title: "Tarif",
            children: [
                {
                    title: "Tarif Mahasiswa",
                    dataIndex: 'tarif_mahasiswa',
                    key: 'tarif_mahasiswa',
                    width: '15%',
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
                    title: "Tarif Keluarga",
                    dataIndex: 'tarif_keluarga_staf',
                    key: 'tarif_keluarga',
                    width: '15%',
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
                        <Row>
                            <Text className="title-tabel">
                                Jadwal Poliklinik
                            </Text>
                        </Row>
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
                                columns={columns}
                                size="middle"
                                bordered={false}
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
                        <List 
                            grid={{ gutter: 25, 
                                xl: (dataDokter.length < 5) ? dataDokter.length : 5, 
                                lg: (dataDokter.length < 4) ? dataDokter.length : 4, 
                                md: (dataDokter.length < 3) ? dataDokter.length : 3, 
                                sm: (dataDokter.length < 2) ? dataDokter.length : 2, 
                                xs: (dataDokter.length < 2) ? dataDokter.length : 2
                            }}
                            dataSource={Dummy.dataDokter}
                            renderItem={item => (
                                <List.Item>
                                    <Row justify="center">
                                      <Card className="profil-card" >
                                          <Image src={CONFIG_INITIAL_STATE.BASE_URL+"/uploaded/upload_items/" + item.gmbr_barang}  
                                              preview={false}
                                              className="image-product"
                                          />
                                          <Row justify="center">
                                              <Text className="title-product" ellipsis={{ rows: 1}}>
                                                  {item.nm_barang}
                                              </Text>
                                          </Row>
                                          <Row justify="center">
                                            <Text className="title-product">
                                                Dokter Gigi  
                                            </Text>
                                          </Row>
                                      </Card>
                                    </Row>
                                </List.Item>
                            )}
                        />

                        <Row style={{marginBottom:20}}>
                            <Text className="title-tabel">
                                Profil Staf Poliklinik
                            </Text>
                        </Row>
                        <List 
                            grid={{ gutter: 25, 
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
                                              className="image-product"
                                          />
                                          <Row justify="center">
                                              <Text className="title-product" ellipsis={{ rows: 1}}>
                                                  {item.nm_barang}
                                              </Text>
                                          </Row>
                                          <Row justify="center">
                                            <Text className="title-product">
                                                Petugas Administrasi
                                            </Text>
                                          </Row>
                                      </Card>
                                    </Row>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(Informasi)
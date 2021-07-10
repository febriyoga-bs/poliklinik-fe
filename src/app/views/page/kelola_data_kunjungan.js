import React, { useEffect, useState } from "react";
import { withRouter, NavLink, useHistory } from 'react-router-dom';
import { Layout, Breadcrumb, Row, Col, Card, Typography, Table, Button, Input, Select, DatePicker, message} from 'antd';
import { HomeOutlined, EditOutlined, DeleteOutlined, InfoOutlined } from '@ant-design/icons';
import { dialog, deleteDialog } from '../../component/alert'
import { APIServices }  from '../../service';
import DetailPasien from '../modal/detail_pasien'
import moment from 'moment';

import Dummy from '../../dummy/dummy'

const { Content } = Layout;
const { Text } = Typography;

const KelolaKunjungan = (props) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [dataRekamMedis, setDataRekamMedis] = useState([]);
    const [id, setId] = useState("");
    const [rmExist, setRMExist] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [record, setRecord] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [pagination, setPagination] = useState({current:1, pageSize:10, total:10});

    const gotoCatatKunjungan= () => {
        const loc = `/dashboard-dokter/kelola-rekam-medis/${props.match.params.id_pasien}/catat-kunjungan`;
        let data = {
            id_rekam_medis: id
        }

        history.push({pathname:loc, state:data});
    }
    const gotoRekamMedis = (data) => {
        const loc = `/dashboard-dokter/kelola-rekam-medis/${props.match.params.id_pasien}/rekam-medis`;
        history.push({pathname:loc, state:data});
    }

    const handleModal = () => {
        //message.info("Laman Detail Kunjungan belum Tersedia");
        setVisibleModal(!visibleModal);
    };

    useEffect(()=>{
        
        console.log(props)
        console.log(props.location.state.kode_rekam_medis)
        if(props.location.state.kode_rekam_medis.length > 0){
            props.location.state.kode_rekam_medis.forEach(val =>{
                if(val.id_poli === props.location.state.poli){
                    setRMExist(true)
                    setId(val.id_rekam_medis)
                    getDataKunjungan(searchKey, val.id_rekam_medis, pagination.current,  pagination.pageSize);
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchKey]);

    const getDataKunjungan = (kategori, id, current, limit) => {
        setLoading(true);
        APIServices.getKunjungan(kategori, id, current, limit).then(res => {
                if(res.data){
                    let _data = Object.values(res.data.data)
                    let _meta = _data.pop()
                    console.log("Pagination: ", _meta)
                    setPagination({
                        current: _meta.pagination.current_page,
                        pageSize: _meta.pagination.per_page,
                        total: _meta.pagination.total
                    })
                    setDataRekamMedis(_data);
                    setLoading(false)
                }
            }).catch(err => {
                if(err){
                    //setDataRekamMedis(Dummy.dataKunjungan);
                    console.log(err.response)
                    setLoading(false)
                }
            })
        }

    const buatRekamMedis = () => {
        let body ={
            id_poli: props.location.state.poli,
            id_pasien: props.location.state.id_pasien,
        }
        APIServices.postRekamMedis(body).then(res => {
            setLoading(false);
            if(res.data){
                dialog({icon: "success", title:"Buat Rekam Medis Berhasil!"}).then(()=>{
                    console.log("Berhasil");
                })
            }
        }).catch(err => {
            setLoading(false);
            if(err){
                dialog({icon: "error", title:"Buat Rekam Medis Gagal!"}).then(()=>{
                    console.log("Gagal");
                })
            }
        })
    }
    
    const handleTableChange = (_pagination) =>{
        if(props.location.state.kode_rekam_medis.length > 0){
            props.location.state.kode_rekam_medis.forEach(val =>{
                if(val.id_poli === props.location.state.poli){
                    getDataKunjungan(searchKey, val.id_rekam_medis, pagination.current,  pagination.pageSize);
                }
            })
        }
    }

    const columnsRekamMedis = [
        {
            title: "Tanggal Kunjungan",
            dataIndex: 'tanggal',
            key: 'tanggal',
            width: '20%',
            align: 'center',
            sorter: (a, b) => a.tanggal - b.tanggal,
            render: (value) => {
                let usia = moment(value, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY');

                return (
                    <Text>{usia}</Text>
                )
            }
        },
        {
            title: "Dokter Pemeriksa",
            dataIndex: 'nama_dokter',
            key: 'dokter',
            width: '20%',
            align: 'center',
        },
        {
            title: "Jam Masuk",
            dataIndex: 'jam_masuk',
            key: 'jam_masuk',
            align: 'center',
            render: (value) => {
                let jam = value

                return (
                    <Text>{jam}</Text>
                )
            } 
        },
        {
            title: "Jam Keluar",
            dataIndex: 'jam_keluar',
            key: 'jam_keluar',
            align: 'center',
            render: (value) => {
                let jam = value

                return (
                    <Text>{jam}</Text>
                )
            }
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
                            gotoRekamMedis(record);
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
    ]

    return(
        <Layout style={{backgroundColor: "#072A6F"}}>
            <Content className="layout-content">
                <Breadcrumb style={{marginLeft:20, marginBottom:20}} separator=">">
                    <Breadcrumb.Item>
                        <NavLink to="/">  
                            <Text className="title">
                                <HomeOutlined />
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/dashboard-staf">  
                            <Text className="title">
                                Dashboard
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/dashboard-dokter/kelola-rekam-medis">  
                            <Text className="title">
                                Kelola Data Rekam Medis
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/dashboard-dokter/kelola-rekam-medis">  
                            <Text className="title">
                                {props.location.state.poli === 1 ? "Rekam Medis Umum" : "Rekam Medis Gigi"}
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/dashboard-staf/kelola-data-pengguna/pasien">  
                            <Text className="title">
                                Data Kunjungan
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>

                <DetailPasien
                    dataPasien={props.location.state}
                    buttonCancel={handleModal}
                    visible={visibleModal}
                />

                <Row>
                    <Col>
                        <DatePicker format='DD/MM/YYYY' 
                            placeholder="Cari berdasarkan Tanggal" 
                            style={{ width: 300, height: 40, maxWidth:"90%", marginLeft: 20, marginBottom: 20, borderRadius: 10}}         
                        />
                    </Col>
                </Row>

                <Row style={{marginBottom:20, marginRight:20}}>
                    <Card className="informasi-card" style={{width:"100%"}}>
                        <Row>
                            <Text className="title-tabel">
                                Rekam Medis Pasien {`{ID Pasien: ${props.match.params.id_pasien}}`}
                            </Text>
                        </Row>
                        <Row style={{marginBottom:20}} align="middle">
                            <Text className="title-tabel">
                                Informasi Pasien:
                            </Text>
                            <Button
                                style={{marginLeft: 10}}
                                onClick={() => {
                                    setRecord(record)
                                    handleModal();
                                }}
                            >
                                <Text style={{color: "#000"}}>
                                    <InfoOutlined style={{fontSize:20}}/>
                                </Text>
                            </Button>
                        </Row>
                        <Row justify="end">
                            {rmExist ?

                                <Button type='primary' className="app-btn secondary" info style={{marginTop: 10}} 
                                    onClick={() => {
                                        gotoCatatKunjungan();
                                    }}
                                    >
                                    Catat Kunjungan
                                </Button>
                                :
                                <Button type='primary' className="app-btn secondary" info style={{marginTop: 10}} 
                                    loading={loading}
                                    onClick={() => {
                                        buatRekamMedis();
                                    }}
                                    >
                                    Buat Rekam Medis
                                </Button>
                            }
                            
                        </Row>
                        <Table
                            columns={columnsRekamMedis}
                            size="middle"
                            bordered={false}
                            loading={loading}
                            dataSource={dataRekamMedis}
                            pagination={pagination}
                            onChange={handleTableChange}
                            scroll={{ x: 400 }}
                        />
                    </Card>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(KelolaKunjungan)
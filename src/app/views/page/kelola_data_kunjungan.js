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
    const [visibleModal, setVisibleModal] = useState(false);
    const [record, setRecord] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [pagination, setPagination] = useState({current:1, pageSize:5, total:10});

    const gotoCatatKunjungan= () => {
        const loc = `/dashboard-dokter/kelola-rekam-medis/${props.match.params}/catat-kunjungan`;
        history.push(loc);
    }

    const handleModal = () => {
        message.info("Laman Detail Kunjungan belum Tersedia");
        //setVisibleModal(!visibleModal);
    };

    useEffect(()=>{
        getDataPasien(searchKey, pagination.current,  pagination.pageSize);
        console.log(props)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchKey]);

    const getDataPasien = (kategori, current, limit) => {
        setLoading(true);
        APIServices.getAllDataPasien(kategori, current, limit).then(res => {
                if(res.data){
                    let _data = Object.values(res.data.data)
                    let _meta = _data.pop()
                    console.log("Pagination: ", _meta)
                    setPagination({
                        current: _meta.pagination.current_page,
                        pageSize: _meta.pagination.per_page,
                        total: _meta.pagination.total
                    })
                    setDataRekamMedis(Dummy.dataKunjungan);
                    console.log(Dummy.dataKunjungan);
                    //setDataRekamMedis(_data);
                    setLoading(false)
                }
            }).catch(err => {
                if(err){
                    setDataRekamMedis(Dummy.dataKunjungan);
                    console.log(Dummy.dataKunjungan);
                    console.log(err.response)
                    setLoading(false)
                }
            })
        }
    
    const handleTableChange = (_pagination) =>{
        getDataPasien(searchKey, _pagination.current, _pagination.pageSize)
    }

    const columnsRekamMedis = [
        {
            title: "Tanggal Kunjungan",
            dataIndex: 'tanggal_kunjungan',
            key: 'tanggal_kunjungan',
            width: '20%',
            align: 'center',
            sorter: (a, b) => a.id_pasien - b.id_pasien,
            render: (value) => {
                let usia = moment().diff(moment(value, 'YYYY-MM-DD'), 'years');;

                return (
                    <Text>{usia}</Text>
                )
            }
        },
        {
            title: "Dokter Pemeriksa",
            dataIndex: 'dokter',
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
            title: "Anamnesa",
            dataIndex: 'anamnesa',
            key: 'anamnesa',
            align: 'center',
            render: (value) => {
                let text = value

                return (
                    <Text>{text}</Text>
                )
            } 
        },
        {
            title: "Diagnosis",
            dataIndex: 'diagnosis',
            key: 'diagnosis',
            align: 'center',
            render: (value) => {
                let text = value

                return (
                    <Text>{text}</Text>
                )
            } 
        },
        {
            title: "Keterangan",
            dataIndex: 'keterangan',
            key: 'keterangan',
            align: 'center',
            render: (value) => {
                let text = value

                return (
                    <Text>{text}</Text>
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
                                setRecord(record)
                                handleModal();
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
                        <NavLink to="/dashboard-staf/kelola-data-pengguna/pasien">  
                            <Text className="title">
                                Kelola Data Kunjungan
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>

                <DetailPasien
                    dataPasien={record}
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
                            <Button type='primary' className="app-btn secondary" info style={{marginTop: 10}} 
                                onClick={() => {
                                    gotoCatatKunjungan();
                                }}
                            >
                                Catat Kunjungan
                            </Button>
                        </Row>
                        <Table
                            columns={columnsRekamMedis}
                            size="middle"
                            bordered={false}
                            loading={loading}
                            dataSource={dataRekamMedis}
                            pagination={pagination}
                            onChange={handleTableChange}
                            scroll={{ x: 800 }}
                        />
                    </Card>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(KelolaKunjungan)
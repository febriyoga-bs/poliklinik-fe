import React, { useEffect, useState } from "react";
import { withRouter, NavLink, useHistory } from 'react-router-dom';
import { Layout, Breadcrumb, Row, Col, Card, Typography, Table, Button } from 'antd';
import { HomeOutlined, EditOutlined, DeleteOutlined, InfoOutlined } from '@ant-design/icons';
import { dialog } from '../../component/alert'
import { APIServices }  from '../../service';
import DetailPasien from '../modal/detail_pasien'
import moment from 'moment';

//import Dummy from '../../dummy/dummy'

const { Content } = Layout;
const { Text, Title } = Typography;

const KelolaPasien = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [dataPasien, setDataPasien] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [record, setRecord] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [filterKey, setFilterKey] = useState("");
    const [pagination, setPagination] = useState({current:1, pageSize:5, total:10});

    const gotoTambahDataPasien= () => {
        const loc = '/kelola-data-pengguna/pasien/tambah-data';
        history.push(loc);
    }

    const gotoUbahDataPasien = (data) => {
        const loc = '/kelola-data-pengguna/pasien/ubah-data';
        history.push({pathname:loc, state:data});
    }

    const handleModal = () => {
        setVisibleModal(!visibleModal);
    };

    useEffect(()=>{
        getDataPasien("", "", pagination.current,  pagination.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDataPasien = (nama, kategori, current, limit) => {
        setLoading(true);
        APIServices.getAllDataPasien(nama, kategori, current, limit).then(res => {
                if(res.data){
                    let _data = Object.values(res.data.data)
                    let _meta = _data.pop()
                    console.log("Pagination: ", _meta)
                    setPagination({
                        current: _meta.pagination.current_page,
                        pageSize: _meta.pagination.per_page,
                        total: _meta.pagination.total
                    })
                    setDataPasien(_data);
                    setLoading(false)
                }
            }).catch(err => {
                if(err){
                    //setDataPasien(Dummy.dataPasien);
                    console.log(err.response)
                    setLoading(false)
                }
            })
        }
    
    const handleTableChange = (_pagination) =>{
        let search = "";
        let kategori = ""
        console.log("Pagination: ", _pagination)

        getDataPasien(search, kategori, _pagination.current, _pagination.pageSize)
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
            dataIndex: 'tanggal_lahir',
            key: 'tanggal_lahir',
            align: 'center',
            sorter: (a, b) => a.tanggal_lahir - b.tanggal_lahir,
            render: (value) => {
                let usia = moment().diff(moment(value, 'YYYY-MM-DD'), 'years');;

                return (
                    <Text>{usia}</Text>
                )
            } 
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
                                Dashboard
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/kelola-data-pengguna/pasien">  
                            <Text className="title">
                                Kelola Data Pasien
                            </Text>
                        </NavLink>
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

                <DetailPasien
                    dataPasien={record}
                    buttonCancel={handleModal}
                    visible={visibleModal}
                />

                <Row style={{marginBottom:20, marginRight:40}}>
                    <Card className="informasi-card" style={{width:"100%"}}>
                        <Row style={{marginBottom:20}}>
                            <Text className="title-tabel">
                                Data Pasien
                            </Text>
                        </Row>
                        <Row justify="end">
                            <Button type='primary' className="app-btn secondary" info style={{marginTop: 10, marginRight: 10, backgroundColor:"#008000"}} 
                                onClick={() => {
                                    //gotoTambahDataPasien();
                                }}
                            >
                                Ekspor Data Pasien
                            </Button>
                            <Button type='primary' className="app-btn secondary" info style={{marginTop: 10}} 
                                onClick={() => {
                                    gotoTambahDataPasien();
                                }}
                            >
                                Tambah Data Pasien
                            </Button>
                        </Row>
                        <Table
                            columns={columnsPasien}
                            size="middle"
                            bordered={false}
                            loading={loading}
                            dataSource={dataPasien}
                            pagination={pagination}
                            onChange={handleTableChange}
                            scroll={{ x: "100%" }}
                        />
                    </Card>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(KelolaPasien)
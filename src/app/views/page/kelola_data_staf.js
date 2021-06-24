import React, { useEffect, useState } from "react";
import { withRouter, NavLink, useHistory } from 'react-router-dom';
import { Layout, Breadcrumb, Row, Col, Card, Typography, Table, Button, Image } from 'antd';
import { HomeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { dialog, deleteDialog } from '../../component/alert'
import { APIServices }  from '../../service';
import CONFIG from '../../service/config';

//import Dummy from '../../dummy/dummy'

const { Content } = Layout;
const { Text } = Typography;

const KelolaStaf = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [dataStaf, setDataStaf] = useState([]);
    const [pagination, setPagination] = useState({current:1, pageSize:5, total:10});
 
    const gotoTambahDataStaf= () => {
        const loc = '/dashboard-staf/kelola-data-pengguna/staf/tambah-data';
        history.push(loc);
    }

    const gotoUbahDataStaf = (data) => {
        const loc = '/dashboard-staf/kelola-data-pengguna/staf/ubah-data';
        history.push({pathname:loc, state:data});
    }

    useEffect(()=>{
        getDataStaf(pagination.current,  pagination.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDataStaf = (current, limit) => {
        setLoading(true);
        APIServices.getAllDataStaf(current, limit).then(res => {
                console.log(res.data.data)
                if(res.data){
                    let _data = Object.values(res.data.data)
                    let _meta = _data.pop()
                    console.log("Pagination: ", _meta)
                    setPagination({
                        current: _meta.pagination.current_page,
                        pageSize: _meta.pagination.per_page,
                        total: _meta.pagination.total
                    })
                    setDataStaf(_data);
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

    const deleteStaf = (no_telepon) => {
        setLoading(true);
        APIServices.deleteDataStaf(no_telepon).then(res => {
                if(res.data){
                    dialog({icon: "success", title:"Hapus Data Staf Berhasil!"}).then(()=>{
                        console.log("Berhasil");
                        getDataStaf(pagination.current,  pagination.pageSize);
                    })
                }
            }).catch(err => {
                if(err){
                    console.log(err.response)
                    setLoading(false)
                    dialog({icon: "error", title:"Hapus Data Staf Gagal!"}).then(()=>{
                        console.log("Gagal");
                    })
                }
            })
        }

    const columnsStaf = [
        {
            title: "ID Staf",
            dataIndex: 'id_staf',
            key: 'id_staf',
            width: '25%',
            sorter: (a, b) => a.id_pasien - b.id_pasien,
        },
        {
            title: "Foto",
            dataIndex: 'avatar',
            key: 'avatar',
            width: '25%',
            render: (record) => {
                return (
                    <Image src={CONFIG.BASE_URL+"/"+record}  
                        preview={false}
                        alt={record}
                        className="image-profil"
                    />
                )
            }
        },
        {
            title: "Nama Staf",
            dataIndex: 'nama',
            key: 'nama',
            width: '25%',
            sorter: (a, b) => a.nama - b.nama,
        },
        {
            title: "Jabatan",
            dataIndex: 'jabatan',
            key: 'jabatan',
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
                            gotoUbahDataStaf(record);
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
                            deleteDialog({icon: "info", title:"Hapus Data Staf", text: "Apakah Anda yakin akan menghapus data staf ini?"})
                            .then(()=>{
                                deleteStaf(record.no_telepon);
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

    const handleTableChange = (_pagination) =>{
        getDataStaf(_pagination.current, _pagination.pageSize)
    }

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
                        <NavLink to="/dashboard-staf">  
                            <Text className="title">
                                Dashboard
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/dashboard-staf/kelola-data-pengguna/staf">  
                            <Text className="title">
                                Kelola Data Staf
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>

                {/* <Row style={{marginLeft:40}}>
                    <Col>
                        <NavLink to="/kelola-data-pengguna/pasien" className="text-heading">
                            <Title level={1} style={{color: '#FFF'}}>
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
                        <NavLink to="/kelola-data-pengguna/staf" className="text-heading" activeStyle={{color: '#EB3D00'}}>
                            <Title level={1} style={{color: '#EB3D00'}}>
                                DATA STAF
                            </Title>
                        </NavLink>
                    </Col>
                </Row> */}

                <Row style={{marginBottom:20, marginRight:40}}>
                    <Card className="informasi-card" style={{width:"100%"}}>
                        <Row>
                            <Text className="title-tabel">
                                Data Staf
                            </Text>
                        </Row>
                        <Row justify="end">
                            <Button type='primary' className="app-btn secondary" info style={{marginTop: 10}} 
                                onClick={() => {
                                    gotoTambahDataStaf();
                                }}
                            >
                                Tambah Data Staf
                            </Button>
                        </Row>
                        <Table
                            columns={columnsStaf}
                            size="middle"
                            bordered={false}
                            loading={loading}
                            dataSource={dataStaf}
                            scroll={{ x: "100%" }}
                            onChange={handleTableChange}
                        />
                    </Card>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(KelolaStaf)
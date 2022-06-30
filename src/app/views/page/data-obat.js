import React, { useEffect, useState } from "react";
import { withRouter, NavLink } from 'react-router-dom';
import { Layout, Breadcrumb, Row, Col, Card, Typography, Table, DatePicker, Button} from 'antd';
import { HomeOutlined, InfoOutlined } from '@ant-design/icons';
import { APIServices }  from '../../service';
import DetailObat from '../modal/detail_obat'
import FilterEkspor from '../modal/filter_ekspor'
import moment from 'moment';

const { Content } = Layout;
const { Text } = Typography;

const DataObat = () => {
    const [loading, setLoading] = useState(false);
    const [dataObat, setDataObat] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModalEkspor, setVisibleModalEkspor] = useState(false);
    const [record, setRecord] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [pagination, setPagination] = useState({current:1, pageSize:5, total:10});

    const handleModal = () => {
        setVisibleModal(!visibleModal);
    };

    const handleModalEkspor = () => {
        setVisibleModalEkspor(!visibleModalEkspor);
    };

    const [role, setRole] = useState(0)
    useEffect(()=> {
        let _role = JSON.parse(localStorage.getItem('role'));
        let login_time = JSON.parse(localStorage.getItem('login'));
        setRole(_role/login_time)
    }, []);

    useEffect(()=>{
        getDataObat(searchKey, pagination.current,  pagination.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchKey]);

    const getDataObat = (tanggal, current, limit) => {
        setLoading(true);
        APIServices.getDataObat(tanggal, current, limit).then(res => {
                if(res.data){
                    // let _data = Object.values(res.data.data);
                    // let _meta = _data.pop();
                    // console.log("Pagination: ", _meta);
                    // setPagination({
                    //     current: _meta.pagination.current_page,
                    //     pageSize: _meta.pagination.per_page,
                    //     total: _meta.pagination.total
                    // });
                    let _data = res.data?.dataObat;
                    setDataObat(_data);
                    setLoading(false);
                }
            }).catch(err => {
                if(err){
                    console.log(err.response)
                    if(err.response){
                        setDataObat([]);
                    }
                    setLoading(false)
                }
            })
        }
    
    const handleTableChange = (_pagination) =>{
        // getDataObat(searchKey, _pagination.current, _pagination.pageSize)
    }

    const columnsObat = [
        {
            title: "ID Obat",
            dataIndex: 'idObat',
            key: 'id_obat',
            width: '10%',
            align: 'center',
            sorter: (a, b) => a.idObat - b.idObat,
        },
        {
            title: "Nama Obat",
            dataIndex: 'namaObat',
            key: 'namaObat',
            width: '20%',
            align: 'center',
        },
        {
            title: "Bentuk Sediaan",
            dataIndex: 'bentukSediaan',
            key: 'bentukSediaan',
            width: '20%',
            align: 'center',
        },
        {
            title: "Stok Obat",
            width: '20%',
            align: 'center',
            render: (record) => {
                return (
                    <Text>{record.stokObat + " " + record.satuanObat}</Text>
                )
            }
        },
        {
            title: "Tanggal Masuk",
            dataIndex: 'tanggalMasuk',
            key: 'tanggalMasuk',
            width: '15%',
            align: 'center',
            sorter: (a, b) => parseInt(a.tanggalMasuk.split("-").join()) - parseInt(b.tanggalMasuk.split("-").join()),
            render: (value) => {
                let tanggal = moment(value, 'YYYY-MM-DD').format('DD-MM-YYYY');

                return (
                    <Text>{tanggal}</Text>
                )
            }
        },
        {
            title: "Tanggal Kadaluarsa",
            dataIndex: 'tanggalKadaluarsa',
            key: 'tanggalKadaluarsa',
            width: '15%',
            align: 'center',
            sorter: (a, b) => parseInt(a.tanggalKadaluarsa.split("-").join()) - parseInt(b.tanggalKadaluarsa.split("-").join()),
            render: (value) => {
                let tanggal = moment(value, 'YYYY-MM-DD').format('DD-MM-YYYY');

                return (
                    <Text>{tanggal}</Text>
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
                        <NavLink to="/dashboard-dokter">  
                            <Text className="title">
                                Dashboard
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/dashboard-dokter/data-obat">
                            <Text className="title">
                                Data Obat
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>

                <DetailObat
                    dataObat={record}
                    buttonCancel={handleModal}
                    visible={visibleModal}
                />

                <FilterEkspor
                    title="Data Obat"
                    buttonCancel={handleModalEkspor}
                    visible={visibleModalEkspor}
                />

                <Row>
                    <Col>
                        <DatePicker format='DD/MM/YYYY' 
                            placeholder="Cari berdasarkan Tanggal" 
                            style={{ width: 300, height: 40, maxWidth:"90%", marginLeft: 20, marginBottom: 20, borderRadius: 10}}         
                            onChange={(e) => {
                                console.log(e)
                                if(e !== null){
                                    setSearchKey(moment(e).format('YYYY-MM-DD') + " 00:00:00"); 
                                } else {
                                    setSearchKey("")
                                }
                            }}
                        />
                    </Col>
                </Row>

                <Row style={{marginBottom:20, marginRight:20}}>
                    <Card className="informasi-card" style={{width:"100%"}}>
                        <Row style={{marginBottom:20}}>
                            <Text className="title-tabel">
                                Data Obat
                            </Text>
                        </Row>
                        {(role !== 3) &&
                            <Row justify="end">
                                <Button type='primary' className="app-btn secondary" info style={{marginTop: 10, marginRight: 10, backgroundColor:"#008000"}} 
                                    onClick={() => {
                                        //eksporRiwayatKunjungan();
                                        handleModalEkspor();
                                    }}
                                >
                                    Ekspor Data Obat
                                </Button>
                            </Row>
                        }
                        <Table
                            columns={columnsObat}
                            size="middle"
                            bordered={false}
                            loading={loading}
                            dataSource={dataObat}
                            // pagination={pagination}
                            onChange={handleTableChange}
                            scroll={{ x: "100%" }}
                        />
                    </Card>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(DataObat)
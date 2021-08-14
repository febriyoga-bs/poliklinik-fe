import React, { useEffect, useState } from "react";
import { withRouter, NavLink, useHistory } from 'react-router-dom';
import { Layout, Breadcrumb, Row, Col, Card, Typography, Table, DatePicker, Input, Select, Button} from 'antd';
import { HomeOutlined, EditOutlined, DeleteOutlined, InfoOutlined } from '@ant-design/icons';
import { dialog, deleteDialog } from '../../component/alert'
import { APIServices }  from '../../service';
import DetailPasien from '../modal/detail_pasien'
import moment from 'moment';

//import Dummy from '../../dummy/dummy'

const { Content } = Layout;
const { Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const RiwayatKunjungan = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [loadingEkspor, setLoadingEkspor] = useState(false);
    const [dataPelayanan, setDataPelayanan] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [record, setRecord] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [pagination, setPagination] = useState({current:1, pageSize:5, total:10});

    const handleModal = () => {
        setVisibleModal(!visibleModal);
    };

    useEffect(()=>{
        getRiwayatKunjungan(searchKey, pagination.current,  pagination.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchKey]);

    const getRiwayatKunjungan = (tanggal, current, limit) => {
        setLoading(true);
        let id_pasien = JSON.parse(localStorage.getItem('id_pasien')) ? JSON.parse(localStorage.getItem('id_pasien')) : ""
        APIServices.getRiwayatKunjungan(id_pasien, tanggal, current, limit).then(res => {
                if(res.data){
                    let _data = Object.values(res.data.data)
                    let _meta = _data.pop()
                    console.log("Pagination: ", _meta)
                    setPagination({
                        current: _meta.pagination.current_page,
                        pageSize: _meta.pagination.per_page,
                        total: _meta.pagination.total
                    })
                    setDataPelayanan(_data);
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

    const eksporRiwayatKunjungan = () => {
        setLoadingEkspor(true);
        APIServices.getExportRiwayatKunjungan().then(res => {
                if(res.data){
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    let tanggal = moment().format('DD-MM-YYYY')
                    link.setAttribute('download', `Data_Riwayat_Kunjungan(${tanggal}).xlsx`); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    setLoadingEkspor(false)
                }
            }).catch(err => {
                if(err){
                    //setDataPasien(Dummy.dataPasien);
                    console.log(err.response)
                    setLoadingEkspor(false)
                }
            })
        }
    
    const handleTableChange = (_pagination) =>{
        getRiwayatKunjungan(searchKey, _pagination.current, _pagination.pageSize)
    }

    const columnsPelayanan = [
        {
            title: "Tanggal Pelayanan",
            dataIndex: 'tanggal',
            key: 'tanggal',
            width: '20%',
            align: 'center',
            sorter: (a, b) => a.id_pasien - b.id_pasien,
            render: (value) => {
                let tanggal = moment(value, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY');

                return (
                    <Text>{tanggal}</Text>
                )
            }
        },
        {
            title: "Nama Pasien",
            dataIndex: 'nama_pasien',
            key: 'nama',
            width: '20%',
            align: 'center',
        },
        {
            title: "Dokter Pemeriksa",
            dataIndex: 'nama_dokter',
            key: 'dokter',
            width: '20%',
            align: 'center',
        },
        {
            title: "Jenis Pelayanan",
            dataIndex: 'jenis',
            key: 'jenis',
            width: '20%',
            align: 'center',
            render: (record) => {
                return (
                    <Text>Poli {record}</Text>
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
                        <NavLink to="/dashboard-staf/riwayat-kunjungan">  
                            <Text className="title">
                                Riwayat Kunjungan
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
                        <Row style={{marginBottom:20}}>
                            <Text className="title-tabel">
                                Data Riwayat Kunjungan
                            </Text>
                        </Row>
                        <Row justify="end">
                            <Button type='primary' className="app-btn secondary" info style={{marginTop: 10, marginRight: 10, backgroundColor:"#008000"}} 
                                loading={loadingEkspor}
                                onClick={() => {
                                    eksporRiwayatKunjungan();
                                }}
                            >
                                Ekspor Riwayat Kunjungan
                            </Button>
                        </Row>
                        <Table
                            columns={columnsPelayanan}
                            size="middle"
                            bordered={false}
                            loading={loading}
                            dataSource={dataPelayanan}
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

export default withRouter(RiwayatKunjungan)
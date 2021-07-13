import React, { useEffect, useState } from "react";
import { withRouter, NavLink, useHistory } from 'react-router-dom';
import { Layout, Breadcrumb, Row, Col, Card, Typography, Table, Button, Input, Select} from 'antd';
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

const KelolaPasien = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [loadingEkspor, setLoadingEkspor] = useState(false);
    const [dataPasien, setDataPasien] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [record, setRecord] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [filterKey, setFilterKey] = useState("");
    const [pagination, setPagination] = useState({current:1, pageSize:5, total:10});

    const gotoTambahDataPasien= () => {
        const loc = '/dashboard-staf/kelola-data-pengguna/pasien/tambah-data';
        history.push(loc);
    }

    const gotoUbahDataPasien = (data) => {
        const loc = '/dashboard-staf/kelola-data-pengguna/pasien/ubah-data';
        history.push({pathname:loc, state:data});
    }

    const handleModal = () => {
        setVisibleModal(!visibleModal);
    };

    useEffect(()=>{
        getDataPasien(searchKey, filterKey, pagination.current,  pagination.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchKey, filterKey]);

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
    
    const deletePasien = (no_telepon) => {
        setLoading(true);
        APIServices.deleteDataPasien(no_telepon).then(res => {
                if(res.data){
                    dialog({icon: "success", title:"Hapus Data Pasien Berhasil!"}).then(()=>{
                        console.log("Berhasil");
                        getDataPasien(searchKey, filterKey, pagination.current, pagination.pageSize)
                    })
                }
            }).catch(err => {
                if(err){
                    console.log(err.response)
                    setLoading(false)
                    dialog({icon: "error", title:"Hapus Data Pasien Gagal!"}).then(()=>{
                        console.log("Gagal");
                    })
                }
            })
        }

    const eksporDataPasien = () => {
        setLoadingEkspor(true);
        APIServices.getExportDataPasien().then(res => {
                if(res.data){
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    let tanggal = moment().format('DD-MM-YYYY')
                    link.setAttribute('download', `Data_Pasien_Poliklinik(${tanggal}).xlsx`); //or any other extension
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
        getDataPasien(searchKey, filterKey, _pagination.current, _pagination.pageSize)
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
                    key: 'gigi',
                    align: 'center',
                    sorter: (a, b) => a.usia - b.usia,
                    render: (record) => {
                        let kode = "-"
                        if(record.kode_rekam_medis.length > 0){
                            record.kode_rekam_medis.forEach(val =>{
                                if(val.id_poli === 2){
                                    kode = val.kode_rekam_medis
                                }
                            })
                        }
                        return (
                            <Text>{kode}</Text>
                        )
                    }
                },
                {
                    title: "Poli Umum",
                    key: 'umum',
                    align: 'center',
                    sorter: (a, b) => a.usia - b.usia,
                    render: (record) => {
                        let kode = "-"
                        if(record.kode_rekam_medis.length > 0){
                            record.kode_rekam_medis.forEach(val =>{
                                if(val.id_poli === 1){
                                    kode = val.kode_rekam_medis
                                }
                            })
                        }
                        return (
                            <Text>{kode}</Text>
                        )
                    }
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
                            deleteDialog({icon: "info", title:"Hapus Data Pasien", text: "Apakah Anda yakin akan menghapus data pasien ini?"}).then(()=>{
                                deletePasien(record.no_telepon);
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
        <>
                <Breadcrumb style={{marginLeft:20, marginBottom:20, marginTop:85}} separator=">">
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
                                Kelola Data Pasien
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>

                {/* <Row style={{marginLeft:40}}>
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
                </Row> */}

                <DetailPasien
                    dataPasien={record}
                    buttonCancel={handleModal}
                    visible={visibleModal}
                />

                <Row>
                    <Col>
                        <Search 
                            allowClear
                            placeholder="Cari berdasarkan Nama Pasien" 
                            onChange={(e)=> setSearchKey(e.target.value)} 
                            style={{ width: 300, maxWidth:"90%", marginLeft: 20, marginBottom: 20, borderRadius: 20}}
                        />
                    </Col>
                    <Col>
                        <Select
                            allowClear
                            placeholder="Filter berdasarkan Kategori Pasien"
                            onChange={(val) => setFilterKey(val)}
                            style={{ width: 300, maxWidth:"90%", marginLeft: 20, marginBottom: 20, borderRadius: 20}}
                        >
                            <Option value="Umum">Umum</Option>
                            <Option value="Mahasiswa">Mahasiswa</Option>
                            <Option value="Staf/Dosen">Staf/Dosen</Option>
                            <Option value="Keluarga Staf/Dosen">Keluarga Staf/Dosen</Option>
                        </Select>
                    </Col>
                </Row>

                <Row style={{width:"100%", marginBottom:20, marginRight:20}}>
                    <Card className="informasi-card" style={{width:"100%"}}>
                        <Row style={{marginBottom:20}}>
                            <Text className="title-tabel">
                                Data Pasien
                            </Text>
                        </Row>
                        <Row justify="end">
                            <Button type='primary' className="app-btn secondary" info style={{marginTop: 10, marginRight: 10, backgroundColor:"#008000"}} 
                                loading={loadingEkspor}
                                onClick={() => {
                                    eksporDataPasien();
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
                            scroll={{ x: 500 }}
                        />
                    </Card>
                </Row>
            </>
    );
}

export default withRouter(KelolaPasien)
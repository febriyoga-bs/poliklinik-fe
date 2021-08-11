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

const KelolaRekamMedis = (props) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [dataPasien, setDataPasien] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [record, setRecord] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [filterKey, setFilterKey] = useState("");
    const [pagination, setPagination] = useState({current:1, pageSize:5, total:10});

    let id_poli = props.match.params.poli==="umum" ? 1 : 2;

    const [path, setPath] = useState("");
    const [role, setRole] = useState(5);

    useEffect(()=>{
        let _role = JSON.parse(localStorage.getItem('role'));
        let login_time = JSON.parse(localStorage.getItem('login'));
        setRole(_role/login_time)

        console.log(_role/login_time)
        if(_role/login_time === 2){
            setPath("/dashboard-dokter");
        } else if(_role/login_time === 5){
            setPath("/dashboard-perawat");
        }
        console.log(props)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const gotoKelolaDataKunjungan = (data) => {
        let poli = props.match.params.poli

        let loc = `${path}/kelola-rekam-medis/${poli}/data-kunjungan/${data.id_pasien}`;
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
            key: 'rekam_medis',
            align: 'center',
            render: (record) => {
                let kode = "-"
                record.kode_rekam_medis.forEach(val =>{
                    if(val.id_poli === id_poli){
                        kode = val.kode_rekam_medis
                    }
                })
                return (
                    <Text>{kode}</Text>
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
        {
            title: 'Kelola Rekam Medis',
            width: '20%',
            align: 'center',
            render: (record) => {
                return (
                <Row justify="center" gutter={[20,0]}>
                  <Col>
                    <Button
                        onClick={() => {
                            console.log(record);
                            gotoKelolaDataKunjungan(record);
                        }}
                    >
                        <Text style={{color: "#000"}}>
                            <EditOutlined style={{fontSize:20}}/>
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
                <Breadcrumb style={{marginLeft:20, marginBottom:20}} separator=">">
                    <Breadcrumb.Item>
                        <NavLink to="/">  
                            <Text className="title">
                                <HomeOutlined />
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to={`${path}`}>  
                            <Text className="title">
                                Dashboard
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to={`${path}/kelola-rekam-medis/${props.match.params.poli}`}>  
                            <Text className="title">
                                Kelola Rekam Medis
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to={`${path}/kelola-rekam-medis/${props.match.params.poli}`}>  
                            <Text className="title">
                                {props.match.params.poli === "umum" ? "Umum" : "Gigi"}
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
                            style={{ width: 300, maxWidth:"90%", marginLeft: 10, marginBottom: 20, borderRadius: 20}}
                        >
                            <Option value="Umum">Umum</Option>
                            <Option value="Mahasiswa">Mahasiswa</Option>
                            <Option value="Staf/Dosen">Staf/Dosen</Option>
                            <Option value="Keluarga Staf/Dosen">Keluarga Staf/Dosen</Option>
                        </Select>
                    </Col>
                </Row>

                <Row style={{marginBottom:20, marginRight:20}}>
                    <Card className="informasi-card" style={{width:"100%"}}>
                        <Row style={{marginBottom:20}}>
                            <Text className="title-tabel">
                                Data Pasien
                            </Text>
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

export default withRouter(KelolaRekamMedis)
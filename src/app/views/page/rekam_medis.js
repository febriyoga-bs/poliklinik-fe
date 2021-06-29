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
const {Title } = Typography;

const RekamMedis = (props) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [dataRekamMedis, setDataRekamMedis] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [record, setRecord] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [pagination, setPagination] = useState({current:1, pageSize:5, total:10});

  

    const handleModal = () => {
        //message.info("Laman Detail Kunjungan belum Tersedia");
        setVisibleModal(!visibleModal);
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
                    <Breadcrumb.Item>
                        <NavLink to="/dashboard-staf/kelola-data-pengguna/rekam-medis/pasien">  
                            <Text className="title">
                                Rekam Medis
                            </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>

                <DetailPasien
                    dataPasien={record}
                    buttonCancel={handleModal}
                    visible={visibleModal}
                />

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
                        <Row>
                            <Text className="title-tabel">
                                Tanggal Kunjungan :
                            </Text>
                        </Row>
                        <Row>
                            <Text className="title-tabel">
                                Dokter Pemeriksa :
                            </Text>
                        </Row>
                        <Row>
                            <Text className="title-tabel">
                                Jam Masuk :
                            </Text>
                        </Row>
                        <Row>
                            <Text className="title-tabel">
                                Jam Keluar :
                            </Text>
                        </Row>
                        <div className="rekammedis-card" >
                        <Row gutter={16}>
                        <Col span={8}>
                            <Card title="Anamnesa" >
                            isi
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Diagnosis" >
                           isi
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Keterangan" >
                            isi
                            </Card>
                        </Col>
                        </Row>
                    </div>,
                    </Card>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(RekamMedis)
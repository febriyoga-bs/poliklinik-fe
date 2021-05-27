import React, { useEffect, useState } from "react";
import { withRouter, NavLink } from 'react-router-dom';
import { Layout, Breadcrumb, Row, Col, Card, Typography, Table, Button } from 'antd';
import { HomeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Dummy from '../../dummy/dummy'

const { Content } = Layout;
const { Text, Title } = Typography;

const KelolaPasien = () => {
    const [loading, setLoading] = useState(false);
    const [record, setRecord] = useState(false);

    const columnsPasien = [
        {
            title: "ID Pasien",
            dataIndex: 'id_pasien',
            key: 'id_pasien',
            width: '20',
            sorter: (a, b) => a.id_pasien - b.id_pasien,
        },
        {
            title: "Nama Pasien",
            dataIndex: 'nama',
            key: 'nama',
            width: '20',
            sorter: (a, b) => a.nama - b.nama,
        },
        {
            title: "Kategori",
            dataIndex: 'kategori',
            key: 'kategori',
            width: '20',
            sorter: (a, b) => a.nama - b.nama,
        },
        {
            title: "Usia",
            dataIndex: 'usia',
            key: 'usia',
            width: '20',
            sorter: (a, b) => a.usia - b.usia,
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
                            setRecord(record);
                            console.log(record);
                        }
                    }>
                        <Text style={{color: "#000"}}>
                            <EditOutlined style={{fontSize:20}}/>
                        </Text>
                    </Button>
                  </Col>
                  <Col>
                    <Button >
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
                <Breadcrumb style={{marginLeft:40, marginBottom:20, color:"#FFF"}} separator=">">
                    <Breadcrumb.Item href="/">
                        <Text className="title">
                            <HomeOutlined />
                        </Text>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/#/profil-staf">
                        <Text className="title">
                            <span>Profil Staf</span>
                        </Text>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/#/kelola-data-pasien">
                        <Text className="title">
                            <span>Kelola Data Pasien</span>
                        </Text>
                    </Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{marginLeft:40}}>
                    <Col>
                        <NavLink to="/kelola-data-pasien" className="text-heading" activeStyle={{color: '#EB3D00'}}>
                            <Title level={1} style={{color: '#EB3D00'}}>
                                DATA PASIEN
                            </Title>
                        </NavLink>
                    </Col>
                    <Col style={{marginLeft:48}}>
                        <NavLink to="/kelola-data-petugas" className="text-heading">
                            <Title level={1} style={{color: '#FFF'}}>
                                DATA DOKTER & STAF
                            </Title>
                        </NavLink>
                    </Col>
                </Row>

                <Row style={{marginBottom:20}}>
                    <Card className="informasi-card" style={{width:"100%"}}>
                        <Row>
                            <Text className="title-tabel">
                                Data Pasien
                            </Text>
                        </Row>
                        <Table
                            columns={columnsPasien}
                            size="middle"
                            bordered={false}
                            loading={loading}
                            dataSource={Dummy.dataPasien}
                            // onChange={handleTableChange}
                        />
                    </Card>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(KelolaPasien)
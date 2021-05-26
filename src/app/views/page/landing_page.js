import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col, Image, Typography } from 'antd';
import Fade from 'react-reveal/Fade';
import poli from "../../../assets/poli.jpg"

const { Content } = Layout;
const { Text } = Typography;

const LandingPage = () => {
    const [dataProfil, setDataProfil] = useState([]);

    useEffect(()=>{
        setDataProfil({deskripsi: "Poliklinik POLBAN merupakan Unit Pelayanan Kesehatan bagi civitas akademika POLBAN dan masyarakat umum di sekitarnya. Terdiri dari dua poli yaitu, Poli Umum dan Poli Gigi."})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <Layout>
            <Content className="layout-home">
                <Image src={poli} style={{position:"fixed", width:"100%"}} preview={false}>
                </Image>
                <Row style={{marginLeft:20, marginTop:80, minHeight:600}}>
                    <Col offset={10} xs={12} md={12} lg={12}>
                        <Row style={{marginBottom:20}}>
                            <Text className="title bold" style={{fontSize:"2em"}}>
                                Profil Poliklinik
                            </Text>
                        </Row>
                        <Row>
                            <Text className="title bold">
                                {dataProfil.deskripsi} 
                            </Text>
                        </Row>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(LandingPage)
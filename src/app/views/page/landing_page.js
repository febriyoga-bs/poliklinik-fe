import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col, Image, Typography } from 'antd';
import Fade from 'react-reveal/Fade';
import poli from "../../../assets/poli.jpg"
import { APIServices }  from '../../service';
import dummy from "../../dummy/dummy";

const { Content } = Layout;
const { Text } = Typography;

const LandingPage = () => {
    const [dataProfil, setDataProfil] = useState([]);

    useEffect(()=>{
        getDataProfil()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDataProfil = () => {
        APIServices.getDataProfil().then(res => {
            if(res.data){
            setDataProfil(res.data.data[0]);
            //setLoading(false)
            }
        }).catch(err => {
            if(err){
            setDataProfil(dummy.dataProfil);
            console.log(err.response)
            //("Internal Server Error (Refresh the Page!");
            //setLoading(false)
            }
        })
    }

    return(
        <Layout>
            <Content className="layout-home">
                <Image src={poli} style={{position:"fixed", width:"100%", minHeight:600}} preview={false}>
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
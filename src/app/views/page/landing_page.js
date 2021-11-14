/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col, Image, Card, Typography, Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Fade from 'react-reveal/Fade';
import poli from "../../../assets/poli.jpg"
import poli2 from "../../../assets/poli2.jpg"
import { APIServices }  from '../../service';
import useWindowDimensions from '../../component/size-window'
import moment from 'moment';

const { Content } = Layout;
const { Text } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

const LandingPage = () => {
    const [dataProfil, setDataProfil] = useState([]);
    const [loading, setLoading] = useState(false);
    const { height, width } = useWindowDimensions();
    const [currentTime, setCurrentTime] = useState(moment().format("DD/MM/YYYY HH:mm:ss"));
    
    useEffect(()=>{
        const interval = setInterval(() => {
            setCurrentTime(moment().format("DD/MM/YYYY HH:mm:ss"))
          }, 1000);
          return () => clearInterval(interval);
    }, [])

    useEffect(()=>{
        getDataProfil()
        console.log(height, width)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDataProfil = () => {
        setLoading(true)
        APIServices.getDataProfil().then(res => {
            if(res.data){
                setDataProfil(res.data.data[0]);
                setLoading(false)
            }
        }).catch(err => {
            if(err){
                message.error("Gagal memuat profil poliklinik")
                setLoading(false)
            }
        })
    }

    return(
        <Layout>
            <Content className="layout-home" style={{}}>
                <Image 
                    src={width>550 ? poli : poli2} 
                    style={{position:"fixed", width:"100%", height:"100%", marginTop:(width>600 ? 0 : 40), backgroundColor: "#F0F0F0"}} 
                    preview={false}
                >
                </Image>
            
                <Row 
                    justify="center"
                    align="middle"
                    style={{position:"fixed", marginTop: 60, width:160, height:80, backgroundColor: "#EB3D00", borderRadius:"0px 0px 10px 0px", zIndex: 10}}
                >
                    <Text style={{fontSize:"1em", textAlign:"center", color:"#FFF"}}>
                        {currentTime} <br></br>
                        <b>Poliklinik Buka</b> <br></br>
                        (09.00 - 12.00)
                    </Text>
                </Row>
                {loading ?
                    <Row justify="center" align="middle" style={{minHeight:600}}>
                        <Spin indicator={antIcon} /> 
                    </Row>
                    :
                    <Row style={{marginLeft:20, marginRight:20, marginTop:(width>600 ? 100 : 150), minHeight:(width>600 ? 600 : 1000)}}>
                        <Col offset={(width>600) ? 10 : 0} xs={24} s={24} md={12} lg={12}>
                            <Fade>
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
                                <Row>
                                    <Text className="title bold" style={{marginTop:20}}>
                                        Lokasi Poliklinik POLBAN :
                                    </Text>
                                </Row>
                                <Row>
                                    <Card className="landing-page-card" style={{width:"100%", marginBottom:20, minHeight: 500}}>
                                        
                                        <Row justify="center">
                                            <div class="mapouter">
                                                <div class="gmap_canvas">
                                                    <iframe 
                                                        className="iframe_layout" 
                                                        id="gmap_canvas" 
                                                        src="https://maps.google.com/maps?q=UPT%20Layanan%20Kesehatan%20Polban&t=&z=17&ie=UTF8&iwloc=&output=embed" 
                                                        frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                                                    </iframe>
                                                </div>
                                            </div>
                                        </Row>
                                    </Card>
                                </Row>
                                
                            </Fade>
                        </Col>
                    </Row>
                }
            </Content>
        </Layout>
    );
}

export default withRouter(LandingPage)
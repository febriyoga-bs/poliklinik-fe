/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Layout, Typography, Row, Col } from "antd";
//import { InstagramFilled, FacebookFilled, YoutubeFilled } from '@ant-design/icons';
import { withRouter} from "react-router-dom";

const { Text } = Typography;

const FooterLayout = (props) => {
    // const openURL = (URL) =>{
    //     window.open(URL, "_blank");
    // }

    return(
        <Layout className="footer" style={{width:'100%'}}>
            <Row align='middle' justify="space-between" style={{minHeight:'100%', padding:15}}>
                <Col xs={24} lg={8}>
                    {/* <Row justify="center">
                        <Button type="text" className="title-ig" onClick={()=> openURL("https://www.polban.ac.id/")}>
                            <InstagramFilled  style={{fontSize:30}}/>
                        </Button>
                        <Button type="text" className="title-yt" onClick={()=> openURL("https://www.polban.ac.id")}>
                            <YoutubeFilled  style={{fontSize:30}}/>
                        </Button>
                        <Button type="text" className="title-fb" onClick={()=> openURL("https://www.polban.ac.id")}>
                            <FacebookFilled style={{fontSize:30}}/>
                        </Button>
                    </Row> */}
                </Col>
                <Col xs={24} lg={8}>
                    <Row justify="center">
                        <Text className="title-footer">
                            © 2021 | KoTA 101 | Poliklinik Politeknik Negeri Bandung
                        </Text>
                    </Row>
                </Col>
                <Col xs={24} lg={8}>
                    {/* <Row justify="center">
                        <Text className="title-footer">
                            Jl. Gegerkalong Hilir, Ciwaruga
                        </Text>
                    </Row>
                    <Row justify="center">
                        <Text className="title-footer">
                            Bandung Barat, Jawa Barat, Indonesia
                        </Text>
                    </Row>
                    <Row justify="center"> 
                        <Text className="title-footer">
                            (022) 2013789
                        </Text>
                    </Row> */}
                </Col>
            </Row>
        </Layout>
    );
}

export default withRouter(FooterLayout)
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Layout, Typography, Row, Col, Button} from "antd";
import { InstagramFilled, FacebookFilled, YoutubeFilled } from '@ant-design/icons';
import { withRouter} from "react-router-dom";

const { Text } = Typography;

const FooterLayout = (props) => {
    const openURL = (URL) =>{
        window.open(URL, "_blank");
    }

    return(
        <Layout className="footer" style={{width:'100%'}}>
            <Row align='middle' justify="space-between" style={{minHeight:'100%', padding:10}}>
                <Col xs={24} lg={8} style={{marginBottom: 5}}>
                    <Row justify="center">
                        <Text className="title-footer">
                            Follow Candraplants:
                        </Text>
                    </Row>
                    <Row justify="center">
                        <Button type="text" className="title-ig" onClick={()=> openURL("https://www.instagram.com/putracandraade/")}>
                            <InstagramFilled  style={{fontSize:30}}/>
                        </Button>
                        <Button type="text" className="title-yt" onClick={()=> openURL("https://www.youtube.com/channel/UCEsQyW5qLhBUlKe5rjAeAzg/")}>
                            <YoutubeFilled  style={{fontSize:30}}/>
                        </Button>
                        <Button type="text" className="title-fb" onClick={()=> openURL("https://web.facebook.com/candra.adeputra.395")}>
                            <FacebookFilled style={{fontSize:30}}/>
                        </Button>
                    </Row>
                </Col>
                <Col xs={24} lg={8} style={{marginBottom: 5}}>
                    <Row justify="center">
                        <Text className="title-footer">
                            © 2021 | CV. Putera Candra Plants | All Rights Reserved
                        </Text>
                    </Row>
                </Col>
                <Col xs={24} lg={8} style={{marginBottom: 5}}>
                    <Row justify="center">
                        <Text className="title-footer">
                            Jl. Cigugur Girang No.14 (Cihideung), Parongpong
                        </Text>
                    </Row>
                    <Row justify="center">
                        <Text className="title-footer">
                            Bandung Barat, Jawa Barat, Indonesia
                        </Text>
                    </Row>
                    <Row justify="center"> 
                        <Text className="title-footer">
                            +62 896 6216 5579 | +62 895 6007 84269
                        </Text>
                    </Row>
                </Col>
            </Row>
        </Layout>
    );
}

export default withRouter(FooterLayout)
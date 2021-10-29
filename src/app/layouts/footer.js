/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Layout, Typography, Row, Col } from "antd";
import useWindowDimensions from "../component/size-window"
//import { InstagramFilled, FacebookFilled, YoutubeFilled } from '@ant-design/icons';
import { withRouter} from "react-router-dom";

const { Text } = Typography;

const FooterLayout = (props) => {
    const { height, width } = useWindowDimensions();
    // const openURL = (URL) =>{
    //     window.open(URL, "_blank");
    // }

    return(
        <Layout className="footer" style={{width:width}}>
            <Row align='middle' justify="center" style={{minHeight:'100%', padding:15}}>
                <Col>
                    <Row justify="center">
                        <Text className="title-footer">
                            © 2021 | KoTA 101 | Poliklinik Politeknik Negeri Bandung
                        </Text>
                    </Row>
                </Col>
            </Row>
        </Layout>
    );
}

export default withRouter(FooterLayout)
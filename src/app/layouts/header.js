/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Layout, Typography, Row, Col, Button, Image, Badge, message} from "antd";
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import { withRouter, NavLink, useHistory } from "react-router-dom";
import Auth from "../service/auth"
import Logo from "../../assets/logo.jpg";
import Menu from '../views/drawer/menu';

const { Text } = Typography;

const HeaderLayout = (props) => {
    const history = useHistory();
    const [visibleMenu, setVisibleMenu] = useState(false);

    const handleDrawerMenu = () => {
        setVisibleMenu(!visibleMenu);
    };

    const gotoMyAccount= () => {
        const loc = '/my-account';
        history.push(loc);
    }

    const gotoLogin= () => {
        const loc = '/login';
        history.push(loc);
    }

    return (
        <Layout align="middle" className="navmenu" style={{maxWidth:'100%'}}>
            <Row justify='space-between' align='middle' style={{marginTop:7}}>
                <Col lg={6} style={{paddingLeft:10}}>
                    <Row>
                        <Col>
                            <Image src={Logo} alt="Candra Plants" 
                                style={{width: 80, height: 80, borderRadius: 20}}
                                preview={false}
                                onClick={()=> props.history.push("/")} 
                            />
                        </Col>
                        <Col className="title" style={{paddingLeft:5}}>
                            UNIT <br></br>
                            PELAYANAN <br></br>
                            KESEHATAN
                        </Col>
                    </Row>
                </Col>
                <Col md={2.5} lg={3}>
                    <NavLink to="/" className="title-navmenu">
                        BERANDA
                    </NavLink>
                </Col>
                <Col md={2.5} lg={3}>
                    <NavLink to="/layanan" className="title-navmenu" activeStyle={{color: '#fff279'}}>
                        LAYANAN
                    </NavLink>
                </Col>
                <Col md={2.5} lg={3}>
                    <NavLink to="/informasi" className="title-navmenu" activeStyle={{color: '#fff279'}}>
                        INFORMASI
                    </NavLink>
                </Col>
                <Col md={2.5} lg={3}>
                    <NavLink to="/bantuan" className="title-navmenu" activeStyle={{color: '#fff279'}}>
                        BANTUAN
                    </NavLink>
                </Col>
                <Col>
                    <Row>
                        <Button type="text" onClick={handleDrawerMenu} >
                            <Badge count={0}>
                            <Text className="title-navmenu-mobile">
                                <MenuOutlined style={{fontSize:30}}/>
                            </Text>
                            </Badge>
                        </Button>
                    </Row>
                </Col>
                <Col md={2.5} lg={3} style={{marginRight:25}}>
                    <div className="login-button">
                    {Auth.isLogin()? 
                        <Button type='primary' className="app-btn primary" onClick={gotoMyAccount}>
                            <UserOutlined style={{fontSize:20}}/> MY ACCOUNT
                        </Button>
                        :
                        <Button type='primary' className="app-btn primary" onClick={gotoLogin}>
                            <UserOutlined style={{fontSize:20}}/> LOGIN
                        </Button>
                    }
                    </div>
                </Col>
            </Row>
            <Menu
                buttonCancel={handleDrawerMenu}
                visible={visibleMenu}
                handleMyAccount={() => {handleDrawerMenu(); gotoMyAccount()}}
            />
        </Layout>
    );
}

export default withRouter(HeaderLayout);
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Layout, Typography, Row, Col, Button, Image, Dropdown, Menu, message} from "antd";
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import { withRouter, NavLink, useHistory } from "react-router-dom";
import Auth from "../service/auth"
import Logo from "../../assets/logo.jpg";
import NavbarMenu from '../views/drawer/menu';

const { Text } = Typography;

const HeaderLayout = (props) => {
    const history = useHistory();
    const [visibleMenu, setVisibleMenu] = useState(false);

    const handleDrawerMenu = () => {
        setVisibleMenu(!visibleMenu);
    };

    const menuLayanan = (
        <Menu style={{marginTop:20, backgroundColor:"#EB3D00"}}>
            <Menu.Item >
                <NavLink to="/antrian-poliklinik">  
                    <Text className="title">
                        Antrian Poliklinik
                    </Text>
                </NavLink>
            </Menu.Item>
            <Menu.Item >
                <NavLink to="/konsultasi-online">  
                    <Text className="title">
                        Konsultasi Online
                    </Text>
                </NavLink>
            </Menu.Item>
        </Menu>
      );

    const gotoProfil= () => {
        let role = JSON.parse(localStorage.getItem('role'));
        console.log(role);

        if(role === "123"){
            const loc = '/profil-staf';
            history.push(loc);
        } else if(role === "234"){
            const loc = '/profil-dokter';
            history.push(loc);
        } else{
            const loc = '/profil-pasien';
            history.push(loc);
        }
    }

    const gotoLogin= () => {
        const loc = '/login';
        history.push(loc);
    }

    return (
        <Layout align="middle" className="navmenu" style={{maxWidth:'100%'}}>
            <Row justify='space-between' align='middle' style={{height:'100%'}}>
                <Col lg={5} style={{paddingLeft:10}}>
                    <Row align='middle'>
                        <Image src={Logo} alt="Candra Plants" 
                            style={{width: 60, height: 60, borderRadius: 20}}
                            preview={false}
                            onClick={()=> props.history.push("/")} 
                        />
                        <Col className="title" style={{paddingLeft:5}}>
                            UNIT <br></br>
                            PELAYANAN <br></br>
                            KESEHATAN
                        </Col>
                    </Row>
                </Col>
                <Col md={3} lg={3}>
                    <NavLink to="/" className="title-navmenu">
                        BERANDA
                    </NavLink>
                </Col>
                <Col md={3} lg={3}>
                    {/* <NavLink to="/layanan" className="title-navmenu" activeStyle={{color: '#fff279'}}>
                        LAYANAN
                    </NavLink> */}
                    <Dropdown overlay={menuLayanan} placement="bottomCenter">
                        <Text className="title-navmenu">
                            LAYANAN
                        </Text>
                    </Dropdown>
                </Col>
                <Col md={3} lg={3}>
                    <NavLink to="/informasi" className="title-navmenu" activeStyle={{color: '#fff279'}}>
                        INFORMASI
                    </NavLink>
                </Col>
                <Col md={2.5} lg={3}>
                    {/* <NavLink to="/bantuan" className="title-navmenu" activeStyle={{color: '#fff279'}}>
                        BANTUAN
                    </NavLink> */}
                    <Text onClick={()=>message.info("Laman Bantuan belum tersedia")} className="title-navmenu">
                        BANTUAN
                    </Text>
                </Col>
                <Col>
                    <Row>
                        <Button className="title-navmenu-mobile" type="text" onClick={handleDrawerMenu} >
                            <Text>
                                <MenuOutlined style={{fontSize:30}}/>
                            </Text>
                        </Button>
                    </Row>
                </Col>
                <Col md={2.5} lg={3} style={{marginRight:25}}>
                    <div className="login-button">
                    {Auth.isLogin()? 
                        <Button type='primary' className="app-btn primary" onClick={gotoProfil}>
                            <UserOutlined style={{fontSize:20}}/> PROFIL
                        </Button>
                        :
                        <Button type='primary' className="app-btn primary" onClick={gotoLogin}>
                            <UserOutlined style={{fontSize:20}}/> LOGIN
                        </Button>
                    }
                    </div>
                </Col>
            </Row>
            <NavbarMenu
                buttonCancel={handleDrawerMenu}
                visible={visibleMenu}
                handleProfil={() => {handleDrawerMenu(); gotoProfil()}}
            />
        </Layout>
    );
}

export default withRouter(HeaderLayout);
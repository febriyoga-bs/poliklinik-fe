import React from 'react'
import { NavLink } from 'react-router-dom'
import { Drawer, Button, Row, Typography, Dropdown, message } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import Auth from '../../service/auth';

const {Text } = Typography;

const Menu = props => {

    const menuLayanan = (
        <Menu style={{marginTop:20, backgroundColor:"#EB3D00"}}>
            <Menu.Item >
                <NavLink to="/antrean-poliklinik">  
                    <Text className="title-navmenu" style={{fontWeight:"normal"}}>
                        Antrean Poliklinik
                    </Text>
                </NavLink>
            </Menu.Item>
            <Menu.Item >
                {/* <NavLink to="/konsultasi-online">  
                    <Text className="title-navmenu">
                        Konsultasi Online
                    </Text>
                </NavLink> */}
                <Text onClick={()=>message.info("Laman Konsultasi Online belum tersedia")} 
                    className="title-navmenu" style={{fontWeight:"normal"}}>
                    Konsultasi Online
                </Text>
            </Menu.Item>
        </Menu>
      );

    return(
        <Drawer
            destroyOnClose={true}
            visible={props.visible}
            title="Menu"
            placement="right"
            closable={true}
            footer={null}
            width="300px"
            onClose={props.buttonCancel}
            bodyStyle={{backgroundColor:"#EB3D00"}}
            headerStyle={{height: 85, backgroundColor:"#EB3D00", alignItems:"center"}}
        >
            <Row justify="center" style={{marginTop:10}}>
                {Auth.isLogin()? 
                    <Button type='primary' className="app-btn primary" onClick={props.handleDashboard}>
                        <UserOutlined style={{fontSize:20}}/> DASHBOARD
                    </Button>
                    :
                    <Button type='primary' className="app-btn primary" onClick={props.handleLogin}>
                        <UserOutlined style={{fontSize:20}}/> LOGIN
                    </Button>
                }
            </Row>
            <Row justify="center" style={{marginTop:10}}>
                <NavLink to="/" className="title-home-mobile" onClick={props.buttonCancel}>
                    BERANDA
                </NavLink>
            </Row>
            <Row justify="center" style={{marginTop:10}}>
                <NavLink to="/informasi" className="title-home-mobile" onClick={props.buttonCancel}>
                    INFORMASI
                </NavLink>
            </Row>

            <Row justify="center" style={{marginTop:10}}>
                <Dropdown overlay={menuLayanan} placement="bottomCenter">
                    <Text className="title-navmenu">
                        LAYANAN
                    </Text>
                </Dropdown>
            </Row>
               
        </Drawer>
    )
}

export default Menu
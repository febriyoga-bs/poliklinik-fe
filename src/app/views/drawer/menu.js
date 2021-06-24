import React from 'react'
import { NavLink } from 'react-router-dom'
import { Drawer, Button, Row } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import Auth from '../../service/auth';

const Menu = props => {

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
               
        </Drawer>
    )
}

export default Menu
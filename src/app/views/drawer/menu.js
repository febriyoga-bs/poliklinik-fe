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
            bodyStyle={{backgroundColor:"#7dbd07"}}
        >
            <Row justify="center" style={{marginTop:10}}>
                {Auth.isLogin()? 
                    <Button type='primary' className="app-btn primary" onClick={props.handleMyAccount}>
                        <UserOutlined style={{fontSize:20}}/> MY ACCOUNT
                    </Button>
                    :
                    <Button type='primary' className="app-btn primary" onClick={props.handleModalLogin}>
                        <UserOutlined style={{fontSize:20}}/> LOGIN
                    </Button>
                }
            </Row>
            <Row justify="center" style={{marginTop:10}}>
                <NavLink to="/" className="title-home-mobile" onClick={props.buttonCancel}>
                    HOME
                </NavLink>
            </Row>
            <Row justify="center" style={{marginTop:10}}>
                <NavLink to="/shop" className="title-navmenu-mobile" onClick={props.buttonCancel} activeStyle={{color: '#fff279'}}>
                    SHOP
                </NavLink>
            </Row>
            <Row justify="center" style={{marginTop:10}}>
                <NavLink to="/article" className="title-navmenu-mobile" onClick={props.buttonCancel} activeStyle={{color: '#fff279'}}>
                    ARTICLE
                </NavLink>
            </Row>
            <Row justify="center" style={{marginTop:10}}>
                <NavLink to="/track-order" className="title-navmenu-mobile" onClick={props.buttonCancel} activeStyle={{color: '#fff279'}}>
                    TRACK ORDER
                </NavLink>
            </Row>
            <Row justify="center" style={{marginTop:10}}>
                <NavLink to="/faq" className="title-navmenu-mobile" onClick={props.buttonCancel} activeStyle={{color: '#fff279'}}>
                    FAQ
                </NavLink>
            </Row>
            <Row justify="center" style={{marginTop:10}}>
                <NavLink to="/about-us" className="title-navmenu-mobile" onClick={props.buttonCancel} activeStyle={{color: '#fff279'}}>
                    ABOUT US
                </NavLink>
            </Row>
               
        </Drawer>
    )
}

export default Menu
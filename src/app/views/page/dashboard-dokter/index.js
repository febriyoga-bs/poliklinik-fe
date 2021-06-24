import React, { useState } from "react";
import { withRouter, useHistory, Route, Redirect, Switch } from 'react-router-dom';
import { Layout, Row, Col, Button, message, Menu} from 'antd';
import { PieChartOutlined, DesktopOutlined, ContainerOutlined,
         MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined} from '@ant-design/icons';
import ProfilDokter from "./profil-dokter";
import FormDataDokter from "../form_data_dokter";
import Auth from '../../../service/auth'


const DashboardDokter = () => {
    const history = useHistory();

    const gotoProfil = () => {
        const loc = '/dashboard-dokter';
        history.push(loc);
    }

    const gotoKelolaRekamMedis = () => {
        message.info("Laman Kelola Rekam Medis belum Tersedia");
        // const loc = '/dashboard-dokter/kelola-rekam-medis';
        // history.push(loc);
    }

    const gotoKonsultasiOnline = () => {
        message.info("Laman Konsultasi Online belum Tersedia");
        // const loc = '/dashboard-dokter/konsultasi-online';
        // history.push(loc);
    }

    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    function PrivateRouteDokter({ component: Component, path, ...rest }) {
        return (
          <Route
            path={path}
            render={({ location }) =>
              Auth.isLogin() && (JSON.parse(localStorage.getItem('role')) === 2) ? ( <Component {...rest} /> ) : 
              ( <Redirect to={{ pathname: "/", state: { from: location } }} /> )
            }
          />
        );
      }

    return(
        <Layout style={{backgroundColor: '#072A6F'}}>
            <Row>
                <Col >
                    <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={collapsed}
                        style={{height:"100%", paddingTop: 85}}
                    >
                        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 5 }}>
                            {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        </Button>
                        <Menu.Item key="1" onClick={gotoProfil} icon={<PieChartOutlined />}>
                            Profil Staf
                        </Menu.Item>
                        <Menu.Item key="2" onClick={gotoKelolaRekamMedis} icon={<ContainerOutlined />}>
                            Kelola Rekam Medis
                        </Menu.Item>
                        <Menu.Item key="3" onClick={gotoKonsultasiOnline} icon={<DesktopOutlined />}>
                            Konsultasi Online
                        </Menu.Item>
                        <Menu.Item key="4" onClick={Auth.logout} icon={<PoweroffOutlined />}
                            style={{color:"#FF0000"}}
                        >
                            Logout
                        </Menu.Item>
                    </Menu>
                </Col>

                <Col xs={collapsed ? 23 : 20} 
                    sm={collapsed ? 23 : 20} 
                    md={collapsed ? 23 : 20} 
                    lg={collapsed ? 23 : 20} 
                    xl={collapsed ? 23 : 20} 
                    xxl={collapsed ? 23 : 20}
                >
                    <Row justify="center" style={{marginTop: 20}}>
                        <Switch>
                            <PrivateRouteDokter exact path="/dashboard-dokter" component={ProfilDokter} />
                            <PrivateRouteDokter exact path="/dashboard-dokter/edit-profil" component={FormDataDokter} />
                        </Switch>
                    </Row>
                </Col>
            </Row>
        </Layout>
    );
}

export default withRouter(DashboardDokter)
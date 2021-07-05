import React, { useState } from "react";
import { withRouter, useHistory, Route, Redirect, Switch } from 'react-router-dom';
import { Layout, Row, Col, Button, Menu, message} from 'antd';
import { PieChartOutlined,  ContainerOutlined,
    MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined} from '@ant-design/icons';
import Auth from '../../../service/auth'
import ProfilPasien from "./profil-pasien";
import FormDataPasien from "../form_data_pasien";
//import Dummy from '../../../dummy/dummy'

const DashboardPasien = () => {
    const history = useHistory();

    const gotoProfil = () => {
        const loc = '/dashboard-pasien';
        history.push(loc);
    }

    const gotoRiwayatPelayanan = () => {
        message.info("Laman Riwayat Pelayanan belum Tersedia");
        // const loc = '/dashboard-pasien/riwayat-pelayanan';
        // history.push(loc);
    }

    const [collapsed, setCollapsed] = useState(false);
    const [padding, setPadding] = useState(260)
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
        if(collapsed){
            setPadding(260)
        } else {
            setPadding(50)
        }
    };

    function PrivateRoute({ component: Component, path, ...rest }) {
        return (
          <Route
            path={path}
            render={({ location }) =>
              Auth.isLogin() ? ( <Component {...rest} /> ) : 
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
                        style={{maxWidth:250, height:"100%", paddingTop: 85, position:"fixed", zIndex:1}}
                    >
                        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 5 }}>
                            {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        </Button>
                        <Menu.Item key="1" onClick={gotoProfil} icon={<PieChartOutlined />}>
                            Profil Pasien
                        </Menu.Item>
                        <Menu.Item key="2" onClick={gotoRiwayatPelayanan} icon={<ContainerOutlined />}>
                            Riwayat Pelayanan
                        </Menu.Item>
                        <Menu.Item key="3" onClick={Auth.logout} icon={<PoweroffOutlined />}
                            style={{color:"#FF0000"}}
                        >
                            Logout
                        </Menu.Item>
                    </Menu>
                </Col>

                <Col span={24} style={{paddingLeft:padding, marginTop:20}}>
                    <Row justify="center">
                        <Switch>
                            <PrivateRoute exact path="/dashboard-pasien" component={ProfilPasien} />
                            <PrivateRoute exact path="/dashboard-pasien/edit-profil" component={FormDataPasien} />
                            <PrivateRoute exact path="/dashboard-pasien/lengkapi-data-diri" component={FormDataPasien} />
                           </Switch>
                    </Row>
                </Col>
            </Row>
        </Layout>
    );
}

export default withRouter(DashboardPasien)
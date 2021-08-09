import React, { useState } from "react";
import { withRouter, useHistory, Route, Redirect, Switch } from 'react-router-dom';
import { Layout, Row, Col, Button, message, Menu} from 'antd';
import { UserOutlined, DesktopOutlined, ContainerOutlined,
         MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined} from '@ant-design/icons';
import ProfilDokter from "./profil-dokter";
import FormDataDokter from "../form_data_dokter";
import KelolaRekamMedis from "../kelola_rekam_medis";
import KelolaDataKunjungan from "../kelola_data_kunjungan";
import FormDataKunjungan from "../form_data_kunjungan";
import RekamMedis from "../rekam_medis";
import Auth from '../../../service/auth'

const {SubMenu} = Menu

const DashboardDokter = () => {
    const history = useHistory();

    const gotoProfil = () => {
        const loc = '/dashboard-dokter';
        history.push(loc);
    }

    const gotoKelolaRekamMedis = (data) => {
        let loc = '/dashboard-dokter/kelola-rekam-medis/umum';
        let _data = ""
        if(data===1){
            _data = {poli: 1}
        }else if(data ===2){
            loc = '/dashboard-dokter/kelola-rekam-medis/gigi';
            _data = {poli: 2}
        }
        history.push({pathname:loc, state:_data});
    }

    const gotoKonsultasiOnline = () => {
        message.info("Laman Konsultasi Online belum Tersedia");
        // const loc = '/dashboard-dokter/konsultasi-online';
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
                        style={{maxWidth:250, height:"100%", paddingTop: 85, position:"fixed", zIndex:1}}
                    >
                        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 5 }}>
                            {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        </Button>
                        <Menu.Item key="/dashboard-dokter" onClick={gotoProfil} icon={<UserOutlined />}>
                            Profil Dokter
                        </Menu.Item>
                        <SubMenu key="/dashboard-dokter/kelola-rekam-medis" icon={<ContainerOutlined />} title="Kelola Rekam Medis">
                            <Menu.Item key="/dashboard-dokter/kelola-rekam-medis/umum" 
                                onClick={() => gotoKelolaRekamMedis(1)}>Rekam Medis Umum</Menu.Item>
                            <Menu.Item key="/dashboard-dokter/kelola-rekam-medis/gigi" 
                                onClick={() => gotoKelolaRekamMedis(2)}>Rekam Medis Gigi</Menu.Item>
                        </SubMenu>
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

                <Col span={24} style={{paddingLeft:padding}}>
                    <Row justify="center" style={{marginTop: 20}}>
                        <Switch>
                            <PrivateRouteDokter exact path="/dashboard-dokter" component={ProfilDokter} />
                            <PrivateRouteDokter exact path="/dashboard-dokter/edit-profil" component={FormDataDokter} />
                            <PrivateRouteDokter exact path="/dashboard-dokter/kelola-rekam-medis/umum" component={KelolaRekamMedis} />
                            <PrivateRouteDokter exact path="/dashboard-dokter/kelola-rekam-medis/gigi" component={KelolaRekamMedis} />
                            <PrivateRouteDokter exact path="/dashboard-dokter/kelola-rekam-medis/:poli/data-kunjungan/:id_pasien" component={KelolaDataKunjungan} />
                            <PrivateRouteDokter exact path="/dashboard-dokter/kelola-rekam-medis/:poli/data-kunjungan/:id_pasien/catat-kunjungan" component={FormDataKunjungan} />
                            <PrivateRouteDokter exact path="/dashboard-dokter/kelola-rekam-medis/:poli/data-kunjungan/:id_pasien/detail" component={RekamMedis} />
                        </Switch>
                    </Row>
                </Col>
            </Row>
        </Layout>
    );
}

export default withRouter(DashboardDokter)
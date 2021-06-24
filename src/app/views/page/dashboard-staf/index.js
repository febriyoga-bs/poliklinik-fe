import React, { useState, useEffect } from "react";
import { withRouter, useHistory, Route, Redirect, BrowserRouter, Switch } from 'react-router-dom';
import { Layout, Row, Col, Button, message, Menu} from 'antd';
import { PieChartOutlined, DesktopOutlined, ContainerOutlined,
         MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined} from '@ant-design/icons';
import InformasiStaf from "./informasi-staf";
import KelolaInformasi from "../kelola_informasi";
import KelolaPasien from "../kelola_data_pasien";
import KelolaDokter from "../kelola_data_dokter";
import KelolaStaf from "../kelola_data_staf";
import FormProfilPoliklinik from "../form_profil_poliklinik";
import FormDataJadwal from "../form_data_jadwal";
import FormDataPelayanan from "../form_data_pelayanan";
import FormDataPasien from "../form_data_pasien";
import FormDataDokter from "../form_data_dokter";
import FormDataStaf from "../form_data_staf";
import Auth from '../../../service/auth'

const {SubMenu} = Menu;

const DashboardStaf = () => {
    const history = useHistory();

    const gotoProfil = () => {
        const loc = '/dashboard-staf';
        history.push(loc);
    }

    const gotoKelolaInformasi = () => {
        const loc = '/dashboard-staf/kelola-informasi';
        history.push(loc);
    }

    const gotoKelolaDataPengguna = (user) => {
        let loc = "";
        if(user===1){
            loc = '/dashboard-staf/kelola-data-pengguna/staf';
        } else if(user===2){
            loc = '/dashboard-staf/kelola-data-pengguna/dokter';
        } else if(user===3){
            loc = '/dashboard-staf/kelola-data-pengguna/pasien';
        }
        
        history.push(loc);
    }

    const gotoRiwayatKunjungan = () => {
        message.info("Laman Riwayat Kunjungan Belum Tersedia");
        // const loc = '/riwayat-kunjungan';
        // history.push(loc);
    }

    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    function PrivateRouteAdmin({ component: Component, path, ...rest }) {
        return (
          <Route
            path={path}
            render={({ location }) =>
              Auth.isLogin() && (JSON.parse(localStorage.getItem('role')) === 1) ? ( <Component {...rest} /> ) : 
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
                        style={{minHeight:"100vh", marginTop: 85}}
                    >
                        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 5 }}>
                            {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        </Button>
                        <Menu.Item key="1" onClick={gotoProfil} icon={<PieChartOutlined />}>
                            Profil Staf
                        </Menu.Item>
                        <Menu.Item key="2" onClick={gotoKelolaInformasi} icon={<ContainerOutlined />}>
                            Kelola Informasi
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<ContainerOutlined />} title="Kelola Data Pengguna">
                            <Menu.Item key="3" onClick={() => gotoKelolaDataPengguna(3)}>Data Pasien</Menu.Item>
                            <Menu.Item key="4" onClick={() => gotoKelolaDataPengguna(2)}>Data Dokter</Menu.Item>
                            <Menu.Item key="5" onClick={() => gotoKelolaDataPengguna(1)}>Data Staf</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="6" onClick={gotoRiwayatKunjungan} icon={<DesktopOutlined />}>
                            Riwayat Pelayanan Pasien
                        </Menu.Item>
                        <Menu.Item key="7" onClick={Auth.logout} icon={<PoweroffOutlined />}
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
                    <Row justify="center">
                        <Switch>
                            <PrivateRouteAdmin exact path="/dashboard-staf" component={InformasiStaf} />
                            <PrivateRouteAdmin exact path="/dashboard-staf/edit-profil" component={FormDataStaf} />
                            <PrivateRouteAdmin exact path="/dashboard-staf/kelola-data-pengguna/pasien" component={KelolaPasien} />
                            <PrivateRouteAdmin exact path="/dashboard-staf/kelola-data-pengguna/pasien/:aksi" component={FormDataPasien} />
                            <PrivateRouteAdmin exact path="/dashboard-staf/kelola-data-pengguna/dokter" component={KelolaDokter} />
                            <PrivateRouteAdmin exact path="/dashboard-staf/kelola-data-pengguna/dokter/:aksi" component={FormDataDokter} />
                            <PrivateRouteAdmin exact path="/dashboard-staf/kelola-data-pengguna/staf" component={KelolaStaf} />
                            <PrivateRouteAdmin exact path="/dashboard-staf/kelola-data-pengguna/staf/:aksi" component={FormDataStaf} />
                            <PrivateRouteAdmin exact path="/dashboard-staf/kelola-informasi" component={KelolaInformasi} />
                            <PrivateRouteAdmin exact path="/dashboard-staf/kelola-informasi/profil-poliklinik" component={FormProfilPoliklinik} />
                            <PrivateRouteAdmin exact path="/dashboard-staf/kelola-informasi/jadwal" component={FormDataJadwal} />
                            <PrivateRouteAdmin exact path="/dashboard-staf/kelola-informasi/pelayanan/:aksi" component={FormDataPelayanan} />
                        </Switch>
                    </Row>
                </Col>
            </Row>
        </Layout>
    );
}

export default withRouter(DashboardStaf)
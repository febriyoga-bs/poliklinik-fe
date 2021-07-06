import React, { useState } from "react";
import { withRouter, useHistory, Route, Redirect, Switch } from 'react-router-dom';
import { Layout, Row, Col, Button, message, Menu} from 'antd';
import { UserOutlined, DesktopOutlined, ContainerOutlined,
         MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined} from '@ant-design/icons';
import ProfilStaf from "./profil-staf";
import RiwayatKunjungan from "../riwayat_kunjungan";
import KelolaDataKunjungan from "../kelola_data_kunjungan";
import KelolaRekamMedis from "../kelola_rekam_medis";
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
import FormDataKunjungan from "../form_data_kunjungan";
import Auth from '../../../service/auth'

const {SubMenu} = Menu;

const DashboardStaf = (props) => {
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

    const gotoKelolaRekamMedis = () => {
        const loc = '/dashboard-staf/kelola-rekam-medis';
        history.push(loc);
    }

    const gotoRiwayatKunjungan = () => {
        const loc = '/dashboard-staf/riwayat-kunjungan';
        history.push(loc);
    }

    const [collapsed, setCollapsed] = useState(false);
    const [collumnProp, setCollumnProp] = useState({span: 20, offset: 4});
    const [padding, setPadding] = useState(260)
    const [width, setWidth] = useState(250)
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
        if(collapsed){
            setWidth(250)
            setPadding(260)
            setCollumnProp({span: 20, offset: 4})
        } else {
            setWidth(45)
            setPadding(50)
            setCollumnProp({span: 23, offset: 1})
        }
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
        <Layout style={{backgroundColor: '#1261A0'}}>
            <Row >
                <Col span={collumnProp.offset}>
                    <Menu
                        defaultSelectedKeys={props.location.pathname}
                        selectedKey={props.location.pathname}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={collapsed}
                        style={{minWidth:width, maxWidth:width, height:"100%", paddingTop: 85, position:"fixed", zIndex:1}}
                    >
                        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 5 }}>
                            {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        </Button>
                        <Menu.Item key="/dashboard-staf" onClick={gotoProfil} icon={<UserOutlined />}>
                            Profil Staf
                        </Menu.Item>
                        <Menu.Item key="/dashboard-staf/kelola-informasi" onClick={gotoKelolaInformasi} icon={<ContainerOutlined />}>
                            Kelola Informasi
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<ContainerOutlined />} title="Kelola Data Pengguna">
                            <Menu.Item key="/dashboard-staf/kelola-data-pengguna/pasien" 
                                onClick={() => gotoKelolaDataPengguna(3)}>Data Pasien</Menu.Item>
                            <Menu.Item key="/dashboard-staf/kelola-data-pengguna/dokter" 
                                onClick={() => gotoKelolaDataPengguna(2)}>Data Dokter</Menu.Item>
                            <Menu.Item key="/dashboard-staf/kelola-data-pengguna/staf" 
                                onClick={() => gotoKelolaDataPengguna(1)}>Data Staf</Menu.Item>
                        </SubMenu>
                        {/* <Menu.Item key="/dashboard-staf/kelola-rekam-medis" onClick={gotoKelolaRekamMedis} icon={<ContainerOutlined />}>
                            Kelola Rekam Medis
                        </Menu.Item> */}
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

                <Col span={24} style={{paddingLeft:padding}}
                // offset={collumnProp.offset} span={collumnProp.span} 
                >
                    <Row style={{marginTop: 20}}>
                        <Switch>
                            <PrivateRouteAdmin exact path="/dashboard-staf" component={ProfilStaf} />
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
                            <PrivateRouteAdmin exact path="/dashboard-staf/kelola-rekam-medis" component={KelolaRekamMedis} />
                            <PrivateRouteAdmin exact path="/dashboard-staf/kelola-rekam-medis/:id_pasien" component={KelolaDataKunjungan} />
                            <PrivateRouteAdmin exact path="/dashboard-staf/riwayat-kunjungan" component={RiwayatKunjungan} />
                        </Switch>
                    </Row>
                </Col>
            </Row>
        </Layout>
    );
}

export default withRouter(DashboardStaf)
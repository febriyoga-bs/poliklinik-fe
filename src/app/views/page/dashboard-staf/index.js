import React, { useState, useEffect } from "react";
import { withRouter, useHistory, Route, Redirect, Switch } from 'react-router-dom';
import { Layout, Row, Col, Button, Menu} from 'antd';
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
import RekamMedis from "../rekam_medis";
import Auth from '../../../service/auth'

const {SubMenu} = Menu;

const DashboardStaf = (props) => {
    const history = useHistory();
    const [path, setPath] = useState("");
    const [role, setRole] = useState(4);

    useEffect(()=>{
        let _role = JSON.parse(localStorage.getItem('role'));
        let login_time = JSON.parse(localStorage.getItem('login'));
        setRole(_role/login_time)

        console.log(_role/login_time)
        if(_role/login_time === 1){
            setPath("/dashboard-admin");
        } else if(_role/login_time === 4){
            setPath("/dashboard-staf-umum");
        } else {
            setPath("/dashboard-perawat")
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const gotoProfil = () => {
        const loc = path;
        history.push(loc);
    }

    const gotoKelolaInformasi = () => {
        const loc = `${path}/kelola-informasi`; 
        history.push(loc);
    }

    const gotoKelolaDataPengguna = (user) => {
        let loc = "";
        if(user===1){
            loc = `${path}/kelola-data-pengguna/staf`;
        } else if(user===2){
            loc = `${path}/kelola-data-pengguna/dokter`;
        } else if(user===3){
            loc = `${path}/kelola-data-pengguna/pasien`;
        }
        
        history.push(loc);
    }

    const gotoKelolaRekamMedis = () => {
        const loc = `${path}/kelola-rekam-medis`;
        history.push(loc);
    }

    const gotoRiwayatKunjungan = () => {
        const loc = `${path}/riwayat-kunjungan`;
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

    function PrivateRouteStafUmum({ component: Component, path, ...rest }) {
        let role = JSON.parse(localStorage.getItem('role'));
        let login_time = JSON.parse(localStorage.getItem('login'));
        return (
          <Route
            path={path}
            render={({ location }) =>
              Auth.isLogin() && (role/login_time === 4) ? ( <Component {...rest} /> ) : 
              ( <Redirect to={{ pathname: "/", state: { from: location } }} /> )
            }
          />
        );
      }
    
    function PrivateRouteAdmin({ component: Component, path, ...rest }) {
        let role = JSON.parse(localStorage.getItem('role'));
        let login_time = JSON.parse(localStorage.getItem('login'));
        return (
          <Route
            path={path}
            render={({ location }) =>
              Auth.isLogin() && (role/login_time === 1) ? ( <Component {...rest} /> ) : 
              ( <Redirect to={{ pathname: "/", state: { from: location } }} /> )
            }
          />
        );
      }
    
    function PrivateRoutePerawat({ component: Component, path, ...rest }) {
        let role = JSON.parse(localStorage.getItem('role'));
        let login_time = JSON.parse(localStorage.getItem('login'));
        return (
          <Route
            path={path}
            render={({ location }) =>
              Auth.isLogin() && (role/login_time === 5) ? ( <Component {...rest} /> ) : 
              ( <Redirect to={{ pathname: "/", state: { from: location } }} /> )
            }
          />
        );
      }

    return(
        <Layout style={{backgroundColor: '#072A6F'}}>
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
                        <Menu.Item key={`${path}`} onClick={gotoProfil} icon={<UserOutlined />}>
                            Profil Staf
                        </Menu.Item>
                        {role === 1 &&
                            <>
                            <Menu.Item key={`${path}/kelola-informasi`}  onClick={gotoKelolaInformasi} icon={<ContainerOutlined />}>
                                Kelola Informasi
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<ContainerOutlined />} title="Kelola Data Pengguna">
                                <Menu.Item key={`${path}/kelola-data-pengguna/pasien`} 
                                    onClick={() => gotoKelolaDataPengguna(3)}>Data Pasien</Menu.Item>
                                <Menu.Item key={`${path}/kelola-data-pengguna/dokter`} 
                                    onClick={() => gotoKelolaDataPengguna(2)}>Data Dokter</Menu.Item>
                                <Menu.Item key={`${path}/kelola-data-pengguna/staf`} 
                                    onClick={() => gotoKelolaDataPengguna(1)}>Data Staf</Menu.Item>
                            </SubMenu>
                            </>
                        }
                        {role === 5 &&
                            <>
                            <SubMenu key={`${path}/kelola-rekam-medis`} icon={<ContainerOutlined />} title="Kelola Rekam Medis">
                                <Menu.Item key={`${path}/kelola-rekam-medis/umum`} 
                                    onClick={() => gotoKelolaRekamMedis(1)}>Rekam Medis Umum</Menu.Item>
                                <Menu.Item key={`${path}/dashboard-dokter/kelola-rekam-medis/gigi`} 
                                    onClick={() => gotoKelolaRekamMedis(2)}>Rekam Medis Gigi</Menu.Item>
                            </SubMenu>
                            </>
                        }
                        <Menu.Item key={`${path}/riwayat-kunjungan`} onClick={gotoRiwayatKunjungan} icon={<DesktopOutlined />}>
                            Riwayat Kunjungan Pasien
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
                            <PrivateRouteAdmin exact path="/dashboard-admin" component={ProfilStaf} />
                            <PrivateRouteAdmin exact path="/dashboard-admin/edit-profil" component={FormDataStaf} />
                            <PrivateRouteAdmin exact path="/dashboard-admin/kelola-data-pengguna/pasien" component={KelolaPasien} />
                            <PrivateRouteAdmin exact path="/dashboard-admin/kelola-data-pengguna/pasien/:aksi" component={FormDataPasien} />
                            <PrivateRouteAdmin exact path="/dashboard-admin/kelola-data-pengguna/dokter" component={KelolaDokter} />
                            <PrivateRouteAdmin exact path="/dashboard-admin/kelola-data-pengguna/dokter/:aksi" component={FormDataDokter} />
                            <PrivateRouteAdmin exact path="/dashboard-admin/kelola-data-pengguna/staf" component={KelolaStaf} />
                            <PrivateRouteAdmin exact path="/dashboard-admin/kelola-data-pengguna/staf/:aksi" component={FormDataStaf} />
                            <PrivateRouteAdmin exact path="/dashboard-admin/kelola-informasi" component={KelolaInformasi} />
                            <PrivateRouteAdmin exact path="/dashboard-admin/kelola-informasi/profil-poliklinik" component={FormProfilPoliklinik} />
                            <PrivateRouteAdmin exact path="/dashboard-admin/kelola-informasi/jadwal" component={FormDataJadwal} />
                            <PrivateRouteAdmin exact path="/dashboard-admin/kelola-informasi/pelayanan/:aksi" component={FormDataPelayanan} />
                            <PrivateRouteAdmin exact path="/dashboard-admin/riwayat-kunjungan" component={RiwayatKunjungan} />
                        
                            <PrivateRouteStafUmum exact path="/dashboard-staf-umum" component={ProfilStaf} />
                            <PrivateRouteStafUmum exact path="/dashboard-staf-umum/edit-profil" component={FormDataStaf} />
                            <PrivateRouteStafUmum exact path="/dashboard-staf-umum/riwayat-kunjungan" component={RiwayatKunjungan} />

                            <PrivateRoutePerawat exact path="/dashboard-perawat" component={ProfilStaf} />
                            <PrivateRoutePerawat exact path="/dashboard-perawat/edit-profil" component={FormDataStaf} />
                            <PrivateRoutePerawat exact path="/dashboard-perawat/kelola-rekam-medis/umum" component={KelolaRekamMedis} />
                            <PrivateRoutePerawat exact path="/dashboard-perawat/kelola-rekam-medis/gigi" component={KelolaRekamMedis} />
                            <PrivateRoutePerawat exact path="/dashboard-perawat/kelola-rekam-medis/:poli/data-kunjungan/:id_pasien" component={KelolaDataKunjungan} />
                            <PrivateRoutePerawat exact path="/dashboard-perawat/kelola-rekam-medis/:poli/data-kunjungan/:id_pasien/catat-kunjungan" component={FormDataKunjungan} />
                            <PrivateRoutePerawat exact path="/dashboard-perawat/kelola-rekam-medis/:poli/data-kunjungan/:id_pasien/detail" component={RekamMedis} />
                            <PrivateRoutePerawat exact path="/dashboard-perawat/riwayat-kunjungan" component={RiwayatKunjungan} />
                        </Switch>
                    </Row>
                </Col>
            </Row>
        </Layout>
    );
}

export default withRouter(DashboardStaf)
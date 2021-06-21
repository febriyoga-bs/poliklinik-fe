import React, { useEffect } from "react";
import { Route, Redirect, BrowserRouter, Switch } from "react-router-dom";
import ScrollToTop from "./app/component/scroll-to-top"
import './App.css';
import { Layout } from "antd";
import Auth from "./app/service/auth";
import HeaderLayout from './app/layouts/header';
import FooterLayout from './app/layouts/footer';
import LandingPage from "./app/views/page/landing_page";
import LoginUser from "./app/views/page/user_login";
import Register from "./app/views/page/registrasi_pasien";
import Antrian from "./app/views/page/layanan_antrian";
import Konsultasi from "./app/views/page/layanan_konsultasi";
import Informasi from "./app/views/page/informasi";
import ProfilDokter from "./app/views/page/dashboard-dokter/profil_dokter";
import ProfilStaf from "./app/views/page/dashboard-staf/profil_staf";
import ProfilPasien from "./app/views/page/dashboard-pasien/profil_pasien";
import KelolaInformasi from "./app/views/page/kelola_informasi";
import KelolaPasien from "./app/views/page/kelola_data_pasien";
import KelolaDokter from "./app/views/page/kelola_data_dokter";
import KelolaStaf from "./app/views/page/kelola_data_staf";
import FormDataPasien from "./app/views/page/form_data_pasien";
import FormDataDokter from "./app/views/page/form_data_dokter";
import FormDataStaf from "./app/views/page/form_data_staf";
import FormProfilPoliklinik from "./app/views/page/form_profil_poliklinik";
import FormDataJadwal from "./app/views/page/form_data_jadwal";
import FormDataPelayanan from "./app/views/page/form_data_pelayanan";

import Template from "./app/views/page/template";

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

  function Routes() {

    useEffect(() => {
      document.body.scrollTop = 0;
    }, []);
  
    return (
      <Layout>
        <BrowserRouter>
          <ScrollToTop />
          <React.Fragment>
            <HeaderLayout/>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={LoginUser} />
            <Route exact path="/registrasi" component={Register} />
            <Route exact path="/antrian-poliklinik" component={Antrian} />
            <Route exact path="/konsultasi-online" component={Konsultasi} />
            <Route exact path="/informasi" component={Informasi} />
            <Route exact path="/bantuan" component={Template} />
            <PrivateRoute exact path="/profil-pasien" component={RouteProfil} />
            <PrivateRouteDokter exact path="/profil-dokter" component={RouteProfil} />
            <PrivateRouteAdmin exact path="/profil-staf" component={RouteProfil} />
            <PrivateRouteAdmin exact path="/kelola-informasi" component={RouteKelola} />
            <PrivateRouteAdmin exact path="/kelola-data-pengguna" component={RouteKelola} />
            <Route exact path="!!" component={Template} />
            <FooterLayout/>
          </React.Fragment>
        </BrowserRouter>
      </Layout>
    )
  }
  
  export default Routes;

  function RouteKelola () {
    return(
      <Switch>
        <PrivateRoute exact path="/profil-pasien/data-diri" component={FormDataPasien} />
        <PrivateRouteAdmin exact path="/kelola-data-pengguna/pasien" component={KelolaPasien} />
        <PrivateRouteAdmin exact path="/kelola-data-pengguna/pasien/:aksi" component={FormDataPasien} />
        <PrivateRouteAdmin exact path="/kelola-data-pengguna/dokter" component={KelolaDokter} />
        <PrivateRouteAdmin exact path="/kelola-data-pengguna/dokter/:aksi" component={FormDataDokter} />
        <PrivateRouteAdmin exact path="/kelola-data-pengguna/staf" component={KelolaStaf} />
        <PrivateRouteAdmin exact path="/kelola-data-pengguna/staf/:aksi" component={FormDataStaf} />
        <PrivateRouteAdmin exact path="/kelola-informasi" component={KelolaInformasi} />
        <PrivateRouteAdmin exact path="/kelola-informasi/profil-poliklinik" component={FormProfilPoliklinik} />
        <PrivateRouteAdmin exact path="/kelola-informasi/jadwal" component={FormDataJadwal} />
        <PrivateRouteAdmin exact path="/kelola-informasi/pelayanan/:aksi" component={FormDataPelayanan} />
      </Switch>
    )
  }

  function RouteProfil () {
    return(
      <Switch>
        <PrivateRoute exact path="/profil-pasien" component={ProfilPasien} />
        <PrivateRoute exact path="/profil-pasien/data-diri" component={FormDataPasien} />
        <PrivateRoute exact path="/profil-pasien/edit-profil" component={FormDataPasien} />
        <PrivateRouteDokter exact path="/profil-dokter" component={ProfilDokter} />
        <PrivateRouteDokter exact path="/profil-dokter/edit-profil" component={FormDataDokter} />
        <PrivateRouteAdmin exact path="/profil-staf" component={ProfilStaf} />
        <PrivateRouteAdmin exact path="/profil-staf/edit-profil" component={FormDataStaf} />
      </Switch>
    )
  }
import React, { useEffect } from "react";
import { Route, Redirect, HashRouter } from "react-router-dom";
import './App.css';
import { Layout } from "antd";
import Auth from "./app/service/auth";
import HeaderLayout from './app/layouts/header';
import FooterLayout from './app/layouts/footer';
import LandingPage from "./app/views/page/landing_page";
import LoginUser from "./app/views/page/user_login";
import Register from "./app/views/page/pasien_register";
import Informasi from "./app/views/page/informasi";
import ProfilDokter from "./app/views/page/profil_dokter";
import ProfilStaf from "./app/views/page/profil_staf";
import ProfilPasien from "./app/views/page/profil_pasien";
import KelolaInformasi from "./app/views/page/kelola_informasi";
import KelolaPasien from "./app/views/page/kelola_data_pasien";
import KelolaPetugas from "./app/views/page/kelola_data_dokterstaf";
import FormDataPasien from "./app/views/page/form_data_pasien";
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
          Auth.isLogin() && (JSON.parse(localStorage.getItem('role')) === "123") ? ( <Component {...rest} /> ) : 
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
          Auth.isLogin() && (JSON.parse(localStorage.getItem('role')) === "234") ? ( <Component {...rest} /> ) : 
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
        <HashRouter>
          <React.Fragment>
            <HeaderLayout/>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={LoginUser} />
            <Route exact path="/registrasi" component={Register} />
            <Route exact path="/layanan" component={Template} />
            <Route exact path="/informasi" component={Informasi} />
            <Route exact path="/bantuan" component={Template} />
            <PrivateRoute exact path="/profil-pasien" component={ProfilPasien} />
            <PrivateRouteAdmin exact path="/profil-staf" component={ProfilStaf} />
            <PrivateRouteAdmin exact path="/kelola-informasi" component={KelolaInformasi} />
            <PrivateRouteAdmin exact path="/kelola-informasi/data-pasien" component={FormDataPasien} />
            <PrivateRouteAdmin exact path="/kelola-informasi/data-pelayanan" component={FormDataPelayanan} />
            <PrivateRouteAdmin exact path="/kelola-data-pasien" component={KelolaPasien} />
            <PrivateRouteAdmin exact path="/kelola-data-petugas" component={KelolaPetugas} />
            <PrivateRouteDokter exact path="/profil-dokter" component={ProfilDokter} />
            <FooterLayout/>
          </React.Fragment>
        </HashRouter>
      </Layout>
    )
  }
  
  export default Routes;
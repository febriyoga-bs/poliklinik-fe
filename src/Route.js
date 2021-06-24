import React, { useEffect } from "react";
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import ScrollToTop from "./app/component/scroll-to-top"
import './App.css';
import { Layout } from "antd";
import Auth from "./app/service/auth";
import HeaderLayout from './app/layouts/header';
import FooterLayout from './app/layouts/footer';
import LandingPage from "./app/views/page/landing_page";
import LoginUser from "./app/views/page/user_login";
import Register from "./app/views/page/registrasi_pasien";
import Antrean from "./app/views/page/layanan_antrean";
import Konsultasi from "./app/views/page/layanan_konsultasi";
import Informasi from "./app/views/page/informasi";
import DashboardPasien from "./app/views/page/dashboard-pasien";
import DashboardDokter from "./app/views/page/dashboard-dokter";
import DashboardStaf from "./app/views/page/dashboard-staf";

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
            <Route exact path="/antrean-poliklinik" component={Antrean} />
            <Route exact path="/konsultasi-online" component={Konsultasi} />
            <Route exact path="/informasi" component={Informasi} />
            <Route exact path="/bantuan" component={Template} />
            <PrivateRoute exact path="/dashboard-pasien" component={DashboardPasien} />
            <PrivateRouteDokter exact path="/dashboard-dokter" component={DashboardDokter} />
            <PrivateRouteAdmin exact path="/dashboard-staf" component={DashboardStaf} />
            <Route exact path="!!" component={Template} />
            <FooterLayout/>
          </React.Fragment>
        </BrowserRouter>
      </Layout>
    )
  }
  
  export default Routes;
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
import UbahDataPasien from "./app/views/page/ubah_data_pasien";
import UbahDataLayanan from "./app/views/page/ubah_data_layanan";


import Template from "./app/views/page/template";
// import ManageArticle from "./app/views/page/managearticle";
// import ManageProduct from "./app/views/page/manageproduct";
// import ManageOrder from "./app/views/page/manageorder";

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
          Auth.isLogin() && (JSON.parse(localStorage.getItem('role')) === "2140483647") ? ( <Component {...rest} /> ) : 
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
            <Route exact path="/ubah-data-pasien" component={UbahDataPasien} />
            <Route exact path="/ubah-data-layanan" component={UbahDataLayanan} />
            {/* <PrivateRoute exact path="/my-account" component={MyAccount} />
            <PrivateRouteAdmin exact path="/manage-article" component={ManageArticle} />
            <PrivateRouteAdmin exact path="/manage-product" component={ManageProduct} />
            <PrivateRouteAdmin exact path="/manage-order" component={ManageOrder} />
             */}
            <FooterLayout/>
          </React.Fragment>
        </HashRouter>
      </Layout>
    )
  }
  
  export default Routes;
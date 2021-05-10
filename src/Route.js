import React, { useEffect } from "react";
import { Route, Redirect, HashRouter } from "react-router-dom";
import './App.css';
import { Layout } from "antd";
import Auth from "./app/service/auth";
import HeaderLayout from './app/layouts/header';
import FooterLayout from './app/layouts/footer';
import LandingPage from "./app/views/page/landing_page";
import LoginUser from "./app/views/page/user_login";
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
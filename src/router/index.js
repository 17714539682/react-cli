import React from 'react';
import { Switch, Route,Redirect } from 'react-router-dom'
import asyncComponent from "./Async";
const layout = asyncComponent(() => import('../views/layout/index.jsx'));
const login = asyncComponent(() => import('../views/login/login.jsx'));

const MainRoute = () => (
  <Switch>
    <Route path='/' exact render={()=> (
      <Redirect to="index"/>
    )}/>
    <Route path='/index' component={layout} />
    <Route path='/login' component={login} />
    {/* 所有错误路由跳转页面 */}
    {/* <Route render={()=> (404)} /> */}
    <Route render={()=> (
        <Redirect to="index"/>
    )}/>
  </Switch>
)
 
export default MainRoute;
import React from 'react';
import { Switch, Route,Redirect } from 'react-router-dom'
import asyncComponent from "./Async";
const layout = asyncComponent(() => import('../views/layout'));

const MainRoute = () => (
  <Switch>
    <Route path='/' exact render={()=> (
               <Redirect to="index"/>
    )}/>
    <Route path='/index' component={layout} />
    {/* 所有错误路由跳转页面 */}
    <Route render={()=> (404)} />
  </Switch>
)
 
export default MainRoute;
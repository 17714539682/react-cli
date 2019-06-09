import React from 'react';
import { Switch, Route,
  Redirect 
} from 'react-router-dom'
import asyncComponent from "./Async";
import form from '../views/form'
const Home = asyncComponent(() => import('../views/home'));
const Doc = asyncComponent(() => import('../views/doc'));
const layout = asyncComponent(() => import('../views/layout'));
// const form = asyncComponent(() => import('../views/form'));

 
const MainRoute = () => (
  <Switch>
    <Route exact path="/home" component={Home}/>
    <Route path='/' exact render={()=> (
               <Redirect to="index"/>
           )}/>
    <Route path="/doc/:id" component={Doc} />
    <Route path="/form" component={form} />

    <Route path='/index' component={layout} />
    {/* // 所有错误路由跳转页面 */}
】  <Route component={Doc} />
  </Switch>
)
 
export default MainRoute;
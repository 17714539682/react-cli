import React from 'react';
import { Switch, Route} from 'react-router-dom'
import asyncComponent from "@/router/Async";

const Home = asyncComponent(() => import('@/views/home'));
const Doc = asyncComponent(() => import('@/views/form/add'));
const Doc1 = asyncComponent(() => import('@/views/doc'));
// const form = asyncComponent(() => import('../views/form'));

 
const MainRoute = () => (
  <Switch>
    {/* 子路由 */}
    <Route path={`/index/rendering`} exact component={Doc} />
              <Route path={`${this.props.location.pathname}/home`} component={Home} />
              <Route path={`${this.props.location.pathname}/doc`} strict component={Doc1} />
              <Route exact path={`${this.props.location.pathname}`} render={() => (
                <h3>请选择一个主题</h3>
              )} />
  </Switch>
)
 
export default MainRoute;
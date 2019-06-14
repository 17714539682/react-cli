import React from 'react';
import { Switch, Route} from 'react-router-dom'
import asyncComponent from "@/router/Async";

const Doc = asyncComponent(() => import('@/views/form/add'));
const Doc1 = asyncComponent(() => import('@/views/doc'));

const secondRoute = () => (
  <Switch>
    {/* 子路由 */}
    <Route path={`/index/rendering`} exact component={Doc} />
    <Route path={`/index/doc`} strict component={Doc1} />
    <Route exact path={`/index`} render={() => (
      <h3>请选择一个主题</h3>
    )} />
  </Switch>
)
 
export default secondRoute;
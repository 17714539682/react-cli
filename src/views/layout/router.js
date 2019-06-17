import React from 'react';
import { Switch, Route} from 'react-router-dom'
import asyncComponent from "@/router/Async";

const Doc = asyncComponent(() => import('@/views/form/add'));
const Doc1 = asyncComponent(() => import('@/views/doc'));

const secondRoute = () => (
  <Switch>
    {/* 子路由 */}
    <Route path={`/index/task`} exact component={Doc} />
    <Route path={`/index/user`} strict component={Doc1} />
    <Route exact path={`/index*`} render={() => (
      <h3 style={{padding:"10px",borderLeft: "5px solid #eee",margin: "20px",color: "#bbb"}}>请选择一个栏目</h3>
    )} />
  </Switch>
)
 
export default secondRoute;
import React, { Component } from 'react';
import './scss/index.scss'

import CustomMenu from "./menu";
import {Route} from 'react-router-dom'
import asyncComponent from "@/router/Async";


import { Layout,Icon,Avatar} from 'antd';
const { Header, Sider, Content } = Layout;
const Home = asyncComponent(() => import('@/views/home'));
const Doc = asyncComponent(() => import('@/views/form/add'));
const Doc1 = asyncComponent(() => import('@/views/doc'));


const menus = [
  {
    title: '任务中心',
    icon: 'laptop',
    key: '/index',
    subs: [
      {key: '/index/rendering', title: '任务列表', icon: '',},
      {key: '/index/doc', title: '用户管理', icon: '',},
    ]
  }
]

export default class Topics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
 
  toggle = () => {
    
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <img src={require("@/assets/logo.svg")} alt=""/> <span>推送服务管理系统</span>
          </div>
          <CustomMenu menus={menus}/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            
            <div className="tips">
              <span>管理员</span>
              <Avatar icon="user" />
            </div>

          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
              <Route path={`/index/rendering`} exact component={Doc} />
              <Route path={`/index//home`} component={Home} />
              <Route path={`/index/doc`} strict component={Doc1} />
              <Route exact path={`/index`} render={() => (
                <h3>请选择一个主题</h3>
              )} />
          </Content>
        </Layout>
      </Layout>)
  }
}         
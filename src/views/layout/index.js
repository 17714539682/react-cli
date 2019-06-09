import React, { Component } from 'react';
import './scss/index.scss'

import CustomMenu from "./menu";
import MainRoute from './router';
import { Layout,Icon } from 'antd';
const { Header, Sider, Content } = Layout;



const menus = [
  {
    title: '基本组件',
    icon: 'laptop',
    key: '/index',
    subs: [
      {key: '/index/rendering', title: '按钮', icon: '',},
      {key: '/index/doc', title: '图标', icon: '',},
    ]
  },
  {
    title: '导航组件',
    icon: 'bars',
    key: '/home/navigation',
    subs: [
      {key: '/home/navigation/dropdown', title: '下拉菜单', icon: ''},
      {key: '/home/navigation/menu', title: '导航菜单', icon: ''},
      {key: '/home/navigation/steps', title: '步骤条', icon: ''},
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
            <img src={require("@/assets/logo.svg")} alt=""/> <span>个人网站</span>
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
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
              <MainRoute/>
          </Content>
        </Layout>
      </Layout>)
  }
}         
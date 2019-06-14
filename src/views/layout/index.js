import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import SecondRoute from './router';
import styles from './index.scss';

import { Menu,Layout,Icon,Avatar} from 'antd';
const { Header, Sider, Content } = Layout;

const menus = [
  {
    title: '任务中心',
    icon: 'laptop',
    key: '/index/rendering',
  },
  {
    title: '用户管理',
    icon: 'inbox',
    key: '/index/doc',
  }
]

export default class Topics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  // 左侧菜单切换
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider collapsed={this.state.collapsed} className={styles.aside}>
          <div className={styles.logo}>
            <img src={require("@/assets/logo.svg")} alt=""/> 
            <span className={`${this.state.collapsed ? styles.active : ''}`}>推送服务管理系统</span>
          </div>
          <Menu
            defaultSelectedKeys={[this.props.location.pathname]}
            mode="inline"
            theme="dark"
          >
            {
              menus.map(item=>{
                return  <Menu.Item key={item.key}>
                  <Link to={item.key}>
                    {item.icon && <Icon type={item.icon}/>}
                    <span>{item.title}</span>
                  </Link>
                </Menu.Item>
              })
            }
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.head}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            
            <div className={styles.tips}>
              <Avatar icon="user" />
              <span>管理员</span>
            </div>

          </Header>
          <Content
            style={{
              margin: '24px 0 0 16px',
              height: 'calc(100vh - 137px)',
              backgroundColor:"#fff",
              boxSizing:'border-box',
            }}
          >
            <SecondRoute />
          </Content>
        </Layout>
      </Layout>)
  }
}         
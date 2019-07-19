import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import SecondRoute from './router';
import styles from './index.scss';
import { connect } from 'react-redux'
import { setUser } from '@/store/action'

import { Menu,Layout,Icon,Avatar,Button} from 'antd';
const { Header, Sider, Content } = Layout;

const menus = [
  {
    title: '任务中心',
    icon: 'laptop',
    key: '/index/task',
  },
  {
    title: '用户管理',
    icon: 'inbox',
    key: '/index/user',
  }
]

class Topics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }
  componentDidMount(){
     window.onbeforeunload= function(event) { return window.confirm("确定离开此页面吗？"); }
  }
  // 左侧菜单切换
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      id:10
    });
  };
  login = () =>{
    this.setState({
      loading:true
    });
    this.props.setUser({})
  }

  render() {
    return (
      <Layout>
        <Sider collapsed={this.state.collapsed} className={styles.aside}>
          <div className={styles.logo}>
            <img src={require("@/assets/logo.svg")} alt=""/> 
            <span className={`${this.state.collapsed ? styles.active : ''}`}>乐天派</span>
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
            {!this.props.name ?
            (<div className={styles.tips}>
              
              <Link to="/login">
              <span className="login">登录</span>
              </Link>
              <Button className="sing_up" type="primary" ghost>注册</Button>
              <Button type="primary">写文章</Button>
            </div>) :
            (<div className={styles.tips}>
              <Avatar src={this.props.pic} />
              <span>{this.props.name}</span>
            </div>)
            }
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

// const mapStateToProps = (state) => {
//   return {
//     ...state.setUser
//   }
// }
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      setUser (data) {
          dispatch(setUser(data)) 
      }
  }
}

export default connect(state => ({...state.setUser}),mapDispatchToProps)(Topics)

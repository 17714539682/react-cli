import React, { Component } from 'react';
// import { Form, Input} from 'antd';
export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          collapsed: false
        };
      }
      componentDidMount(){
         console.log(this.props);  
      }
      render() {
        return (
            <div>
                <ul className="title">
                    <li>登录</li>
                    <li>注册</li>
                </ul>
                </div>
        )
      }
}
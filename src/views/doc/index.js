import React, { Component } from 'react';
import { Link,Prompt  } from 'react-router-dom'; 
import { Tabs } from 'antd';
import { connect } from 'react-redux'
const TabPane = Tabs.TabPane;
class Test extends Component {
   state = {
    date: new Date(),
    tabList:[
      {
        label:'tab1',
        content:'aaaa'
      },
      {
        label:'tab2',
        content:'bbb'
      },
      {
        label:'tab3',
        content:'ccc'
      }
    ]
  };
  TabPanes = this.state.tabList.map((item, index) => {
    return  <TabPane tab={item.label} key={index+1}>{item.content}</TabPane>
  })

  button = this.state.tabList.length > 4 ? (
    <p>大于4条</p>
    ) : this.state.tabList.length === 3 ?(
     <p>3条数据</p>
         ) : <p>3条以内</p>;
         componentDidMount() {
           console.log(this.props);
           
            this.timerID = setInterval(
              () => this.tick(),
              1000
            );
          }
        
          componentWillUnmount() {
            clearInterval(this.timerID);
          }
        
          tick() {
            this.setState({
              date: new Date()
            });
          }
  
   render() {
    
       return (
           <div id="test-container">
              当前路由：{this.props.location.pathname}
               <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
               {this.button}
               {
                   this.state.tabList.length > 4 &&
                <h2>
                    You have {this.state.tabList.length} unread messages.
                </h2>
               }
               {this.state.tabList.length > 4 ? (
                <p>大于4条</p>
               ) : (
                <p>4条以内</p>
              )}
              <div>
              <h1>doc组件</h1>
              <Prompt
          message={location =>
            `Are you sure you want to go to ${location.pathname}`
          }
        /></div>
               <li><Link to="/">文档中心</Link></li>
               <Tabs type="card">
              {this.TabPanes}
            </Tabs>
           </div>
       );
   }
}
// export default Test;
// const mapStateToProps = (state) => {
//   return {
//     pageTitle: state.pageTitle,
//     infoList: state.todos
//   }
// }
export default connect(state => ({...state.pageTitle}))(Test)
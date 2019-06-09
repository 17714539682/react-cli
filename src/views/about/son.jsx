import React from 'react'
class ChildCom extends React.Component {
    valueToParent=(value)=> {
        this.props.onValue(value);
        }
 render() {
 return (
 <div>
 <h2>子组件</h2>
 <p onClick={this.valueToParent.bind(this,'123')}>向父组件传值</p>
 <div>
 {this.props.content}
 </div>
 </div>
 )
 }
}
export default ChildCom;
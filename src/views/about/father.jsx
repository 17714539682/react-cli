import React from 'react'
import ChildCom from './son.jsx'
class ParentCom extends React.Component {
    state = {
        getChildValue: ''
    }
    getChildValue(value) {
        this.setState({
            getChildValue: value
        })
    }
    render() {
        return (
            <div>
                <h1>父组件</h1>
                地址栏参数传递{this.props.location.query || 0}
                <div>子组件过来的值为：{this.state.getChildValue}</div>
                <ChildCom content={'我是父级过来的内容'} onValue={this.getChildValue.bind(this)} />
            </div>
        )
    }
}
export default ParentCom;

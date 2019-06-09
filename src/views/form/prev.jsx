import React from 'react';
import { connect } from 'react-redux'
import { setPageTitle, settodos } from '@/store/action'
class Reservation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isGoing: true,
        numberOfGuests: 2
      };
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
    }
    shouldComponentUpdate(prevProps, prevState) {
        if(prevState.numberOfGuests > 5){
            return false;
        }
        return true
    }
    componentDidMount () {
    //   let { setPageTitle } = this.props
      
    //   // 触发setPageTitle action
    //   setPageTitle('新的标题')
      
      // 触发setInfoList action
      // settodos()
    }
   render() {
    let { pageTitle} = this.props
       return (
         
        <form>
          <label>
            参与:{pageTitle}
            <input
              name="isGoing"
              type="checkbox"
              checked={this.state.isGoing}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            来宾人数:
            <input
              name="numberOfGuests"
              type="number"
              value={this.state.numberOfGuests}
              onChange={this.handleInputChange} />
          </label>
        </form>
   );
    }
  }

  // mapStateToProps：将state映射到组件的props中
const mapStateToProps = (state) => {
    return {
      pageTitle: state.pageTitle,
      infoList: state.infoList
    }
  }
  
  // mapDispatchToProps：将dispatch映射到组件的props中
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      setPageTitle (data) {
          // 如果不懂这里的逻辑可查看前面对redux-thunk的介绍
          dispatch(setPageTitle(data))
          // 执行setPageTitle会返回一个函数
          // 这正是redux-thunk的所用之处:异步action
          // 上行代码相当于
          /*dispatch((dispatch, getState) => {
              dispatch({ type: 'SET_PAGE_TITLE', data: data })
          )*/
      },
      settodos (data) {
          dispatch(settodos(data))
      }
    }
  }
  

  export default connect(mapStateToProps, mapDispatchToProps)(Reservation)
  
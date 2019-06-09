import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import {Provider} from 'react-redux';
import store from '@/store';
 

class Test extends Component {
    shouldComponentUpdate(prevProps, prevState) {
        if(prevState.numberOfGuests > 5){
            return false;
        }
        console.log(store)
        return true
    
    }
   render() {
       return (<Provider store={store}>
           <div id="test-container">
               <li><Link to="/doc/3">doc{store.todos}</Link></li>
               <div onClick={() =>  this.props.history.goBack()}>返回上一页"&11111</div>
           </div>
           </Provider>);
   }
}
export default Test;
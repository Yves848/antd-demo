import React,{Component} from 'react';

import logo from '../../assets/images/menuIcon.jpg';
import classes from './Toolbar.css';
import Login from '../Login/Login'

class ToolBar extends React.Component {
  constructor(props){
    super(props)
    //console.log('Toolbar Constructor',props)
  }

  render() {
    return (

      
      <Login userLogin={this.props.userLoggedIn}></Login>
      
      
    );
  }
}

export default ToolBar

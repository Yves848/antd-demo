import React, { Component } from "react";
import { db } from "../../libs/firebase";

import { Menu, Icon } from 'antd';
import Aux from '../../hoc/_Aux'
import './Login.css'

class Login extends Component {
  constructor(props) {
    super(props);
    console.log('Login Constructor',props)
    this.state = {
      users: []
    };

    this.dbUsers = db.ref().child("Users");
  }

  
  componentWillMount() {
    this.dbUsers.on("child_added", snapshot => {
      const snap = snapshot.val();
      const key = snapshot.key;
      this.setState((prevState) => {
          return {users : [...prevState.users, {
            key: key,
            Nom: snap.Nom,
            Password: snap.Infos.Password
        }]} 
      })
    });
  }

  componentDidMount() {
      
  }

  render() {

     return( this.state.users.map((user,i) => {
      console.log('user',user)
        return (
          <Menu.Item key={i} onClick={()=>this.props.userLogin(user)}>
            <Icon type="user" />
            <span className="nav-text">{user.Nom}</span>
          </Menu.Item>
          )
    }));
 
      }
}

export default Login;

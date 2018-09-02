import React, { Component } from "react";

import Aux from "../hoc/_Aux";
import Button from 'antd/lib/button';
import ToolBar from "../components/Toolbar/Toolbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Plats  from '../components/Plats/Plats'

class Layout extends Component {
  constructor(props) {
    super(props);
    //console.log('Layout Constructor',props)
    this.state = {
      currentUser: props.User ? props.User : 'Personne'
    }
  }

  userLoggedIn = (user) => {
    //console.log(user);
    this.setState({
      currentUser: user
    })
  }

  render() {
    let body = (
        <h1>Pas d'utilisateur connecté</h1>
      )

    if (this.state.currentUser && this.state.currentUser !== 'Personne')
    {
      body =(
        <div>
          <Plats user={this.state.currentUser.key}></Plats>
        </div>
      )
    }
    
    return (
      <Aux>
        <ToolBar userLoggedIn={this.userLoggedIn}/>
        <h1>{this.state.currentUser.Nom}</h1>
        {body}
      </Aux>
    )
    
  }
}
export default Layout;

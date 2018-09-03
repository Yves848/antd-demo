import React, { Component } from 'react';
import { db } from '../../libs/firebase';

import { Menu, Dropdown, Icon, notification } from 'antd';
import Aux from '../../hoc/_Aux';
import './Login.css';
import LoginDialog from './LoginDialog'

const loginError = (type, msg) => {
  notification[type]({
    message: 'Error d\'identification',
    description: msg,
  });
};

const loginSuccess = (type,user) => {
  notification[type]({
    message: 'Connexion',
    description: 'Bienvenue '+user,
  });
};

class Login extends Component {
  constructor(props) {
    super(props);
    //console.log('Login Constructor', props);
    this.state = {
      users: [],
      currentUser: this.props.currentUser,
      loginFormVisible: false
    };

    this.dbUsers = db.ref().child('Users');
  }

  componentWillMount() {
    this.dbUsers.on('value', snapshot => {
      const snap = snapshot.val();
      const users = Object.keys(snap).map(i=>{
        return (
          {
            key: i,
            Nom: snap[i].Nom,
            Password: snap[i].Infos.Password
          }
        )
      });

       this.setState(prevState => {
        return {
          users: [
            ...prevState.users,
            ...users
          ],
        };
      });
    });
  }

  showModal = () => {
    this.setState({loginFormVisible: true})
  }

  cancelModal = () => {
    this.setState({loginFormVisible: false})
  }

  validModal = (user, psw) => {
    //console.log(user, psw)
    //this.setState({loginFormVisible: false})
    // Affecter l'utilisateur courant ici
    //console.log('this.state.users',this.state.users)
    const currentUser = this.state.users.filter((_user) => {
      return (_user.Nom === user);
    })
    console.log(currentUser)
    if (currentUser.length > 0) {
      if (currentUser[0].Password === psw) {
        loginSuccess('success',user)
        this.props.userLogin(currentUser[0]);
        this.setState({loginFormVisible: false})
      }
      else {
        const msg = 'Mot de passe incorrect';
        loginError('error', msg)
      }
    }
    else {
      const msg = 'Utilisateur inconnu';
      loginError('error', msg)
    }
    
  }

  onItemHover = () => {};

  componentDidUpdate(prevProps) {
    //console.log('prevProps.user',prevProps.user)
    //console.log('props.user',this.props.user)
    if (prevProps.currentUser !== this.props.currentUser) {
        //console.log('[Login]','componentDidUpdate',this.props)
        this.setState({currentUser: this.props.currentUser})
        
    }
}

  render() {

    let sub

    if (this.state.currentUser.Nom !== 'Utilisateur') {
      sub=(
        <Menu.Item onClick={() => this.props.userLogout()}>
          <Icon type="logout"></Icon>
          Se Déconnecter
        </Menu.Item>
      )
    } else {
      sub=(
        <Menu.Item onClick={() => this.showModal()}>
          <Icon type="user-add"></Icon>
          Se Connecter
        </Menu.Item>
      )
    }
    const menu = (
      <Menu>
        {sub}
      </Menu>
    );

    

    return (
      <Aux>
        <LoginDialog visible={this.state.loginFormVisible} validModal={this.validModal} cancelModal={this.cancelModal}></LoginDialog>
        <Dropdown.Button overlay={menu}>
          {this.state.currentUser.Nom}
        </Dropdown.Button>
      </Aux>
    )
  }
}

export default Login;

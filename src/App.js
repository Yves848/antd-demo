import React, { Component } from 'react';
import './App.css';
//import Layout from './layout/Layout'

import { Layout, Menu } from 'antd';
import Login from './components/Login/Login';
import Plats from './components/Plats/Plats';
import logo from './assets/images/icon.png';

const { Header, Footer, Sider, Content } = Layout;

const noUserLoggedIn = {
  Nom: 'Utilisateur',
  key: '',
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
  }

  userLoggedIn = user => {
    console.log('[APP]','userLoggedIn',user);
    this.setState({
      currentUser: user,
    });
  };

  userLoggedOut = () => {
    console.log('[APP]','userLoggedOut')
    this.setState({
      currentUser: noUserLoggedIn,
    });
  };

  render() {
    let body = <h1>Pas d'utilisateur connecté</h1>;
    
    const currentUser = (this.state.currentUser === null) ? noUserLoggedIn : this.state.currentUser

    if (currentUser.Nom !== 'Utilisateur') {
      body = (
        <div>
          <Plats user={this.state.currentUser.key} />
        </div>
      );
    }
    return (
      <div className="App">
        <Layout>
          <Sider
            breakpoint='md'
            collapsible
            
            collapsedWidth="0"
            onBreakpoint={(broken)=>{console.log(broken)}}
            onCollapse={(collapsed,type)=>{console.log(collapsed,type);}}
          >
            <div className="logo">
              <img style={{ height: 80 }} src={logo} alt="" />
            </div>
          </Sider>
        
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Login 
              userLogin={this.userLoggedIn} 
              userLogout={this.userLoggedOut}
              currentUser={currentUser} />
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {body}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Footer</Footer>
        </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;

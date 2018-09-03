import React, { Component } from 'react';
import './App.css';
//import Layout from './layout/Layout'

import { Layout, Menu, Icon } from 'antd';
import Login from './components/Login/Login';
import Plats from './components/Plats/Plats';
import logo from './assets/images/icon.jpg';

const { Header, Footer, Sider, Content } = Layout;

const noUserLoggedIn = {
  Nom: 'Utilisateur',
  key: '',
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      maxCols : 4,
      broken: false
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

  updateDisplay = (collapsed,type) => {
    if (this.state.broken) {
      this.setState({maxCols : 2})
    }
    else {
      this.setState({maxCols : 5})
    }
    
  }

  render() {
    let body = <h1>Pas d'utilisateur connecté</h1>;
    
    const currentUser = (this.state.currentUser === null) ? noUserLoggedIn : this.state.currentUser

    if (currentUser.Nom !== 'Utilisateur') {
      body = (
        <div>
          <Plats user={this.state.currentUser.key} maxCols={this.state.maxCols}/>
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
            onBreakpoint={(broken)=>{this.setState({broken:broken})}}
            onCollapse={(collapsed,type)=>{this.updateDisplay(collapsed,type);}}
          >
            <div className="logo">
              <img style={{ height: 80 }} src={logo} alt="" />
            </div>
            <Menu
              defaultSelectedKeys={['1']}
              mode="inline"
              theme="dark"
              inlineCollapsed="false"
            >
              <Menu.Item key="1">
                <Icon type="pie-chart" />
                <span>Programmes</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="desktop" />
                <span>Menus</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="inbox" />
                <span>Plats</span>
              </Menu.Item>
            </Menu>
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
          <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;

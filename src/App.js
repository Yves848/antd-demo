import React, { Component } from "react";
import "./App.css";
//import Layout from './layout/Layout'

import { Layout,Menu } from "antd";
import Login from "./components/Login/Login";
import Plats from "./components/Plats/Plats";
import logo from './assets/images/icon.png'

const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.User ? props.User : "Personne"
    };
  }

  userLoggedIn = user => {
    //console.log(user);
    this.setState({
      currentUser: user
    });
  };

  render() {
    let body = <h1>Pas d'utilisateur connecté</h1>;

    if (this.state.currentUser && this.state.currentUser !== "Personne") {
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
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0
              }}
            >
              <div className="logo">
                <img style={{height: 80}} src={logo} alt=""/>
              </div>
              <Menu>
                <Login userLogin={this.userLoggedIn} />
              </Menu>
            </Sider>
          </Layout>
          <Layout style={{ marginLeft: 200 }}>
            <Header style={{ background: "#fff", padding: 0 }} />
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
              <div
                style={{ padding: 24, background: "#fff", textAlign: "center" }}
              >
                {body}
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Footer</Footer>
          </Layout>
        
      </div>
    );
  }
}

export default App;

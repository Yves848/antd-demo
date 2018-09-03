import React, { Component } from 'react';

import { Form, Modal, Button, Input } from 'antd';
import LoginForm from './LoginForm'


class LoginDialog extends Component {
  constructor(props)
  {
    super(props)
    this.state ={
      user: '',
      psw: ''
    }
  }

  handleOk= (user,psw) => {    
    //console.log('FORM CLOSED','OK', user, psw)
    this.props.validModal(user,psw);
  }

  handleCancel = () => {
    //console.log('FORM CLOSED','CANCEL')
    this.props.cancelModal();
  }

  
  render() { 
    const {visible} = this.props;
    let {user, psw} = this.state;

    const WrappedNormalLoginForm = Form.create()(LoginForm);

    return ( 
      <Modal 
        visible={visible}
        title='Connection .....'
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          
        ]}
      >
      <WrappedNormalLoginForm validModal={this.handleOk}></WrappedNormalLoginForm>
      </Modal>
     );
  }
}
 
export default LoginDialog;
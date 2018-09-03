import React, { Component } from 'react'

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './LoginForm.css'

const FormItem = Form.Item;

class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.validModal(values.userName,values.password)
      }
    });
  }

  state = {  }
  render() { 
    //console.log(this.props)
    const { getFieldDecorator } = this.props.form;

    return ( 
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Vous devez entree un nom d\'utilisateur' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Vous devez entrer un mot de passe' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Rester connecté</Checkbox>
          )}
          <a className="login-form-forgot" href="">Mot de passe oublié</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">S'enregistrer</a>
        </FormItem>
      </Form>
     );
  }
}
 
export default LoginForm;
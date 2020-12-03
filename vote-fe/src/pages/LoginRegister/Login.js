import React from 'react'
import './Login.less'

import store from '../../redux/configureStore'
import { login } from '../../redux/action/actionCreators.js'

import { Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...this.state, ...store.getState() };
    this.handleStoreChange = this.handleStoreChange.bind(this);
    store.subscribe(this.handleStoreChange);
  }
  handleStoreChange() {
    this.setState(store.getState())
  }
  componentDidMount() {
  }

  // 登录信息
  inputName = e => {
    this.setState({
      ...this.state,
      username: e.target.value,
    });
  }
  inputPassword = e => {
    this.setState({
      ...this.state,
      userpassword: e.target.value,
    });
  }
  handleOk = e => {
    let loginData = { name: this.state.username, password: this.state.userpassword }
    const action = login(loginData)
    store.dispatch(action)
    window.location.href = '#/'
  };
  render() {
    return (
      <div className="active">
        <div className="input_login">
          <Input size="large" placeholder="用户名" addonAfter='用户名' onChange={e => this.inputName(e)} />
          <Input.Password size="large" placeholder="密码" addonAfter='密码' onChange={e => this.inputPassword(e)} />{/* <span>密码</span> */}
        </div>
        <Button type="primary" className="login_button" onClick={this.handleOk}>登录</Button>
        <span className="register_text"><a href={'http://localhost:3000/#/register'}>没有账号--点击注册--</a></span>
      </div>
    )
  }
}
export default Login;
import React, { useState } from 'react';
import './LoginRegister.less'

import store from '../../redux/configureStore'
import { login, getUserIsLogin } from '../../redux/action/actionCreators.js'


import { Button, Input, Modal, Space, Spin } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';


class LoginRegister extends React.Component {
  constructor(props) {
    super(props)
    this.state = store.getState();
    this.handleStoreChange = this.handleStoreChange.bind(this);
    store.subscribe(this.handleStoreChange)
  }
  handleStoreChange() {
    this.setState(store.getState())
  }
  componentDidMount() {
    // 登录loading
    this.setState({
      ...this.state,
      loading: false
    })
  }
  /* toggle = value => {
    this.setState({
      ...this.state,
      loading: value
    });
  }; */

  // 登录弹窗
  showModal = () => {
    this.setState({
      ...this.state,
      visible: true,
    });

  };
  handleOk = e => {
    let loginData = { name: this.state.username, password: this.state.userpassword }
    const action = login(loginData)
    store.dispatch(action)

    this.setState({
      ...this.state,
      visible: false,
    });
    // 强制页面刷新，出现头像和用户信息
    setTimeout(function () { window.location.reload() }, 800)
  };
  handleCancel = e => {
    this.setState({
      ...this.state,
      visible: false,
    });
  };

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
  click_register = e => {
    window.location.href = '#/register'
  }
  render() {
    return (
      /* <Spin spinning={this.state.loading} className='no-login'> */
      < div className='no-login' >
        <Button type="primary" size='default' onClick={this.showModal}>
          登录
        </Button>
        <Modal className="header-login"
          title="欢迎登录"
          okText="登录"
          cancelText="返回"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input placeholder="请输入用户名" onChange={e => this.inputName(e)} style={{ width: '20em', marginLeft: '6em' }} />
          <Space direction="vertical">
            <Input.Password placeholder="请输入密码" onChange={e => this.inputPassword(e)} style={{ width: '20em', marginLeft: '6em', marginTop: '1em' }} />
          </Space>
        </Modal>
        <Button type="primary" size='default' onClick={this.click_register}>
          注册
        </Button>
      </div >
      /* </Spin> */
    )
  }
}

export default LoginRegister;
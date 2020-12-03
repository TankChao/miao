import React, { useState } from 'react'
import axios from 'axios'
import './RevisePassword.less'
import { NavLink, Link, useRouteMatch, Redirect, Route, Switch, useHistory } from 'react-router-dom'

import store from '../../../redux/configureStore'
import { } from '../../../redux/action/actionCreators.js'


/* import Center from './Center/Center.js'
import MyVote from './Myvote/Myvote.js'
import Revise from './Revise/Revise.js'
import Attention from './Attention/Attention.js' */


import { Button, Input, Modal, Space, Layout, Affix, Menu, Breadcrumb } from 'antd';
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined, } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;


class RevisePassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }
  upRevisePassword = (e) => {
    if (this.state.newPassword.length < 5) {
      return alert('密码等级低，请更换')
    }
    if (this.state.newPassword == this.state.oldPassword) {
      return alert('旧密码与新密码相同，无需改动')
    }
    axios.post('/revise/password', {
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword
    }).then(res => {
      if (res.data.code == -5.5) {
        return alert('旧密码不正确，修改失败')
      }
      if (res.data.code == 5) {
        return alert('密码修改成功')
      }
      if (res.data.code == -5) {
        return alert('修改错误：' + res.data.code.msg)
      }
    })
  }
  old = (e) => {
    this.setState({ oldPassword: e.target.value })
  }
  new = (e) => {
    this.setState({ newPassword: e.target.value })
  }
  render() {
    return (
      <>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>账户设置</Breadcrumb.Item>
          <Breadcrumb.Item>密码修改</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>

          <div>
            <span>旧密码：</span><Input.Password value={this.state.oldPassword} onChange={this.old} />
          </div>

          <div>
            {/* 由于后端将userInfo全部传给了前端，所以修改后，前端的用户密码并没有在 store 中并没有去做实时更新 */}
            <span>新密码：</span><Input.Password value={this.state.newPassword} onChange={this.new} />
          </div>

          <div>
            <Button onClick={this.upRevisePassword}>提交修改</Button>
          </div>

        </div>
      </>
    )
  }
}


export default RevisePassword;
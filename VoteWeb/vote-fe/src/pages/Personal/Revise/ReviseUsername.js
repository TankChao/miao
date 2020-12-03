import React, { useState } from 'react'
import './ReviseUsername.less'
import axios from 'axios'
import { NavLink, Link, useRouteMatch, Redirect, Route, Switch, useHistory } from 'react-router-dom'

import store from '../../../redux/configureStore'
import { getUserIsLogin } from '../../../redux/action/actionCreators.js'


/* import Center from './Center/Center.js'
import MyVote from './Myvote/Myvote.js'
import Revise from './Revise/Revise.js'
import Attention from './Attention/Attention.js' */


import { Button, Input, Modal, Space, Layout, Affix, Menu, Breadcrumb } from 'antd';
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined, } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;



class ReviseUsername extends React.Component {

  constructor(props) {
    super(props)
    const action = getUserIsLogin()
    store.dispatch(action)
    this.state = {
      ...store.getState(),
      newName: '',
    }
    this.handleStoreChange = this.handleStoreChange.bind(this);
    store.subscribe(this.handleStoreChange)
  }

  handleStoreChange() {
    this.setState(store.getState())
  }

  upReviseName = () => {
    var name = this.state.newName
    if (name[0] == '+' || name[0] == '-' || name[0] == '*' || name[0] == '/' || name.length < 3) {
      return alert('用户名不符合命名规则')
    }
    axios.post('/revise/username', {
      username: name,
    }).then(res => {
      console.log(res.data)
      if (res.data.code == 1) {
        store.dispatch({ type: 'REVISE_NAME', name: name })
        this.setState({
          ...this.state,
          newName: '',
        })
        alert(res.data.msg)
      } else if (res.data.code == 0) {
        alert(res.data.msg)
      }
    })
  }
  render() {
    const showName = (store.getState().userInfo ? store.getState().userInfo.name : '')
    return (
      <>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>账户设置</Breadcrumb.Item>
          <Breadcrumb.Item>修改用户名</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>

          <div>
            <p>您好{showName}</p>
            <div>
              <span>新用户名:</span>
              <Input type="text" value={this.state.newName} onChange={(e) => this.setState({ newName: e.target.value })} />
            </div>
            <div><Button onClick={this.upReviseName}>提交修改</Button></div>
          </div>
        </div>
      </>
    )
  }
}





export default ReviseUsername;
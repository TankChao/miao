import React, { useState } from 'react';
import { NavLink, Link, useRouteMatch, Redirect, Route, Switch, useHistory } from 'react-router-dom'
import './index.less'
import axios from 'axios'

import logo from '../../imgs/logo/vote.png'
import store from '../../redux/configureStore'
import { getUserIsLogin, logoutUser } from '../../redux/action/actionCreators.js'

import HeaderSkeleton from './HeaderSkeleton.js'
import LoginRegister from './LoginRegister.js'

import { Affix, Button, Input, Modal, Space, Layout, Row, Col, Menu, Dropdown } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, DownOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Header, Footer, Sider, Content } = Layout;


class HeaderMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = store.getState();
    this.handleStoreChange = this.handleStoreChange.bind(this);
    store.subscribe(this.handleStoreChange)
  }
  handleStoreChange() {
    this.setState(store.getState())
  }
  onSearch = value => {
    console.log('sousousosu', value)
    //this.props.history.push(`/viewvote/${value}`)
    //history.push(`/viewvote/${value}`)
    let url = window.location.origin + "/#/viewvote/" + value;
    window.open(url)
  };

  componentDidMount() {
    const action = getUserIsLogin()
    store.dispatch(action)
  }

  logout = () => {
    axios.get('/logout').then(res => {
      logoutUser(undefined)
      /* let url = document.URL
      console.log('url:::::::', document) */
      window.location.reload()
      /* window.open(url)
      window.close() */
    })
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://localhost:3000/#/personal/center">
            个人中心
      </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://localhost:3000/#/personal/myvote">
            我的投票
      </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://localhost:3000/#/personal/revise/avatar">
            账户设置
      </a>
        </Menu.Item>
        <Menu.Item danger onClick={this.logout}>退出登录</Menu.Item>
      </Menu>
    );
    return (
      <Row className='header'>
        <Col span={3} className='logo'>
          <a href="/"><img src={logo} /> <span>  派派 VOTE</span></a>
        </Col>
        <Col span={13} className='items'>
          <a href="/">功能介绍</a>
          <a href="/">精彩案例</a>
          <a href="/">关于我们</a>
          <a href="/">下载</a>
        </Col>
        <Col span={5} className='search'>
          <Search placeholder="请输入投票 id" onSearch={this.onSearch} enterButton size="large" />
        </Col>
        <Col span={3} className='my-info'>
          {
            this.state.loginYesNo ?
              <div className='user-info'>
                <img className="user-acatar" src={this.state.userInfo.avatar} />
                <Dropdown overlay={menu} placement="bottomRight" arrow style={{ width: '7em' }}>
                  <span className='user-name'>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                      {this.state.userInfo.name} <DownOutlined />
                    </a>
                  </span>
                </Dropdown>
              </div>
              :
              <LoginRegister />
          }
        </Col>
      </Row>
    )
  }
}

export default HeaderMain;



import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './index.less'
import { NavLink, Link, useRouteMatch, Redirect, Route, Switch, useHistory } from 'react-router-dom'
import logo from '../../imgs/logo/vote.png'

import store from '../../redux/configureStore'
import { getUserIsLogin } from '../../redux/action/actionCreators.js'


import Center from './Center/Center.js'
import MyVote from './MyVote/MyVote.js'
import ReviseAvatar from './Revise/ReviseAvatar.js'
import ReviseUsername from './Revise/ReviseUsername.js'
import RevisePassword from './Revise/RevisePassword.js'
import AttentionVoteinstructions from './Attention/AttentionVoteinstructions.js'
import AttentionAgreement from './Attention/AttentionAgreement.js'


import { Button, Input, Modal, Space, Layout, Affix, Menu, Breadcrumb } from 'antd';
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined, } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;



function Personal() {
  var [key, setKey] = useState('')
  var history = useHistory()
  var keyUrl = history.location.pathname
  useEffect(() => {
    if (keyUrl == '/personal/center') {
      setKey('1')
    } else if (keyUrl == '/personal/myvote') {
      setKey('2')
    } else if (history.location.pathname == '/personal/revise/avatar') {
      setKey('3')
    } else if (keyUrl == '/personal/revise/username') {
      setKey('4')
    } else if (keyUrl == '/personal/revise/password') {
      setKey('5')
    } else if (keyUrl == '/personal/attention/voteinstructions') {
      setKey('6')
    } else if (keyUrl == '/personal/attention/agreement') {
      setKey('7')
    } else {
      setKey('1')
    }
  }, [keyUrl])

  var userInfo
  var [userInfo, setUserInfo] = useState(undefined)
  useEffect(() => {
    axios.get('/userinfo').then(res => {
      console.log('------/userinfo  res', res)
      if (!res.data) {
        history.push('/login')
      } else {
        const action = getUserIsLogin()
        store.dispatch(action)
        setUserInfo(res.data)
      }
    }).catch(e => {
      console.log('用户未登录，将显示登陆界面')
      history.push('/login')
    })
  }, [])


  var [collapsed, setCollapsed] = useState(false)
  var { url } = useRouteMatch()

  function onCollapse(collapsed) {
    console.log(collapsed);
    setCollapsed(collapsed);
  };



  return (

    <Layout style={{ minHeight: '100vh' }}>
      {console.log('url:::', url)}
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="vote-logo-sider" >
          <a href="/"><img src={logo} /> {
            collapsed ? '' : <span>  派派 VOTE</span>
          }</a>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[key]}>
          <Menu.Item key="1" icon={<DesktopOutlined />}>
            <NavLink to={`/personal/center`}>用户首页</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<PieChartOutlined />}>
            <NavLink to={`/personal/myvote`}>我的投票</NavLink>

          </Menu.Item>
          <SubMenu key="/revise" icon={<UserOutlined />} title="账户设置">
            <Menu.Item key="3"><NavLink to={'/personal/revise/avatar'}>替换头像</NavLink></Menu.Item>
            <Menu.Item key="4"><NavLink to={'/personal/revise/username'}>用户名修改</NavLink></Menu.Item>
            <Menu.Item key="5"><NavLink to={'/personal/revise/password'}>修改密码</NavLink></Menu.Item>
          </SubMenu>
          <SubMenu key="/attention" icon={<FileOutlined />} title="注意事项">
            <Menu.Item key="6"><NavLink to={'/personal/attention/voteinstructions'}>投票说明</NavLink></Menu.Item>
            <Menu.Item key="7"><NavLink to={'/personal/attention/agreement'}>用户协议</NavLink></Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} >
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Switch>
            <Route path={`/personal/center`}><Center userInfo={userInfo} /></Route>
            <Route path={`/personal/myvote`}><MyVote userInfo={userInfo} /></Route>
            <Route path={`/personal/revise/avatar`}><ReviseAvatar userInfo={userInfo} /></Route>
            <Route path={`/personal/revise/username`}><ReviseUsername userInfo={userInfo} /></Route>
            <Route path={`/personal/revise/password`}><RevisePassword userInfo={userInfo} /></Route>
            <Route path={`/personal/attention/voteinstructions`}><AttentionVoteinstructions userInfo={userInfo} /></Route>
            <Route path={`/personal/attention/agreement`}><AttentionAgreement userInfo={userInfo} /></Route>
          </Switch>



          {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              Bill is a cat.
            </div> */}
        </Content>
        <Footer style={{ textAlign: 'center' }}>派派 vote ©2020 xxxxxx xx xxx xxx</Footer>
      </Layout>
    </Layout>
  );

}

export default Personal;
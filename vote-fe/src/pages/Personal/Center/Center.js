import React, { useState } from 'react'
import './Center.less'
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


function Center() {

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>用户首页</Breadcrumb.Item>
      </Breadcrumb>
      <div className="center-container" style={{ padding: 24, minHeight: 360 }}>
        Center
      </div>
    </>
  )
}

export default Center;
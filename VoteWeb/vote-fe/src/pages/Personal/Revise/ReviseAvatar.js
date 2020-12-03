import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ReviseAvatar.less'
import { NavLink, Link, useRouteMatch, Redirect, Route, Switch, useHistory } from 'react-router-dom'
import ImgCrop from 'antd-img-crop';

import store from '../../../redux/configureStore'
import { getUserIsLogin, currentAvatarUrl, defaultAvatarUrl } from '../../../redux/action/actionCreators.js'


/* import Center from './Center/Center.js'
import MyVote from './Myvote/Myvote.js'
import Revise from './Revise/Revise.js'
import Attention from './Attention/Attention.js' */


import { Button, Input, message, Modal, Upload, Tooltip, Layout, Image, Menu, Breadcrumb } from 'antd';
import { LoadingOutlined, PlusOutlined, FileOutlined, TeamOutlined, UserOutlined, } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;


function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  const isJPEG = file.type === 'image/jpeg';
  const isGIF = file.type === 'image/gif';
  const isPNG = file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 / 8 < 1;
  if (!(isJPG || isJPEG || isPNG)) {
    Modal.error({
      title: '只能上传JPG、JPEG、PNG格式的图片~',
    });
  } else if (!isLt2M) {
    Modal.error({
      title: '图片超过8M限制，不允许上传~',
    });
  }
  return (isJPG || isJPEG || isPNG) && isLt2M;
}

class ReviseAvatar extends React.Component {
  constructor(props) {
    super(props)
    const action = getUserIsLogin()
    store.dispatch(action)
    this.state = { ...store.getState(), loading: false };
    this.handleStoreChange = this.handleStoreChange.bind(this);
    store.subscribe(this.handleStoreChange)
  }
  handleStoreChange() {
    this.setState({ ...this.state, ...store.getState() })
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({ ...this.state, loading: false })
      var newAvatarUrl = info.file.response.newAvatarUrl
      var action = currentAvatarUrl(newAvatarUrl)
      store.dispatch(action)
    }
  };

  render() {
    const { loading } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>替换</div>
      </div>
    );
    let avatarUrl = this.state.userInfo ? this.state.userInfo.avatar : ''
    return (
      <>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>账户设置</Breadcrumb.Item>
          <Breadcrumb.Item>替换头像</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <div className="upload-avatar">
            <ImgCrop rotate aspect={1 / 1}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://localhost:3000/revise/avatar"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {uploadButton}
              </Upload>
            </ImgCrop>
          </div>
          <div className="show-avatar">
            <p>当前头像</p>
            <img src={avatarUrl} />
          </div>
        </div>
      </>
    );
  }
}

export default ReviseAvatar;
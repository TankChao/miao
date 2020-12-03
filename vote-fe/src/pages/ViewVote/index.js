import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import './index.less'

import store from '../../redux/configureStore'
import { getUserIsLogin } from '../../redux/action/actionCreators.js'

import HeaderMain from '../../common/HeaderPart'
import FooterPart from '../../common/FooterPart'

import Vote from './components/Vote.js'
import Axios from 'axios'

import { Affix, Button, Input, Modal, Space, Layout, Row, Col, Menu, Dropdown } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, DownOutlined } from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;
const HeaderPart = () => {
  const [top, setTop] = useState(0);
  return (
    <>
      <Affix offsetTop={top}>
        <Header style={{ height: '4.5em' }}>
          <HeaderMain />
        </Header>
      </Affix>
    </>
  );
};


class ViewVote extends React.Component {
  constructor(props) {
    super(props)
    this.state = store.getState();
    this.handleStoreChange = this.handleStoreChange.bind(this);
    store.subscribe(this.handleStoreChange)
  }
  handleStoreChange() {
    this.setState(store.getState())
  }

  render() {
    return (
      <>
        <HeaderPart />
        <Content>
          <Vote userInfo={this.state.userInfo} />
        </Content>
        <Footer>
          <FooterPart />
        </Footer>
      </>
    )
  }

}


export default ViewVote;
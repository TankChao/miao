import React, { useState } from 'react'
import './index.less'
import { NavLink, Link, useRouteMatch, Redirect, Route, Switch, useHistory } from 'react-router-dom'
import HeaderMain from '../../common/HeaderPart'
import FooterPart from '../../common/FooterPart'
import CarouselContainer from './components/carousel/Carousel.js'
import ShowVote from './components/ShowVote/ShowVote.js'

import store from '../../redux/configureStore'
import { } from '../../redux/action/actionCreators.js'

import { Button, Input, Modal, Space, Layout, Affix } from 'antd';
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

class Homepage extends React.Component {
  render() {
    return (
      <React.Fragment>

        <HeaderPart />
        <Content className="home-main">

          <CarouselContainer path={'/getcarousel'} />
          <ShowVote />
        </Content>

        <Footer>
          <FooterPart />
        </Footer>
      </React.Fragment>
    )
  }
}
export default Homepage;
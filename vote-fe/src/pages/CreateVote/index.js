import React, { useState } from 'react'
import './index.less'
import HeaderMain from '../../common/HeaderPart'
import FooterPart from '../../common/FooterPart'
import CreateVoteCore from './components/CreateVoteCore.js'

import { Layout, Affix } from 'antd';
const { Header, Content, Footer } = Layout

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

class CreateVote extends React.Component {
  render() {
    return (
      <Layout>
        <HeaderPart />
        <Content>
          <div className="creat-vote-main">
            <h1>创建投票</h1>
            <CreateVoteCore />
          </div>
        </Content>
        <Footer >
          <FooterPart />
        </Footer>
      </Layout>
    )
  }
}
export default CreateVote;
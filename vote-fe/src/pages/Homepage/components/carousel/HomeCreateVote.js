import React from 'react'
import { Carousel, Row, Col, Divider } from 'antd';

import './HomeCreateVote.less'
class HomeCreateVote extends React.Component {
  constructor(props) {
    super(props)
  }
  toCreateVote = () => {
    window.location.href = '#/createvote'
  }
  render() {
    return (
      <div className="create-vote-home" onClick={this.toCreateVote}>
        <span>创建投票</span>
        <img src='/resources/home/create_vote_home.png' />
      </div>
    )
  }
}

export default HomeCreateVote;
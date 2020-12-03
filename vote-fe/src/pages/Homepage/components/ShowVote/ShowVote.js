import React, { useEffect, useState } from 'react'
import { Card, Avatar, Row, Col } from 'antd';

import './ShowVote.less'

import store from '../../../../redux/configureStore'
import { getVoteCard } from '../../../../redux/action/actionCreators.js'
import { voteCard } from '../../../../data/data.js'

const { Meta } = Card;

class ShowVote extends React.Component {
  constructor(props) {
    super(props)
    this.state = store.getState();
    this.handleStoreChange = this.handleStoreChange.bind(this);
    store.subscribe(this.handleStoreChange);
  }
  handleStoreChange() {
    this.setState(store.getState())
  }
  componentDidMount() {
  }
  render() {
    var vote_card_list = this.state.votecard.slice(0, 6)
    return (
      <div className="vote-case">
        <h1 className="case-title">精彩案例</h1>
        <div className="vote-card">
          <>
            <Row justify="space-around" align="middle" gutter={[0, 30]}>
              <Col span={1}></Col>
              {voteCard.slice(0, 3).map((it, id) => {
                return (<>
                  <Col span={6}>
                    <a href={it.voteUrl}>
                      <Card key={it.id}
                        hoverable={true}
                        cover={
                          <img
                            className="vote-img-case"
                            src={it.src}
                          />
                        }
                      >
                        <Meta
                          className="vote-case-meta"
                          avatar={<Avatar src={it.avatar} />}
                          title={it.title}
                        />
                      </Card>
                    </a>
                  </Col>

                  {id === 2 ? '' : <Col span={2}></Col>}
                </>)
              })}
              <Col span={1}></Col>
            </Row>


            <Row justify="space-around" align="middle" gutter={[0, 30]}>
              <Col span={1}></Col>
              {voteCard.slice(3).map((it, id) => {
                return (<>
                  <Col span={6}>
                    <a href={it.voteUrl}>
                      <Card key={it.id}
                        hoverable={true}
                        cover={
                          <img
                            className="vote-img-case"
                            src={it.src}
                          />
                        }
                      >
                        <Meta
                          className="vote-case-meta"
                          avatar={<Avatar src={it.avatar} />}
                          title={it.title}
                        />
                      </Card>
                    </a>
                  </Col>

                  {id === 2 ? '' : <Col span={2}></Col>}
                </>)
              })}
              <Col span={1}></Col>
            </Row>
          </>
          {/* voteCard.map((it, id) => {
              return (
                <Card key={id}
                  cover={
                    <img
                      src={it.src}
                    />
                  }
                >
                  <Meta
                    avatar={<Avatar src={it.avatar} />}
                    title={it.title}
                    description={it.desc}
                  />
                </Card>)
            }) */ }

        </div>
      </div >
    )
  }
}

/* function ShowVote(props) {
  
  useEffect(() => {
    const action = getVoteCard()
    store.dispatch(action)
  },[])

  return (
    <>
      <h1>精彩案例</h1>
      <div className="vote-card">

        {
          vote_card_list && vote_card_list.map((it, id) => {
            return
            <Card key={id}
              cover={
                <img
                  src={it.src}
                />
              }
            >
              <Meta
                avatar={<Avatar src={it.avatar} />}
                title={it.title}
                description={it.desc}
              />
            </Card>
          })
        }
      </div>
    </>
  )
} */


export default ShowVote;


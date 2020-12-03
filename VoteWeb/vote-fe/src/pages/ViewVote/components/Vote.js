

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import './Vote.less'
import { groupBy } from 'lodash'
import Axios from 'axios'

import store from '../../../redux/configureStore'
import { getUserIsLogin } from '../../../redux/action/actionCreators.js'


import { Affix, Button, Input, Modal, Radio, Space, Layout, Row, Col, Progress, Menu, Dropdown } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, DownOutlined } from '@ant-design/icons';

function Vote({ userInfo }) {

  var { id } = useParams()
  var [voteInfo, setvoteInfo] = useState(null)
  var [votings, setVotings] = useState(null)
  var [loading, setLoading] = useState(true)
  var history = useHistory()

  if (!loading) {
    var groupedVotings = groupBy(votings, 'optionId')
    //console.log('groupedVotings:', groupedVotings)
    var uniqueUsersCount = new Set(votings.map(it => it.userId)).size
    //console.log('uniqueUsersCount', uniqueUsersCount)
  }
  // vote:id
  useEffect(() => {
    setvoteInfo(null)
    setLoading(true)
    Axios.get(`/vote/${id}`).then((res) => {
      //console.log(res)
      if (res.data.code == 0) {
        alert('该投票不存在，或已被删除')
        history.push('/')
      }
      setvoteInfo(res.data)
      setVotings(res.data.votings)
      setLoading(false)
      console.log('voteInfo:::::', voteInfo)
    })
  }, [id])

  useEffect(() => {
    // 用于接收某个vote的新的选票信息的
    if (!voteInfo) {
      return
    }
    if (Date.now() < new Date(voteInfo.deadline).getTime()) {
      // eslint-disable-next-line
      var ws = new WebSocket(`ws://localhost:8081/vote/${id}`)
      ws.onmessage = e => {
        setVotings(JSON.parse(e.data))
      }
      return () => ws.close()
    }
  }, [id, voteInfo])

  async function voteUp(optionId, hasVoted) {
    if (Date.now() > new Date(voteInfo.deadline).getTime()) {
      alert('该投票已过截止时间，不能再参与')
      return
    }
    // 是否已经选过当前选项
    if (!hasVoted) {
      var thisVoting = {
        id: -1,
        optionId: optionId,
        voteId: id,
        userId: userInfo.id,
        avatar: userInfo.avatar,
      }
      //console.log('增加本次投票')
      setVotings([...votings, thisVoting])
    } else {
      var filterVotings = votings.filter(it => {
        return !(it.userId == userInfo.id && optionId == it.optionId)
      })
      setVotings(filterVotings)
    }
    var res = await Axios.post(`/voteup/${id}`, {
      optionId,
      isVoteDown: hasVoted
    })
  }

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div className="content-vote">
      <Row className="vote-info">
        <h2>{voteInfo.title}</h2>
        <Col span={16}>
          <p className="vote-ismultiple">{voteInfo.isMultiple ? '【多选】' : '【单选】'}</p>
          <p className="vote-deadline">投票截止：{new Date(voteInfo.deadline).toLocaleString()}</p>
          <p className="vote-desc">{voteInfo.desc}</p>
        </Col>
        <Col span={8} className="col-vote-img"><img className="vote-img" src={voteInfo.img} /></Col>


      </Row>
      <div className="vote-options">
        <ul>
          {
            voteInfo.options.map((option) => {
              var currVotings = groupedVotings[option.id] || []//当前选项的每一票
              var hasCurrUserVoted = !!currVotings.find(it => it.userId == userInfo.id)
              return (
                <li className="vote-option" key={option.id} onClick={() => voteUp(option.id, hasCurrUserVoted)} >
                  <Radio checked={hasCurrUserVoted}></Radio>
                  <span className="vote-content">{option.content}</span>
                  <strong className="vote-count">
                    {currVotings.length} 票
                  </strong>
                  <div className="option-ratio-bank">
                    <Progress percent={calcRatio(currVotings.length, uniqueUsersCount)} />
                  </div>
                  <div className="vote-avatar">
                    {
                      currVotings.map(voting => {
                        return (
                          <img className="avatar" src={voting.avatar} />
                        )
                      })
                    }
                  </div>
                </li>)
            })
          }
        </ul>
        <div className="txt">
          <p>感谢您的投票，<a href="/">返回首页</a></p>
          <p>
            <span><a src={'/'}>投票规则</a></span> |
            <span><a src={'/'}></a>注意事项</span> |
            <span><a src={'/'}>文明投票</a></span>
          </p>
        </div>
      </div>

    </div>
  )


}
function calcRatio(num, base) {
  if (base == 0) {
    return 0
  }
  return (num / base * 100).toFixed()
}

export default Vote;
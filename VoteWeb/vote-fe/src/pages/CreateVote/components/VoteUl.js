import React, { useState, useEffect } from "react"
import { useBoolean, useArray, useInput } from 'react-hanger'
import { useLocation, useHistory } from 'react-router-dom'


import { Input, Tooltip, Button } from 'antd';
import { CloseCircleOutlined, CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';

import './VoteUl.less'


import store from '../../../redux/configureStore'
import { voteOptions, handleOptions } from '../../../redux/action/actionCreators.js'


function VoteUl(props) {
  // state.voteOption = '默认 ['', '']'
  useEffect(() => {
    const action_default_vote_option = voteOptions();
    store.dispatch(action_default_vote_option)
  }, [])
  //const state = store.getState()
  //const options = useArray(v['', ''])
  const [options, setOptions] = useState(['', ''])


  function addOption() {
    let newOptions = [...options, '']
    setOptions(newOptions)
    const action_vote_option = handleOptions(newOptions)
    store.dispatch(action_vote_option)
    /* options.push('');
    let optionAry = options.value
    const action_vote_option = handleOptions(optionAry)
    store.dispatch(action_vote_option) */
  }
  function handleDeleteOption(idx) {
    if (options.length > 2) {
      let newOptions = [...options.slice(0, idx), ...options.slice(idx + 1)]
      setOptions(newOptions)
      const action_vote_option = handleOptions(newOptions)
      store.dispatch(action_vote_option)
    } else {
      return
    }
    /* if (options.value.length > 2) {
      options.removeIndex(idx)
      const action_vote_option = handleOptions(options.value)
      store.dispatch(action_vote_option)
    } else {
      return
    } */
  }
  function handleOnChange(e, idx) {
    let newOptions = ([...options.slice(0, idx), e.target.value, ...options.slice(idx + 1)]);
    setOptions(newOptions)
    const action_vote_option = handleOptions(newOptions)
    store.dispatch(action_vote_option)
    /* options.setValue([...options.value.slice(0, idx), e.target.value, ...options.value.slice(idx + 1)]);
    const action_vote_option = handleOptions(options.value)
    store.dispatch(action_vote_option) */
  }
  return (
    /* {
      options.setValue([...options.value.slice(0, idx), e.target.value, ...options.value.slice(idx + 1)]);
      const action_vote_option = handleOptions(options.value)
                  store.dispatch(action_vote_option)
    } */
    <div className="left-list">
      <ul >
        {
          options.map((option, idx) => {
            return (
              <li key={idx} className="create-a-li">
                <Input placeholder="请填写投票项(50字以内)" type='text' value={option} className="vote-input" onChange={(e) => handleOnChange(e, idx)}
                  maxLength={50} />
                <Tooltip title="删除">
                  <Button onClick={() => handleDeleteOption(idx)} type="primary" shape="circle" icon={<CloseOutlined />} />
                </Tooltip>
              </li>
            )
          })
        }
      </ul>
      <Button className="add-li" type="primary" onClick={addOption} icon={<PlusCircleOutlined />}>添加选项</Button>
    </div>
  )
}

export default VoteUl;
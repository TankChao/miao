import React, { useState, useEffect } from 'react'
import moment from 'moment';
import axios from 'axios'
import './CreateVoteCore.less'
import VoteUl from './VoteUl.js'
import UploadImg from './UploadImg.js'

import store from '../../../redux/configureStore'
import { getUserIsLogin, getDefaultImg, syncVoteImg, postCreateVoteInfo } from '../../../redux/action/actionCreators.js'


import { Radio, Modal, Input, Switch, Button, Form, Upload, Space, Select, DatePicker, TextArea, Checkbox, Row, Col } from 'antd';
import { Icon, UploadOutlined, LoadingOutlined, PlusSquareOutlined, InboxOutlined, CloseOutlined, CheckOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';


const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const disabledDate = (current) => {
  return current && current < moment().endOf('day');
}




const CreateVoteCore = (props) => {
  const [titleShow, setTitleShow] = useState('')
  const [descShow, setDescShow] = useState('')
  const [submitState, setSubmitState] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false)
  const [goNewVote, setGoNewVote] = useState('')
  var state = store.getState()
  store.subscribe(() => state = store.getState())

  const onFinish = async (values) => {
    setSubmitState(true)
    let voteInfo = {
      ...values,
      img: state.voteImg,
      options: state.voteOptions
    };

    axios.post('/createvote', voteInfo).then((res) => {
      const data = res.data
      // data = {voteId: '',code: ''}
      if (data.code === 3) {
        let url = '' + document.location.origin + '/#/ViewVote/' + data.voteId
        setGoNewVote(url)
        setVisibleModal(true)
        setSubmitState(true)
      } else {
        Modal.error({
          title: '创建失败',
          content: '请您按照规则填写',
        });
      }
    })



    /* const actionPostCreateVoteInfo = postCreateVoteInfo(voteInfo)
    store.dispatch(actionPostCreateVoteInfo) */

    //console.log('Received values of form: ', voteInfo);
  };
  const handleOk = e => {
    //console.log(e);
    window.location = goNewVote
  };
  const handleCancel = e => {
    console.log('123456789++++++', '' + document.location.origin + '/#/createvote/');
    window.location.reload();
  };
  return (
    <Row>
      <Col span={14}>
        <Row>
          <Col span={15} className="vote-show">
            <h2>{titleShow}</h2>
            <p>{descShow}</p>
          </Col>
          <Col span={9}>
            <UploadImg />
          </Col>
          <VoteUl />
        </Row>
      </Col>

      <Col span={10} className="vote-form">
        < Form

          name="create-vote"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{
            rate: 3.5,
            anonymous: false,
            isMultiple: '0'
          }}
        >
          <Form.Item name="title" label="标题" >
            <Input placeholder="请输入标题 (16字以内)" size="middle" maxLength={18} onChange={e => { setTitleShow(e.target.value) }} />
          </Form.Item>
          <Form.Item name="desc" label="描述" >
            <Input.TextArea rows={4} placeholder="投票说明 (400字以内)" maxLength={400} onChange={e => { setDescShow(e.target.value) }} />
          </Form.Item>

          <Form.Item label="截至日期">
            <Form.Item name="deadline" noStyle>
              <DatePicker disabledDate={disabledDate} />
            </Form.Item>
          </Form.Item>

          <Form.Item name="anonymous" label="匿名投票" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item name="isMultiple" label="类型">
            <Radio.Group defaultValue='0'>
              <Radio value="0">单选</Radio>
              <Radio value="1">多选</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 6,
            }}
          >
            <Button
              className="btn-create"
              size='large' type="primary" htmlType="submit" disabled={submitState}>
              创建
            </Button>
            <Modal
              title="创建成功"
              visible={visibleModal}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="前往投票"
              cancelText="继续创建"
            >
              <p>文明投票</p>
              <p>诚实守信</p>
              <p>感谢使用</p>
            </Modal>
          </Form.Item>
        </Form >
      </Col>
    </Row>
  );
}

export default CreateVoteCore;
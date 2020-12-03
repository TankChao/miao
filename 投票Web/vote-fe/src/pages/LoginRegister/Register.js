import React from 'react'
import './Register.less'

import store from '../../redux/configureStore'
import { } from '../../redux/action/actionCreators.js'

import {
  Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber, Button
} from 'antd';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...this.state, ...store.getState() };
    this.handleStoreChange = this.handleStoreChange.bind(this);
    store.subscribe(this.handleStoreChange);
  }
  handleStoreChange() {
    this.setState(store.getState())
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="active">
        <div className="register_info">
          <Form {...formItemLayout}>
            <Form.Item
              label="用户名"
              help="用户名不得超过8个字"
              required
            >
              <Input placeholder="unavailable choice" id="error" />
            </Form.Item>

            <Form.Item
              label="密码"
              help="密码必须大于6位"
            >
              <Input.Password placeholder="unavailable choice" id="error" />
            </Form.Item>
            <Form.Item
              label="确认密码"
            >
              <Input.Password placeholder="unavailable choice" id="error" />
            </Form.Item>
            <Form.Item
              label="邮箱"
              type="email"
            >
              <Input type="email" placeholder="unavailable choice" id="error" />
            </Form.Item>
            <Form.Item
              label="验证码"
            >
              <Input placeholder="unavailable choice" id="error" />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 8 },
              }}>
              <Button type="primary" htmlType="submit">
                提交注册
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/* <Button type="primary" className="login_button">注册提交</Button>
        <span className="register_text"><a href={'http://localhost:3000/#/login'}>已有账号--点击登录--</a></span> */}
      </div>
    )
  }
}
export default Register;
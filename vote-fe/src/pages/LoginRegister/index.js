import React from 'react'
import { NavLink, Link, useRouteMatch, Redirect, Route, Switch } from 'react-router-dom'
import './index.less'

import store from '../../redux/configureStore'
import { } from '../../redux/action/actionCreators.js'

import Login from './Login.js'
import Register from './Register.js'
import SmallCarousel from './SmallCarousel.js'

class LoginRegister extends React.Component {
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
  onChange = e => {
  };
  render() {
    return (
      <div className="page-container">
        <div className="container">
          <div className="login-or-register">
            <div className="login-register-buttom">
              <NavLink to={`/login`}>账户登录</NavLink>
              <NavLink to={'/register'}>注册账号</NavLink>
            </div>

            <Switch>
              <Route path={'/login'}><Login /></Route>
              <Route path={'/register'}><Register /></Route>
            </Switch>

          </div>
          <div className="login-show">
            <h1><a href="/">派派投票</a></h1>
            <SmallCarousel path="/Login_and_register_carousel" className="carousel" />
          </div>
        </div>
      </div>
    )
  }
}
export default LoginRegister;
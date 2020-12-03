import React, { useState, useEffect } from 'react'
import { HashRouter, BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'

import store from './redux/configureStore'
import { getUserIsLogin, logoutUser } from './redux/action/actionCreators.js'

import Homepage from './pages/Homepage'
import Personal from './pages/Personal'
import ViewVote from './pages/ViewVote'
import CreateVote from './pages/CreateVote'
import LoginRegister from './pages/LoginRegister'




function VoteRouter() {


  var history = useHistory()
  var [userInfo, setUserInfo] = useState(false)
  useEffect(() => {
    const action = getUserIsLogin()
    store.dispatch(action)
    axios.get('/userinfo').then(res => {
      if (!res.data) {
      } else {
        setUserInfo(res.data)
      }
    }).catch(e => {
      console.log('用户未登录，将显示登陆界面')
    })
  }, [])

  /* useEffect(() => {
    axios.get('/userinfo').then(res => {
      console.log('------/userinfo  res', res)
      if (!res.data) {
      } else {
        const action = getUserIsLogin()
        store.dispatch(action)
        setUserInfo(res.data)
      }
    }).catch(e => {
      console.log('用户未登录，将显示登陆界面')
      history.push('/login')
    })
  }, []) */
  return (
    <React.Fragment>
      <HashRouter>
        <>
          {/* <p>{console.log('111111111+++++++', userInfo)}</p>    未登录 服务端返回的json*/}
          {
            userInfo.code !== 0 ?
              <Switch>
                <Route path="/" exact><Homepage /></Route>
                <Route path="/viewvote/:id" exact><ViewVote userInfo={userInfo} /></Route>
                <Route path="/createvote" exact><CreateVote /></Route>
                <Route path="/login" exact><LoginRegister url={'login'} /></Route>
                <Route path="/register" exact><LoginRegister url={'register'} /></Route>
                <Route path="/personal/center" exact><Personal /></Route>
                <Route path="/personal/myvote" exact><Personal /></Route>
                <Route path="/personal/revise/avatar" exact><Personal /></Route>
                <Route path="/personal/revise/username" exact><Personal /></Route>
                <Route path="/personal/revise/password" exact><Personal /></Route>
                <Route path="/personal/attention/voteinstructions" exact><Personal /></Route>
                <Route path="/personal/attention/agreement" exact><Personal /></Route>
                <Redirect to="/" />
              </Switch>
              :
              <Switch>
                <Route path="/viewvote/:id"><Redirect to="/login" /></Route>
                <Route path="/createvote"><Redirect to="/login" /></Route>
                <Route path="/register"><LoginRegister url={'register'} /></Route>
                <Route path="/personal"><Redirect to="/login" /></Route>
                <Route path="/login" exact><LoginRegister url={'login'} /></Route>
                <Route path="/" exact><Homepage /></Route>
              </Switch>
          }
        </>
      </HashRouter>
    </React.Fragment>
  );
}

export default VoteRouter;

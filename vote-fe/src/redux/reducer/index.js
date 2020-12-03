
import { USER_LOGIN_INFO, GET_CAROUSEL_IMG, GET_VOTECARD_INFO, Login_YESNO, HOLD_VOTE_IMG_URL, DEFAULT_VOTE_IMG_URL, VOTE_OPTIONS, HANDLE_OPTIONS, POST_CREATE_VOTE_INFO, RETURN_CREATE_STATE, LOGOUT_USER, UPLOAD_AVATAR_URL, DEFAULT_AVATAR_URL, CURRENT_AVATAR_URL } from '../action/actionTypes.js'

const defaultState = {
  votecard: [{}, {}, {}, {}, {}, {}],
}

// reducer 可以接受 state, 但是绝不能修改 state
// Reducer 必须是纯函数 
// --- 给定固定的输入，就一定会有固定的输出，而且不会有任何副作用

export default (state = defaultState, action) => {
  if (action.type === USER_LOGIN_INFO) {
    const newState = { ...state }
    if (action.data.code == 0) {
      newState.userInfo = false
      newState.loginYesNo = false
    } else {
      newState.loginYesNo = true
      newState.userInfo = action.data
    }
    return newState
  }
  if (action.type === GET_CAROUSEL_IMG) {
    const newState = { ...state }
    newState.carousel = action.data
    return newState
  }
  if (action.type === GET_VOTECARD_INFO) {
    const newState = { ...state }
    newState.votecard = action.data
    return newState
  }
  if (action.type === Login_YESNO) {
    const newState = { ...state }
    if (action.data.code === -1) {
      newState.loginedInfo = action.data
      newState.loginYesNo = false
    } else {
      newState.loginedInfo = action.data
      newState.loginYesNo = true
    }
    return newState
  }
  if (action.type === HOLD_VOTE_IMG_URL) {
    const newState = { ...state }
    newState.voteImg = action.data
    return newState
  }
  if (action.type === DEFAULT_VOTE_IMG_URL) {
    const newState = { ...state }
    newState.voteImg = action.data
    return newState
  }
  if (action.type === VOTE_OPTIONS) {
    const newState = { ...state }
    newState.voteOptions = action.data
    return newState
  }
  if (action.type === HANDLE_OPTIONS) {
    const newState = { ...state }
    newState.voteOptions = action.data
    console.log('option-store::::::::::::', action.data)
    return newState
  }
  if (action.type === RETURN_CREATE_STATE) {
    const newState = { ...state }
    newState.returnCreateState = action.data
    console.log('newState.returnCreateState:::', newState.returnCreateState)
    return newState
  }

  if (action.type === LOGOUT_USER) {
    const newState = { ...state }
    newState.userInfo = action.data
    console.log('newState.returnCreateState:::', newState.returnCreateState)
    return newState
  }
  if (action.type === UPLOAD_AVATAR_URL) {
    const newState = { ...state }
    newState.voteImg = action.data
    return newState
  }
  if (action.type === DEFAULT_AVATAR_URL) {
    const newState = { ...state }
    newState.defaultAvatar = action.data
    return newState
  }
  if (action.type === CURRENT_AVATAR_URL) {
    const newState = { ...state }
    newState.userInfo.avatar = action.data
    console.log('store+++newstate+++avatar', newState)
    return newState
  }
  if (action.type === 'REVISE_NAME') {
    const newState = { ...state }
    newState.userInfo.name = action.name
    return newState
  }
  return { ...state };
}
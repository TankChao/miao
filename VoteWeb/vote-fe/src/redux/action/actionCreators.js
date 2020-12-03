import { USER_LOGIN_INFO, GET_CAROUSEL_IMG, GET_VOTECARD_INFO, Login_YESNO, HOLD_VOTE_IMG_URL, DEFAULT_VOTE_IMG_URL, VOTE_OPTIONS, HANDLE_OPTIONS, POST_CREATE_VOTE_INFO, RETURN_CREATE_STATE, LOGOUT_USER, UPLOAD_AVATAR_URL, DEFAULT_AVATAR_URL, CURRENT_AVATAR_URL } from './actionTypes.js'
import axios from 'axios'
import store from '../configureStore/index.js'

export const userLoginInfo = (data) => ({
  type: USER_LOGIN_INFO,
  data
})
export const getUserIsLogin = () => {
  return (dispatch) => {
    axios.get('/userinfo').then((res) => {
      const data = res.data;
      const action = userLoginInfo(data);
      dispatch(action)
    })
  }
}

export const getCarouselImg = (data) => ({
  type: GET_CAROUSEL_IMG,
  data
})
export const getCarousel = (path) => {
  return (dispatch) => {
    axios.get(path).then((res) => {
      const data = res.data;
      const action = getCarouselImg(data);
      console.log('action', action)
      dispatch(action)
    })
  }
}

export const getVoteCardInfo = (data) => ({
  type: GET_VOTECARD_INFO,
  data
})
export const getVoteCard = () => {
  return (dispatch) => {
    axios.get('/getvotecard').then((res) => {
      const data = res.data;
      const action = getVoteCardInfo(data);
      dispatch(action)
    })
  }
}

export const logined = (data) => ({
  type: Login_YESNO,
  data
})
export const login = (loginData) => {
  return (dispatch) => {
    axios.post('/login', loginData).then((res) => {
      const data = res.data;
      const action = logined(data);
      dispatch(action)
    })
  }
}

export const defaultVoteImgUrl = () => ({
  type: DEFAULT_VOTE_IMG_URL,
  data: 'http://localhost:8081/resources/vote_img/default.png'
})
export const holdVoteImgUrl = (data) => ({
  type: HOLD_VOTE_IMG_URL,
  data
})

export const voteOptions = () => ({
  type: VOTE_OPTIONS,
  data: ['', '']
})
export const handleOptions = (data) => ({
  type: HANDLE_OPTIONS,
  data
})

export const postCreateVoteInfo = (data) => {
  return (dispatch) => {
    axios.post('/createvote', data).then((res) => {
      const data = res.data
      // data = {voteId: '',code: ''}
      const action = returnCreateState(data)
      dispatch(action)
    })
  }
}
export const returnCreateState = (data) => ({
  type: RETURN_CREATE_STATE,
  data
})



export const logoutUser = (data) => ({
  type: LOGOUT_USER,
  data
  /* data 传进来为 undefined */
})

export const defaultAvatarUrl = () => ({
  tyoe: DEFAULT_AVATAR_URL,
  data: 'http://localhost:8081/uploads/default-avatar.png'
})

export const currentAvatarUrl = (data) => ({
  type: CURRENT_AVATAR_URL,
  data
})








import {apiUser} from '@/common/api.js'
// action也是函数
export function setPageTitle (data) {
  return dispatch => {
    setTimeout( () => {
      dispatch({ type: 'SET_PAGE_TITLE', data: data })
    },2000)
  }
}

export function setUser (data) {
  return (dispatch, getState)  => {
      apiUser.getUser({}).then(r=>{
        setTimeout( ()=>{
          dispatch({ type: 'SET_USER', data: r.resultData })},2000
        )
      })
    }

}
  
export function settodos (data) {
  return {}
}
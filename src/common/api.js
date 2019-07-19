import $http from './request'
import { API } from './config'

//用户信息
export const apiTask = {
  getList(data){
    return $http.post(`${API}/queryTargetList`,data)
  },
  taskReset(data){
    return $http.post(`${API}/rebuildTarget`,data)
  },
  taskDetail(data){
    return $http.get(`${API}/queryTargetDetail`,data)
  }
}

export const apiUser = {
  getList(data){
    return $http.post(`/react/api/mock/about`,data)
  },
  change(data){
    return $http.post(`/react/api/mock/update`,data)
  },
  create(data){
    return $http.post(`/react/api/mock/create`,data)
  },
  search(data){
    return $http.get(`/react/api/mock/search`,data)
  },
  getUser(data){
    return $http.get(`/react/api/mock/userInfo`,data)
  }
}
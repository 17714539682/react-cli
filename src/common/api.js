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
    return $http.post(`${API}/queryConfigList`,data)
  },
  change(data){
    return $http.get(`${API}/addConfig`,data)
  }
}
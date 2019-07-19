import Axios from 'axios'
// import Qs from 'qs'

// 添加请求拦截器
Axios.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// 建立请求
const request = (method, url, options) => {
    const params = {}
    let option = Object.assign({},params,options)

    options = method === 'get' ? { params: option } : {data:option}

    let config = Object.assign({}, {
      method, url
    }, options)

    if (method === 'post') {
        config.headers = Object.assign({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, config.headers)
    } 
  
    return new Promise((resolve, reject) => {
      Axios(url, config).then(result => {
            resolve(result.data)
        }).catch(err => {
            reject(err)
        })
    })
  }
  // 导出
  export default {
    get(url, config) {
      return request('get', url, config)
    },
    post(url, config) {
      return request('post', url, config)
    }
  }

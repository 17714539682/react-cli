//API环境
const Edition = process.env.NODE_ENV 
let Api_URL = ''

switch(Edition){
  case 'production':
      Api_URL = 'http://eip.htsc.com.cn/htsc-fic/rss/api'
      break;
  default:
      Api_URL = 'http://168.61.9.234:9090/htsc-fic-target-service'
}

// 导出请求地址
export const API = Api_URL
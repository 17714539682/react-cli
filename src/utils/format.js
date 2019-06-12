// 方法
const tool = {
    addZero(str) {
      return ('00' + str).substring(str.length)
    }
  }
  
  // 时间格式处理
  export default (date, format) => {
    if (!date || !format) return
  
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      let reg = new RegExp(`(${k})`)
      if (reg.test(format)) {
        let str = o[k] + ''
        format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : tool.addZero(str))
      }
    }
    if(format.indexOf('午')>-1){
        console.log(format.replace('午',o['h+']<12 ? '上午' : '下午'));
        
        return format.replace('午',o['h+']<12 ? '上午' : '下午')
    }
    return format
  }
  
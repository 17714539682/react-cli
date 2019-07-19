let initState = {
    user:{name:null},
    newsDetail:{
      pageTitle: '首页',
      user:'admin'
    },
    
    todos: [
      {
        id: parseInt(Math.random() * 10000000),
        isComplete: false,
        title: '学习redux'
      }, {
        id: parseInt(Math.random() * 10000000),
        isComplete: true,
        title: '学习react'
      }, {
        id: parseInt(Math.random() * 10000000),
        isComplete: false,
        title: '学习node'
      }
    ]
  };

export default initState
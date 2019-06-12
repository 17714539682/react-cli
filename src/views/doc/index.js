import React, { Component } from 'react';
import { Form, Input,Table, Button,Modal,notification } from 'antd';
import './scss/index.scss'
import { apiUser } from '@/common/api.js'
//搜索表单
class AdvancedSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {
        phone: '',
        email: ''
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  //数据绑定
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let obj = Object.assign({}, this.state.search, { [name]: value })
    this.setState({
      search: obj
    });
  }
  //重置
  handleReset = () => {
    let obj = Object.assign({}, this.state.search, { phone: '', email: '' })
    this.setState({
      search: obj
    });
  };
  //搜索
  handleSearch = () => {
    this.props.search(this.state.search);
  }

  render() {
    return (
      <form className="search">
        <label>
          手机号:
          <input
            name="phone"
            type="text"
            value={this.state.search.phone}
            autoComplete="off"
            onChange={this.handleInputChange} />
        </label>
        <label>
          邮箱:
          <input
            name="email"
            type="text"
            autoComplete="off"
            value={this.state.search.email}
            onChange={this.handleInputChange} />
        </label>
        <div className="btn">
          <Button type="primary" onClick={this.handleSearch}>
            搜索
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
            重置
          </Button></div>
      </form>

    );
  }
}

//新增、修改
const CollectionCreateForm = Form.create({ name: 'advanced_search' })(
class extends React.Component {
  sub = ()=>{
    const dataForm = this.props.form.getFieldsValue();
    this.props.taskDetail.id && (dataForm.id = this.props.taskDetail.id);
    
    return dataForm;
  }
  render() {
    const { visible, taskDetail,onCancel,onCreate} = this.props;
    const title = taskDetail ? '修改' : '新增';
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        visible={visible}
        className="showDetail"
        title={`${title}用户信息`}
        onCancel={onCancel}
        onOk={()=>onCreate(this.sub())}
        destroyOnClose={true}
      >
          <Form className="ant-advanced-search-form">
            <Form.Item label="手机号">
            {getFieldDecorator('phone',{initialValue:taskDetail.phone || ""})(
              <Input placeholder={'请输入'}/>
            )}
            </Form.Item>
            <Form.Item label="邮箱">
            {getFieldDecorator('email',{initialValue:taskDetail.email || ""})(
              <Input placeholder={'请输入'}/>
            )}
            </Form.Item>
          </Form>
      </Modal>
    );
  }
}
)

export default class test extends Component {
  state = {
    selectedRowKeys: [],
    visible: false,
    listFlag: false,
    taskDetail: '',
    data: [],
    total: 0,
    columns: [
      {
        title: '序号',
        dataIndex: 'index'
      },
      {
        title: '手机号',
        dataIndex: 'phone'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: 100,
        fixed: 'right',
        render: (text, record) =>
          this.state.data.length >= 1 ? (
            <Button size="small" icon="edit" className="edit" onClick={() => this.edit(text, record)}>修改</Button>
          ) : null,
      },
    ]

  };

  //dom完成
  componentDidMount() {
    this.getList()
  }
  //请求列表数据
  getList = (data) => {
    this.setState({
      listFlag: true
    })
    let arr = { pageNum: 1, pageSize: 10 }
    Object.assign(arr, data)
    apiUser.getList(arr).then(r => {
      this.setState({
        listFlag: false
      })
      if (r.code === "0" && r.resultData) {
        r.resultData.records.forEach((item, index) => {
          item.key = index;
          item.index = (r.resultData.page - 1) * r.resultData.pageSize + index + 1
        })
        this.setState({
          data: r.resultData.records,
          total: r.resultData.totalRecords
        })
      }
    })
  }
  add = ()=>{
    this.setState({ 
      visible: true
    });
  }
  edit = (text,record) => {
    this.setState({ 
      visible: true,
      taskDetail:record || {}
    });
  }
  //任务选择事件
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
  //分页切换事件
  changeSize = (pageNum, pageSize) => {
    this.getList({ pageNum, pageSize })
  }
  //详情页
  handleCancel = () => {
    this.setState({ visible: false ,taskDetail:{}});
  };
  //新增、修改用户信息
  handleCreate = (r) =>{
    console.log(r);
    apiUser.change(r).then(res=>{
      if(res.code === '0'){
        this.setState({ visible: false ,taskDetail:{}});
        notification.success({
          message: '成功',
          description:'操作成功',
          duration: 2,
        });
        this.getList()
      }else{
        notification.error({
          message: '失败',
          description:res.msg,
          duration: 2,
        });
      }
    })
    

  }
  render() {
    return (

      <div id="test-container">
        <AdvancedSearchForm search={this.getList} />
        <div style={{ marginBottom: 16 ,marginTop:16}}>
          <Button type="primary" icon="plus" onClick={this.add}>
            新增
          </Button>
        </div>
        <Table columns={this.state.columns} loading={this.state.listFlag} pagination={{
          showTotal: (total) => `共 ${total} 条数据`,
          showSizeChanger: true,
          size: 'small',
          pageSize: 10,
          total: this.state.total,
          pageSizeOptions: ['10', '20', '50'],
          showQuickJumper: true,
          onShowSizeChange: this.changeSize,
          onChange: this.changeSize
        }} dataSource={this.state.data}
        />

        <CollectionCreateForm
          taskDetail={this.state.taskDetail}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

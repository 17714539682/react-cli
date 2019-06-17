import React, { Component } from 'react';
import { Form, Input,Table, Button,Modal,message } from 'antd';
import styles from './index.scss'
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
    this.props.search({ phone: '', email: '' })
  };
  //搜索
  handleSearch = () => {
    this.props.search(this.state.search);
  }

  render() {
    return (
      <form className={styles.search}>
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
            查询
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
    this.props.form.validateFields(err => {
      if (!err) {
        const dataForm = this.props.form.getFieldsValue();
        this.props.taskDetail.id && (dataForm.id = this.props.taskDetail.id);
        apiUser.change(dataForm).then(res=>{
          if(res.code === '0'){
            message.success("保存成功");
            this.props.onCreate();
          }else{
            message.error(res.msg);
          }
        })
      }
    })
  }
  render() {
    const { visible, taskDetail,onCancel} = this.props;
    const title = taskDetail ? '修改' : '新增';
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        visible={visible}
        className="showDetail"
        title={`${title}用户信息`}
        onCancel={onCancel}
        onOk={this.sub}
        destroyOnClose={true}
        okText='保存'
      >
          <Form className="ant-advanced-search-form">
            <Form.Item label="手机号">
            {getFieldDecorator('phone',{initialValue:taskDetail.phone || "",
                rules: [{
                  required: true,
                  message: '请输入内容'
                }, {
                    validator: (rule, val, callback) => {
                      if (!val) {
                          callback();
                      }
                      var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                      if (!myreg.test(val)) {
                          callback('请输入正确的内容！');
                      }
                      callback();
                  }
                }]
              }
            )(
              <Input placeholder={'请输入'} autoComplete="off"/>
            )}
            </Form.Item>
            <Form.Item label="邮箱">
            {getFieldDecorator('email',{initialValue:taskDetail.email || "",
            rules: [{
              required: true,
              message: '请输入内容'
            }, {
                validator: (rule, val, callback) => {
                  if (!val) {
                      callback();
                  }
                  
                  var myreg1=/^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                  if (!myreg1.test(val)) {
                      callback('请输入正确的内容！');
                  }
                  callback();
              }
            }]})(
              <Input placeholder={'请输入'} autoComplete="off"/>
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
            <a href="javascript:void(0);" onClick={() => this.edit(text, record)}>修改</a>//eslint-disable-line
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
  handleCreate = () =>{
    this.setState({ visible: false ,taskDetail:{}});
    this.getList()
  }
  render() {
    return (

      <div className={styles.user}>
        <AdvancedSearchForm search={this.getList} />
        <div className={styles.tableuser}>
          <Button type="primary" icon="plus" onClick={this.add}>
            新增
          </Button>
        
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
        </div>
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

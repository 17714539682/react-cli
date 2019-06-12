import React from 'react';
import './add.scss'
import format from '@/utils/format.js'
import {apiTask} from '@/common/api.js'

import { Table, Button, Form, Input, Select, DatePicker,notification,Modal} from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;

// 列表条件搜索
class AdvancedSearchForm extends React.Component {
  //搜索
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(values.data){
        values.startTime = format(values.data[0]._d,'yyyy-MM-dd');
        values.endTime = format(values.data[1]._d,'yyyy-MM-dd');
      }else{
        values.startTime = "";
        values.endTime = "";
      }
      let {data,...obj} = values;
      this.props.MakeMoney(obj);
    });
  };
  //重置
  handleReset = () => {
    this.props.form.resetFields();
    this.props.MakeMoney()
  };
  //下拉框选择
  handleChange = (value,key) => {
    this.props.form.validateFields((err, values) => {
      if(values.data){
        values.startTime = format(values.data[0]._d,'yyyy-MM-dd');
        values.endTime = format(values.data[1]._d,'yyyy-MM-dd');
      }else{
        values.startTime = "";
        values.endTime = "";
      }
      let {data,...obj} = values;
      obj[value] = key;
      this.props.MakeMoney(obj);
    });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Form.Item label="公司编码">
        {getFieldDecorator('comCode',{initialValue:""})(
          <Input placeholder={'请输入'}/>
        )}
        </Form.Item>
        <Form.Item label="报表类型">
        {getFieldDecorator('reportType',{initialValue:""})(
          <Select style={{ width: 100 }} onChange={this.handleChange.bind(null,'reportType')} >
            <Option value="">全部</Option>
            <Option value="1">一季度</Option>
            <Option value="6">中报</Option>
            <Option value="9">三季度</Option>
            <Option value="12">年报</Option>
          </Select>
          )}
          </Form.Item>
        
        <Form.Item label="计算结果">
        {getFieldDecorator('result',{initialValue:""} )(
          <Select style={{ width: 80 }} onChange={this.handleChange.bind(null,'result')}>
            <Option value="">全部</Option>
            <Option value="1">成功</Option>
            <Option value="2">失败</Option>
          </Select>
          )}</Form.Item>
        <Form.Item label="查询范围">
        {getFieldDecorator('data')(
          <RangePicker format='YYYY-MM-DD'/>)}
        </Form.Item>
        <div className="btn">
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
            重置
          </Button></div>
      </Form>)
  }
}
const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);
//详情弹窗
class CollectionCreateForm extends React.Component {
  render() {
    const { visible, onCancel, taskDetail } = this.props;
    return (
      <Modal
        visible={visible}
        className="showDetail"
        title="任务详情"
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>关闭</Button>
        ]}
      >
        <table>
          <tbody>
            {taskDetail.secuCode && <tr><td>证券编码</td><td>{taskDetail.secuCode}</td></tr>}
            {taskDetail.tradingCode && <tr><td>交易代码</td><td>{taskDetail.tradingCode}</td></tr>}
            {
              Object.keys(taskDetail).filter(key => {
                return key.includes("para")
              }).map(key => {
                return <tr key={key}><td>{key.replace('para','段落')}</td><td>{taskDetail[key]}</td></tr>
              })
            }
          </tbody>
        </table>
      </Modal>
    );
  }
}

export default class table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      loading: false,
      visible: false,
      listFlag:false,
      taskDetail:'',
      data: [],
      total:0,
      columns : [
        {
          title: '公司编码',
          dataIndex: 'comCode',
          width: 90,
        },
        {
          title: '报表类型',
          dataIndex: 'reportType',
          width: 80,
          render:(text)=>{
            if(text === 1 || text===9){
              return '季报'
            }else{
              return '年报'
            }
          }
        },
        {
          title: '开始时间',
          dataIndex: 'startDate',
          width: 150,
          render:(text)=>{
            return format(new Date(text),'yyyy-MM-dd hh:mm:ss')
          }
        },
        {
          title: '结束时间',
          dataIndex: 'endDate',
          width: 150,
          render:(text)=>{
            return format(new Date(text),'yyyy-MM-dd hh:mm:ss')
          }
        },
        {
          title: '创建时间',
          dataIndex: 'entryTime',
          width: 150,
          render:(text)=>{
            return format(new Date(text),'yyyy-MM-dd hh:mm:ss')
          }
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
          width: 150,
          render:(text)=>{
            return format(new Date(text),'yyyy-MM-dd hh:mm:ss')
          }
        },
        {
          title: '计算结果',
          dataIndex: 'result',
          width: 100,
          render:(value)=>{
            return value === 1 ? '成功' : value === 2 ? '失败' : '-'
          }
        },
        {
          title: '备注',
          dataIndex: 'msg',
          width: 100,
          render:(value)=>{
            return value || '-'
          }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          width: 100,
          fixed: 'right',
          render: (text, record) =>
            this.state.data.length >= 1 ? (
              <Button size="small" icon="file-text" className="detail" onClick={() => this.showDetail(text, record)}>详情</Button>
            ) : null,
        },
      ]
    }
  }
  //dom完成
  componentDidMount(){
    this.getList()
  }
  //请求列表数据
  getList = (data) =>{
    this.setState({
      listFlag:true
    })
    let arr = {pageNum: 1,pageSize: 10}
    Object.assign(arr,data)
    apiTask.getList(arr).then(r=>{
      this.setState({
        listFlag:false
      })
      if(r.code === "0" && r.resultData){
        r.resultData.records.forEach((item,index)=>{
          item.key = index
        })
        this.setState({
          data:r.resultData.records,
          total:r.resultData.totalRecords
        })
      }
    })
  }
  //任务重做
  start = () => {
    this.setState({ loading: true });
    let arr = this.state.data.filter((item, index) => {
      if (this.state.selectedRowKeys.includes(index)) {
        return item
      }else{
        return ''
      }
    })
    let arr1 = arr.map(item=>{
      return item.recordId
    }).join(',')
    apiTask.taskReset({recordId:arr1}).then(r=>{
      if(r.code === '0'){
        notification.success({
          message: '成功',
          description:'任务重置成功',
          duration: 2,
        });
        this.setState({
          selectedRowKeys: [],
          loading: false,
        });
      }
    })
  };
  //展示详情
  showDetail = (text, record) => {
    let data = {
      recordId: 4444418346,
      reportType:record.reportType
    }
    apiTask.taskDetail(data).then(r=>{
      if(r.code === "0"){
        this.setState({ 
          visible: true,
          taskDetail:r.resultData || {}
        });
      }
    })
  };
  //任务选择事件
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
  //分页切换事件
  changeSize = (pageNum,pageSize)=>{
    this.getList({pageNum,pageSize})
  }
  //详情页关闭
  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div className="search">
          <WrappedAdvancedSearchForm MakeMoney={this.getList}/>
        </div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
            重置
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `选中 ${selectedRowKeys.length} 项` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={this.state.columns} loading={this.state.listFlag} scroll={{ x: 1500 }} pagination={{
          showTotal: (total) => `共 ${total} 条数据`,
          showSizeChanger: true,
          size: 'small',
          pageSize: 10,
          total:this.state.total,
          pageSizeOptions: ['10', '20', '50'],
          showQuickJumper: true,
          onShowSizeChange:this.changeSize,
          onChange:this.changeSize
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
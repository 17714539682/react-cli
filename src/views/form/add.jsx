import { Table, Button } from 'antd';
import React from 'react';

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

export default class table extends React.Component {
  
  constructor(props) {
    super(props);
    this.columns=[
      {
        title: '名字',
        dataIndex: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },
      {
        title: '地址',
        dataIndex: 'address',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text,record) =>
          data.length >= 1 ? (
            <Button onClick={() => this.handleDelete(record)}> 编辑</Button>
          ) : null,
      },
    ];
  
  this.state = {
    selectedRowKeys: [], 
    loading: false,
    data:data
  }
}
  handleDelete = key => {
    console.log(key);
    
    // key = key.key;
    const data= [...this.state.data];
    this.setState({ data: data.filter(item => item.key !== key.key) });
  };
  start = () => {
    this.setState({ loading: true });
    let arr = data.filter((item,index)=>{
      if(this.state.selectedRowKeys.includes(index)){
        return item
      }
      return ''
    })
    console.log(arr)
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
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
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={this.columns} pagination={{
                                                    showTotal:(total, range) => `共 ${total} 条数据`,
                                                    showSizeChanger:true,
                                                    size:'small',
                                                   pageSize: 10,
                                                   total: 50,
                                                   pageSizeOptions:['10','20','50'],
                                                   showQuickJumper:true
                                                   }} dataSource={data} />
      </div>
    );
  }
}
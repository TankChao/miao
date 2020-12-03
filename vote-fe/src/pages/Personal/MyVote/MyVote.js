import React, { useState, useEffect } from 'react'
import Highlighter from 'react-highlight-words';
import './MyVote.less'
import { NavLink, Link, useRouteMatch, Redirect, Route, Switch, useHistory } from 'react-router-dom'

import store from '../../../redux/configureStore'
import { } from '../../../redux/action/actionCreators.js'
import axios from 'axios'




import { Button, Input, Popconfirm, Space, Layout, Table, Menu, Breadcrumb } from 'antd';
import { SearchOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined, } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;


const getRandomuserParams = params => {
  if (Object.keys(params) == 0) {
    return {
      results: params.pagination,
      page: params.pagination,
      ...params,
    };
  }
  return {
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params,
  };
};


class MyVote extends React.Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
    loading: false,
    searchText: '',
    searchedColumn: '',

  };

  componentDidMount() {
    const { pagination } = this.state;
    this.AxiosGet({ pagination })
    axios.get('myvote').then((res => {
      this.setState({
        ...this.setState,
        data: res.data
      })
    }))
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.AxiosGet({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };


  /***
   *  @params {results:'', page:'', sortField:'', sortOrder: '', ...filters,}
   */
  AxiosGet = (params = {}) => {
    this.setState({ loading: true });
    axios.get('myvote', {
      data: getRandomuserParams(params),
    }).then(res => {
      this.setState({
        loading: false,
        data: res.data,
        pagination: {
          ...params.pagination,
          total: this.state.data.length,
        },
      })
    })
  }



  // 检索
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
          text
        ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };


  //
  goVote = (text, record) => {
    let url = '' + document.location.origin + '/#/ViewVote/' + text.id
    console.log("url text", url)
    window.location = url
    //window.open(url)
  }
  deleteVote = id => {
    console.log('vvv', id)
    axios.post('/deleteVote', { deleteVoteId: id }).then(res => {
      this.AxiosGet()
    })
  }
  cancel = (e) => {
    console.log('xxx', e);
  }

  render() {

    const { data, pagination, loading } = this.state
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        width: '5%',
        align: 'center',
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: '20%',
        ...this.getColumnSearchProps('title'),
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: '20%',
      },
      {
        title: '截止时间',
        dataIndex: 'deadline',
        key: 'deadline',
        width: '20%',
      },
      {
        title: '状态',
        dataIndex: 'condition',
        key: 'condition',
        filters: [
          { text: '已完成', value: '已完成' },
          { text: '进行中', value: '进行中' },
        ],
        filterMultiple: false,
        width: '20%',
        align: 'center',

      },
      {
        title: '行为',
        dataIndex: '',
        key: 'x',
        render: (text, record) => {
          return (<>
            <Button onClick={() => this.goVote(text)} danger>查看</Button>
            <Popconfirm title="确实删除?" onConfirm={() => this.deleteVote(text.id)} onCancel={this.cancel} okText="Yes" cancelText="No" >
              <Button danger>删除</Button>
            </Popconfirm>
          </>)
        },
        width: '20%',
        align: 'center',
      },
    ];
    //console.log('data:::', data)
    return (
      <>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>我的投票</Breadcrumb.Item>
        </Breadcrumb>
        <p>共 {data.length} 条</p>
        <div className="myvote-container" style={{ padding: 24, minHeight: 360 }}>
          <Table
            columns={columns}
            rowKey={record => record.id}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={this.handleTableChange}
          />
        </div>

      </>
    )
  }
}


export default MyVote;
import React, { useEffect, useState, useRef, Suspense } from 'react';
import { Space, Table } from 'antd';
import { Input, Select, Button, Drawer, message, Popconfirm, Dropdown } from 'antd';
import { SearchOutlined, DownOutlined, PlusOutlined  } from '@ant-design/icons';

import { useTranslation } from "react-i18next";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Highlighter from 'react-highlight-words';
import global_config from '../../global';



const App = () => {
  const [data, setData] = useState();
  //let data = []
  const action = useRef(null)

  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const navigate = useNavigate();


    
  const fetchData = () => {
    setLoading(true);
    let token = JSON.parse(localStorage.getItem('token'));
    axios.post(global_config.root_url +'/auth/get_users', {}, { 
        headers: {
          "Authorization" : `Bearer ${token}`} 
                  })
        .then((response) => {
          
          // login success
          if (response.data.status === 0) {
            // console.log('request data success')
            console.log(response.data.message)
            const raw_data = response.data.message
            const processed = raw_data.map((value) => {
              return {
                key: value.id,
                username: value.username,
                company: value.company,
                email: value.email,
                createTime: value.createTime,
                recentTime: value.recentTime,
                verify: value.verify === "1" ? "on":"off"
              }
            })
            setData(processed)
            setLoading(false)
            setTableParams({
              ...tableParams,
              pagination: {
                ...tableParams.pagination,
              }
            })
          } else if (response.data.status === 2) {
              // status:2 means jwt error or expire
              navigate("/login", {
                replace: true,
              })
          } else if (response.data.status === 3) {
            // status:2 means jwt error or expire
            alert("非管理员权限")
        }
          // login fail
          else {
            alert("error: please contact ssbti for support")
          }
  
        })
        .catch((error) => {
          if (error.response) {
            // console.log(error.response)
          } else if (error.request) {
            // console.log('network error')
          } else {
            // console.log(error)
          }
        })

      }

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination.pageSize) {
      setData([]);
      //data = []
    }
  };






  const { t } = useTranslation();



  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };



  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });




  const columns = [
    {
      title: t('username'),
      dataIndex: 'username',
      width: 150,
      fixed: "left",
      key: 'username',
      ...getColumnSearchProps('username'),
    },
    {
      title: t('company'),
      dataIndex: 'company',
      width: 100,
      key: 'company',
    },
    {
      title: t('email'),
      dataIndex: 'email',
      width: 150,
      key: 'email',
    },
    {
      title: t('createTime'),
      dataIndex: 'createTime',
      width: 150,
      key: 'createTime',
    },
    {
      title: t('recentTime'),
      dataIndex: 'recentTime',
      width: 150,
      key: 'recentTime',
    },
    {
      title: t('verify'),
      dataIndex: 'verify',
      width: 150,
      key: 'verify',
    },
    {
      title: t('user_operation'),
      key: 'user_operation',
      fixed: 'right',
      width: 100,
      render: ( _, record) => (
        <div>
        <Button type="primary" onClick={approveAccess(record)}> {t('approveAccess')} </Button> 
        <Button onClick={removeAccess(record)}> {t('removeAccess')} </Button> 
        </div>

      ),
    },

    ];


    const removeAccess = (record) => () => {
      // // console.log(p_index, "start")
      setLoading(true);
      let token = JSON.parse(localStorage.getItem('token'));
      const url = global_config.root_url +`/auth/removeAccess`
    
      axios.post(url, {index: record.key}, { 
          headers: {
            "Authorization" : `Bearer ${token}`} 
                    })
          .then((response) => {
            // console.log(response)
            //  success
            if (response.data.status === 0) {
              // console.log('delete product success')

              fetchData()

            } else if (response.data.status === 2) {
                // status:2 means jwt error or expire
                navigate("/login", {
                  replace: true,
                })
            }
            else if (response.data.status === 3) {
              // status:2 means jwt error or expire
              navigate("/", {
                replace: true,
              })
          }
            //  fail
            else {
              alert("error: please contact ssbti for support")
            }
          })
          .catch((error) => {
            if (error.response) {
              // console.log(error.response)
            } else if (error.request) {
              // console.log('network error')
            } else {
              // console.log(error)
            }
          })

  
    }

    
    const approveAccess =  (record) => () => {

      setLoading(true);

      let token = JSON.parse(localStorage.getItem('token'));
      const url = global_config.root_url +`/auth/approveAccess`
    
      axios.post(url, {index: record.key}, { 
          headers: {
            "Authorization" : `Bearer ${token}`} 
                    })
          .then((response) => {
            // console.log(response)
            //  success
            if (response.data.status === 0) {
              console.log('approve success')

              fetchData()

            } else if (response.data.status === 2) {
                // status:2 means jwt error or expire
                navigate("/login", {
                  replace: true,
                })
            } else if (response.data.status === 3) {
              // status:2 means jwt error or expire
              navigate("/", {
                replace: true,
              })
          }
            //  fail
            else {
              alert("error: please contact ssbti for support")
            }
          })
          .catch((error) => {
            if (error.response) {
              // console.log(error.response)
            } else if (error.request) {
              // console.log('network error')
            } else {
              // console.log(error)
            }
          })

  
    }







  useEffect(() => {

    fetchData()

  }, [JSON.stringify(tableParams)])

  return (

    <div>
      <h1
      style={{
        fontSize: 20
      }}>
      {t('user_operation')}
      </h1>

      <Table 
        columns={columns} 
        dataSource={data}
        rowKey={(record) => record.key}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{
          y: '60vh',
        }} />

      </div>
    )
  };
export default App;
import React, { useEffect, useState, useRef, Suspense } from 'react';
import { Space, Table } from 'antd';
import { Input, Select, Button, Drawer, message, Popconfirm, Dropdown, Col, Row} from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import { useTranslation } from "react-i18next";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import global_config from '../../global';



const App = (props) => {
  const params = {...props}
  // console.log('table', params)

  let atransportation = params.factor_id == "factor_db_basic" ? false : true
  // console.log("transportation", atransportation)

  const [transportation, setTransportation] = useState(atransportation)

  const [rawData, setRawData] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [factor_database, setFactor_database] = useState("all");
  const [factor_name, setFactor_name] = useState();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });


  const navigate = useNavigate();

  const addFactor = ( record ) => () => {
    console.log(record, rawData)
    let raw = rawData.filter((data) => {
      if (data.id == record.key) {
        
        let combined = {...data, ...record}
        if (combined.second == null) {
          combined = {...data, ...record, second:data.p_unit.split("#")[1]}
        }
        console.log(combined)
        return combined
      }

    })
    // console.log(raw, "factor table")
    raw[0].factor_name = record.factor_name
    //params.setBasic(true)
    params.setFactor( raw[0])

  }

  const fetchData = () => {
    setLoading(true);
    let token = JSON.parse(localStorage.getItem('token'));
    axios.post(global_config.root_url+`/auth/getfactor_public_private`, 
        {factor_database:factor_database, factor_name: factor_name, transportation: transportation},
        { 
          headers: {
            "Authorization" : `Bearer ${token}`} 
                    })
        .then((response) => {
          console.log(response)
          // login success
          if (response.data.status === 0) {
            let raw_data = response.data.data
            setRawData(raw_data)
            // console.log(raw_data)
            let product_data = raw_data.filter((data) => {
              if (data.property === 'private') {
                return true
              }
            })
            console.log('product factor', product_data)

            raw_data = raw_data.filter((data)=> {
              if (data.property === 'public') {
                return true
              }
            })

            let product_processed = product_data.map((data) => {
              return {
                key: data.id,
                factor_name: data.p_name + data.p_model,
                factor_unit: data.p_unit.split('#')[1],
                factor_owner: "custom",
                factor_location: "unknown",
                factor_time: data.p_time_range
              }
            })

            let processed = raw_data.map((data) => {
              return {
                key: data.id,
                factor_name: data['1级分类\n（Level 1）'] + data['2级分类\n（Level 2）'] + data['3级分类\n（Level 3）'],
                factor_unit: data['上游排放单位\n（Unit）'] != 0 ? data['上游排放单位\n（Unit）'] : data['下游排放单位\n（Unit）'] ,
                factor_owner: "CPCD",
                factor_location: "中国",
                factor_time: data['数据时间\n（Year）']
              }
            })
            processed = processed.concat(product_processed)

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

  useEffect(() => {
    
    fetchData()

  }, [JSON.stringify(tableParams), transportation ])


  const handleTableChange = (pagination, filters, sorter) => {

    // console.log('params', pagination, filters, sorter);

    setTableParams({
      pagination,
    });

    

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination.pageSize) {
      setData([]);
    }
  };




  const options = [
    {
      value: 'all',
      label: 'all',
    },
    {
      value: 'CPCD',
      label: 'CPCD',
    },
    {
      value: 'IPCC',
      label: 'IPCC',
    },
  ];



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
            {t('search')}
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            {t('reset')}
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            {t('cancel')}
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
      title: t('factor_name'),
      dataIndex: 'factor_name',
      width: 150,
      fixed: "left",
      key: 'factor_name',
      ...getColumnSearchProps('factor_name'),
    },
    {
      title: t('factor_unit'),
      dataIndex: 'factor_unit',
      width: 100,
      key: 'factor_unit',
    },
    {
      title: t('factor_owner'),
      dataIndex: 'factor_owner',
      width: 150,
      key: 'factor_owner',
    },
    {
      title: t('factor_location'),
      dataIndex: 'factor_location',
      width: 150,
      key: 'factor_location',
    },
    {
      title: t('factor_time'),
      dataIndex: 'factor_time',
      width: 150,
      key: 'factor_time',
    },
    {
      title: t('product_operation'),
      key: 'product_operation',
      fixed: 'right',
      width: 100,
      render: ( _, record) => (
        <>
        <Button type='link'  onClick={clickDetail(record)}>{t('factor_detail')}</Button>
        <Button  type="primary" onClick={addFactor(record)}>{t('confirm')}</Button>
        </>
      ),
    },


      // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    //#endregion
    ];


    const clickDetail = (record) => () => {
      let raw = rawData.filter((data) => {
        if (data.id == record.key) {
          return data
        }
      })
      raw = raw[0]
      if (record.key < 10000) {
        // public database, here we use a magic number 10000 to distinguish public free data and private customized data
        message.info(`go to factor ${record.factor_name}'s detail`)
        let url = `/factor-detail/${record.key}`
        function open(url) {
          const win = window.open(url, '_blank');
          if (win != null) {
            win.focus();
          }
        }

        open(url)
        // navigate(, {
        //   replace : false,
        //   state: {...record}
        // })
      } 
      else {
        let new_id = record.key - 10000
        message.info(`go to factor ${record.factor_name}'s detail`)
        navigate('/product-detail', {
          replace : false,
          // raw replace id to the original, correct id
          state: {...raw, ...record, 
         
            id: new_id,
            quantity: raw.p_quant,
            product_quantity:raw.p_quant, 
            product_name:raw.p_name, 
            product_model:raw.p_model, 
            product_stats_range:raw.p_time_range, 
            product_type:raw.p_type, 
            product_life_cycle_scope:raw.p_lca_scope}
        })

      }
    }

    const inputChange = (value) => {
      // console.log(value.target.value)
      setFactor_name(value.target.value)
    }

    const searchDataBase = () => {
      // console.log('start search')
      fetchData()
    }




  return (

    <div>

          {/* <Space>
            <Button type='text'> 数据库:</Button>

            <Select
              label={"数据库"}
              defaultValue="all"
              onChange={handleChange}
              options={options}
            > 
            </Select>

            <Button type='text'> 名称: </Button>
            <Input  placeholder="factor name" onChange={inputChange}/>

            <Button type="primary" shape="circle" onClick={searchDataBase} icon={<SearchOutlined />} />

        </Space>
         */}

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
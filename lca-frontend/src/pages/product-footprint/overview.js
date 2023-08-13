import React, { useEffect, useState, useRef, Suspense } from 'react';
import { Space, Table } from 'antd';
import { Input, Button, Drawer, message, Popconfirm, Dropdown, Modal  } from 'antd';
import { SearchOutlined, DownOutlined, PlusOutlined  } from '@ant-design/icons';
import MyDrawer from './NewItem.js';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Highlighter from 'react-highlight-words';
import global_config from '../../global';




const App = () => {
  const [data, setData] = useState();
  //let data = []
  const action = useRef(null)
  //const [action, setAction] = useState();
  const [product_type, setProduct_type] = useState();
  const [product_full_unit, setUnit] = useState();
  const [product_scope, setScope] = useState();
  const [product_key, setProduct_key] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const navigate = useNavigate();
  const [size] = useState('middle');
  const [open, setOpen] = useState(false);
  const [placement] = useState('right');

  const onClose = () => {
    setOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

    
  const fetchData = () => {
    setLoading(true);
    let token = JSON.parse(localStorage.getItem('token'));
    axios.post(global_config.root_url +'/auth/getAllProduct_uid', {}, { 
        headers: {
          "Authorization" : `Bearer ${token}`} 
                  })
        .then((response) => {
          // console.log(response)
          // login success
          if (response.data.status === 0) {
            // console.log('request data success')
            const raw_data = response.data.data
            const total = raw_data.length
            const processed = raw_data.map((value) => {
              const unit = value.p_unit.split("#")[1]
              const scope = value.p_lca_scope
              return {
                key: value.id,
                product_name: value.p_name,
                product_model: value.p_model,
                product_quantity_unit: `${value.p_quant}/${unit}`,
                product_unit_weight: value.p_unit_weight,
                product_life_cycle_scope: t(scope),
                product_stats_range: value.p_time_range,
                product_create_time: value.p_createTime,
                product_status: value.p_status
              }
            })
            const p_type = {}
            const p_full_unit = {}
            const p_scope = {}
            for (let id = 0; id < raw_data.length; id ++) {
              p_type[raw_data[id].id] = raw_data[id].p_type
              p_full_unit[raw_data[id].id] = raw_data[id].p_unit
              p_scope[raw_data[id].id] = raw_data[id].p_lca_scope
            }
            
            setScope(p_scope)
            setProduct_type(p_type)
            setUnit(p_full_unit)
            //data =processed
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


  const { Search } = Input;

  
    


  const options = [];

  const clickAction = (record) => ({ key }) => {
    if (key === "detail") {
      // console.log(product_type[record.key])
      message.info(`go to product ${record.product_name}'s detail`)
      navigate('/product-detail', {
        replace : false,
        state: {...record, product_scope: product_scope[record.key], product_id:record.key, product_type:product_type[record.key], product_full_unit:product_full_unit[record.key]}
      })
    } else {
      setProduct_key(record.key)
      action.current = key
      // console.log(action)
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
      title: t('product_name'),
      dataIndex: 'product_name',
      width: 150,
      fixed: "left",
      key: 'product_name',
      ...getColumnSearchProps('product_name'),
    },
    {
      title: t('product_model'),
      dataIndex: 'product_model',
      width: 100,
      key: 'product_model',
    },
    {
      title: t('product_quantity_unit'),
      dataIndex: 'product_quantity_unit',
      width: 150,
      key: 'product_quantity_unit',
    },
    {
      title: t('product_unit_weight'),
      dataIndex: 'product_unit_weight',
      width: 150,
      key: 'product_unit_weight',
    },
    {
      title: t('product_life_cycle_scope'),
      dataIndex: 'product_life_cycle_scope',
      width: 150,
      key: 'product_life_cycle_scope',
    },
    {
      title: t('product_stats_range'),
      dataIndex: 'product_stats_range',
      width: 150,
      key: 'product_stats_range',
    },
    {
      title: t('product_create_time'),
      dataIndex: 'product_create_time',
      width: 150,
      key: 'product_create_time',
    },
    {
      title: t('product_operation'),
      key: 'product_operation',
      fixed: 'right',
      width: 100,
      render: ( _, record) => (
        <Dropdown
        menu={{
          items,
          onClick: clickAction(record),
        }}
        placement="bottom"
        
      >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {t('product_action')} 
              <DownOutlined />
            </Space>
          </a>
      </Dropdown>
      ),
    },
    ];


    const deleteProduct = async (p_index) => {
      // // console.log(p_index, "start")
      setLoading(true);
      let token = JSON.parse(localStorage.getItem('token'));
      const url = global_config.root_url +`/auth/deleteProduct`
    
      axios.post(url, {index: p_index}, { 
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

    const confirm = () => {
      deleteProduct(product_key)
      message.info(`Clicked on Yes. ${action} ${product_key}`);

    };


    const duplicate = async () => {
      setLoading(true);

      let token = JSON.parse(localStorage.getItem('token'));
      const url = global_config.root_url +`/auth/duplicateProduct`

          
      axios.post(url, {index: product_key}, { 
        headers: {
          "Authorization" : `Bearer ${token}`} 
                  })
        .then((response) => {
          console.log(response)
          //  success
          if (response.data.status === 0) {
            console.log('copy product success')

            fetchData()

          } else if (response.data.status === 2) {
              // status:2 means jwt error or expire
              navigate("/login", {
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


  const publish = () => {
    setIsModalOpen(true);
    
  }


  const items = [
    {  
      label: 
        <Button> {t('detail')} </Button> ,
      key: "detail"
    },

    {  
      label: 
      <Popconfirm
        placement="left"
        title={t('duplicate_text')}
        // description={description}
        onConfirm={duplicate}
        okText={t('confirm')}
        cancelText={t('cancel')}
      >
        <Button type="primary" > {t('duplicate')} </Button> 
      </Popconfirm>,
      key: "duplicate"
    },
    {  
      label: 
      <Button type="primary" onClick={publish}> {t('publish')} </Button> ,
      key: "publish"
    },
    {  
      label: 
      <Popconfirm
        placement="left"
        title={t('delete_text')}
        // description={description}
        onConfirm={confirm}
        okText={t('confirm')}
        cancelText={t('cancel')}
      >
        <Button type="primary" danger> {t('delete')} </Button> 
      </Popconfirm>,
      key: "delete"
    },
  ]

  useEffect(() => {

    fetchData()

  }, [JSON.stringify(tableParams)])


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApprove = () => {
    if (inputValue === "") {
      return 
    }
    let value = inputValue
    console.log("handleapprove", value, product_key)
    let token = JSON.parse(localStorage.getItem('token'));
    const url = global_config.root_url +`/auth/publishProductApprove`

    axios.post(url, {email: value, p_index: product_key}, { 
        headers: {
          "Authorization" : `Bearer ${token}`} 
                  })
        .then((response) => {
          console.log(response)
          //  success
          if (response.data.status === 0) {
            // console.log('delete product success')

            fetchData()

          } else if (response.data.status === 2) {
              // status:2 means jwt error or expire
              navigate("/login", {
                replace: true,
              })
          } else if (response.data.status === 3) {
            // status:3 wrong email format
            alert("email does not exist")
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


  setIsModalOpen(false);
  setInputValue("");
  };


  const handleRemove = () => {
    if (inputValue === "") {
      return 
    }
    let value = inputValue

    let token = JSON.parse(localStorage.getItem('token'));
    const url = global_config.root_url +`/auth/publishProductRemove`
    console.log("handleremove", value, product_key)
    axios.post(url, {email: value, p_index: product_key}, { 
        headers: {
          "Authorization" : `Bearer ${token}`} 
                  })
        .then((response) => {
          console.log(response)
          //  success
          if (response.data.status === 0) {
            // console.log('delete product success')

            fetchData()

          } else if (response.data.status === 2) {
              // status:2 means jwt error or expire
              navigate("/login", {
                replace: true,
              })
          } else if (response.data.status === 3) {
            // status:3 wrong email format
            alert("email does not exist")
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


  setIsModalOpen(false);
  setInputValue("");
  };



  const handleCancel = () => {
    setIsModalOpen(false);
    setInputValue("");
  };

  const [inputValue, setInputValue] = useState("");


  return (

    <div>
      <h1
      style={{
        fontSize: 20
      }}>
      {t('product_footprint')}
      </h1>
      <div style={{
        margin: '10px 10px 10px 10px',
      }}>

        <Button 
          type="primary" 
          onClick={showDrawer} 
          icon={<PlusOutlined />}
          style={{
            float: 'right',
          }}>
          {t('create')}
        </Button>
      </div>
 
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

      <Drawer
        title={t('create_new_product')}
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
        width={500}
      >
        <MyDrawer/>
      </Drawer>

      <Modal 
      title={t('publish')} 
      open={isModalOpen} 
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          {t('return')}
        </Button>,
        <Button key="remove" type="primary"  onClick={handleRemove}>
          {t("removeAccess")}
        </Button>,
        <Button
          key="approve"
          type="primary"
          onClick={handleApprove}
        >
          {t('approveAccess')}
        </Button>,
      ]}
      >


        <p>{t('please_type_email')}</p>
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}

      />


      </Modal>


      </div>
    )
  };
export default App;
import React, { useState, useEffect } from 'react';
import { Tabs, Button, Skeleton } from 'antd';
import Display from './display';
import Model from './model';
import List from './list';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import axios from 'axios';

import global_config from "../../../global";

const App = () => {
  const [ loadingFinished, setLoadingFinished ] = useState(false)

  const [ data_process, setData_process ] = useState()
  const [ data_inputoutput, setData_inputoutput ] = useState()
  const [ data_footprint, setData_footprint] = useState()

  const [dataParams, setDataParams] = useState({
    data_length: 0,
    input_output_length: 0,
    footprint_length: 0
  });

  const { state } = useLocation();

  let params = {...state}

  //console.log(params)



  const [ tab, setTab ] = useState("1")
  

  //统一一下 createNew 和detail 跳转的名称
  if ( ! params.product_life_cycle_scope ) {
    params.product_life_cycle_scope = params.product_life_cycle
  }
  if ( ! params.quantity ) {
    params.product_quantity = params.product_quantity_unit.split('/')[0]
  }


  

  const { t } = useTranslation();
  const onChange = (key) => {
    // console.log(key);
  };
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/LCA", {
      replace: false
    })
  }

  const handleTabClick = (key, event) => {
    setTab(key)
  }



  const fetchData = () => {
    setLoadingFinished(false)
    let product_id
    if(params.product_id) {
      product_id = params.product_id
    }
     else {
      product_id = params.id
     }
    let token = JSON.parse(localStorage.getItem('token'));
    let data_length;
    let input_output_length;
 
    axios.post(global_config.root_url +'/auth/getAllProcess_pid', {product_id}, { 
        headers: {
          "Authorization" : `Bearer ${token}`} 
                  })
    .then((response) => {
            // login success
          if (response.data.status === 0) {
            //// console.log('request process data success')
            setData_process(response.data.data)
            // // console.log("process length", response.data.length)
            data_length = response.data.length

          } else if (response.data.status === 2) {
              // status:2 means jwt error or expire
              navigate("/login", {
                replace: true,
              })
          }
          // login fail
          else {
            alert("error: please contact ssbti for support")
            // console.log(response.data)
          }
          
          return axios.post(global_config.root_url + '/auth/getAllInputOutput_product_id', {product_id}, { 
            headers: {
              "Authorization" : `Bearer ${token}`} 
                      })
        }).then(response => {
          if (response.data.status === 0) {
            // // console.log('request input data success')
            setData_inputoutput(response.data.data)
            // // console.log("input length", response.data.length)
            input_output_length = response.data.length

          } else if (response.data.status === 2) {
              // status:2 means jwt error or expire
              navigate("/login", {
                replace: true,
              })
          }
          // login fail
          else {
            alert("error: please contact ssbti for support")
            // console.log(response.data)
          }

          return axios.post(global_config.root_url + '/auth/getFootprint_pid', {product_id}, { 
            headers: {
              "Authorization" : `Bearer ${token}`} 
                      })

        }).then((response) => {
          if (response.data.status === 0) {
            // // console.log('request input data success')
            setData_footprint(response.data.data)
            // // console.log("input length", response.data.length)

            const new_data_param = {
              data_length: data_length,
              input_output_length: input_output_length,
              footprint_length: response.data.length

            }

            if (JSON.stringify(dataParams) != JSON.stringify(new_data_param)) {
              // console.log('change')
              // console.log(JSON.stringify(dataParams), "original")
              // console.log(JSON.stringify(new_data_param), "new")
            }

            setDataParams(new_data_param)
            setLoadingFinished(true)

          } else if (response.data.status === 2) {
              // status:2 means jwt error or expire
              navigate("/login", {
                replace: true,
              })
          }
          // login fail
          else {
            // alert(response.data.message)
            // console.log(response)
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




  useEffect( () => {

    fetchData()   
  },[JSON.stringify(dataParams), params.id])
  
  // note: use data_length to indicate if fetch data may cause a bug: delete one by-product and add one at the same time

  const getData_process = () => {
    // console.log('process data called')
    return data_process
  }

  const getData_inputoutput = () => {
    // console.log('input data called')
    return data_inputoutput
  }

  const getData_footprint = () => {
    // console.log('footprint called')
    return data_footprint
  }





  return (
    (loadingFinished) ?
    <div>
      <Button size="large" type="text" shape="circle" icon={< ArrowLeftOutlined/>} onClick={handleClick}> {t('detail')} </Button>
      
      <Tabs
      onChange={onChange}
      onTabClick={handleTabClick}
      activeKey={tab}
      items={[
        {
          label: t("carbon_footprint_result"),
          key: '1',
          children: <Display {...params} getData_footprint={getData_footprint} />,
        },
        {
          label: t("life_cycle_model"),
          key: '2',
          children: <Model {...params} setTab={setTab}  fetchInputOutputData={fetchData} fetchProcessData={fetchData} getData_inputoutput={getData_inputoutput} getData_process={getData_process}/>,
        },
        {
          label: t("list"),
          key: '3',
          children: <List {...params} setTab={setTab}  fetchInputOutputData={fetchData} fetchProcessData={fetchData} getData_inputoutput={getData_inputoutput} getData_process={getData_process}/>,
        },


      ]}/>

    </div> : <Skeleton/>

  )
  };
export default App;
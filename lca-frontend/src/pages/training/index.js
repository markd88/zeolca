import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Select, Button, Card, Col, Row, Space, Collapse, Divider} from 'antd';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { Image } from 'antd';


import global_config from "../../global";


const App = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  let root_url = global_config.root_url;
  const [data, setData] = useState([]);

  const fetchData = () => {
    let token = JSON.parse(localStorage.getItem('token'));
    // console.log('here')
    axios.post(global_config.root_url+'/auth/training', {}, { 
      headers: {
        "Authorization" : `Bearer ${token}`
      } 
                })
        .then((response) => {
          console.log(response)
          // login success
          if (response.data.status === 0) {
            console.log(response.data)
            setData(response.data)
          } 
          else if (response.data.status === 2) {
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

  }, [])

  const link = 'https://gamma.app/docs/-1LCA-62kq100h17zci5y?mode=doc'



  return (

    <div>


    <Button type="primary" href={link}>{t('training')}</Button>

    <Divider/>



    <Image
    width={1000}
    src="/images/training.png"/>

    {/* <iframe id="bi_iframe" 
    src={link}
    width={1000}
    height={500}
    title={t('training')}>
    </iframe> */}
       
    </div>
  )


}

export default App;
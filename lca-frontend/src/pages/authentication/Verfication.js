import { Button, Checkbox, Form, Input, Col, Row ,Alert, Space } from 'antd';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import react, { useEffect, useState } from 'react';

import global_config from "../../global";
import axios from 'axios';



const App = () => {
  const navigate = useNavigate()
  const { t } = useTranslation();

  const onFinish = (values) => {
    // console.log(values)
    axios.post(global_config.root_url + '/api/re-verify', values)
    .then((response) => {
      // console.log(response)
      // login success
      if (response.data.status === 0) {
  
        alert(t('check_email'))
        navigate('/login', {
          replace: false
        })
      } else if (response.data.status === 4) {
        alert(t('wrong_username_password'))
      } else if (response.data.status === 3) {
        alert(t('no_email'))
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
  };
  
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };
  

  
  return (
    <>
    <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert message={t('verify_info')} type="info" />

  </Space>

    
    <Row  justify="center" style={{marginTop: "10%"}}>

      <Col span={8}>

    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label={t('email')}
        name={'email'}
        rules={[
          {
            required: true,
            message: t('required'),
          },
        ]}
      >
        <Input />
      </Form.Item>
  
      <Form.Item
        label={t('username')}
        name={'username'}
        rules={[
          {
            required: true,
            message: t('required'),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t('password')}
        name={'password'}
        rules={[
          {
            required: true,
            message: t('required'),
          },
        ]}
      >
        <Input />
      </Form.Item>


  
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          {t('send_link')}
        </Button>
      </Form.Item>
    </Form>
      
 
      </Col>
    </Row>
    </>
  );
}



export default App;
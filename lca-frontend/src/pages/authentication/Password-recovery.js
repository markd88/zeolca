import { Button, Checkbox, Form, Input, Col, Row ,Alert, Space } from 'antd';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import react, { useEffect, useState } from 'react';


const onFinish = (values) => {
  // console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  // console.log('Failed:', errorInfo);
};

const App = () => {
  const navigate = useNavigate()
  const { t } = useTranslation();


  
  return (
    <>
    <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert message="please type in your email, we will send you a link, and follow the link" type="info" />

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
            message: 'Please input your email!',
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
          {t('send link')}
        </Button>
      </Form.Item>
    </Form>
      
 
      </Col>
    </Row>
    </>
  );
}



export default App;
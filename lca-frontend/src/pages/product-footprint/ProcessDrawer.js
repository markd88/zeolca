import React, { useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  Divider, 
} from 'antd';
import { useTranslation } from "react-i18next";
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import global_config from '../../global';



const onChange = (value) => {
  // console.log('changed', value);
};


const App = (props) => {

  let params = {...props}

  const { t } = useTranslation();
  const navigate = useNavigate();

  // console.log("process drawer", params.product_scope)

  const [form] = Form.useForm();



  const onFinish = (values) => {


      
    // console.log('Success:', values);
    let token = JSON.parse(localStorage.getItem('token'));
    const url = global_config.root_url +`/auth/createNewProcess`
    values.product_id = params.product_id
    axios.post(url, values, { 
      headers: {
        "Authorization" : `Bearer ${token}`} 
    } )
    .then((response) => {
      // console.log(response)
      //  success
      if (response.data.status === 0) {

        alert("create new process success")
        params.onProcessClose()
        params.setTab("2")
        params.fetchProcessData()
        
      } else if (response.data.status === 2) {
        alert("You need to login first")
        navigate('/login', {
          replace: false,
        })
      } else {
        alert("error: please contact ssbti for support")
      }

    })
    .catch((error) => {
      if (error.response) {
        // console.log(error.response)
      } else if (error.request) {
        // console.log('network error')
      } else {
        // console.log(error, 'unknow error')
      }
    })


    



  };
  
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    form.resetFields();
  })

  return (
    <Form
      form={form}
      name="newProcess"
      labelCol={{
        span: 0,
      }}
      wrapperCol={{
        span: 16,
      }}

      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"

    >

      <Form.Item 
      label={t('process_type')}
      name="process_type"
      rules={[
        {
          required: true,
          message: t('required'),
        },
      ]}
    >
      <Select >
        <Select.Option value={'process_material'}>{t('process_material')}</Select.Option>
        <Select.Option value={'process_manu'}>{t('process_manu')}</Select.Option>
        <Select.Option value={'process_pack'}>{t('process_pack')}</Select.Option>
        <Select.Option disabled={params.product_scope=="gate"} value={'process_sale'}>{t('process_sale')}</Select.Option>
        <Select.Option disabled={params.product_scope=="gate"} value={'process_use'}>{t('process_use')}</Select.Option>
        <Select.Option disabled={params.product_scope=="gate"} value={'process_dispose'}>{t('process_dispose')}</Select.Option>
      </Select>
    </Form.Item>





      <Form.Item
        label={t('process_name')}
        name="process_name"
        rules={[
          {
            required: true,
            message:  t('required'),
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Divider orientation='left'> {t('process_main_output')}</Divider>

      <Form.Item
        label={t('process_product_name')}
        name="process_product_name"
        rules={[
          {
            required: true,
            message:  t('required'),
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t('process_product_percentage')}
        name="process_product_percentage"
        rules={[
          {
            required: true,
            message:  t('required'),
          },
        ]}
      >
        <InputNumber onChange={onChange} />
      </Form.Item>

      <Form.Item
        label={t('process_quantity')}
        name="process_quantity"
        rules={[
          {
            required: true,
            message: t('required'),
          },
        ]}
      >
        <InputNumber onChange={onChange} />
      </Form.Item>

      <Form.Item
        label={t('process_unit')}
        name="process_unit"
        rules={[
          {
            required: true,
            message: t('required'),
          },
        ]}
      >
        <Input />
        
      </Form.Item>
      {t("unit_note")}

      <Form.Item
        label={t('process_actual_quantity')}
        name="process_actual_quantity"
        rules={[
          {
            required: true,
            message: t('required'),
          },
        ]}
      >
        <InputNumber onChange={onChange} />
      </Form.Item>

      <Divider orientation='left'> {t('process_by_output')}  </Divider>

      <Form.List name="by_product">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
          <div key={name}>
             {t('process_by_output') + "     "}
                <MinusCircleOutlined onClick={() => remove(name)} />
                <Form.Item
                  {...restField}
                  label={t('process_product_name')}
                  name={[name, "process_product_name"]}
                  rules={[
                    {
                      required: true,
                      message: t('required'),
                    },
                  ]}
                >
                  <Input  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label={t('process_product_percentage')}
                  name={[name, "process_product_percentage"]}
                  rules={[
                    {
                      required: true,
                      message: t('required'),
                    },
                  ]}
                >
                   <InputNumber onChange={onChange} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label={t('process_quantity')}
                  name={[name, "process_quantity"]}
                  rules={[
                    {
                      required: true,
                      message: t('required'),
                    },
                  ]}
                >
                   <InputNumber onChange={onChange} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label={t('process_unit')}
                  name={[name, "process_unit"]}
                  rules={[
                    {
                      required: true,
                      message: t('required'),
                    },
                  ]}
                >
                  <Input  />
                </Form.Item>
                
              </div>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                {t('add_new_byproduct')}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item
        wrapperCol={{
          offset: 0,
          span: 15,
        }}
      >
        <Button type="primary" htmlType="submit">
          {t('confirm')}
        </Button>
      </Form.Item>

    </Form>
  );
};
export default App;
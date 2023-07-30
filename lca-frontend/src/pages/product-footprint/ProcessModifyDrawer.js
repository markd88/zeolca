import React, { useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
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
  const process_all_data = params.getData_process()

  const current_process = params.getcurrentProcess()

  
  // console.log("modify process drawer", params.product_scope)


  let by_product
  if (current_process) {
    by_product = process_all_data.filter((data) => {
      if (data.main_output == 0 && data.parent_process == current_process.id) {
        return data
      }
    }).map((value) => {
      if (value) {
        return value
      }
    })
  } else {
    by_product = []
  }




  let initial = current_process ? 
  {
    process_type: current_process.process_type,
    process_name: current_process.process_name,
    process_product_name: current_process.process_product_name,
    process_product_percentage: current_process.process_product_percentage,
    process_quantity: current_process.process_quantity,
    process_unit: current_process.process_unit,
    process_actual_quantity: current_process.process_actual_quantity,

  }
  : null

  const [form] = Form.useForm();


  // console.log(initial,'initial')

  const deleteProcess = () => {
 
    let token = JSON.parse(localStorage.getItem('token'));
    const url = global_config.root_url +`/auth/deleteProcess`

    const id = current_process.id
    axios.post(url, {id: id}, { 
      headers: {
        "Authorization" : `Bearer ${token}`} 
    } )
    .then((response) => {
      // console.log(response)
      //  success
      if (response.data.status === 0) {

        alert("delete process success")
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

  const onFinish = (values) => {
    // console.log('Success:', values);
    let token = JSON.parse(localStorage.getItem('token'));
    const url = global_config.root_url +`/auth/updateProcess`
    values.product_id = params.product_id
    values.id = current_process.id
    axios.post(url, values, { 
      headers: {
        "Authorization" : `Bearer ${token}`} 
    } )
    .then((response) => {
      // console.log(response)
      //  success
      if (response.data.status === 0) {

        alert("update new process success")
        params.onProcessClose()
        params.setTab("2")
        params.fetchProcessData()
        
      } else if (response.data.status === 2) {
        alert("You need to login first")
        navigate('/login', {
          replace: false,
        })
      } else {
        alert(response.data.message)
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
    form.setFieldsValue(initial);
    
    for (let i = 0; i < by_product.length; i++ ) {
      const current = by_product[i]
      // console.log(current)
      form.setFields( [ 
        {
        name: ["by_product" , i, 'process_product_name'],
        value: current.process_product_name,
        },
        {
          name: ["by_product" , i, 'process_product_percentage'],
          value: current.process_product_percentage,
        },
        {
          name: ["by_product" , i, 'process_quantity'],
          value: current.process_quantity,
        },
        {
          name: ["by_product" , i, 'process_unit'],
          value: current.process_unit,
        },
    ]
      )
    }

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
            message: t('required'),
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
            message: t('required'),
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
            message: t('required'),
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
                  <Input />
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
          {t('update')}
        </Button>

        <Button danger onClick={deleteProcess}>
          {t('delete')}
        </Button>

      </Form.Item>

    </Form>
  );
};
export default App;
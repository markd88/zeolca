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
} from 'antd';
import { useTranslation } from "react-i18next";
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import global_config from '../../global';

const { RangePicker } = DatePicker;

const onChange = (value) => {
  // console.log('changed', value);
};


const App = (props) => {
  let params = {...props}
  // console.log(params, 'modify')
  const { t } = useTranslation();
  const navigate = useNavigate();


  const onFinish = (values) => {

    let token = JSON.parse(localStorage.getItem('token'));
    const url = global_config.root_url +`/auth/updateProduct`
    values.product_unit = values.product_unit.join("#")
    const start = values.product_stats_range[0].format('YYYY/MM/DD')
    const end = values.product_stats_range[1].format('YYYY/MM/DD')
    values.product_stats_range = [start, end].join("-")
    values.id = params.product_id
    axios.post(url, values, { 
      headers: {
        "Authorization" : `Bearer ${token}`} 
    } )
    .then((response) => {
      // login success
      if (response.data.status === 0) {
        alert("update new product success")
        // // console.log(params)
        // params.productClose()
        // params.setTab("2")
        form.resetFields();
        navigate('/product-carbon-footprint', {
          replace: false
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


  };

  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    console.log(params.product_life_cycle_scope, params)
    const initials = {       
      product_life_cycle: params.product_scope,
      product_name: params.product_name,
      product_type: params.product_type,
      product_model: params.product_model,
      quantity: params.product_quantity,
      product_unit_weight: params.product_unit_weight, 
      product_unit: params.product_full_unit.split('#'),
      // 时间格式转换问题
      //product_stats_range: params.product_stats_range

    }

    form.setFieldsValue(initials)

  }
  )


  const unit_options = [
    {
      value: '常用单位组',
      label: '常用单位组',
      children: [
        {
          value: 'kg',
          label: 'kg',
        },
      ],
    },
    {
      value: '物品个数单位组',
      label: '物品个数单位组',
      children: [
        {
          value: 'kg',
          label: 'kg',
        },
      ],
    },
    {
      value: '质量单位组',
      label: '常用单位组',
      children: [
        {
          value: 'kg',
          label: 'kg',
        },
      ],
    },
    {
      value: '能量单位组',
      label: '能量单位组',
      children: [
        {
          value: 'kg',
          label: 'kg',
        },
      ],
    },
    {
      value: '距离和长度单位组',
      label: '距离和长度单位组',
      children: [
        {
          value: 'kg',
          label: 'kg',
        },
      ],
    },
    {
      value: '体积单位组',
      label: '体积单位组',
      children: [
        {
          value: 'kg',
          label: 'kg',
        },
      ],
    },
    {
      value: '面积单位组',
      label: '面积单位组',
      children: [
        {
          value: 'kg',
          label: 'kg',
        },
      ],
    },
    {
      value: '质量*距离单位组',
      label: '质量*距离单位组',
      children: [
        {
          value: 'kg',
          label: 'kg',
        },
      ],
    },
    {
      value: '分子量单位组',
      label: '分子量单位组',
      children: [
        {
          value: 'kg',
          label: 'kg',
        },
      ],
    },
    {
      value: '放射性单位组',
      label: '放射性单位组',
      children: [
        {
          value: 'kg',
          label: 'kg',
        },
      ],
    },
    {
      value: '时间单位组',
      label: '时间单位组',
      children: [
        {
          value: 'kg',
          label: 'kg',
        },
      ],
    },
    {
      value: '物品个数*距离单位组',
      label: '物品个数*距离单位组',
      children: [
        {
          value: 'kg',
          label: 'kg',
        },
      ],
    },
    {
      value: '体积*距离单位组',
      label: '体积*距离单位组',
      children: [
        {
          value: 'kg',
          label: 'kg',
        },
      ],
    },
    {
      value: '物品个数*时间单位组',
      label: '物品个数*时间单位组',
      children: [
        {
          value: 'kg',
          label: 'kg',
        },
      ],
    },

  ]



  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 0,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >

      <Form.Item 
        label={t('product_type')}
        name="product_type"
        rules={[
          {
            required: true,
            message: t('required'),
          },
        ]}
      >
        <Select >
          <Select.Option value={'type_manu'}>{t('type_manu')}</Select.Option>
          <Select.Option value={'type_livelihood'}>{t('type_livelihood')}</Select.Option>
          <Select.Option value={'type_waste'}>{t('type_waste')}</Select.Option>
          <Select.Option value={'type_transportation'}>{t('type_transportation')}</Select.Option>
          <Select.Option value={'type_energy'}>{t('type_energy')}</Select.Option>
          <Select.Option value={'type_carbon_removal'}>{t('type_carbon_removal')}</Select.Option>
          <Select.Option value={'type_food'}>{t('type_food')}</Select.Option>
        </Select>
      </Form.Item>



      <Form.Item
        label={t('product_name')}
        name="product_name"
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
        label={t('product_model')}
        name="product_model"
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
        label={t('quantity')}
        name="quantity"
        rules={[
          {
            required: true,
            type: 'number',
            message: t('required'),
          },
        ]}
      >
        <InputNumber min={1} onChange={onChange} />
      </Form.Item>

      <Form.Item 
        label={t('unit')}
        name="product_unit"
        rules={[
          {
            required: true,
            message:  t('required'),
          },
        ]}
        >
        {/* <Cascader
          options={unit_options}/> */}
          <Input/>
          
      </Form.Item>
      {t("unit_note")}


      <Form.Item
        label={t('product_unit_weight')}
        name="product_unit_weight"
        rules={[
          {
            required: true,
            type: 'number',
            message: t('required'),
          },
        ]}
      >
        <InputNumber onChange={onChange} />
      </Form.Item>

      <Form.Item
        label={t('product_stats_range')}
        name="product_stats_range"
        rules={[
          {
            required: true,
            message: t('required'),
          },
        ]}
      >
        <RangePicker format={"YYYY-MM-DD"}/>
      </Form.Item>


      <Form.Item 
        label={t('product_life_cycle_scope')}
        name='product_life_cycle'
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}>
          <Radio.Group>
            <Radio value="product_cradle_to_gate"> {t('product_cradle_to_gate')} </Radio>
            <Radio value="product_cradle_to_grave"> {t('product_cradle_to_grave')} </Radio>
          </Radio.Group>
      </Form.Item>

      {/* <Form.Item label={t('upload')} valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                {t('upload')}
              </div>
            </div>
          </Upload>
      </Form.Item> */}


      <Form.Item
        wrapperCol={{
          offset: 0,
          span: 15,
        }}
      >
        <Button type="primary" htmlType="submit">
          {t('update')}
        </Button>
      </Form.Item>

    </Form>
  );
};
export default App;
import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Cascader,
  DatePicker,
  Divider, 
  Checkbox,
  InputNumber,
  Modal,
} from 'antd';
import { useTranslation } from "react-i18next";
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import global_config from '../../global';

import  FactorTable from './factor_table'
const { TextArea } = Input;


const onChange = (value) => {
  // console.log('changed', value);
};


const App = (props) => {

  let params = {...props}


  const { t } = useTranslation();
  const navigate = useNavigate();



  let  currentProcess = params.getcurrentProcess()

  let currentOutput = params.getcurrentOutput()
  // console.log(currentOutput, "current output ")

  const [factor_db, setFactor_db] = useState(null)

  const [basicFactorDisabled, setBasicFactorDisabled] = useState(false);
  const [transportationDisabled, setTransportationDisabled] = useState(false);
  const [factor_id, setFactor_id] = useState()

  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();


  const showModal = (name) => () => {
    setFactor_id(name)
    setOpen(true);
  };

  const form_reset = () => {
    setFactor_db(new Map())
    form.resetFields()

  }

  params.newOutputRef.current = {}

  params.newOutputRef.current.reset = form_reset

  const setBasic = (value) => {
    console.log(value)
    setBasicFactorDisabled(value)
  }

  const handleCancel = () => {
    setOpen(false);
  };


  const setFactor = (factor_info) => {

    if (factor_id !== "factor_db_basic") {
      if (factor_info.second !== "t·km") {
        alert(" the unit does not match")
      }
      else {
        let newCopy
        if (!factor_db) {
          newCopy = new Map()
        } else {    
          newCopy = new Map(  
          JSON.parse(
          JSON.stringify(Array.from(factor_db))
           ))
        }
        newCopy.set(factor_id, factor_info)
    
        setFactor_db(newCopy)

      }
    }
    else {
      let newCopy
      if (!factor_db) {
        newCopy = new Map()
      } else {    
        newCopy = new Map(  
        JSON.parse(
        JSON.stringify(Array.from(factor_db))
         ))
      }
      newCopy.set(factor_id, factor_info)
  
      setFactor_db(newCopy)
    }


  }


  const onFinish = (values) => {

    let unit_match = true
    let has_path = true
    // no need to check manual. it is by default the same unit
    // here we check factor from database
    if (!basicFactorDisabled) {
      let bd_unit = values.factor_db_basic.second
      if (bd_unit == null) {
        bd_unit = values.factor_db_basic.p_unit.split("#")[1]
      }
      let input_unit = values.input_unit[1]
      if (bd_unit === "kg" || bd_unit === "t") {
        if (input_unit === 'kg' || input_unit === 't') {
          // console.log('t, kg')
        }
        else {
          unit_match = false
        }
      }
      else {
        unit_match = bd_unit === input_unit
        // console.log(unit_match)
      }
    }  
    
    if (transportationDisabled) {
      if (!values.road || values.road.length === 0) {
        has_path = false
      }
    }

    if (! unit_match) {
      alert("unit does not match")
    } else if (! has_path) {
      alert("you need to have at least one path")
    } 
    else {

      values.product_id = params.product_id
      values.process_id = currentProcess.id
      values.input = 0    
      values.transportation = transportationDisabled? 1 : 0
      values.manual = basicFactorDisabled? 1 : 0

      if (values.factor_db_basic.second == null) {
        values.factor_db_basic = {...values.factor_db_basic, 
          first: `kg`, 
          second: values.factor_db_basic.p_unit.split("#")[1],
        }
      }

      if (values.factor_db_basic.p_unit) {
        values.factor_db_basic = {...values.factor_db_basic, 
          sum_factor: Number(values.factor_db_basic.factor) / Number(values.factor_db_basic.p_quant) 
      }
      }
      
      // console.log('Success:', values);
      let token = JSON.parse(localStorage.getItem('token'));
      const url = global_config.root_url +`/auth/createNewInputOutput`
  
      axios.post(url, values, { 
        headers: {
          "Authorization" : `Bearer ${token}`} 
      } )
      .then((response) => {
        // console.log(response)
        //  success
        if (response.data.status === 0) {
          alert("create new output success")
          params.outputClose()
          params.setTab("2")
          params.fetchInputOutputData()
          form.resetFields();
          
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
  

    }





  };




  const deleteFactor = (name) => () => {
    let newDB = new Map()
    for (var [key, value] of factor_db.entries()){
      if (key != name ) {
        newDB.set(key, value)
      }
     }
    setFactor_db(newDB)
  }



  useEffect(() => {    

    if (factor_db == null) {
      form.setFieldsValue({
        factor_db_basic: null,
      });
    } else {

      for (var [key, value] of factor_db.entries()){
      // console.log(key, value)
      if (key == "factor_db_basic" ) {
        form.setFieldsValue({
          factor_db_basic: value,
        });
        // console.log('set form basic')
      } else {
        form.setFields([{
          name: ["road" , key, 'factor_db_transportation'],
          value: value,
        }]
        );
      }

     }
    }

    setOpen(false);

  }, [factor_db])
  
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };


  const getFactor = () => {

    showModal("factor_db_basic")()
  }

  return (
    <>
    <Form
      form={form}
      name="newOutput"
      labelCol={{
        span: 0,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{

      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >

      { currentProcess ? (
        <p> {t('input_process')} : {currentProcess.process_name}</p>
      ): ( <></>)}

      <Divider orientation='left'>{t('basic_info')}</Divider>


      <Form.Item 
        label={t('input_type')}
        name="input_type"
        rules={[
          {
            required: true,
            message: t('required'),
          },
        ]}
      >
        <Select >
          <Select.Option value={'waste_water'}>{t('waste_water')}</Select.Option>
          <Select.Option value={"waste_gas"}>{t('waste_gas')}</Select.Option>
          <Select.Option value={"waste_solid"}>{t('waste_solid')}</Select.Option>
          <Select.Option value={"waste_danger"}>{t('waste_danger')}</Select.Option>

        </Select>
      </Form.Item>


      <Form.Item
        label={t('input_name')}
        name="input_name"
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
        label={t('process_quantity')}
        name="input_quantity"
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
        label={t('unit')}
        name="input_unit"
        rules={[
          {
            required: true,
            message:  t('required'),
          },
        ]}
        >
        <Cascader
          options={[
            {
              value: 'common',
              label: t('common'),
              children: [
                {
                  value: 'kg',
                  label: 'kg',
                },
                {
                  value: 't',
                  label: 't',
                },
                {
                  value: 'm',
                  label: 'm',
                },
                {
                  value: 'm2',
                  label: 'm2',
                },
                {
                  value: 'm3',
                  label: 'm3',
                },
              ],
            },
            {
              value: 'all',
              label: t('all'),
              children: [
                {
                  value: 100,
                  label: 100
                },
                { 
                  value: 'KWh',
                  label: "KWh"
                },
                { 
                  value: 'L',
                  label: "L"
                },
                { 
                  value: 'MJ',
                  label: "MJ"
                },
                { 
                  value: 'Nm3',
                  label: "Nm3"
                },
                { 
                  value: 'W',
                  label: "W"
                },
                { 
                  value: 'floor',
                  label: "floor"
                },
                { 
                  value: 'head·yr',
                  label: 'head·yr'
                },
                { 
                  value: 'kg',
                  label:'kg'
                },
                { 
                  value: 'm',
                  label: 'm'
                },
                { 
                  value: 'm2',
                  label: 'm2'
                },
                { 
                  value: 'm3',
                  label:'m3'
                },
                { 
                  value: 'night',
                  label: 'night'
                },
                { 
                  value: 'person·km',
                  label: 'person·km'
                },
                { 
                  value: 'piece',
                  label: 'piece'
                },
                { 
                  value:   't',
                  label:  't'
                },
                { 
                  value: 't-RE',
                  label: 't-RE'
                },
                { 
                  value: 't·km',
                  label: 't·km'
                },
                { 
                  value:  'unit',
                  label:  'unit'
                },
                { 
                  value: 'vehicle',
                  label: 'vehicle'
                },
                { 
                  value:  'year.km2',
                  label:  'year.km2'
                }
              ]



            }
          ]}/>
      </Form.Item>

      <Form.Item 
        label={t('input_data_source')}
        name="input_data_source"
        rules={[
          {
            required: true,
            message:  t('required'),
          },
        ]}
      >
        <Select >
          <Select.Option value={"reality_data_production"}>{t('reality_data_production')}</Select.Option>
          <Select.Option value={"industry_statistics"}>{t('industry_statistics')}</Select.Option>
          <Select.Option value={"authority_investigative_report"}>{t('authority_investigative_report')}</Select.Option>
          <Select.Option value={"literature"}>{t('literature')}</Select.Option>
          <Select.Option value={"others"}>{t('others')}</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label={t("input_stat_note")}
        name="input_stat_note"
        rules={[
          {
            required: true,
            message:  t('required'),
          },
        ]}
      >
        <TextArea rows={4} maxLength={200} />
      </Form.Item>

      <Form.Item
        label={t('manual')}
        name="manual"
      >
      <Checkbox
        checked={basicFactorDisabled}
        onChange={(e) => setBasicFactorDisabled(e.target.checked)}
      >
        
      </Checkbox>
      </Form.Item>


      <Form.Item
        label={t('factor_name')}
        name="factor_name"
        hidden={!basicFactorDisabled}
        rules={[
          {
            required: basicFactorDisabled,
            type: 'number',
            message:  t('required'),
          },
        ]}
      >
        <InputNumber onChange={onChange} />
      </Form.Item>


      <Form.Item
        label={t('factor_unit')}
        name="factor_unit"
        hidden={!basicFactorDisabled}
        rules={[
          {
            required: basicFactorDisabled,
            message:  t('required'),
          },
        ]}
      >
        <Select >
          <Select.Option value={'kgCO2e'}>{"kgCO2e"}</Select.Option>
          <Select.Option value={"gCO2e"}>{"gCO2e"}</Select.Option>
        </Select>
      </Form.Item>


      <Form.Item
        label={t('factor_source')}
        name="factor_source"
        hidden={!basicFactorDisabled}
        rules={[
          {
            required: basicFactorDisabled,
            message:  t('required'),
          },
        ]}
      >
        <Select >
          <Select.Option value={'academic_report'}>{t('academic_report')}</Select.Option>
          <Select.Option value={"industry_stats"}>{t('industry_stats')}</Select.Option>
          <Select.Option value={"field_measurement"}>{t('field_measurement')}</Select.Option>
          <Select.Option value={"theory_calculation"}>{t('theory_calculation')}</Select.Option>
          <Select.Option value={"others"}>{t('others')}</Select.Option>
        </Select>

      </Form.Item>


      <Form.Item
        label={t('factor_note')}
        name="factor_note"
        hidden={!basicFactorDisabled}
        rules={[
          {
            required: basicFactorDisabled,
            message: 'Please input your username!',
          },
        ]}
      >
        <TextArea rows={4} placeholder= {t('required')} maxLength={200} />
      </Form.Item>
     
     
      
        <Form.Item
        label={t("factor_db_basic")}
        name="factor_db_basic"
        hidden={basicFactorDisabled}
        rules={[
          {
            required: !basicFactorDisabled,
            message:  t('required'),
          },
        ]}
      >
        {(factor_db && factor_db.has('factor_db_basic'))? 
        (
        <>
        
        {factor_db.get('factor_db_basic').factor_name}
        <Button onClick={deleteFactor('factor_db_basic')}> {t('delete')}</Button>
        </>): 
        (<Button block type='dashed' icon={<PlusOutlined />} onClick={getFactor} ></Button>)}
        
      
      </Form.Item>


      








      <Divider orientation='left'> {t('trans_info')}  </Divider>


      <Form.Item
        label={t('if_trans')}
        name="transportation"
      >
      <Checkbox
        checked={transportationDisabled}
        onChange={(e) => setTransportationDisabled(e.target.checked)}
      >
        
      </Checkbox>
      </Form.Item>

      {(transportationDisabled)? 
      (
        <>
        <Form.Item
        label={t('transportation_gross_weight') + ('(kg)')}
        name="transportation_weight"
        rules={[
          {
            required: true,
            type: 'number',
            message:  t('required'),
          },
        ]}
      >
        <InputNumber onChange={onChange} />
      </Form.Item>



      <Form.List name="road">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
          <div key={name}>
             {t('road') + name  + "   "}
                <MinusCircleOutlined onClick={() => remove(name)} />

                <Form.Item
                  {...restField}
                  label={t('location_start')}
                  name={[name, "location_start"]}
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
                  label={t('location_end')}
                  name={[name, "location_end"]}
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
                  {...restField}
                  label={t('distance')}
                  name={[name, "distance"]}
                  rules={[
                    {
                      required: true,
                      type: 'number',
                      message:  t('required'),
                    },
                  ]}
                >
                  <InputNumber onChange={onChange} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label={t('transportation_tool')}
                  name={[name, "transportation_tool"]}
                  rules={[
                    {
                      required: true,
                      message:  t('required'),
                    },
                  ]}
                >
                  <Input  />
                </Form.Item>


                <Form.Item
                label={t('factor_db_basic')}
                name={[name, "factor_db_transportation"]}
                
                rules={[
                  {
                    required: true,
                    message:  t('required'),
                  },
                ]}
              >
                {(factor_db && factor_db.has(name))? 
                (
                <> 
                {factor_db.get(name).factor_name}
                <Button onClick={deleteFactor(name)}>  {t('delete')} </Button>
                </>
                ): 
                (<Button block type='dashed' icon={<PlusOutlined />} onClick={showModal(name)} ></Button>)}
     
              </Form.Item>
              </div>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                {t('add_new_road')}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      </>
      ):
       (
        <></>
       )}




      <Form.Item
        wrapperCol={{
          offset: 0,
          span: 15,
        }}
      >
        <Button type="primary" htmlType="submit">
        {t('create')}
        </Button>
      </Form.Item>

    </Form>

    <Modal
      open={open}
      title={t('add_factor')}
      width={"70%"}
      onCancel={handleCancel}
      footer={null}
      >
        <FactorTable setFactor={setFactor} factor_id={factor_id} setBasic={setBasic}></FactorTable>
      </Modal>
</>
  );
};
export default App;
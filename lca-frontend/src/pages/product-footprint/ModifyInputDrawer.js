import React, { useEffect, useState, useRef } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Cascader,
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




const App = (props) => {

  const onChange = (value) => {
    //// console.log('changed', value);
    console.log(basicFactorDisabled)
  };
  
  const [form] = Form.useForm();

  let params = {...props}

  const { t } = useTranslation();
  const navigate = useNavigate();

  let currentInput = params.getcurrentInput()

  let currentProcess = params.getcurrentProcess()

  // console.log(params)
  // console.log(currentInput, currentProcess)
  let database

  if ( currentInput && currentInput.manual === 0 ) {
    //// console.log("create database")
    database = new Map()
    database.set( "factor_db_basic", JSON.parse(currentInput.factor_db_basic) ) 
  }


  
  if (currentInput && currentInput.transportation === 1 ){
    if ( !database) {
      database = new Map()
      //// console.log("reinitialize database")
    }
    let road = JSON.parse(currentInput.road)
    // //// console.log(road, "")
    for (var [key, value] of road.entries()) {
      // //// console.log(key, value.factor_db_transportation)
      database.set(key, value.factor_db_transportation)
    }
  }


  // //// console.log(database, "database from old information")

  const [factor_db, setFactor_db] = useState(database)

  




  const first  = useRef()
  first.current = true


//TODO
  const form_reset = () => {
    // console.log("form reset")
    let currentInput = params.getcurrentInput()
   
    let database
  
    if ( currentInput && currentInput.manual === 0) {
      database = new Map()
      database.set( "factor_db_basic", JSON.parse(currentInput.factor_db_basic) ) 
      setBasicFactorDisabled(false)
    }

    if (currentInput && currentInput.transportation === 1 ){
      setTransportationDisabled(true)
      if ( !database) {
        database = new Map()
        //// console.log("reinitialize database")
      }
      let road = JSON.parse(currentInput.road)
      // //// console.log(road, "")
      for (var [key, value] of road.entries()) {
        // //// console.log(key, value.factor_db_transportation)
        database.set(key, value.factor_db_transportation)
      }
    }
  


    first.current = true
    
    // //// console.log('original database', database)
    let newCopy
    if (!database) {
      newCopy = new Map()
    } else {    
      newCopy = new Map(  
      JSON.parse(
      JSON.stringify(Array.from(database))
       ))
    }



    newCopy.set("#", newCopy.size)
    setFactor_db(newCopy)


  }

  params.modifyInputRef.current = {}

  params.modifyInputRef.current.reset = form_reset





  const [basicFactorDisabled, setBasicFactorDisabled] = useState(false);
  const [transportationDisabled, setTransportationDisabled] = useState(false);
  const [factor_id, setFactor_id] = useState()


  const [open, setOpen] = useState(false);
  
  const showModal = (name) => () => {

    setFactor_id(name)
    setOpen(true);
  };


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
        first.current = false
      }


    } else {

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
      first.current = false

    }


   
    
  }

  const deleteInput = () => {
    let value = currentInput.id
    let token = JSON.parse(localStorage.getItem('token'));
    const url = global_config.root_url +`/auth/deleteInputOutput`
    axios.post(url, {id: value}, { 
      headers: {
        "Authorization" : `Bearer ${token}`} 
    } )
    .then((response) => {
      //// console.log(response)
      //  success
      if (response.data.status === 0) {
        alert("delete input/output success")
        params.inputClose()
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
        //// console.log(error.response)
      } else if (error.request) {
        //// console.log('network error')
      } else {
        //// console.log(error, 'unknow error')
      }
    })
  }

  const onFinish = (values) => {
    console.log()
    let unit_match = true
    let has_path = true
    // no need to check manual. it is by default the same unit
    // here we check factor from database
    if (!basicFactorDisabled) {
      const bd_unit = values.factor_db_basic.second
      const input_unit = values.input_unit[1]
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
      values.input = 1
      values.transportation = transportationDisabled? 1: 0
      values.manual = basicFactorDisabled? 1 : 0
      values.id = currentInput.id
      console.log('Success:', values);
      let token = JSON.parse(localStorage.getItem('token'));
      const url = global_config.root_url +`/auth/updateInputOutput`
  
      axios.post(url, values, { 
        headers: {
          "Authorization" : `Bearer ${token}`} 
      } )
      .then((response) => {
        //// console.log(response)
        //  success
        if (response.data.status === 0) {
          alert("update input/output success")
          params.inputClose()
          params.setTab("2")
          params.fetchInputOutputData()
          form.resetFields();
          
        } else if (response.data.status === 2) {
          alert("You need to login first")
          navigate('/login', {
            replace: false,
          })
        } else {
          alert(response.data.message.sql)
        }
  
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response)
        } else if (error.request) {
          console.log('network error')
        } else {
          console.log(error, 'unknow error')
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
      if (currentInput) {
        if (first.current) {  
          //// console.log("this is the first time")
          form.resetFields();
         
          const initials = {
            input_type : currentInput.input_type,
            input_name : currentInput.input_name,
            input_data_source: currentInput.input_data_source,
            input_quantity: Number(currentInput.input_quantity),
            input_stat_note: currentInput.input_stat_note,
            input_unit:  JSON.parse(currentInput.input_unit),
            process_id : currentInput.process_id,
            product_id : currentInput.product_id,
            index: currentInput.index,
            input: currentInput.input,
          } 
          
          form.setFieldsValue(initials);
        
            
          if (currentInput.manual === 1) {
           
            setBasicFactorDisabled(true)
            form.setFieldsValue({
              manual: currentInput.manual,
              factor_name: Number(currentInput.factor_name),
              factor_note: currentInput.factor_note,
              factor_source: currentInput.factor_source,
              factor_unit: currentInput.factor_unit,
            })
          } 
    
  
          if (currentInput.transportation === 1) {
            //// console.log(' set transportation')
            setTransportationDisabled(true)
            form.setFieldsValue({
              transportation: currentInput.transportation,
              transportation_weight: currentInput.transportation_weight,
            })
          } 
    
          if (database == null) {
            form.setFieldsValue({
              factor_db_basic: null,
            });
          } else {
            let road = JSON.parse(currentInput.road)
            //// console.log(road, "test first time")
            
            for (var [key, value] of database.entries()){
            // //// console.log(key, value)
            if (key == "factor_db_basic" ) {
              form.setFieldsValue({
                factor_db_basic: value,
              });
              // //// console.log('set form basic')
            } else if (key == "#") {
              // //// console.log('skip')
            } 
            else {
  
              //// console.log(road, key ,road[key])
              form.setFields([{
                name: ["road" , key, 'factor_db_transportation'],
                value: value,
              }]);
  
              form.setFields([{
                name: ["road" , key, 'location_start'],
                value: road[key].location_start,
              }]);
  
  
              form.setFields([{
                name: ["road" , key, 'location_end'],
                value: road[key].location_end,
              }]);
  
              form.setFields([{
                name: ["road" , key, 'distance'],
                value: road[key].distance,
              }]);
  
              form.setFields([{
                name: ["road" , key, 'transportation_tool'],
                value: road[key].transportation_tool,
              }]);
  
  
  
            }
           }
          }
      
      }
    
        first.current = false
      
        
    
    
        
        //// console.log('use effect called')
        //// console.log('cccc', factor_db)
    
        if (factor_db == null) {
          form.setFieldsValue({
            factor_db_basic: null,
          });
        } else {
          let road = JSON.parse(currentInput.road)
          //// console.log(road, "test")
          for (var [key, value] of factor_db.entries()){
          //// console.log(key, value)
          if (key == "factor_db_basic" ) {
            form.setFieldsValue({
              factor_db_basic: value,
            });
            //// console.log('set form basic')
          } else if (key == "#") {
            //// console.log('skip')
          } 
          else {
            form.setFields([{
              name: ["road" , key, 'factor_db_transportation'],
              value: value,
            }]);

  
          }
  
          }
    
         
        }
    
        setOpen(false);
      
  
  
      }
      //// console.log( "inside effect", database, factor_db)
    



  }, [factor_db, currentInput])
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  const getFactor = () => {

    showModal("factor_db_basic")()
  }

  return (
    <>
    <Form
      form={form}
      name="modifyInput"
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
        <p>{t('input_process')} :{currentProcess.process_name}</p>
      ): ( <></>)}

      

      <Divider orientation='left'>  {t('basic_info')} </Divider>


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
          <Select.Option value={'raw_material'}>{t('raw_material')}</Select.Option>
          <Select.Option value={"consumables"}>{t('consumables')}</Select.Option>
          <Select.Option value={"energy"}>{t('energy')}</Select.Option>
          <Select.Option value={"resource"}>{t('resource')}</Select.Option>
          <Select.Option value={"transportation"}>{t('transportation')}</Select.Option>
          <Select.Option value={"carbon_fixation"}>{t('carbon_fixation')}</Select.Option>
          <Select.Option value={"recycled_material"}>{t('recycled_material')}</Select.Option>
          <Select.Option value={"packing_material"}>{t('packing_material')}</Select.Option>
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
            message: t('required'),
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
        <TextArea rows={4}  maxLength={200} />
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
        <InputNumber  />
      </Form.Item>


      <Form.Item
        label={t("factor_unit")}
        name="factor_unit"
        hidden={!basicFactorDisabled}
        rules={[
          {
            required: basicFactorDisabled,
            message: t('required'),
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
            message: t('required'),
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
            message: t('required'),
          },
        ]}
      >
        <TextArea rows={4} placeholder= {t('required')} maxLength={200} />
      </Form.Item>
     
     
      
        <Form.Item
        label={"碳排因子"}
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
        <Button onClick={deleteFactor('factor_db_basic')}> {t('delete')} </Button>
        </>): 
        (<Button block type='dashed' icon={<PlusOutlined />} onClick={getFactor} ></Button>)}
        
      
      </Form.Item>


      

      <Divider orientation='left'> {t('trans_info')} </Divider>


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
        <InputNumber  onChange={onChange} />
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
                      message:  t('required'),
                    },
                  ]}
                >
                   <Input placeholder={ t('required')} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label={t('location_end')}
                  name={[name, "location_end"]}
                  rules={[
                    {
                      required: true,
                      message:  t('required'),
                    },
                  ]}
                >
                 <Input placeholder={ t('required')} />
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
                    message: t('required'),
                  },
                ]}
              >
                {(factor_db && factor_db.has(name))? 
                (
                <> 
                {factor_db.get(name).factor_name}
                <Button onClick={deleteFactor(name)}> {'delete'} </Button>
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
        {/* <Button type="primary" htmlType="submit">
          {t('update')}
        </Button> */}

        <Button danger onClick={deleteInput}>
          {t('delete')}
        </Button>

      </Form.Item>
      {t('cannot_modify')}

    </Form>

    <Modal
      open={open}
      title={t('add_factor')}
      width={"70%"}
      onCancel={handleCancel}
      footer={null}
      >
        <FactorTable setFactor={setFactor} factor_id={factor_id}></FactorTable>
      </Modal>
</>
  );
};
export default App;
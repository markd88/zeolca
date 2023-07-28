import React from 'react';
import { Card, Col, Row, Button } from 'antd';
import { ArrowDownOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Gate from './model_gate';
import Grave from './model_grave';
import { useTranslation } from "react-i18next";

const App = (props) => {
  const { t } = useTranslation();
  let params = {...props}
  params = {...params, product_scope: params.product_life_cycle_scope}
  const life_cycle = params.product_scope
  
  // // console.log('model ')
  // // console.log(life_cycle, 'life cycle',t("product_cradle_to_gate") , life_cycle != t("product_cradle_to_gate"))
  let if_gate = (life_cycle != "product_cradle_to_gate") ? false: true

  return (

  (if_gate)? 
  
  <Gate {...params}/> : <Grave {...params}/>

  
  )
};
export default App;
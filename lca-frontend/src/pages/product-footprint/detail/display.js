import React from 'react';
import { Descriptions, Divider, Button } from 'antd';
import Graph from './display-graph';
import { useTranslation } from "react-i18next";

const App = ( props) => {
  const { t } = useTranslation();
  let params = {...props}
  // console.log('inside display', params.product_type )
  if (! params.product_quantity) {
    params.product_quantity = params.quantity
  }
  if (params.p_unit) {
    params.product_full_unit = params.p_unit
  }
  console.log(params)

  return (
    <div>
      <Descriptions title={t('product_info')} bordered>
      <Descriptions.Item label={t('product_name')}>{params.product_name}</Descriptions.Item>
      <Descriptions.Item label={t('quantity')}>{params.product_quantity}</Descriptions.Item>
      <Descriptions.Item label={t('unit')}>{params.product_full_unit.split('#')[1]}</Descriptions.Item>
      <Descriptions.Item label={t('product_model')}>{params.product_model}</Descriptions.Item>
      <Descriptions.Item label={t('product_stats_range')} span={2}>
        {params.product_stats_range}
      </Descriptions.Item>
      <Descriptions.Item label={t('product_type')} >
        {t(params.product_type)} 
      </Descriptions.Item>

      <Descriptions.Item label={t('product_life_cycle_scope')}>
        {t(params.product_life_cycle_scope)}
      </Descriptions.Item>


      </Descriptions>

      <Divider/>

      <Graph {...params}/>

    </div>

)
};

export default App;
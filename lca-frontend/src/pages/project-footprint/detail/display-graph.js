import React from 'react';
import { Button, Col, Row, Statistic, Divider, Table } from 'antd';
import { Column } from '@ant-design/plots';
import { useTranslation } from "react-i18next";

const App = (props) => {

  const { t } = useTranslation();
  let params = {...props}
  params = {...params, product_scope: params.product_life_cycle_scope}
  const footprint = params.getData_footprint()

  const category_data = [
    {
      type: t('raw_material'),
      sales: footprint.raw_material,
    },
    {
      type: t('consumables'),
      sales: footprint.consumables,
    },
    {
      type: t('energy'),
      sales: footprint.energy,
    },
    {
      type: t('resource'),
      sales: footprint.resource,
    },
    {
      type: t('transportation'),
      sales: footprint.transportation,
    },
    {
      type: t('carbon_fixation'),
      sales: footprint.carbon_fixation,
    },
    {
      type: t('recycled_material'),
      sales: footprint.recycled_material,
    },
    {
      type: t('packing_material'),
      sales: footprint.packing_material,
    },
  ]

  const category_config = {
    data: category_data,
    xField: 'type',
    yField: 'sales',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: t('category'),
      },
      sales: {
        alias: t('footprint'),
      },
    },
  };

  let process_data = []

  if (params.product_scope == "product_cradle_to_gate" ) {
    process_data = [
      {
        type: t('process_material'),
        sales: footprint.process_material,
      },
      {
        type: t('process_manu'),
        sales: footprint.process_manu,
      },
      {
        type: t('process_pack'),
        sales: footprint.process_pack,
      }
    ];
  } else {
    process_data = [
      {
        type: t('process_material'),
        sales: footprint.process_material,
      },
      {
        type: t('process_manu'),
        sales: footprint.process_manu,
      },
      {
        type: t('process_pack'),
        sales: footprint.process_pack,
      },
      {
        type: t('process_sale'),
        sales: footprint.process_sale,
      },
      {
        type: t('process_use'),
        sales: footprint.process_use,
      },
      {
        type: t('process_dispose'),
        sales: footprint.process_dispose,
      },
  
    ];
  }

  const process_config = {
    data: process_data,
    xField: 'type',
    yField: 'sales',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: t('process_type'),
      },
      sales: {
        alias: t('footprint'),
      },
    },
  };


  const product_quantity = footprint.product_quantity
  const product_unit = footprint.product_unit.split('#')[1]


  const factor_sum = footprint.factor_sum

  const process_columns = [
    {
      title: t("life_cycle"),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('percent'),
      dataIndex: 'percent',
      key: 'percent',
    },
    {
      title: t('footprint_quantity'),
      dataIndex: 'result_quantity',
      key: 'result_quantity',
    },

    
  ];

  const category_columns = [
    {
      title: t("impact_category"),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('percent'),
      dataIndex: 'percent',
      key: 'percent',
    },
    {
      title: t('footprint_quantity'),
      dataIndex: 'result_quantity',
      key: 'result_quantity',
    },

    
  ];

  const category_total = (footprint.raw_material + footprint.consumables + footprint.energy
    + footprint.resource + footprint.transportation + footprint.carbon_fixation +
    footprint.recycled_material + footprint.packing_material)

  let category_table_data = [
    {
      key: '1',
      name: t('raw_material'),
      percent: footprint.raw_material / category_total * 100,
      result_quantity: footprint.raw_material,
    },
    {
      key: '2',
      name: t('consumables'),
      percent: footprint.consumables / category_total * 100,
      result_quantity: footprint.consumables,
    },
    {
      key: '3',
      name: t('energy'),
      percent: footprint.energy / category_total* 100,
      result_quantity: footprint.energy,
    },
    {
      key: '4',
      name: t('resource'),
      percent: footprint.resource / category_total* 100,
      result_quantity: footprint.resource,
    },
    {
      key: '5',
      name: t('transportation'),
      percent: footprint.transportation / category_total* 100,
      result_quantity: footprint.transportation,
    },
    {
      key: '6',
      name: t('carbon_fixation'),
      percent: footprint.carbon_fixation / category_total* 100,
      result_quantity: footprint.carbon_fixation,
    },
    {
      key: '7',
      name: t('recycled_material'),
      percent: footprint.recycled_material / category_total * 100,
      result_quantity: footprint.recycled_material,
    },
    {
      key: '8',
      name: t('packing_material'),
      percent: footprint.packing_material / category_total* 100,
      result_quantity: footprint.packing_material,
    },



  ];

  const process_total = (footprint.process_material + footprint.process_manu +
    footprint.process_pack + footprint.process_sale + footprint.process_use + footprint.process_dispose
  )
    // console.log(footprint, process_total)

  let process_table_data = []

 
  if (params.product_scope == "product_cradle_to_gate" ) {
   // console.log("this is gate")
    process_table_data = [
      {
        key: '1',
        name: t('process_material'),
        percent: footprint.process_material / process_total * 100.,
        result_quantity: footprint.process_material,
      },
      {
        key: '2',
        name: t('process_manu'),
        percent: footprint.process_manu  / process_total * 100,
        result_quantity: footprint.process_manu,
      },
      {
        key: '3',
        name: t('process_pack'),
        percent: footprint.process_pack / process_total * 100,
        result_quantity: footprint.process_pack,
      },
  
  

    ];
  } else {
   // console.log('this is grave')
      process_table_data = [
        {
          key: '1',
          name: t('process_material'),
          percent: footprint.process_material / process_total * 100,
          result_quantity: footprint.process_material,
        },
        {
          key: '2',
          name: t('process_manu'),
          percent: footprint.process_manu  / process_total * 100,
          result_quantity: footprint.process_manu,
        },
        {
          key: '3',
          name: t('process_pack'),
          percent: footprint.process_pack / process_total * 100,
          result_quantity: footprint.process_pack,
        },
        {
          key: '4',
          name: t('process_sale'),
          percent: footprint.process_sale / process_total * 100,
          result_quantity: footprint.process_sale,
        },
    
        {
          key: '5',
          name: t('process_use'),
          percent: footprint.process_use  / process_total * 100,
          result_quantity: footprint.process_use ,
        },
    
        {
          key: '6',
          name: t('process_dispose'),
          percent: footprint.process_dispose / process_total * 100,
          result_quantity: footprint.process_dispose,
        },
    
    
    
  
      ];
  }



  return (
    <div>
      <h1></h1>

      <Row gutter={16}>
      <Col span={12}>
        <Statistic title={t('footprint_result')+ " (kgCO2e)"} value={factor_sum / product_quantity}  precision={3}/>
      </Col>

      <Col span={12}>
        <Statistic title={t('unit')} value={product_unit} />
      </Col>

      </Row>

      <Divider  orientation="left"> {t('footprint_result_by_process')} </Divider>


      <Table pagination={false} columns={process_columns} dataSource={process_table_data} />

      <Divider orientation="left" > </Divider>

      <Column {...process_config} />

      <Divider orientation="left" > {t('footprint_result_by_category')} </Divider>

      <Table pagination={false} columns={category_columns} dataSource={category_table_data} />

      <Divider orientation="left" > </Divider>

      <Column {...category_config} />
      

    </div>
  ) 

}

;
export default App;
import React from 'react';
import { Card, Col, Row, Button, Divider } from 'antd';
import { ArrowDownOutlined, ArrowRightOutlined } from '@ant-design/icons';

import { useTranslation } from "react-i18next";
import { Space, Table, Tag } from 'antd';
import ExportExcel from './excel';

const App = (props) => {
  const { t } = useTranslation();
  let params = {...props}
  params = {...params, product_scope: params.product_life_cycle_scope}

  let process_data = params.getData_process()
  let product_data = params.get
  // console.log("process raw data", process_data)
  process_data = process_data.filter((value) => {
    if (value.parent_process === -1) {
      return true
    }
    return false
  }).map((data) => {
    return {...data, process_type: t(data.process_type)}
  })
  const  raw_inputoutput_data = params.getData_inputoutput()

  console.log("before", raw_inputoutput_data)

  

  let inputoutput_data = raw_inputoutput_data.map((value) => {
    let unit = JSON.parse(value.input_unit)[1]
    let a = JSON.parse(value.factor_db_basic)
    let db =  a.sum_factor + " / (" +  a.first +" / "+ a.second + ")" + a.factor_name + "#" + a.property + "# id:" + a.id
    let new_data = {...value,
      input_data_source: t(value.input_data_source),
      input_type: t(value.input_type),
      input_unit: unit,
      factor_db_basic: db,
    }
    if (value.factor_name == null) {
      new_data = {...new_data, 
                  factor_name: `N/A`,
                  factor_note: `N/A`,
                  factor_source: `N/A`,
                  factor_unit: `N/A`
      
      
      }
    }
    return new_data
  })
  

  let input_data = inputoutput_data.filter((data) => {
    if (data.input === "1") {
      return true
    }
    return false
  })
 
  let output_data = inputoutput_data.filter((data) => {
    if (data.input === "1") {
      return false
    }
    return true
  })







  const inputoutput_columns = [
    {
      title: t(`input_name`),
      dataIndex: 'input_name',
      fixed: "left",
      width: 150,
      key: 'input_name',
    },
    {
      title: t(`quantity`),
      dataIndex: 'input_quantity',
      width: 150,
      key: 'input_quantity',
    },
    {
      title: t(`input_data_source`),
      dataIndex: 'input_data_source',
      width: 150,
      key: 'input_data_source',
    },
    {
      title: t(`input_type`),
      dataIndex: 'input_type',
      width: 150,
      key: 'input_type',
    },
    {
      title: t(`input_stat_note`),
      dataIndex: 'input_stat_note',
      width: 150,
      key: 'input_stat_note',
    },
    {
      title: t(`unit`),
      dataIndex: 'input_unit',
      width: 150,
      key: 'input_unit',
    },
    {
      title: t(`factor_db_basic`),
      dataIndex: 'factor_db_basic',
      width: 150,
      key: 'factor_db_basic',
    },
    {
      title: t(`factor_name`),
      dataIndex: 'factor_name',
      width: 150,
      key: 'factor_name',
    },
    {
      title: t(`factor_note`),
      dataIndex: 'factor_note',
      width: 150,
      key: 'factor_note',
    },
    {
      title: t(`factor_source`),
      dataIndex: 'factor_source',
      width: 150,
      key: 'factor_source',
    },
    {
      title: t(`factor_unit`),
      dataIndex: 'factor_unit',
      width: 150,
      key: 'factor_unit',
    },

  ]





  const process_columns = [
    {
      title: t(`process_name`),
      dataIndex: 'process_name',
      fixed: "left",
      width: 150,
      key: 'process_name',
    },
    {
      title: t(`process_product_name`),
      dataIndex: 'process_product_name',
      width: 150,
      key: 'process_product_name',
    },
    {
      title: t(`process_product_percentage`),
      dataIndex: 'process_product_percentage',
      width: 150,
      key: 'process_product_percentage',
    },
    {
      title: t(`process_quantity`),
      dataIndex: 'process_quantity',
      width: 150,
      key: 'process_quantity',
    },
    {
      title: t(`process_unit`),
      dataIndex: 'process_unit',
      width: 150,
      key: 'process_unit',
    },
    {
      title: t(`process_type`),
      dataIndex: 'process_type',
      width: 150,
      key: 'process_type',
    },
    {
      title: t(`process_actual_quantity`),
      dataIndex: 'process_actual_quantity',
      width: 150,
      key: 'process_actual_quantity',
    },


  ];

  let ExcelExportData = raw_inputoutput_data




  return (
<div>

    <ExportExcel {...params} excelData={ExcelExportData} fileName={"Excel Export"}/>

<Divider/>
<>{t("process")}</>
<Table key='process' columns={process_columns} dataSource={process_data}            
scroll={{
          y: '60vh',
        }} />
<Divider/>
<>{t('input')}</>
<Table key='input' columns={inputoutput_columns} dataSource={input_data}  
        scroll={{
          y: '60vh',
        }}/>
<>{t('output')}</>
<Table key='output' columns={inputoutput_columns} dataSource={output_data}     
        scroll={{
          y: '60vh',
        }}/>

</div>

  )
};
export default App;




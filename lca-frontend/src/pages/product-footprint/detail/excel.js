import * as FileSaver from 'file-saver';
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import XLSX from 'sheetjs-style';
import { Button, Tooltip } from 'antd';
import axios from 'axios';
import global_config from "../../../global";
import { useNavigate } from 'react-router-dom';

const ExportExcel = (props ) => {
  let params = props;
  let excelData = params.excelData
  let fileName = params.fileName
  const { t } = useTranslation();
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const navigate = useNavigate()


  const cleanData = async (array) => {
    let nextLevel = [];
    console.log("array",array)
    excelData = array.map((value) => {
      let db_basic = JSON.parse(value.factor_db_basic)
      if (db_basic.property === "private") {
        nextLevel = nextLevel.concat(value)
      }
      return {
       
        footprint: value.footprint,
        input_name: value.input_name,
        process_type: t(value.process_type),
        input_quantity: value.input_quantity,
        input_stat_note: value.input_stat_note,
        input_type: t(value.input_type),
        input_unit: JSON.parse(value.input_unit)[1],
        input_data_source: t(value.input_data_source),
        factor_name_manual: value.factor_name,
        factor_unit_manual: value.factor_unit,
        factor_note_manual: value.factor_note,
        factor_source_manual: value.factor_source,
        factor_db_basic: value.factor_db_basic,
        transportation: (Number(value.transportation) === 0 ? "N/A": value.transportation),
        road: (Number(value.transportation) === 0 ? "N/A": value.road),
        input: (Number(value.input) === 1? "INPUT": "OUTPUT")
      }
    })
    console.log('nextLevel', nextLevel, "excelData", excelData)
    if (nextLevel.length === 0) {
      return excelData
    } else {

      const promises = nextLevel.map(async (data) => {
        let dba = JSON.parse(data.factor_db_basic)

        return getAllInputOutput_product_id(dba.id - 10000)

      });

      const nestedResults = await Promise.all(promises);
      console.log("nest", nestedResults)

      const v = nestedResults.map(async (result) => {
        return cleanData(result)
      })

      const v_cleaned = await Promise.all(v)
      

      excelData = array.map((value) => {
        return {

          footprint: value.footprint,
          input_name: value.input_name,
          process_type: t(value.process_type),
          input_quantity: value.input_quantity,
          input_unit: JSON.parse(value.input_unit)[1],
          input_stat_note: value.input_stat_note,
          input_type: t(value.input_type),
          input_data_source: t(value.input_data_source),
          factor_name_manual: value.factor_name,
          factor_unit_manual: value.factor_unit,
          factor_note_manual: value.factor_note,
          factor_source_manual: value.factor_source,
          factor_db_basic: value.factor_db_basic,
          transportation: (Number(value.transportation) === 0 ? "N/A": value.transportation),
          road: (Number(value.transportation) === 0 ? "N/A": value.road),
          input: (Number(value.input) === 1? "INPUT": "OUTPUT")
        }
      })

      for (let i=0; i < v_cleaned.length; i++) {
        let nextLevelData_data = nextLevel[i]
        let footprint_total = nextLevelData_data.footprint
        let total = 0
        for (let j=0; j < v_cleaned[i].length; j++) {
          
          total = total + v_cleaned[i][j].footprint

        }
        // console.log("total", total)
        for (let j=0; j < v_cleaned[i].length; j++) {
          // console.log("aa", v_cleaned[i][j])
          let footprint_Ratio =  (v_cleaned[i][j].footprint / total * 100).toFixed(2) + '%'
          v_cleaned[i][j].footprint = v_cleaned[i][j].footprint / total * footprint_total 
       
          v_cleaned[i][j].input_name = nextLevelData_data.input_name + "( " + v_cleaned[i][j].input_name + ")"
          excelData = excelData.concat(v_cleaned[i][j])
          // console.log("bb", v_cleaned[i][j])
        }


      }
      // console.log('exceldata',excelData)

      return excelData
    }

  }

  async function getAllInputOutput_product_id(product_id) {
    console.log("pid", product_id);
    let token = JSON.parse(localStorage.getItem('token'));
  
    try {
      const response = await axios.post(global_config.root_url + '/auth/getAllInputOutput_product_id', { product_id }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      if (response.data.status === 0) {
        console.log('request input data success', response.data.data);
        return response.data.data;
      } else if (response.data.status === 2) {
        navigate("/login", {
          replace: true,
        });
        return []; // Return an empty array in this case
      } else {
        alert("error: please contact ssbti for support");
        return []; // Return an empty array in this case
      }
    } catch (error) {
      console.error(error);
      return []; // Return an empty array if there's an error
    }
  }
  

  // async function getAllInputOutput_product_id(product_id) {
  //   console.log("pid", product_id)
  //   let token = JSON.parse(localStorage.getItem('token'));
  //   axios.post(global_config.root_url + '/auth/getAllInputOutput_product_id', {product_id}, { 
  //     headers: {
  //       "Authorization" : `Bearer ${token}`} 
  //               })
  //         .then(response => {
  //   if (response.data.status === 0) {
  //     console.log('request input data success', response.data.data)
  //     return response.data.data
  //     // // console.log("input length", response.data.length)
      
  //   } else if (response.data.status === 2) {
  //       // status:2 means jwt error or expire
  //       navigate("/login", {
  //         replace: true,
  //       })
  //   }
  //   // login fail
  //   else {
  //     alert("error: please contact ssbti for support")
  //     // console.log(response.data)
  //     return []; // Return an empty array if there's an error
  //   }
  //   })
  //   .catch(error => {
  //     console.error(error);
  //     return []; // Return an empty array if there's an error
  //   });

  //       }

  const exportToExcel = async () => {
    

    // now do some cleaning
    excelData = await cleanData(excelData)

    // product
    let product_info = [{
      name: params.product_name,
      model: params.product_model,
      type: t(params.product_type),
      quantity: params.product_quantity_unit,
      scope: params.product_scope,
      range: params.product_stats_range,
      
    }]

    const anotherWs = XLSX.utils.json_to_sheet(product_info);
    const sheetName = 'product';


    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = {Sheets: {'data': ws}, SheetNames: ['data'] };

    // Add the new worksheet to the workbook
    wb.Sheets[sheetName] = anotherWs;
    wb.SheetNames.push(sheetName);


    const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);


  }


  return (
    <>
      <Tooltip title={t("excel")}>
        <Button 
          type='primary'
          onClick={(e) => exportToExcel(fileName)}>
          {t("excel")}
        </Button>

      </Tooltip>

    </>

  )

  


}


export default ExportExcel;
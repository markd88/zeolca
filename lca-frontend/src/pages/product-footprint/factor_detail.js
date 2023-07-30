import react, { useEffect, useState } from 'react';
import { Button, Descriptions, Divider, Skeleton } from 'antd';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import global_config from '../../global';

import axios from 'axios';


const App = () => {
  const { index } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation();




  const [params, setData] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);

    axios.post(global_config.root_url +'/api/getfactor_db_fid', 
        {factor_id: index})
        .then((response) => {
          // console.log(response)
          // login success
          if (response.data.status === 0) {
            const raw_data = response.data.data
            setData(raw_data)
            // console.log(raw_data)
            setLoading(false)

          } else if (response.data.status === 2) {
              // status:2 means jwt error or expire
              navigate("/login", {
                replace: true,
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

      }


  useEffect(() => {
    fetchData()
  }, [])

  return (
    loading ? (<Skeleton/>): (
      <>
   
      <Divider></Divider>
        <Descriptions title={params['1级分类\n（Level 1）']+params['2级分类\n（Level 2）']+params['3级分类\n（Level 3）']} bordered>
          <Descriptions.Item label={'1级分类\n（Level 1）'} span={1.5}>{params['1级分类\n（Level 1）']}</Descriptions.Item>
          <Descriptions.Item label={'2级分类\n（Level 2）'} span={1.5}>{params['2级分类\n（Level 2）']}</Descriptions.Item>
          <Descriptions.Item label={'3级分类\n（Level 3）'} span={1.5}>{params['3级分类\n（Level 3）']}</Descriptions.Item>
          <Descriptions.Item label={'测算地区' } span={1.5}>{'中国'}</Descriptions.Item>
          <Descriptions.Item label={'适用地区'} span={3}>{'中国'}</Descriptions.Item>
          <Descriptions.Item label={'上游排放\n（Upstream emissions）'} span={1.5}>{params['上游排放\n（Upstream emissions）']}</Descriptions.Item>
          <Descriptions.Item label={'上游排放单位\n（Unit）'} span={1.5}>{params['上游排放单位\n（Unit）']} </Descriptions.Item>
          <Descriptions.Item label={'下游排放\n（Downstream emissions）'} span={1.5}> {params['下游排放\n（Downstream emissions）']} </Descriptions.Item>
          <Descriptions.Item label={'下游排放单位\n（Unit）'} span={1.5}> {params['下游排放单位\n（Unit）']} </Descriptions.Item>
          <Descriptions.Item label={ '排放环节\n（Emission processes）'} span={3}> {params[ '排放环节\n（Emission processes）']} </Descriptions.Item>
  
          <Descriptions.Item label={'排放温室气体占比\n（GHG percentage）'} span={1.5}> {params['排放温室气体占比\n（GHG percentage）']} </Descriptions.Item>
          <Descriptions.Item label={ '数据时间\n（Year）'} span={1.5}>{params[ '数据时间\n（Year）']}</Descriptions.Item>
          <Descriptions.Item label={ '不确定性\n（Uncertainty）'} span={1.5}>{params[ '不确定性\n（Uncertainty）']}</Descriptions.Item>
          <Descriptions.Item label={'其他\n（Others）'} span={1.5}>{params['其他\n（Others）']}</Descriptions.Item>
  
          <Descriptions.Item label={'参考文献/数据来源\n（Data source）'} span={3} >{params['参考文献/数据来源\n（Data source）']}</Descriptions.Item>
          <Descriptions.Item label={'负责人\n（Principal）'} span={1.5}>{params['负责人\n（Principal）']}</Descriptions.Item>
          <Descriptions.Item label={'参考文献/简化\n（Data source）'} span={1.5}>{params['参考文献/简化\n（Data source）']}</Descriptions.Item>
  
  
        </Descriptions>
      </>
    )



  )


  return (
    <p></p>
  )
}

export default App;
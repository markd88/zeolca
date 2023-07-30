import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Select, Button, Card, Col, Row, Space, Collapse} from 'antd';
import { useTranslation } from "react-i18next";
import axios from 'axios';

import global_config from "../../global";

const { Panel } = Collapse;

const App = () => {
  const navigate = useNavigate()

  const onChange = (key) => {
    // console.log(key);
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState()

  let factor_database = "all"
  let factor_name = null
  
  // console.log("data", data)
  let level_one = data.map((data) => {
    return data[ '1级分类\n（Level 1）']
  })

  level_one = [...new Set(level_one)]


  let level_two = data.map((data) => {
    return data['2级分类\n（Level 2）']
  })

  level_two = new Set(level_two)


// console.log(level_one, level_two)

  let one_to_two = new Map()

  for (let i = 0; i < level_one.length; i++ ) {
    let target = data.map((value) => {
      if (value['1级分类\n（Level 1）'] == level_one[i] && level_two.has(value['2级分类\n（Level 2）'])) {
        level_two.delete(value['2级分类\n（Level 2）'])
        return [value['2级分类\n（Level 2）'], value.id]
      }
    }).filter((value) => {
      return value
    })

    one_to_two.set(level_one[i], target)
  }


  let level_one_two = data.map((data) => {
    return data['1级分类\n（Level 1）'] + "##" + data['2级分类\n（Level 2）']
  })

  level_one_two = [...new Set(level_one_two)]

  let onetwo_to_data = new Map()

  for (let i = 0; i < level_one_two.length; i++ ) {
    let target = data.map((value) => {
      if (value['1级分类\n（Level 1）'] + "##" + value[ '2级分类\n（Level 2）'] == level_one_two[i]) {
        return value
      }
    }).filter((value) => {
      return value
    })
    onetwo_to_data.set(level_one_two[i], target)
  }

  // console.log(one_to_two, "one_to two")
  // console.log(onetwo_to_data, 'one two data')

  const fetchData = () => {
    setLoading(true);
    // console.log('here')
    axios.post(global_config.root_url+'/api/getfactor_db', 
        {factor_database:factor_database, factor_name: factor_name})
        .then((response) => {
          // console.log(response)
          // login success
          if (response.data.status === 0) {
            const processed = response.data.data
            setData(processed)
            // console.log(processed)
            setLoading(false)

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

  const options = [
    {
      value: 'all',
      label: 'all',
    },
    {
      value: 'CPCD',
      label: 'CPCD',
    },
    {
      value: 'IPCC',
      label: 'IPCC',
    },
  ];

  const inputChange = (value) => {
    
    factor_name =value.target.value
    // console.log(factor_name)
  }

  const handleChange = (value) => {
    factor_database = value
    // console.log(factor_database)
  };


  const searchDataBase = () => {
    // console.log('search', factor_database, factor_name)
  }



  return (

      <div className="site-card-wrapper">

        {/* <Space>
            <Button type='text'> 数据库:</Button>

            <Select
              label={"数据库"}
              defaultValue="all"
              onChange={handleChange}
              options={options}
              style={{
                width:100
              }}
            > 
            </Select>

            <Button type='text'> 名称: </Button>
            <Input  placeholder="factor name" onChange={inputChange}/>

            <Button type="primary" shape="circle" onClick={searchDataBase} icon={<SearchOutlined />} />

        </Space> */}

        <Row gutter={16}>

          {level_one.map((level_name_one) => {
            return (
              <Col span={8}>
                <Card title={level_name_one} bordered={false}  loading={loading} 
                style={{
                      marginTop: 20,
                      height: 300,
                      overflow: "auto"
                      }}>
                  <Collapse onChange={onChange}>
                    {one_to_two.get(level_name_one).map((level_name_two) => {
                      return (
                        <Panel header={level_name_two[0]} key={level_name_two[1]}>
                          <Space
                              direction="vertical"
                              size="small"
                            >
                          {
                            onetwo_to_data.get(level_name_one + "##" + level_name_two[0]).map((data) => {
                              return (

                                <Button type="link" href={`/factor-detail/${data.id} `} target={'_blank'} >{data['3级分类\n（Level 3）']}</Button>
                              )
                            })
                          }
                        </Space>
                        </Panel>
                      )

                    })
                    }

                  </Collapse>
                </Card>
              </Col>
            )
          })}


        </Row>
        <Row>
          {"*The database was based on CPCD （China Product Carbon footprint Database）, and supplemented by SSBTi.org / SSBTi.net. All rights reserved"}
        </Row>
      </div>

  )


}

export default App;
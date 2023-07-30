import React, { useState, useRef } from 'react';
import { Card, Button, Layout,  Popover, Drawer, Modal, Divider, Space} from 'antd';
import { ArrowDownOutlined, ArrowRightOutlined, PlusOutlined } from '@ant-design/icons';
import ProductDrawer from '../ModifyItem';
import ProcessDrawer from '../ProcessDrawer';
import ModifyProcessDrawer from '../ProcessModifyDrawer';
import InputDrawer from '../InputDrawer';
import OutputDrawer from '../OutputDrawer'; 
import ModifyInputDrawer from '../ModifyInputDrawer';
import ModifyOutputDrawer from '../ModifyOutputDrawer';


import { useTranslation } from "react-i18next";

const App = (props) => {

  const { t } = useTranslation();
  let params = props
  if (params.p_unit) {
    params = {...props,  product_full_unit: params.p_unit}
  }
  



  const process_data = params.getData_process()
  const inputoutput_data = params.getData_inputoutput()

  // // console.log(inputoutput_data, "input data")

  const type_one = process_data.filter((data, id) => {
    if (data.process_type == 'process_material' && data.main_output == 1) {
      return data
    }
  })

  const type_two = process_data.filter((data, id) => {
    if (data.process_type == 'process_manu'  && data.main_output == 1 ) {
      return data
    }
  })

  const type_three = process_data.filter((data, id) => {
    if (data.process_type == 'process_pack'  && data.main_output == 1 ) {
      return data
    }
  })

  const type_four = process_data.filter((data, id) => {
    if (data.process_type == 'process_sale' && data.main_output == 1 ) {
      return data
    }
  })

  const type_five = process_data.filter((data, id) => {
    if (data.process_type == 'process_use'  && data.main_output == 1 ) {
      return data
    }
  })

  const type_six = process_data.filter((data, id) => {
    if (data.process_type == 'process_dispose'  && data.main_output == 1 ) {
      return data
    }
  })



  const [productModifyOpen, setProductModifyOpen] = useState(false);
  const [processOpen, setProcessOpen] = useState(false);

  const [modifyprocessOpen, setModifyProcessOpen] = useState(false);

  const [InputOpen, setInputOpen] = useState(false)
  const [OutputOpen, setOutputOpen] = useState(false)

  const [ModifyInputOpen, setModifyInputOpen] = useState(false)

  const [ModifyOutputOpen, setModifyOutputOpen] = useState(false)



  const currentInput = useRef()


  const currentProcess = useRef()
 


  const currentOutput = useRef()



  
  // const calculate = () => {
  //   const product_id = params.product_id
  //   // console.log(product_id, "click calculate")
  // }


  const getcurrentProcess = () => {
    // console.log('current process in grave called')
    // console.log(currentProcess.current)
    return currentProcess.current
  }

  const getcurrentInput = () => {
    return currentInput.current
  }

  const getcurrentOutput = () => {
    return currentOutput.current
  }

  const content = (
    <p>this is content</p>
  )





  const onProductClose = () => {
    setProductModifyOpen(false);
  };

  const onProcessClose = () => {
    setProcessOpen(false);
  };

  const onModifyProcessClose = () => {
    setModifyProcessOpen(false);
  };

  const onInputClose = () => {
    newInputRef.current.reset()
    // console.log('grave input', currentInput)
    //setCurrentInput(null)
    setInputOpen(false)
  }

  const onOutputClose = () => {
    newOutputRef.current.reset()
    // console.log('grave input', currentOutput)
    //setCurrentInput(null)
    setOutputOpen(false)
  }


  const onModifyInputClose = () => {
    modifyInputRef.current.reset()
    setFirst_input(false)
    // setCurrentInput(null)
    setModifyInputOpen(false)
  }

  const onModifyOutputClose = () => {
    modifyOutputRef.current.reset()
    setFirst_output(false)
    // setCurrentInput(null)
    setModifyOutputOpen(false)
  }



  const productModify = () => {
    setProductModifyOpen(true)
  }


  const processAdd = () => {
    // setCurrentProcess(null)
    currentProcess.current = null
    setProcessOpen(true)

  }

  const addInput = (data) => () => {

    //setCurrentProcess(data)
    //setCurrentInput(null)

    currentInput.current = null
    currentProcess.current = data

    setInputOpen(true)
    
  }
  
  const addOutput = (data) => () => {
    // setCurrentProcess(data)
    // setCurrentOutput(null)

    currentProcess.current = data
    currentOutput.current = null
    setOutputOpen(true)
  }



  const modifyProcess = (data) => () => {
    // setCurrentProcess(data)
    currentProcess.current = data
    setModifyProcessOpen(true)
    
  }



  const [first_input, setFirst_input] = useState(true)
  const [first_output, setFirst_output] = useState(true)

  const modifyInput = (value, data) => () => {


    // setCurrentInput(value)

    // setCurrentProcess(data)

    currentInput.current = value
    currentProcess.current = data


    if (! first_input) {
      modifyInputRef.current.reset()
    }
    // console.log(currentProcess.current, currentInput.current)
    setModifyInputOpen(true)
  }


  const modifyOutput = (value, data) =>  async () => {

    currentOutput.current = value
    currentProcess.current = data

    if (! first_output) {
      modifyOutputRef.current.reset()
    }
    
    setModifyOutputOpen(true)
  }



  const modifyInputRef = React.useRef(null)
  const newInputRef = React.useRef(null)

  const modifyOutputRef = React.useRef(null)
  const newOutputRef = React.useRef(null)


  // useEffect(() => {
    
  

  // }, [currentInput])
  

  return (

    <>
        {/* <Button onClick={calculate}>{'计算'}</Button> */}
    

    <Layout style={{align:'center'}}>

      <Card style={{overflow:'auto', width:1070 }}>
      
      <Card.Grid 
          hoverable={false}
          style={{    
            width: 60,
            height: 70,
            // textAlign: 'center',
            fontSize: 15,
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
          }}>
              <p style={{marginRight:-10}}></p>
        </Card.Grid>


        <Card.Grid 
          hoverable={false}
          style={{    
          width: 300,
          height: 70,
          textAlign: 'center',
          fontSize: 20,
          }}>

            {t("input")}
        </Card.Grid>

        <Card.Grid 
          hoverable={false}
          style={{    
          width: 50,
          height: 70,
          textAlign: 'center',
          align: 'center',
          fontSize: 25,
          }}>

        </Card.Grid>

        <Card.Grid hoverable={false} style={{    
          width: 300,
          height: 70,
          textAlign: 'center',
                }}>

            <Button onClick={productModify}  type="primary" block  >
                {`${params.product_name} (${params.product_quantity}/${params.product_full_unit.split('#')[1]})`}
            </Button>


        </Card.Grid>

        <Card.Grid 
          hoverable={false}
          style={{    
            width: 50,
            height: 70,
            textAlign: 'center',
            align: 'center',
            fontSize: 25,
          }}>

        </Card.Grid>
        <Card.Grid 
          hoverable={false}
          style={{    
          width: 300,
          height: 70,
          textAlign: 'center',
          fontSize: 20,
          }}>
            {t('output')}
        </Card.Grid>

      <p style={{width: 1070}}/>

          {/** row one */}
      {type_one.map((data, index) => {
        return (
          <>
            <Card.Grid 

            hoverable={false}
            style={{    
              width: 60,
              // textAlign: 'center',
              fontSize: 15,
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
            }}>
                <p style={{marginRight:-10}}>{t('process_material_short')}</p>
          </Card.Grid>
  
          <Card.Grid 
   
            hoverable={false}
            style={{    
            width: 300,
            textAlign: 'center',
                  }}>
            {inputoutput_data.filter(( input ) => {
              return input.process_id == data.id &&  input.input == 1
            }).map((value) => {
              return (
              <>
              <Button block onClick={modifyInput(value, data)} >{value.input_name}</Button> 
              <Divider/>
              </>
              )
            })}
            <Button block type='dashed' onClick={addInput(data)} icon={<PlusOutlined />}>  </Button>
          </Card.Grid>
  
          <Card.Grid 
 
            hoverable={false}
            style={{    
            width: 50,
            textAlign: 'center',
            align: 'center',
            fontSize: 25,
            }}>
              <ArrowRightOutlined style={{marginLeft: -10}}/>
          </Card.Grid>
  
          <Card.Grid 
      
            hoverable={false} style={{    
            width: 300,
            textAlign: 'center',
                  }}>
            <Popover content={content} title="Title">
              <Button onClick={modifyProcess(data)}  block >
                  {`${data.process_name} (${data.id})`}
              </Button>
          </Popover>
          </Card.Grid>
  
          <Card.Grid 
      
            hoverable={false}
            style={{    
              width: 50,
              textAlign: 'center',
              align: 'center',
              fontSize: 25,
            }}>
              <ArrowRightOutlined style={{marginLeft: -10}}/>
          </Card.Grid>

          <Card.Grid 
  
            hoverable={false} 
            style={{    
              width: 300,
              textAlign: 'center'}}>
              {inputoutput_data.filter(( input ) => {
              return input.process_id == data.id && input.input == 0
            }).map((value) => {
              return (
              <>
              <Button block onClick={modifyOutput(value, data)} >{value.input_name}</Button> 
              <Divider/>
              </>
              )
            })}
                <Button block type='dashed'  onClick={addOutput(data)}  icon={<PlusOutlined />}> </Button>
          </Card.Grid>
          </>
          )
              })}


      {/* Row One */}
      <Card.Grid 
          hoverable={false}
          style={{    
            width: 60,
            // textAlign: 'center',
            fontSize: 15,
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
          }}>
              <p style={{marginRight:-10}}>{t("process_material_short")}</p>
      </Card.Grid>


        <Card.Grid 
          hoverable={false}
          style={{    
          width: 300,
          textAlign: 'center',
                }}>
          
        </Card.Grid>

        <Card.Grid 
          hoverable={false}
          style={{    
          width: 50,
          textAlign: 'center',
          align: 'center',
          fontSize: 25,
          }}>
            <ArrowRightOutlined style={{marginLeft: -10}}/>
        </Card.Grid>

        <Card.Grid 
          hoverable={false} style={{    
          width: 300,
          textAlign: 'center',
                }}>
          <Button block type='dashed' onClick={processAdd} icon={<PlusOutlined />}>  {t("add_process")} </Button>
        </Card.Grid>

        <Card.Grid 
          hoverable={false}
          style={{    
            width: 50,
            textAlign: 'center',
            align: 'center',
            fontSize: 25,
          }}>
            <ArrowRightOutlined style={{marginLeft: -10}}/>
        </Card.Grid>

        <Card.Grid 
        hoverable={false} 
          style={{    
            width: 300,
            textAlign: 'center'}}>





        </Card.Grid>

        <ArrowDownOutlined style={{fontSize: 30, position: 'relative', marginLeft: "50%", marginRight: "50%"}}/>
{/**row two */}
        {type_two.map((data, index) => {
        return (
          <>
            <Card.Grid 

            hoverable={false}
            style={{    
              width: 60,
              // textAlign: 'center',
              fontSize: 15,
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
            }}>
                <p style={{marginRight:-10}}>{t('process_manu_short')}</p>
          </Card.Grid>
  
  
          <Card.Grid
 
            hoverable={false}
            style={{    
            width: 300,
            textAlign: 'center',
                  }}>
              {inputoutput_data.filter(( input ) => {
              return input.process_id == data.id && input.input == 1
            }).map((value) => {
              return (
              <>
              <Button block onClick={modifyInput(value, data)} >{value.input_name}</Button> 
              <Divider/>
              </>
              )
            })}
            <Button block type='dashed' onClick={addInput(data)} icon={<PlusOutlined />}> </Button>
          </Card.Grid>
  
          <Card.Grid 

            hoverable={false}
            style={{    
            width: 50,
            textAlign: 'center',
            align: 'center',
            fontSize: 25,
            }}>
              <ArrowRightOutlined style={{marginLeft: -10}}/>
          </Card.Grid>
  
          <Card.Grid

           hoverable={false} style={{    
            width: 300,
            textAlign: 'center',
                  }}>
            <Button block  onClick={modifyProcess(data)} > {data.process_name} </Button>
          </Card.Grid>
  
          <Card.Grid 

            hoverable={false}
            style={{    
              width: 50,
              textAlign: 'center',
              align: 'center',
              fontSize: 25,
            }}>
              <ArrowRightOutlined style={{marginLeft: -10}}/>
          </Card.Grid>

          <Card.Grid 
  
          hoverable={false} 
            style={{    
              width: 300,
              textAlign: 'center'}}>
            {inputoutput_data.filter(( input ) => {
              return input.process_id == data.id && input.input == 0
            }).map((value) => {
              return (
              <>
              <Button block onClick={modifyOutput(value, data)} >{value.input_name}</Button> 
              <Divider/>
              </>
              )
            })}

                <Button block type='dashed'  onClick={addOutput(data)}  icon={<PlusOutlined />}> </Button>
          </Card.Grid>
          </>
          )
              })}

    {/* Row Two */}

        <Card.Grid 
          hoverable={false}
          style={{    
            width: 60,
            // textAlign: 'center',
            fontSize: 15,
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
          }}>
              <p style={{marginRight:-10}}>{t("process_manu_short")}</p>
        </Card.Grid>


        <Card.Grid 
          hoverable={false}
          style={{    
          width: 300,
          textAlign: 'center',
                }}>

        </Card.Grid>

        <Card.Grid 
          hoverable={false}
          style={{    
          width: 50,
          textAlign: 'center',
          align: 'center',
          fontSize: 25,
          }}>
            <ArrowRightOutlined style={{marginLeft: -10}}/>
        </Card.Grid>

        <Card.Grid hoverable={false} style={{    
          width: 300,
          textAlign: 'center',
                }}>
          <Button block type='dashed' icon={<PlusOutlined />} onClick={processAdd}> {t("add_process")} </Button>
        </Card.Grid>

        <Card.Grid 
          hoverable={false}
          style={{    
            width: 50,
            textAlign: 'center',
            align: 'center',
            fontSize: 25,
          }}>
            <ArrowRightOutlined style={{marginLeft: -10}}/>
        </Card.Grid>
        <Card.Grid 
        hoverable={false} 
          style={{    
            width: 300,
            textAlign: 'center'}}>
     
        </Card.Grid>

        <ArrowDownOutlined style={{fontSize: 30, position: 'relative', marginLeft: "50%", marginRight: "50%"}}/>

    {/* Row Three */}
    {type_three.map((data, index) => {
        return (
          <>
            <Card.Grid 

            hoverable={false}
            style={{    
              width: 60,
              // textAlign: 'center',
              fontSize: 15,
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
            }}>
                <p style={{marginRight:-10}}>{t('process_pack_short')}</p>
          </Card.Grid>
  
  
          <Card.Grid 
  
            hoverable={false}
            style={{    
            width: 300,
            textAlign: 'center',
                  }}>
             {inputoutput_data.filter(( input ) => {
              return input.process_id == data.id && input.input == 1
            }).map((value) => {
              return (
              <>
              <Button block onClick={modifyInput(value, data)} >{value.input_name}</Button> 
              <Divider/>
              </>
              )
            })}
  
            <Button block type='dashed'  onClick={addInput(data)}  icon={<PlusOutlined />}> </Button>
          </Card.Grid>
  
          <Card.Grid 
  
            hoverable={false}
            style={{    
            width: 50,
            textAlign: 'center',
            align: 'center',
            fontSize: 25,
            }}>
              <ArrowRightOutlined style={{marginLeft: -10}}/>
          </Card.Grid>
  
          <Card.Grid hoverable={false} style={{    
            width: 300,
            textAlign: 'center',
                  }}>
            <Button block  onClick={modifyProcess(data)} > {data.process_name} </Button>
          </Card.Grid>
  
          <Card.Grid 
 
            hoverable={false}
            style={{    
              width: 50,
              textAlign: 'center',
              align: 'center',
              fontSize: 25,
            }}>
              <ArrowRightOutlined style={{marginLeft: -10}}/>
          </Card.Grid>

          <Card.Grid

          hoverable={false}  
            style={{    
              width: 300,
              textAlign: 'center'}}>
              {inputoutput_data.filter(( input ) => {
              return input.process_id == data.id && input.input == 0
            }).map((value) => {
              return (
              <>
              <Button block onClick={modifyOutput(value, data)} >{value.input_name}</Button> 
              <Divider/>
              </>
              )
            })}
                <Button block type='dashed'  onClick={addOutput(data)} icon={<PlusOutlined />}> </Button>
          </Card.Grid>
          </>
          )
              })}

        <Card.Grid 

          hoverable={false}
          style={{    
            width: 60,
            // textAlign: 'center',
            fontSize: 15,
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
          }}>
              <p style={{marginRight:-10}}>{t("process_pack_short")}</p>
        </Card.Grid>


        <Card.Grid 
          hoverable={false}
          style={{    
          width: 300,
          textAlign: 'center'}}>
         
        </Card.Grid>

        <Card.Grid 
          hoverable={false}
          style={{    
          width: 50,
          textAlign: 'center',
          align: 'center',
          fontSize: 25,
          }}>
            <ArrowRightOutlined style={{marginLeft: -10}}/>
        </Card.Grid>

        <Card.Grid hoverable={false} style={{    
          width: 300,
          textAlign: 'center',
                }}>
          <Button block type='dashed' icon={<PlusOutlined />} onClick={processAdd}> {t("add_process")} </Button>
        </Card.Grid>

        <Card.Grid 
          hoverable={false}
          style={{    
            width: 50,
            textAlign: 'center',
            align: 'center',
            fontSize: 25,
          }}>
            <ArrowRightOutlined style={{marginLeft: -10}}/>
        </Card.Grid>
        <Card.Grid
          hoverable={false} 
          style={{    
            width: 300,
            textAlign: 'center'}}>
            
        </Card.Grid>

        <ArrowDownOutlined style={{fontSize: 30, position: 'relative', marginLeft: "50%", marginRight: "50%"}}/>
{/**row four */}
        {type_four.map((data, index) => {
        return (
          <>
            <Card.Grid 

            hoverable={false}
            style={{    
              width: 60,
              // textAlign: 'center',
              fontSize: 15,
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
            }}>
                <p style={{marginRight:-10}}>{t('process_sale_short')}</p>
          </Card.Grid>
  
  
          <Card.Grid
 
            hoverable={false}
            style={{    
            width: 300,
            textAlign: 'center',
                  }}>
              {inputoutput_data.filter(( input ) => {
              return input.process_id == data.id && input.input == 1
            }).map((value) => {
              return (
              <>
              <Button block onClick={modifyInput(value, data)} >{value.input_name}</Button> 
              <Divider/>
              </>
              )
            })}
            <Button block type='dashed' onClick={addInput(data)} icon={<PlusOutlined />}> </Button>
          </Card.Grid>
  
          <Card.Grid 

            hoverable={false}
            style={{    
            width: 50,
            textAlign: 'center',
            align: 'center',
            fontSize: 25,
            }}>
              <ArrowRightOutlined style={{marginLeft: -10}}/>
          </Card.Grid>
  
          <Card.Grid

           hoverable={false} style={{    
            width: 300,
            textAlign: 'center',
                  }}>
            <Button block  onClick={modifyProcess(data)} > {data.process_name} </Button>
          </Card.Grid>
  
          <Card.Grid 

            hoverable={false}
            style={{    
              width: 50,
              textAlign: 'center',
              align: 'center',
              fontSize: 25,
            }}>
              <ArrowRightOutlined style={{marginLeft: -10}}/>
          </Card.Grid>

          <Card.Grid 
  
          hoverable={false} 
            style={{    
              width: 300,
              textAlign: 'center'}}>
            {inputoutput_data.filter(( input ) => {
              return input.process_id == data.id && input.input == 0
            }).map((value) => {
              return (
              <>
              <Button block onClick={modifyOutput(value, data)} >{value.input_name}</Button> 
              <Divider/>
              </>
              )
            })}

                <Button block type='dashed'  onClick={addOutput(data)}  icon={<PlusOutlined />}> </Button>
          </Card.Grid>
          </>
          )
              })}

    {/* Row four */}

        <Card.Grid 
          hoverable={false}
          style={{    
            width: 60,
            // textAlign: 'center',
            fontSize: 15,
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
          }}>
              <p style={{marginRight:-10}}> {t('process_sale_short')}</p>
        </Card.Grid>


        <Card.Grid 
          hoverable={false}
          style={{    
          width: 300,
          textAlign: 'center',
                }}>

        </Card.Grid>

        <Card.Grid 
          hoverable={false}
          style={{    
          width: 50,
          textAlign: 'center',
          align: 'center',
          fontSize: 25,
          }}>
            <ArrowRightOutlined style={{marginLeft: -10}}/>
        </Card.Grid>

        <Card.Grid hoverable={false} style={{    
          width: 300,
          textAlign: 'center',
                }}>
          <Button block type='dashed' icon={<PlusOutlined />} onClick={processAdd}>  {t("add_process")}</Button>
        </Card.Grid>

        <Card.Grid 
          hoverable={false}
          style={{    
            width: 50,
            textAlign: 'center',
            align: 'center',
            fontSize: 25,
          }}>
            <ArrowRightOutlined style={{marginLeft: -10}}/>
        </Card.Grid>
        <Card.Grid 
        hoverable={false} 
          style={{    
            width: 300,
            textAlign: 'center'}}>
     
        </Card.Grid>

        <ArrowDownOutlined style={{fontSize: 30, position: 'relative', marginLeft: "50%", marginRight: "50%"}}/>
{/**row five */}
        {type_five.map((data, index) => {
        return (
          <>
            <Card.Grid 

            hoverable={false}
            style={{    
              width: 60,
              // textAlign: 'center',
              fontSize: 15,
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
            }}>
                <p style={{marginRight:-10}}>{t('process_use_short')}</p>
          </Card.Grid>
  
  
          <Card.Grid
 
            hoverable={false}
            style={{    
            width: 300,
            textAlign: 'center',
                  }}>
              {inputoutput_data.filter(( input ) => {
              return input.process_id == data.id && input.input == 1
            }).map((value) => {
              return (
              <>
              <Button block onClick={modifyInput(value, data)} >{value.input_name}</Button> 
              <Divider/>
              </>
              )
            })}
            <Button block type='dashed' onClick={addInput(data)} icon={<PlusOutlined />}> </Button>
          </Card.Grid>
  
          <Card.Grid 

            hoverable={false}
            style={{    
            width: 50,
            textAlign: 'center',
            align: 'center',
            fontSize: 25,
            }}>
              <ArrowRightOutlined style={{marginLeft: -10}}/>
          </Card.Grid>
  
          <Card.Grid

           hoverable={false} style={{    
            width: 300,
            textAlign: 'center',
                  }}>
            <Button block  onClick={modifyProcess(data)} > {data.process_name} </Button>
          </Card.Grid>
  
          <Card.Grid 

            hoverable={false}
            style={{    
              width: 50,
              textAlign: 'center',
              align: 'center',
              fontSize: 25,
            }}>
              <ArrowRightOutlined style={{marginLeft: -10}}/>
          </Card.Grid>

          <Card.Grid 
  
          hoverable={false} 
            style={{    
              width: 300,
              textAlign: 'center'}}>
            {inputoutput_data.filter(( input ) => {
              return input.process_id == data.id && input.input == 0
            }).map((value) => {
              return (
              <>
              <Button block onClick={modifyOutput(value, data)} >{value.input_name}</Button> 
              <Divider/>
              </>
              )
            })}

                <Button block type='dashed'  onClick={addOutput(data)}  icon={<PlusOutlined />}> </Button>
          </Card.Grid>
          </>
          )
              })}

    {/* Row Five */}

        <Card.Grid 
          hoverable={false}
          style={{    
            width: 60,
            // textAlign: 'center',
            fontSize: 15,
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
          }}>
              <p style={{marginRight:-10}}>{t('process_use_short')}</p>
        </Card.Grid>


        <Card.Grid 
          hoverable={false}
          style={{    
          width: 300,
          textAlign: 'center',
                }}>

        </Card.Grid>

        <Card.Grid 
          hoverable={false}
          style={{    
          width: 50,
          textAlign: 'center',
          align: 'center',
          fontSize: 25,
          }}>
            <ArrowRightOutlined style={{marginLeft: -10}}/>
        </Card.Grid>

        <Card.Grid hoverable={false} style={{    
          width: 300,
          textAlign: 'center',
                }}>
          <Button block type='dashed' icon={<PlusOutlined />} onClick={processAdd}> {t("add_process")} </Button>
        </Card.Grid>

        <Card.Grid 
          hoverable={false}
          style={{    
            width: 50,
            textAlign: 'center',
            align: 'center',
            fontSize: 25,
          }}>
            <ArrowRightOutlined style={{marginLeft: -10}}/>
        </Card.Grid>
        <Card.Grid 
        hoverable={false} 
          style={{    
            width: 300,
            textAlign: 'center'}}>
     
        </Card.Grid>

        <ArrowDownOutlined style={{fontSize: 30, position: 'relative', marginLeft: "50%", marginRight: "50%"}}/>
{/**row six */}
        {type_six.map((data, index) => {
        return (
          <Space key={data.id}>
            <Card.Grid 

            hoverable={false}
            style={{    
              width: 60,
              // textAlign: 'center',
              fontSize: 15,
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
            }}>
                <p style={{marginRight:-10}}>{t('process_dispose_short')}</p>
          </Card.Grid>
  
  
          <Card.Grid
 
            hoverable={false}
            style={{    
            width: 300,
            textAlign: 'center',
                  }}>
              {inputoutput_data.filter(( input ) => {
              return input.process_id == data.id && input.input == 1
            }).map((value) => {
              return (
              <>
              <Button block onClick={modifyInput(value, data)} >{value.input_name}</Button> 
              <Divider/>
              </>
              )
            })}
            <Button block type='dashed' onClick={addInput(data)} icon={<PlusOutlined />}> </Button>
          </Card.Grid>
  
          <Card.Grid 

            hoverable={false}
            style={{    
            width: 50,
            textAlign: 'center',
            align: 'center',
            fontSize: 25,
            }}>
              <ArrowRightOutlined style={{marginLeft: -10}}/>
          </Card.Grid>
  
          <Card.Grid

           hoverable={false} style={{    
            width: 300,
            textAlign: 'center',
                  }}>
            <Button block  onClick={modifyProcess(data)} > {data.process_name} </Button>
          </Card.Grid>
  
          <Card.Grid 

            hoverable={false}
            style={{    
              width: 50,
              textAlign: 'center',
              align: 'center',
              fontSize: 25,
            }}>
              <ArrowRightOutlined style={{marginLeft: -10}}/>
          </Card.Grid>

          <Card.Grid 
  
          hoverable={false} 
            style={{    
              width: 300,
              textAlign: 'center'}}>
            {inputoutput_data.filter(( input ) => {
              return input.process_id == data.id && input.input == 0
            }).map((value) => {
              return (
              <>
              <Button block onClick={modifyOutput(value, data)} >{value.input_name}</Button> 
              <Divider/>
              </>
              )
            })}

                <Button block type='dashed'  onClick={addOutput(data)}  icon={<PlusOutlined />}> </Button>
          </Card.Grid>
          </Space>
          )
              })}

    {/* Row Six */}

        <Card.Grid 
          hoverable={false}
          style={{    
            width: 60,
            // textAlign: 'center',
            fontSize: 15,
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
          }}>
              <p style={{marginRight:-10}}>{t('process_dispose_short')}</p>
        </Card.Grid>


        <Card.Grid 
          hoverable={false}
          style={{    
          width: 300,
          textAlign: 'center',
                }}>

        </Card.Grid>

        <Card.Grid 
          hoverable={false}
          style={{    
          width: 50,
          textAlign: 'center',
          align: 'center',
          fontSize: 25,
          }}>
            <ArrowRightOutlined style={{marginLeft: -10}}/>
        </Card.Grid>

        <Card.Grid hoverable={false} style={{    
          width: 300,
          textAlign: 'center',
                }}>
          <Button block type='dashed' icon={<PlusOutlined />} onClick={processAdd}>  {t("add_process")}</Button>
        </Card.Grid>

        <Card.Grid 
          hoverable={false}
          style={{    
            width: 50,
            textAlign: 'center',
            align: 'center',
            fontSize: 25,
          }}>
            <ArrowRightOutlined style={{marginLeft: -10}}/>
        </Card.Grid>
        <Card.Grid 
        hoverable={false} 
          style={{    
            width: 300,
            textAlign: 'center'}}>
     
        </Card.Grid>


      </Card>

      <Drawer
        title={t("modify_product")}
        placement='right'
        closable={false}
        onClose={onProductClose}
        open={productModifyOpen}
        key="modifyProduct"
        width={500}
      >
        <ProductDrawer {...params}/>
      </Drawer>

      <Drawer
        title={t("create_new_process")}
        placement='right'
        closable={false}
        onClose={onProcessClose}
        open={processOpen}
        key="newProcess"
        width={500}
      >
       <ProcessDrawer {...params} product_scope={'grave'} onProcessClose={onProcessClose} getcurrentProcess={getcurrentProcess} > </ProcessDrawer>
      </Drawer>

      <Drawer
        title={t("modify_process")}
        placement='right'
        closable={false}
        onClose={onModifyProcessClose}
        open={modifyprocessOpen}
        key="modifyProcess"
        width={500}
      >
       <ModifyProcessDrawer {...params} product_scope={'grave'} onProcessClose={onModifyProcessClose} getcurrentProcess={getcurrentProcess} > </ModifyProcessDrawer>
      </Drawer>
      <Drawer
        title={t("create_new_input")}
        placement='right'
        closable={false}
        onClose={onInputClose}
        open={InputOpen}
        key="NewInput"
        width={500}
      >
        <InputDrawer {...params} newInputRef={newInputRef} getcurrentInput={getcurrentInput} getcurrentProcess={getcurrentProcess} inputClose={onInputClose}/>
      </Drawer>

      

      <Drawer
        title={t( "modify_input")}
        placement='right'
        closable={false}
        onClose={onModifyInputClose}
        open={ModifyInputOpen}
        key="ModifyInput"
        width={500}
      >
        <ModifyInputDrawer {...params} modifyInputRef={modifyInputRef} getcurrentInput={getcurrentInput} getcurrentProcess={getcurrentProcess} inputClose={onModifyInputClose}/>
      </Drawer>


      <Drawer
        title={t( "create_new_output")}
        placement='right'
        closable={false}
        onClose={onOutputClose}
        open={OutputOpen}
        key="NewOutput"
        width={500}
      >
        <OutputDrawer {...params}  newOutputRef={newOutputRef} getcurrentOutput={getcurrentOutput}  getcurrentProcess={getcurrentProcess} outputClose={onOutputClose}/>
      </Drawer>

      <Drawer
        title={t("modify_output")}
        placement='right'
        closable={false}
        onClose={onModifyOutputClose}
        open={ModifyOutputOpen}
        key="ModifyOutput"
        width={500}
      >
        <ModifyOutputDrawer {...params} modifyOutputRef={modifyOutputRef} getcurrentOutput={getcurrentOutput} getcurrentProcess={getcurrentProcess} outputClose={onModifyOutputClose}/>
      </Drawer>



    </Layout>
    </>
  )
}

export default App;
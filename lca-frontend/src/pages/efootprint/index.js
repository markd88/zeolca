import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Select, Button, Card, Col, Row, Space, Collapse, Divider} from 'antd';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { Image } from 'antd';

import global_config from "../../global";

const { Panel } = Collapse;

const App = () => {
  const { t } = useTranslation();

  const link = 'http://nanozeo.efootprint.net'

  return (

    <div>


    <Button type="primary" href={link}>{t('efootprint')}</Button>

    <Divider/>

    {/* <iframe id="bi_iframe" 
    src={link} 
    width={1000}
    height={500}
    title="Efootprint">
    </iframe> */}


    <Image
    width={1000}
    src="/images/efootprint.png"/>

       

    </div>
  )


}

export default App;
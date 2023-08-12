import React from 'react';
import { Input, Select, Button, Card, Col, Row, Space, Collapse, Divider} from 'antd';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { Image } from 'antd';


const App = () =>
{
  const { t } = useTranslation();

  const link = 'https://gamma.app/docs/ZeoLCAcom-LCA-dn044xs8ot2xxon';
  
  return (

    <div>


    <Button type="primary" href={link}>{t('home_page')}</Button>

    <Divider/>

<a href={link}>
    <Image
    width={1000}
    src="/images/home.png"/>

       
</a>

    </div>
  )


};
export default App;
import React from 'react';
import { Button, Empty } from 'antd';
import { useTranslation } from "react-i18next";

const App = () => {
  const { t } = useTranslation();
  return (
    <Empty 
    imageStyle={{
      height: '80vh',
    }}
    description={
      <span>
        {t('under_construction')}
      </span>
    }>

    </Empty>
  
) }

export default App;



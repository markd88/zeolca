
import { useNavigate } from 'react-router-dom';

import { useTranslation } from "react-i18next";

import { Button, Result } from 'antd';

const App = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }
  return (

    <Result
    status="404"
    title="404"
    subTitle={t('404')}
    extra={<Button type="primary" onClick={handleClick}>{t('back_home')}</Button>}
  />
  )

  };
export default App;
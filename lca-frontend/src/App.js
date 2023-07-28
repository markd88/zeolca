import React, { useEffect, useState } from 'react';
import i18n from './i18n';
import Routes from './routes';
import LocaleContext from './LocaleContext';

const App = () => {
  const [locale, setLocale] = useState(i18n.language);
  useEffect( () => {
    i18n.on('languageChanged', (lng) => {setLocale(i18n.language)});
  })
  return (
      <LocaleContext.Provider value={{locale, setLocale}}>
        <Routes/>
      </LocaleContext.Provider>
  )
}


export default App;
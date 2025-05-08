import i18next from 'i18next';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LANGUAGES } from 'src/constants/LANGUAGES';

const useSwitchLanguage = (defaultLanguage = 'en') => {
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('i18nextLng') || defaultLanguage);
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get('lang');

  const switchLanguage = language => {
    if (LANGUAGES.map(lang => lang.value).includes(language)) {
      setSelectedLanguage(language);
      i18next.changeLanguage(language);
      if (lang) {
        searchParams.set('lang', language);
        setSearchParams(searchParams);
      }
      window.location.reload();
    } else {
      console.warn(`Language '${language}' is not supported.`);
    }
  };
  return {
    selectedLanguage,
    switchLanguage,
  };
};

export default useSwitchLanguage;

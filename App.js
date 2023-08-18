import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { useTranslation } from 'react-i18next';
// i18n instance
import './src/common/i18n';
// Developer defined variables
import { USER_DEFINED_LANGUAGE } from '@env';
// Redux connection
import { Provider } from 'react-redux';
import store from './src/redux/store';
// Application's main router
import Router from './src/navigation/Router';

LogBox.ignoreLogs([
  'Require cycle: node_modules/rn-fetch-blob/index.js',
  'Warning: An effect function must not return anything besides a function, which is used for clean-up. You returned null.',
  'Warning: Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React.',
  'Warning: Cannot update a component (`PostActions`)',
]);

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    setUserDefinedLanguage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUserDefinedLanguage = async () => {
    const userDefinedLanguage = await AsyncStorage.getItem(
      USER_DEFINED_LANGUAGE,
    );
    if (userDefinedLanguage) {
      i18n.changeLanguage(userDefinedLanguage);
    }
  };

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;

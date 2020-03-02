import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { get } from '../libs/api';

export const CurrenciesContext = createContext();
CurrenciesContext.displayName = 'CurrenciesContext';

const CurrenciesContextProvider = (props) => {
  const [initialCurrs, setValue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    get('/currencies').then(({ data }) => {
      setValue(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <CurrenciesContext.Provider value={{ initialCurrs, isLoading }}>
      {props.children}
    </CurrenciesContext.Provider>
  );
};

CurrenciesContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CurrenciesContextProvider;

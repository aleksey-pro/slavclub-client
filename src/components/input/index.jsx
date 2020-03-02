import React from 'react';
import {
  Input,
  InputNumber,
} from 'antd';
import PropTypes from 'prop-types';
import styles from './styles.css';

const { Search, TextArea } = Input;

export const CustomInput = props => <Input className={styles.input} {...props} />;
export const CustomSearch = props => <Search className={styles.search} type="search" {...props} />;
export const CustomInputNumber = props => <InputNumber {...props} />;
export const CustomTextArea = React.forwardRef((props, ref) => <TextArea {...props} ref={ref} />);

CustomInput.propTypes = {
  placeholder: PropTypes.string,
};

CustomInput.defaultProps = {
  placeholder: '',
};

CustomSearch.propTypes = {
  placeholder: PropTypes.string,
};

CustomSearch.defaultProps = {
  placeholder: '',
};

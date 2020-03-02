import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styles from './styles.css';

const CustomButton = props => <Button className={styles.btnCustom} {...props}>{props.children}</Button>;

CustomButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};


export default CustomButton;

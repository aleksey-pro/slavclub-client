/* eslint max-len: [0], react/no-danger: [0] */
import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.css';

const content = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling">
  <circle cx="50" cy="50" fill="none" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(138 50 50)">
    <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"/>
  </circle>
</svg>
`;

const Loader = ({ className, visible }) => (
  visible ? <div className={cn(className, styles.loader)} dangerouslySetInnerHTML={{ __html: content }} /> : null
);

Loader.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool.isRequired,
};

Loader.defaultProps = {
  className: '',
};

export default Loader;

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Menu from '../../components/menu';
import ClientForm from '../../components/clientForm';
import styles from './styles.css';

const RegisterPage = ({ location, history }) => {

  return (
    <>
      <Menu />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 zapis__jumbo">
            <div className={styles.title}>
              <h3>Заявка на регистрацию<br />в клубе</h3>
              <p>Славь клуб</p>
            </div>
            <ClientForm {...location} history={history} isLight={true}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(RegisterPage);

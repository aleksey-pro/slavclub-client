import React, { useState, useEffect } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import Menu from '../../components/menu';
import { Form, Button } from 'bootstrap-4-react';
import mainImage from './main.jpg';
import { isToken } from '../../libs/token';

import gallery1 from './gallery1.jpg';
import gallery2 from './gallery2.jpg';
import gallery3 from './gallery3.jpg';
import gallery4 from './gallery4.jpg';
import gallery5 from './gallery5.jpg';
import gallery6 from './gallery6.jpg';

import styles from './styles.css';

const IndexPage = () => {

  return (
    <>
      <Menu />
      <div className="container">
        <div className="row">
          <div className={styles.main__jumbo}>
            <div className={styles.jumbotron}>
              <img className={styles.mainImage} src={mainImage} alt=""/>
              <div className="">
                {isToken() && <NavLink exact to="/member/:id" className={styles.zapisButton}>Вход в анкету</NavLink>}
                {!isToken() && <NavLink exact to="/register" className={styles.zapisButton}>Подать заявку</NavLink>}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <p className={styles.mainText}>Славик клуб. Клуб чести и достоинства, клуб объединил в себе своих участников со схожей системой ценностей. Вступившие в него получат возможность обмениваться между собой услугами и продуктами личного творчества. Взаимо обучаться и делиться опытом, наставлять, участвовать в СЛАВЬ ИГРЕ.</p>  
          </div>
        </div>
        <div className="row">
          <img className={styles.mainImage} src={mainImage} alt=""/>
          <img className={styles.mainImage} src={gallery1} alt=""/>
          <img className={styles.mainImage} src={gallery2} alt=""/>
          <img className={styles.mainImage} src={gallery3} alt=""/>
          <img className={styles.mainImage} src={gallery4} alt=""/>
          <img className={styles.mainImage} src={gallery5} alt=""/>
          <img className={styles.mainImage} src={gallery6} alt=""/>
        </div>
      </div>
      <div className={`container ${styles.addressWrapper}`}>
        <div className="row">
          <div className={`col-sm-12 ${styles.footerTitleWrap}`}>
            <h1 className={styles.footerTitle}>Контакты</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-6">
            <address className={styles.addr}>
              {/* <h5>Славь Салон</h5> */}
              <p className={styles.addrLine}>г. САНКТ-ПЕТЕРБУРГ</p>
              <p className={styles.addrLine}>www.славьклуб.рус</p>
              <p className={styles.addrLine}>+79956056805</p>
            </address>
          </div>
          <div className="col-sm-12 col-lg-6">
              <Form>
                <Form.Group>
                  <Form.Text
                    placeholder="Ваше имя"
                  />
                  <input className="form-control" type="text" placeholder="e-mail" id="mail-mail"/>
                </Form.Group>
                <Form.Group>
                  <Form.Textarea
                    placeholder="Ваше сообщение"
                  ></Form.Textarea>
                </Form.Group>
                <Button primary type="submit">отправить</Button>
              </Form>
            </div>
          </div>
        <div className="row">
          <a href="tel:=+7995605680" type="button" className={styles.callBtn}>
            быстрый звонок
          </a>
        </div>
        {/* <div className="row">
          <div id="map" className={styles.map}></div>
        </div> */}
        <div className="copy">Все права защищены. &copy; {new Date().getFullYear()}</div>
      </div>
    </>
  );
};

export default withRouter(IndexPage);

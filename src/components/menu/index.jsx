
import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Navbar, Nav, Collapse, Button } from 'bootstrap-4-react';
import { removeToken, isToken, getId, removeId } from '../../libs/token';
import styles from './styles.css';

const Menu = function({ history, location }) {
  const handleLogout = () => {
    removeToken();
    removeId();
    history.replace(location.pathname);
  }
  const id = getId();

  return (
    <>
      <Navbar expand="lg" light bg="dark">
        <Navbar.Toggler target="#navbarText" />
        <Collapse navbar id="navbarText">
          <Navbar.Nav mr="auto">
            <Nav.Item>
              <NavLink exact to="/" className={styles.navItem} activeClassName={styles.active}>Главная</NavLink>
            </Nav.Item>
            {isToken() ? (
            <>
              <Nav.Item>
                <NavLink
                  exact to="/"
                  className={styles.navItem}
                  activeClassName={styles.active}
                  onClick={handleLogout}
                >Выйти</NavLink>
              </Nav.Item>
            <Nav.Item>
              <NavLink exact to={`/member/${id}`} className={styles.navItem} activeClassName={styles.active}>Моя анкета</NavLink>
            </Nav.Item>  
            <Nav.Item>
                <NavLink exact to="/members" className={styles.navItem} activeClassName={styles.active}>Анкеты участников</NavLink>
            </Nav.Item>
            </>            
            ) : (
            <>
              <Nav.Item>
                <NavLink exact to="/login" className={styles.navItem} activeClassName={styles.active}>Войти</NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink exact to="/register" className={styles.navItem} activeClassName={styles.active}>Регистрация участника</NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink exact to="/ustav" className={styles.navItem} activeClassName={styles.active}>Устав клуба</NavLink>
              </Nav.Item>              
            </>
            )}
          </Navbar.Nav>          
        </Collapse>
        {/* <Button type="link">+7995605680</Button> */}
      </Navbar>
    </>
  );
} 


export default withRouter(Menu);


import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { removeToken } from '../../libs/token';
import styles from './styles.css';

class Menu extends Component {
  handleLogout = () => {
    removeToken();
    this.props.history.replace(this.props.location.pathname);
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <a href="http://www.xn--80aaf8admgsd3i.xn--p1acf" className={styles.active}>На главную</a>
        <NavLink exact to="/admin" className={styles.active}>Клиенты</NavLink>
        <div className="pull-right" onClick={this.handleLogout}>Выйти</div>
      </div>
    );
  }
}

export default withRouter(Menu);

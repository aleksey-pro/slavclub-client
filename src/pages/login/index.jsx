import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import Title from '../../components/title';
import Menu from '../../components/menu';
import { Button, Input } from 'antd';
import { setToken, isToken } from '../../libs/token';
import { post } from '../../libs/api';
import styles from './styles.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nick: '',
      password: '',
    };
  }

  componentWillMount() {
    if (isToken()) {
      this.props.history.replace('/');
    }
  }

  handleChange = label => ({ target: { value } }) => this.setState({ [label]: value })

  handleLogin = async () => {
    const { nick, password } = this.state;
    if (!nick || !password) {
      this.showError('Введите данные');
      return;
    }

    const { data } = await post('/authMember', { nick, password });
    const { token } = data;

    if (!token) {
      this.showError('Ошибка авторизации');
      return;
    }
    setToken(token);
    window.location.reload();
  }

  showError = (error) => {
    this.setState({ error });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.setState({ error: false }), 3000);
  }

  render() {
    return (
      <>      
        <Menu />
        <div className={styles.wrapper}>
          <div className={styles.row}>
            <Title level={2}>Авторизация</Title>
          </div>
          <div className={styles.row}>
            <Input
              placeholder="Никнейм"
              value={this.state.nick}
              onChange={this.handleChange('nick')}
            />
          </div>
          <div className={styles.row}>
            <Input
              type="password"
              placeholder="Пароль"
              value={this.state.password}
              onChange={this.handleChange('password')}
            />
          </div>
          <div className={styles.row}>
            <Button onClick={this.handleLogin} type="primary" block>Войти</Button>
          </div>
          <div className={styles.row}>
            <Button type="primary" block>
              <NavLink exact to="/register">Регистрация</NavLink>
            </Button>
          </div>          
          <div className={styles.row}>
            <Button type="secondary" block>
              <NavLink exact to="/">Обратно на сайт</NavLink>
            </Button>
          </div>        
          {this.state.error ? (
            <div className={styles.error}>{this.state.error}</div>
          ) : null}
        </div>
      </>
    );
  }
}


export default withRouter(LoginPage);

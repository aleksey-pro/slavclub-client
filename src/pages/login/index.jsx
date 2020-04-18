import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Title from '../../components/title';
import { Button, Input } from 'antd';
import { setToken, isToken } from '../../libs/token';
import { post } from '../../libs/api';
import styles from './styles.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentWillMount() {
    if (isToken()) {
      this.props.history.replace('/admin');
    }
  }

  handleChange = label => ({ target: { value } }) => this.setState({ [label]: value })

  handleLogin = async () => {
    const { email, password } = this.state;
    if (!email || !password) {
      this.showError('Введите данные');
      return;
    }

    const { data } = await post('/auth', { email, password });
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
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <Title level={2}>Авторизация</Title>
        </div>
        <div className={styles.row}>
          <Input
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange('email')}
          />
        </div>
        <div className={styles.row}>
          <Input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange('password')}
          />
        </div>
        <div className={styles.row}>
          <Button onClick={this.handleLogin} type="primary" block>Войти</Button>
        </div>
        <div className={styles.row}>
          <Button href="http://www.xn--80aaf8admgsd3i.xn--p1acf" type="secondary" block>Обратно на сайт</Button>
        </div>        
        {this.state.error ? (
          <div className={styles.error}>{this.state.error}</div>
        ) : null}
      </div>
    );
  }
}


export default withRouter(LoginPage);

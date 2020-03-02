import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Table } from 'antd';
import Loader from '../../components/loader';
import { CustomSearch as Search } from '../../components/input';
import { get } from '../../libs/api';
import Title from '../../components/title';
import Menu from '../../components/menu';
import styles from './styles.css';

const IndexPage = () => {
  const isLoading = false;
  const [search, handleSearch] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    get('/clients').then(({ data }) => {
      setData(data);
    });
  }, []);

  // getList = (currs) => {
  //   if (!this.state.search) {
  //     return currs;
  //   }

  //   const reg = new RegExp(encodeURIComponent(this.state.search), 'i');

  //   return currs.filter(coin => reg.test(coin.title) || reg.test(coin.ticker));
  // }

  // handleSearch = ({ target: { value } }) => {
  //   this.setState({ search: value });
  // }

  const handleRemoveClient = (evt) => {
    evt.preventDefault();
    console.log('remove');
  }

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Визитов',
      dataIndex: 'visits',
      key: 'visits',
    },
    {
      title: 'Редактировать',
      key: 'edit',
      render: (text, record) => (
        <span>
          <NavLink to={`/client/${record.id}`}>Просмотр {record.name}</NavLink>
          <a onClick={handleRemoveClient}>Удалить</a>
        </span>
      ),
    },
  ];

  const tableData = [
    {
      key: '1',
      name: 'John Brown',
      id: 1,
      visits: 0,
      info: 'Some info',
    },
    {
      key: '2',
      name: 'Jim Green',
      id: 2,
      visits: 0,
      info: 'Some info',
    },
    {
      key: '3',
      name: 'Joe Black',
      id: 3,
      visits: 0,
      info: 'Some info',
    },
  ];


  return (
      <>
        <Menu />
        <div className="wrapper">
          <Search
            value={search}
            placeholder="Search..."
            onChange={handleSearch}
            className={styles.search}
          />
          <div className={styles.wrapperList}>
            {!isLoading && (
              <>
                <Title level={2}>Клиенты</Title>
                <Table dataSource={tableData} columns={columns} bordered/>
              </>
            )}
            {isLoading && (
              <Loader visible width={32} />
            )}
          </div>
        </div>
      </>
  );
}

export default withRouter(IndexPage);

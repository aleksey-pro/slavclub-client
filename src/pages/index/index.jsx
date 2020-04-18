import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Table, Button, Input } from 'antd';
import Loader from '../../components/loader';
import { get, remove } from '../../libs/api';
import Title from '../../components/title';
import Menu from '../../components/menu';
import { NotifyBlock, notifyWarning, notifyError } from '../../libs/notify';
import styles from './styles.css';

const { Search } = Input;

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    get('/clients')
    .then((response) => {
      setData(response.data);
      setIsLoading(false);
    }) 
    .catch(() => {
      notifyError('Ошибка на сервере. Попробуйте перезагрузить страницу');
    });
  }, []);

  const handleSearchClient = (value) => {
    if (!value.length) setIsSearching(false);
    setIsSearching(true);
    const reg = new RegExp(encodeURIComponent(value), 'i');
    setFilteredData(data.filter(client => reg.test(client.name)));
  }

  const handleRemoveClient = (evt, id) => {
    evt.preventDefault();
    remove(`/clients/${id}`)
      .then((response) => {
        alert("Внимание! Все данные будут потеряны. Вы уверены, что хотите удалить клиента?");
        setData(data.filter(client => client.id !== response.data.id));
      })
      .catch(() => {
        notifyWarning('Недостаточно прав для совершения операции');
      });
  };

  const getData = data => {
    if(isSearching) return filteredData;
    return data;
  }

  const renderActionsCell = (text, record) => (
    <span>
      <Button className={styles.actionBtn}>
        <NavLink to={`/client/${record.id}`}>Просмотр</NavLink>
      </Button>
      <Button
        type="button"
        onClick={e => handleRemoveClient(e, record.id)}
        className={styles.actionBtn}
        >Удалить
      </Button>
    </span>
  )

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Действия",
      dataIndex: "action",
      width: '50%',
      render: (text, record) => renderActionsCell(text, record)
    }
  ];

  const renderDataTable = () => (
    <Table dataSource={getData(data)} columns={columns} size="middle" rowKey="name" />
  );

  return (
    <>
      <Menu />
      <div className="wrapper">
        <Search
          placeholder="Поиск..."
          onSearch={handleSearchClient}
          className={styles.search}
        />
        <div className={styles.wrapperList}>
          {!isLoading && (
          <>
            <Title level={2}>Клиенты</Title>
            {renderDataTable()}
          </>
          )}
          {isLoading && (
          <Loader visible width={32} />
          )}
        </div>
        <Button>
          <NavLink exact to="/create" activeClassName={styles.active}>Создать клиента</NavLink>
        </Button>
      </div>
      <NotifyBlock />
    </>
  );
};

export default withRouter(IndexPage);

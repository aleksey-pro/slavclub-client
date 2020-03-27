import React from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd';
import Menu from '../../components/menu';
import { post } from '../../libs/api';

const { TextArea } = Input;

const CreatePage = (props) => {
  const { history } = props;
  const onFinish = ({ name, info }) => {
    post('/clients', { name, info })
      .then(({ data }) => {
        if (data === 'ok') {
          history.replace('/')
        }
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  };
  return (
    <>
      <Menu />
      <div className="wrapper">
        <h1>Создать клиента</h1>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}

        >
          <Form.Item
           label="Имя"
           name="name"
           rules={[{ required: true, message: 'Введите имя!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Заметки" name="info">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="" type="primary">
            <Button htmlType="submit">Создать</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CreatePage;

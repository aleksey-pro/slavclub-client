import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { saveAs } from 'file-saver';
import Menu from '../../components/menu';
import { get, update } from '../../libs/api';

const ClientPage = (props) => {
  const { id } = props.match.params;
  const [clData, setClData] = useState({});
  const {
    name, info, visits, link,
  } = clData;
  const { TextArea } = Input;
  const [form] = Form.useForm();

  useEffect(() => {
    get(`/client/${id}`).then(({ data }) => {
      setClData(data);
      form.setFieldsValue({
        name: data.name,
        visits: data.visits,
        info: data.info,
      });
    });
  }, []);

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 16 },
  };

  const onFinish = values => {
    const dataUpdated = { ...clData, ...values };
    setClData(dataUpdated);
    update(`/clients/${id}`, dataUpdated).then(({ data }) => {
      console.log('Данные обновлены');
    });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Menu />
      <div className="wrapper">
        <Form
          {...layout}
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Имя"
            name="name"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Визитов"
            name="visits"
          >
            <Input disabled/>
          </Form.Item>

          <Form.Item
            label="Заметки"
            name="info"
          >
            <TextArea rows={4}/>
          </Form.Item>

          <Form.Item
            label="QR-код"
          >
            <a href={link} download>Скачать QR-код</a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Обновить
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>

  );
};

export default ClientPage;

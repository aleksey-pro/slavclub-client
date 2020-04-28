import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Select } from 'antd';
import StarRatingComponent from 'react-star-rating-component';
import Menu from '../../components/menu';
import { NotifyBlock, notifyWarning, notifyError } from '../../libs/notify';
import { get, update } from '../../libs/api';
import styles from'./styles.css';

const ClientPage = (props) => {
  const { id } = props.match.params;
  const [clData, setClData] = useState({});
  const [updated, setUpdated] = useState(false);

  const { TextArea } = Input;
  const { Option } = Select;
  const [form] = Form.useForm();


  useEffect(() => {
    get(`/client/${id}`)
    .then(({ data }) => {
      setClData(data);
      form.setFieldsValue({
        name: data.name || '',
        visits: data.visits || 0,
        info: data.info || '',
        bonuses: data.bonuses || 0,
        orderNum: data.orderNum,
      });
    })
    .catch(() => {
      notifyError('Ошибка на сервере. Попробуйте перезагрузить страницу');
    });
  }, []);

  const onFinish = values => {
    const bonusesToAdd = values.bonusesToAdd || 0;
    const dataUpdated = { ...clData, ...values, bonusesToAdd };
    update(`/clients/${id}`, dataUpdated)
    .then(({ data }) => {
      setClData(data);
      form.setFieldsValue({ bonuses: data.bonuses });
      setUpdated(true);
      setTimeout(() => {setUpdated(false)}, 2000);
    })
    .catch((err) => {
      notifyWarning('Недостаточно прав для совершения операции');
    });    
  };

  const handleSelectService = (value) => {
    setClData({ ...clData, bonusesToAdd: value})
  };

  const onStarClick = (nextValue) => {
    setClData({ ...clData, rating: nextValue })
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Menu />
      <div className="wrapper">
        <Form
          form={form}
          name="basic"
          layout="vertical"
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
            label="Порядковый номер брелка"
            name="orderNum"
            value={clData.orderNum}
          >
            <InputNumber min={1}/>
          </Form.Item>     

          <Form.Item
            label="Визитов"
            name="visits"
          >
            <Input disabled/>
          </Form.Item>

          <Form.Item
            label="Баллов"
            name="bonuses"
          >
            <Input disabled/>
          </Form.Item>

          <Form.Item
            label="Выберите услугу для начисления баллов"
            name="bonusesToAdd"
          >
            <Select onChange={handleSelectService} defaultValue="0">
              <Option key={0} value="0">Нет услуги</Option>
              <Option key={1} value="10">Стрижка головы (+10)</Option>
              <Option key={2} value="8">Оформление бороды (+8)</Option>
              <Option key={3} value="15">Стрижка и оформление бороды (+15)</Option>
              <Option key={4} value="7">Детская стрижка (+7)</Option>
              <Option key={5} value="5">Стрижка под насадку (+5)</Option>
              <Option key={6} value="5">Бритье головы (+5)</Option>
              <Option key={7} value="4">Камуфляж бороды (+4)</Option>
              <Option key={8} value="4">Массаж головы (+4)</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Заметки"
            name="info"
          >
            <TextArea rows={4}/>
          </Form.Item>

          <div className="rating-wrapper">
            <h3>Личная оценка клиента</h3>
            <StarRatingComponent 
                  name="rate1" 
                  starCount={10}
                  value={clData.rating}
                  onStarClick={onStarClick}
                  emptyStarColor="#bb0a0a" 
                  className={styles.rating}  
              />
          </div>

          <Form.Item
            label="QR-код"
          >
            <a href={clData.link} target="blank noreferrer noopener">Скачать QR-код</a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {updated ? 'Данные обновлены' : 'Обновить'}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <NotifyBlock/>
    </>

  );
};

export default ClientPage;

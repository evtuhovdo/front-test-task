import React, { FC } from 'react';
import { Button, Space } from 'antd';
import { INDEX } from '../routes';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import CenterLayout from '../components/layout/center/CenterLayout';

// TODO: Незабыть поугарать на 404 странице
const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <CenterLayout>
      <h1>
        404
      </h1>
      <p>Такой страницы не существует!</p>
      <p>Мы уже работаем над тем, чтобы вы сюда больше не попадали.</p>

      <Space size={10}>
        <Button type={'primary'} size={'large'} onClick={() => navigate(-1)}
                icon={<ArrowLeftOutlined/>}>Назад</Button>
        <Button size={'large'} onClick={() => navigate(INDEX)}>Вернуться на главную</Button>
      </Space>
    </CenterLayout>
  );
};

export default NotFound;


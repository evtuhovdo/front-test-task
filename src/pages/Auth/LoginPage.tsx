import React, { FC } from 'react';
import { Button, Input, Space, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import logo from '../../images/Logo.svg';
import { useInstance } from 'react-ioc';
import { Store } from '../../model/store/Store';
import { FORGET_PASSWORD, INDEX } from '../../routes';
import useLoginMutation from '../../model/hooks/useLoginMutation';
import { observer } from 'mobx-react-lite';

const schema = yup.object({
  login: yup.string().email().required(),
  password: yup.string().required(),
}).required();


const LoginPage: FC = () => {
  const loginMutation = useLoginMutation();
  const store = useInstance(Store);

  const navigate = useNavigate();

  const { handleSubmit, control, getValues, formState: { isSubmitting, isValid } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      login: '',
      password: '',
    },
    reValidateMode: 'onChange',
    mode: 'all',
  });

  const onSubmit = async () => {
    const values = getValues();
    try {
      const res = await loginMutation({
        identifier: values.login,
        password: values.password,
      });
      const jwt = res.data?.login.jwt;
      const userId = res.data?.login.user.id;
      if (!jwt || !userId) {
        message.error('Ошибка при авториазции');
        return;
      }

      store.auth.setTokenAndId(jwt, userId);

      navigate(INDEX);
    } catch (error: any) {
      console.error(error);
      if (error.message === 'Failed to fetch') {
        message.error('Ошибка получения данных');
      } else {
        message.error('Логин или пароль не верный');
      }
    }
  };

  return (
    <div className="crm-login-layout dissolved">
      <div className="crm-login-logo">
        <img src={logo} className="App-logo" alt="logo"/>
      </div>
      <Space direction="vertical" size={20} style={{ width: '100%' }}>
        <Space direction="vertical" size={10} style={{ width: '100%' }}>
          <div style={{ textAlign: 'left'}}>Логин/Email</div>
          <Controller
            name="login"
            control={control}
            render={({ field, formState: { submitCount }, fieldState: { error, isTouched } }) => (
              <React.Fragment>
                <Input
                  placeholder="example@site.com"
                  size="large"
                  {...field}
                />
                {(submitCount > 0 || isTouched) && !!error && error.message}
              </React.Fragment>
            )}/>
        </Space>

        <Space direction="vertical" size={10} style={{ width: '100%' }}>
          <div style={{ textAlign: 'left'}}>Пароль</div>
          <Controller
            name="password"
            control={control}
            render={({ field, formState: { submitCount }, fieldState: { error, isTouched } }) => (
              <React.Fragment>
                <Input.Password
                  size="large"
                  placeholder="Введите пароль"
                  iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                  {...field}
                />
                {(submitCount > 0 || isTouched) && !!error && error.message}
              </React.Fragment>
            )}/>
        </Space>

        <Button
          type="primary"
          size="large"
          block={true}
          loading={isSubmitting}
          disabled={!isValid}
          onClick={handleSubmit(onSubmit)}
        >
          Войти
        </Button>

        <Link to={FORGET_PASSWORD}>
          <Button type="link" block={true}>Забыли пароль?</Button>
        </Link>

      </Space>
    </div>
  );
};

export default observer(LoginPage);




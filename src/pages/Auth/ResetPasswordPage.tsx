import React, { FC, useEffect } from 'react';
import { Button, Input, Space, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LeftOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import logo from '../../images/Logo.svg';
import { useInstance } from 'react-ioc';
import { Store } from '../../model/store/Store';
import { FORGET_PASSWORD, INDEX, LOGIN } from '../../routes';
import { observer } from 'mobx-react-lite';
import useResetPasswordMutation from '../../model/hooks/useResetPasswordMutation';
import useQueryParams from '../../hooks/useQueryParams';

const schema = yup.object({
  password: yup.string().min(8, 'Минимальная длинна пароля 8 символов').required('Введите пароль'),
  passwordConfirmation: yup.string().oneOf([ yup.ref('password'), null ], 'Пароли не совпадают.'),
}).required();

const ResetPasswordPage: FC = () => {
  const resetPasswordMutation = useResetPasswordMutation();
  const store = useInstance(Store);

  const queryParams = useQueryParams();
  const code = queryParams.get('code') || '';

  const navigate = useNavigate();
  const { handleSubmit, control, getValues, formState: { isSubmitting, isValid } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
    reValidateMode: 'onChange',
    mode: 'all',
  });

  const onSubmit = async () => {
    const values = getValues();
    try {
      const res = await resetPasswordMutation(code, values.password, values.passwordConfirmation);
      const jwt = res.data?.resetPassword?.jwt;
      const userId = res.data?.resetPassword?.user.id;
      if (!jwt || !userId) {
        message.error('Ошибка при восстановлении пароля');
        return;
      }

      store.auth.setTokenAndId(jwt, userId);

      navigate(INDEX);
    } catch (error: any) {
      console.log('error.message', error.message);
      console.error(error);
      if (error.message === 'Failed to fetch') {
        message.error('Ошибка получения данных');
      } else if (error.message === 'Incorrect code provided') {
        message.error('Ошибка. Ссылка на восстановления пароля более не действительна. Запросите новую.');
        navigate(FORGET_PASSWORD, { replace: true });
      } else {
        message.error('Логин или пароль не верный');
      }
    }
  };

  useEffect(() => {
    if (!code) {
      navigate(INDEX, { replace: true });
    }
  }, [ code, navigate ]);

  return (
    <div className="crm-login-layout dissolved">
      <div className="crm-login-logo">
        <img src={logo} className="App-logo" alt="logo"/>
      </div>
      <Space direction="vertical" size={20} style={{ width: '100%' }}>
        <Space direction="vertical" size={10} style={{ width: '100%' }}>
          <div style={{ textAlign: 'left'}}>Новый пароль</div>
          <Controller
            name="password"
            control={control}
            render={({ field, formState: { submitCount }, fieldState: { error, isTouched } }) => (
              <React.Fragment>
                <Input.Password
                  status={(submitCount > 0 || isTouched) && !!error ? 'error' : undefined}
                  autoComplete="off"
                  size="large"
                  placeholder="Введите пароль"
                  iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                  {...field}
                />
                {(submitCount > 0 || isTouched) && !!error && error.message}
              </React.Fragment>
            )}/>
        </Space>

        <Space direction="vertical" size={10} style={{ width: '100%' }}>
          <div style={{ textAlign: 'left'}}>Новый пароль ещё раз</div>
          <Controller
            name="passwordConfirmation"
            control={control}
            render={({ field, formState: { submitCount }, fieldState: { error, isTouched } }) => (
              <React.Fragment>
                <Input.Password
                  status={(submitCount > 0 || isTouched) && !!error ? 'error' : undefined}
                  autoComplete="off"
                  size="large"
                  placeholder="Введите подтверждение пароля"
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
          Установить новый пароль и войти
        </Button>

        <Link to={LOGIN}>
          <Button type="link" block={true} icon={<LeftOutlined/>}>Назад</Button>
        </Link>

      </Space>
    </div>
  );
};

export default observer(ResetPasswordPage);




import React, { FC, useEffect } from 'react';
import { Button, Input, Space, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LeftOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useInstance } from 'react-ioc';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';

import { Store } from '../../model/store/Store';
import { FORGET_PASSWORD, INDEX, LOGIN } from '../../routes';
import { useResetPasswordMutation } from '../../generated/graphql';
import CenterLayout from '../../components/layout/center/CenterLayout';

const schema = yup.object({
  password: yup.string().min(8, 'Минимальная длинна пароля 8 символов').required('Введите пароль'),
  passwordConfirmation: yup.string().oneOf([ yup.ref('password'), null ], 'Пароли не совпадают.'),
}).required();

const ResetPasswordPage: FC = () => {
  const store = useInstance(Store);

  const [ queryParams ] = useSearchParams();
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

  const [ resetPasswordMutation ] = useResetPasswordMutation();

  const onSubmit = async () => {
    const values = getValues();
    try {
      const res = await resetPasswordMutation({
        variables: {
          code,
          password: values.password,
          passwordConfirmation: values.passwordConfirmation,
        },
      });
      const jwt = res.data?.resetPassword?.jwt;
      const userId = res.data?.resetPassword?.user.id;
      if (!jwt || !userId) {
        message.error('Ошибка при восстановлении пароля');
        return;
      }

      store.auth.setToken(jwt);

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
    <CenterLayout>
      <Space direction="vertical" size={20} style={{ width: '100%' }}>
        <Space direction="vertical" size={10} style={{ width: '100%' }}>
          <div style={{ textAlign: 'left' }}>Новый пароль</div>
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
          <div style={{ textAlign: 'left' }}>Новый пароль ещё раз</div>
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
    </CenterLayout>
  );
};

export default observer(ResetPasswordPage);




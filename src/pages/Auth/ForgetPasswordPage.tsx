import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { Button, Input, Space, message } from 'antd';

import logo from '../../images/Logo.svg';
import { Link, useNavigate } from 'react-router-dom';

import { LeftOutlined } from '@ant-design/icons';
import Spinner from '../../components/common/Spinner';
import { observer } from 'mobx-react-lite';
import { LOGIN } from '../../routes';
import useForgotPasswordMutation from '../../model/hooks/useForgotPasswordMutation';
import { validateEmail } from '../../utils';

const ForgetPasswordPage: FC = () => {
  const [ loading, setLoading ] = useState(false);
  const [ email, setEmail ] = useState('');
  const forgotPasswordMutation = useForgotPasswordMutation();
  const navigate = useNavigate();

  const onSubmit = async () => {
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      message.error('Введите email адрес в правильном формате.');
      return;
    }

    setLoading(true);
    try {
      const res = await forgotPasswordMutation(email);

      if (res.data?.forgotPassword?.ok) {
        message.success(`Откройте письмо отправленное на почту ${email} и следуйте инструкциям.`);
        setLoading(false);
        navigate(LOGIN);
        return;
      } else {
        message.error('Ошибка при восстановлении пароля.');
      }
      setLoading(false);
    } catch (error: any) {
      message.error('Пользователя с таким email не существует.');
      setLoading(false);
    }
  }

  const onEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, [setEmail]);

  return (
    <div className="crm-login-layout dissolved">
      <div className="crm-login-logo">
        <img src={logo} className="App-logo" alt="logo"/>
      </div>
      <Spinner spinning={loading}>
        <Space direction="vertical" size={20} style={{ width: '100%' }}>

          Введите email, который вы&nbsp;указали при регистрации. Мы&nbsp;создадим новый пароль и&nbsp;пришлем его
          на&nbsp;указанную почту.

          <Space direction="vertical" size={10} style={{ width: '100%' }}>
            <div style={{ textAlign: 'left'}}>Email</div>
            <Input
              disabled={loading}
              onChange={onEmailChange}
              value={email}
              placeholder="example@site.com"
              size="large"
            />
          </Space>

          <Button type="primary" size="large" block={true} onClick={onSubmit}>Выслать новый пароль</Button>

          <Link to={LOGIN}>
            <Button type="link" block={true} icon={<LeftOutlined/>}>Назад</Button>
          </Link>

        </Space>
      </Spinner>
    </div>
  );
};

export default observer(ForgetPasswordPage);

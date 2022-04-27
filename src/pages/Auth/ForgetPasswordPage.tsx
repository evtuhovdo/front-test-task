import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { Button, Input, Space, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { LeftOutlined } from '@ant-design/icons';

import Spinner from '../../components/common/Spinner';
import { LOGIN } from '../../routes';
import { validateEmail } from '../../utils';
import { useForgotPasswordMutation } from '../../generated/graphql';
import CenterLayout from '../../components/layout/center/CenterLayout';


const ForgetPasswordPage: FC = () => {
  const [ loading, setLoading ] = useState(false);
  const [ email, setEmail ] = useState('');
  const navigate = useNavigate();

  const [ forgotPasswordMutation ] = useForgotPasswordMutation();

  const onSubmit = async () => {
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      message.error('Введите email адрес в правильном формате.');
      return;
    }

    setLoading(true);
    try {
      const res = await forgotPasswordMutation({
        variables: {
          email,
        },
      });

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
  };

  const onEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, [ setEmail ]);

  return (
    <CenterLayout>
      <Spinner spinning={loading}>
        <Space direction="vertical" size={20} style={{ width: '100%' }}>

          Введите email, который вы&nbsp;указали при регистрации. Мы&nbsp;создадим новый пароль и&nbsp;пришлем его
          на&nbsp;указанную почту.

          <Space direction="vertical" size={10} style={{ width: '100%' }}>
            <div style={{ textAlign: 'left' }}>Email</div>
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
    </CenterLayout>
  );
};

export default observer(ForgetPasswordPage);

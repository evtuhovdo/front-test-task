import React, { FC } from 'react';
import { Header } from 'antd/lib/layout/layout';
import { Dropdown, Menu, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetMeQuery } from '../../../generated/graphql';
import { LOGOUT, PROFILE } from '../../../routes';
import styles from './HeaderCustom.module.scss';
import logo from '../../../logo.png';



interface IProps {
}

export const HeaderCustom: FC<IProps> = React.memo(() => {
  const { loading, data } = useGetMeQuery();
  const navigate = useNavigate();

  return (
    <Header className={styles.header}>
      <img src={logo} className={styles.logo} />
      <div className={styles.content}>
        <div>{loading ? 'Загрузка...' : `${data?.me?.username} (${data?.me?.role?.description})`}</div>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={1} onClick={() => navigate(PROFILE)}>
                Профиль
              </Menu.Item>
              <Menu.Item key={2}  onClick={() => navigate(LOGOUT)}>
                Выйти
              </Menu.Item>
            </Menu>
          }
        >
          <Avatar className={styles.avatar} size={32}>{data?.me?.username.charAt(0)}</Avatar>
        </Dropdown>
      </div>
    </Header>
  );
});

export default HeaderCustom;

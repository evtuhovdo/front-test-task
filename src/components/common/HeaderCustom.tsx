import React, { FC } from 'react';
import { Header } from 'antd/lib/layout/layout';
import { Dropdown, Menu } from 'antd';
import { useGetMeQuery } from '../../generated/graphql';
import { useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../routes';


interface IProps {}

export const HeaderCustom: FC<IProps> = () => {
  const { loading, data} = useGetMeQuery({fetchPolicy: 'network-only'});
  const navigate = useNavigate();

  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'gray', flexBasis: 120, height: 48 }} />
      <div
        style={{
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <div>{loading ? 'Загрузка...' : data?.me?.username}</div>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={() => navigate(LOGOUT)}>
                Выйти
              </Menu.Item>
            </Menu>
          }
        >
          <div
            style={{
              width: 32,
              height: 32,
              marginLeft: 32,
              backgroundColor: 'gray',
              borderRadius: 32,
              cursor: 'pointer',
            }}
          />
        </Dropdown>
      </div>
    </Header>
  )
};

export default HeaderCustom;

import React, { FC } from 'react';
import { Header } from 'antd/lib/layout/layout';


interface IProps {

}

export const HeaderCustom: FC<IProps> = () => {
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
        <div>Имя Пользователя</div>
        <div
          style={{
            width: 32,
            height: 32,
            marginLeft: 32,
            backgroundColor: 'gray',
            borderRadius: 32,
          }}
        />
      </div>
    </Header>
  )
};

export default HeaderCustom;

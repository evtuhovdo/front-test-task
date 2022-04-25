import React, { FC, useEffect } from 'react';
import { useInstance } from 'react-ioc';
import { Store } from '../../model/store/Store';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';


const LogoutPage: FC = () => {
  const store = useInstance(Store);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin/>;

  useEffect(() => {
    store.auth.clearState();
  });

  return <Spin indicator={antIcon}/>;
};

export default observer(LogoutPage);


import React, { FC, useEffect } from 'react';
import { useInstance } from 'react-ioc';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';

import { Store } from '../../model/store/Store';
import { useApolloClient } from '@apollo/client';


const LogoutPage: FC = () => {
  const store = useInstance(Store);
  const apolloClient = useApolloClient();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin/>;

  useEffect(() => {
    store.auth.clearState();
    apolloClient.clearStore();
  });

  return <Spin indicator={antIcon}/>;
};

export default observer(LogoutPage);


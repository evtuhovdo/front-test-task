import React, { FC, useEffect } from 'react';
import { useInstance } from 'react-ioc';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import GlobalActions from '../../model/actions/GlobalActions';


const LogoutPage: FC = () => {
  const globalActions = useInstance(GlobalActions);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin/>;

  useEffect(() => {
    globalActions.logOut();
  });

  return <Spin indicator={antIcon}/>;
};

export default observer(LogoutPage);


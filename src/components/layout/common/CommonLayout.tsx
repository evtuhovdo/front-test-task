import React, { FC } from 'react';
import { Layout } from 'antd';

import { HeaderCustom } from '../../common/HeaderCustom/HeaderCustom';
import SidebarMenu from '../../common/SidebarMenu/SidebarMenu';
import Spinner from '../../common/Spinner';
import styles from './CommonLayout.module.scss';

const { Sider, Content } = Layout;

interface IProps {
  contentLoading?: boolean;
}


const CommonLayout: FC<IProps> = (
  {
    children,
    contentLoading = false,
  },
) => {
  return (
    <Layout className={styles.main}>
      <HeaderCustom/>
      <Layout className={styles.right}>
        <Sider>
          <SidebarMenu/>
        </Sider>
        <Spinner spinning={contentLoading}>
          <Content className={styles.content}>
            {children}
          </Content>
        </Spinner>
      </Layout>
    </Layout>
  );
};

export default CommonLayout;




import React, { FC } from 'react';
import { Layout } from 'antd';
import styles from './CenterLayout.module.scss';

const { Content } = Layout;

const CenterLayout: FC = ({children}) => {
  return (
    <Layout className={styles.centerLayout}>
      <Content className={styles.centerContent}>
        {children}
      </Content>
    </Layout>
  );
};

export default CenterLayout;




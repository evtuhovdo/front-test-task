import React, { FC } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined spin/>;

interface IProps {
  spinning?: boolean;
}

const Spinner: FC<IProps> = (
  {
    spinning = false,
    children
  },
) => {
  if (spinning) {
    return (
      <Spin indicator={antIcon}>
        {children}
      </Spin>
    );
  }

  return <React.Fragment>{children}</React.Fragment>
};

export default Spinner;

import React, { FC } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface IProps {
  loading?: boolean;
}

export const Loading: FC<IProps> = ({ loading = false }) => {
  if (!loading) return null;
  return (
    <Spin
      style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 100, transform: 'transtale(-50%, -50%)' }}
      indicator={<LoadingOutlined style={{ fontSize: 96 }} spin />}
    />
  );
};

export default Loading;

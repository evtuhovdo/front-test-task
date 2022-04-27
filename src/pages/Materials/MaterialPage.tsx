import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Card, Layout, Spin, Typography } from 'antd';
import { useCreateMaterialMutation, useGetMaterialsQuery, useGetMeQuery } from '../../generated/graphql';
import { HeaderCustom } from '../../components/common/HeaderCustom';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import SidebarMenu from '../../components/common/SidebarMenu';
import { LoadingOutlined } from '@ant-design/icons';
import AddMaterialModal from './AddMaterialModal';
import Editor from '../../components/common/Editor';

const MaterialsPage: FC = () => {
  const { loading: loadingUser, data: userData } = useGetMeQuery();
  const { loading, data, refetch } = useGetMaterialsQuery();
  const [createMaterial, createMaterialStatus] = useCreateMaterialMutation({});
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function onClickAdd({ title, content }: { title: string, content: string }) {
    createMaterial({
      variables: { title, content: { content } },
      onCompleted: () => {
        setModalIsVisible(false);
        refetch();
      }
    });
  }

  return (
    <Layout>
      <HeaderCustom />
      <Layout style={{ flexDirection: 'row' }}>
        <Sider>
          <SidebarMenu />
        </Sider>
        <Content style={{ padding: 60, minHeight: '100vh' }}>
          <Typography.Title>Материалы</Typography.Title>

          {userData?.me?.role?.name === 'Teacher' ? (
            <Button onClick={() => setModalIsVisible(true)}>
              Добавить материал
            </Button>
          ) : null}

          {(loading || createMaterialStatus.loading) && (
            <Spin
              style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 100 }}
              indicator={<LoadingOutlined style={{ fontSize: 96 }} spin />}
            />
          )}

          <Editor />
        </Content>
      </Layout>
      <AddMaterialModal
        onCancel={() => setModalIsVisible(false)}
        onClickAdd={onClickAdd}
        isVisible={modalIsVisible}
      />
    </Layout>
  )
};

export default observer(MaterialsPage);




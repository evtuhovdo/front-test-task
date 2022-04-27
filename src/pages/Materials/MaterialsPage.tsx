import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Card, Layout, Typography } from 'antd';
import { useCreateMaterialMutation, useGetMaterialsQuery, useGetMeQuery } from '../../generated/graphql';
import { HeaderCustom } from '../../components/common/HeaderCustom';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import SidebarMenu from '../../components/common/SidebarMenu';
import { useNavigate } from 'react-router';
import { makeMaterialUrl } from '../../routes';
import Loading from '../../components/common/Loading';

const MaterialsPage: FC = () => {
  const { loading: loadingUser, data: userData } = useGetMeQuery();
  const { loading, data } = useGetMaterialsQuery({ fetchPolicy: 'network-only' });
  const [createMaterial, createMaterialStatus] = useCreateMaterialMutation({});
  const navigate = useNavigate();

  function onClickAddMaterial() {
    createMaterial({
      variables: { title: 'Новый материал', content: {} },
      onCompleted: r => {
        const id = r.createMaterial?.data?.id;
        if (id) navigate(makeMaterialUrl(id));
      }
    });
  }

  return (
    <Layout>
      <Loading loading={loading || loadingUser || createMaterialStatus.loading} />
      <HeaderCustom />
      <Layout style={{ flexDirection: 'row' }}>
        <Sider>
          <SidebarMenu />
        </Sider>
        <Content style={{ padding: 60, minHeight: '100vh' }}>
          <Typography.Title>Материалы</Typography.Title>

          {userData?.me?.role?.name === 'Teacher' ? (
            <Button onClick={() => onClickAddMaterial()}>
              Добавить материал
            </Button>
          ) : null}

          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {data?.materials?.data.map(m => (
              <Card
                key={m.id}
                style={{ flexBasis: '45%', margin: '2.5%', cursor: 'pointer' }}
                onClick={() => {
                  if (m.id) navigate(makeMaterialUrl(m.id));
                }}
              >
                <Typography.Title level={2}>
                  {m.attributes?.title}
                </Typography.Title>
              </Card>
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
};

export default observer(MaterialsPage);




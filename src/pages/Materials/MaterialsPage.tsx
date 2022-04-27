import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Card, Typography } from 'antd';
import { useNavigate } from 'react-router';

import { useCreateMaterialMutation, useGetMaterialsQuery, useGetMeQuery } from '../../generated/graphql';
import { makeMaterialUrl } from '../../routes';
import CommonLayout from '../../components/layout/common/CommonLayout';


const MaterialsPage: FC = () => {
  const { loading: loadingUser, data: userData } = useGetMeQuery();
  const { loading, data } = useGetMaterialsQuery({ fetchPolicy: 'network-only' });
  const [ createMaterial, createMaterialStatus ] = useCreateMaterialMutation({});
  const navigate = useNavigate();

  function onClickAddMaterial() {
    createMaterial({
      variables: { title: 'Новый материал', content: {} },
      onCompleted: r => {
        const id = r.createMaterial?.data?.id;
        if (id) {
          navigate(makeMaterialUrl(id));
        }
      },
    });
  }

  return (
    <CommonLayout contentLoading={loading || loadingUser || createMaterialStatus.loading}>
      <Typography.Title>Материалы</Typography.Title>

      {userData?.me?.role?.name === 'Teacher' && (
        <Button onClick={() => onClickAddMaterial()}>
          Добавить материал
        </Button>
      )}

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
    </CommonLayout>
  );
};

export default observer(MaterialsPage);




import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Card, Switch, Typography } from 'antd';
import { useNavigate } from 'react-router';

import { PublicationState, useCreateMaterialMutation, useGetMaterialsQuery, useGetMeQuery } from '../../generated/graphql';
import { makeMaterialUrl } from '../../routes';
import CommonLayout from '../../components/layout/common/CommonLayout';
import styles from './MaterialsPage.module.scss';
import { useSearchParams } from 'react-router-dom';


const MaterialsPage: FC = () => {
  const navigate = useNavigate();
  const [ params, setSearchParams ] = useSearchParams();

  const { loading: loadingUser, data: userData } = useGetMeQuery({ fetchPolicy: 'cache-and-network' });
  const isTeacher = userData?.me?.role?.name === 'Teacher';

  const [onlyPublished, setOnlyPublished] = useState(params.get('onlyPublished') !== 'false');
  const publicationState = (!isTeacher || onlyPublished)
    ? PublicationState.Live
    : PublicationState.Preview;

  const { loading, data, refetch } = useGetMaterialsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      publicationState
    }
  });
  const [ createMaterial, createMaterialStatus ] = useCreateMaterialMutation({});

  function onClickAddMaterial() {
    createMaterial({
      variables: {
        title: 'Новый материал',
        content: {},
      },
      onCompleted: r => {
        const id = r.createMaterial?.data?.id;
        if (id) {
          navigate(makeMaterialUrl(id));
        }
      },
    });
  }

  useEffect(() => {
    refetch({ publicationState });
    setSearchParams(onlyPublished ? '' : `onlyPublished=false`);
  }, [onlyPublished, refetch, setSearchParams]);

  return (
    <CommonLayout contentLoading={loading || loadingUser || createMaterialStatus.loading}>
      <Typography.Title>Материалы</Typography.Title>

      {isTeacher && (
        <div className={styles.topPanel}>
          <Button onClick={() => onClickAddMaterial()}>
            Добавить материал
          </Button>
          <div className={styles.publishingContainer}>
            Только опубликованные: 
            <Switch
              defaultChecked
              checked={onlyPublished}
              className={styles.publishingSwitch}
              onChange={setOnlyPublished}
            />
          </div>
        </div>
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




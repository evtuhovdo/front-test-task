import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Card, Switch, Typography } from 'antd';
import { useNavigate } from 'react-router';

import { PublicationState, useCreateModuleMutation, useGetModulesQuery, useGetMeQuery } from '../../generated/graphql';
import { makeModuleUrl } from '../../routes';
import CommonLayout from '../../components/layout/common/CommonLayout';
import styles from './ModulesPage.module.scss';
import { useSearchParams } from 'react-router-dom';


const ModulesPage: FC = () => {
  const navigate = useNavigate();
  const [ params, setSearchParams ] = useSearchParams();

  const { loading: loadingUser, data: userData } = useGetMeQuery({ fetchPolicy: 'cache-and-network' });
  const isTeacher = userData?.me?.role?.name === 'Teacher';

  const [onlyPublished, setOnlyPublished] = useState(params.get('onlyPublished') !== 'false');
  const publicationState = (!isTeacher || onlyPublished)
    ? PublicationState.Live
    : PublicationState.Preview;

  const { loading, data, refetch } = useGetModulesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      publicationState
    }
  });
  const [ createModule, createModuleStatus ] = useCreateModuleMutation({});

  function onClickAddModule() {
    createModule({
      variables: {
        title: 'Новый модуль',
        content: {},
      },
      onCompleted: r => {
        const id = r.createModule?.data?.id;
        if (id) {
          navigate(makeModuleUrl(id));
        }
      },
    });
  }

  useEffect(() => {
    refetch({ publicationState });
    setSearchParams(onlyPublished ? '' : `onlyPublished=false`);
  }, [onlyPublished, refetch, setSearchParams]);

  return (
    <CommonLayout contentLoading={loading || loadingUser || createModuleStatus.loading}>
      <Typography.Title>Модули</Typography.Title>

      {isTeacher && (
        <div className={styles.topPanel}>
          <Button onClick={() => onClickAddModule()}>
            Добавить модуль
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
        {data?.modules?.data.map(m => (
          <Card
            key={m.id}
            style={{ flexBasis: '45%', margin: '2.5%', cursor: 'pointer' }}
            onClick={() => {
              if (m.id) navigate(makeModuleUrl(m.id));
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

export default observer(ModulesPage);




import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Card, Switch, Typography, Tree, Radio, Dropdown, Menu, Popconfirm, Input } from 'antd';
import { useNavigate } from 'react-router';

import { PublicationState, useCreateModuleMutation, useGetModulesQuery, useGetMeQuery, useGetGradesDisciplinesQuery, useCreateSectionMutation, useCreateTopicMutation } from '../../generated/graphql';
import { makeModuleUrl } from '../../routes';
import CommonLayout from '../../components/layout/common/CommonLayout';
import styles from './ModulesPage.module.scss';
import { useSearchParams } from 'react-router-dom';
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';


const ModulesPage: FC = () => {
  const navigate = useNavigate();
  const [params, setSearchParams] = useSearchParams();

  const { loading: loadingUser, data: userData } = useGetMeQuery({ fetchPolicy: 'cache-and-network' });
  const isTeacher = userData?.me?.role?.name === 'Teacher';

  const [onlyPublished, setOnlyPublished] = useState(params.get('onlyPublished') === 'true');
  const publicationState = (!isTeacher || onlyPublished)
    ? PublicationState.Live
    : PublicationState.Preview;

  const { loading: loadingGradesDisciplines, data: dataGradesDisciplines } = useGetGradesDisciplinesQuery({
    fetchPolicy: 'cache-and-network',
  });
  const [selectedGradeId, setSelectedGradeId] = useState('1');
  const selectedGrade = dataGradesDisciplines?.grades?.data
    .find(grade => grade.id === selectedGradeId);
  const [selectedDisciplineId, setSelectedDisciplineId] = useState('1');

  const { loading, data, refetch } = useGetModulesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      publicationState,
      disciplineId: '2',
      gradeId: '5',
    }
  });

  useEffect(() => {
    refetch({
      publicationState,
      gradeId: selectedGradeId ?? '1',
      disciplineId: selectedDisciplineId ?? '1',
    });
    setSearchParams(onlyPublished ? '' : `onlyPublished=false`);
  }, [onlyPublished, selectedGradeId, selectedDisciplineId, refetch, setSearchParams]);


  const modulesTreeMapped = (function mapModulesTree(nodes: any): any {
    return nodes?.map(({ id, attributes: attrs }: any) => ({
      ...attrs,
      id,
      // key: id,
      title: attrs?.name ?? attrs?.title ?? id,
      children: mapModulesTree([
        ...(attrs?.sections?.data ?? []),
        ...(attrs?.children?.data ?? []),
        ...(attrs?.modules?.data ?? [])
      ])
    }));
  })(data?.topics?.data);



  const [newItemName, setNewItemName] = useState('');

  const [createModule, createModuleStatus] = useCreateModuleMutation({});
  function onClickAddModule(sectionId: string) {
    createModule({
      variables: {
        title: newItemName,
        content: {},
        sectionId,
      },
      onCompleted: r => {
        refetch();
      },
    });
  }

  const [createSection, createSectionStatus] = useCreateSectionMutation({});
  function onClickAddSection({
    topicId,
    parentId
  }: {
    topicId?: string,
    parentId?: string
  }) {
    createSection({
      variables: {
        name: newItemName,
        topicId,
        parentId,
      },
      onCompleted: r => {
        refetch();
      },
    });
  }

  const [createTopic, createTopicStatus] = useCreateTopicMutation({});
  function onClickAddTopic() {
    createTopic({
      variables: {
        name: newItemName,
        gradeId: selectedGradeId,
        disciplineId: selectedDisciplineId,
      },
      onCompleted: r => {
        refetch();
      },
    });
  }


  return (
    <CommonLayout
      // contentLoading={loading || loadingUser || createModuleStatus.loading}
    >
      <Typography.Title>Модули</Typography.Title>

      {isTeacher && (
        <div className={styles.topPanel}>
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

      <div style={{ marginTop: 16 }}>
        <Typography.Title level={5}>
          Класс:
        </Typography.Title>
        <Radio.Group
          onChange={e => setSelectedGradeId(e.target.value)}
          defaultValue={selectedGradeId}
        >
          {dataGradesDisciplines?.grades?.data.map(grade => (
            <Radio.Button key={grade.id} value={grade.id}>
              {grade.attributes?.grade}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>

      <div style={{ marginTop: 16 }}>
        <Typography.Title level={5}>
          Предмет:
        </Typography.Title>
        <Radio.Group
          onChange={e => setSelectedDisciplineId(e.target.value)}
          defaultValue={selectedDisciplineId}
        >
          {selectedGrade?.attributes?.disciplines?.data?.map(discipline => (
            <Radio.Button key={discipline.id} value={discipline.id}>
              {discipline.attributes?.name}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>

      <Popconfirm
        title={
          <div>
            Название новой темы:
            <Input
              defaultValue={newItemName}
              onChange={e => setNewItemName(e.target.value)}
            />
          </div>
        }
        onConfirm={() => onClickAddTopic()}
        // onCancel={}
        okText="Создать"
        cancelText="Отмена"
      >
        <Button
          style={{ marginTop: 16 }}
          onClick={() => setNewItemName('')}
        >
          Добавить тему
        </Button>
      </Popconfirm>

      <Tree
        style={{ marginTop: 16 }}
        treeData={modulesTreeMapped}
        titleRender={(node: any) => (
          <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: 200 }}>
            {node.title}
            <div style={{ display: 'flex' }}>
              {/* @ts-ignore */}
              {node?.__typename === 'Module' && (
                <Button
                  size='small'
                  icon={<EditOutlined size={16} />}
                  onClick={() => navigate(makeModuleUrl(node?.id))}
                />
              )}
              {node?.__typename !== 'Module' && (
                <Dropdown
                  trigger={['click']}
                  overlay={
                    <Menu>
                      <Popconfirm
                        title={
                          <div>
                            Название новой секции:
                            <Input
                              defaultValue={newItemName}
                              onChange={e => setNewItemName(e.target.value)}
                            />
                          </div>
                        }
                        onConfirm={() => onClickAddSection({
                          [node?.__typename === 'Topic' ? 'topicId' : 'parentId']: node?.id
                        })}
                        // onCancel={}
                        okText="Создать"
                        cancelText="Отмена"
                      >
                        <Menu.Item
                          key={1}
                          onClick={() => setNewItemName('')}
                        >
                          Добавить секцию
                        </Menu.Item>
                      </Popconfirm>
                      {node?.__typename !== 'Topic' && (
                        <Popconfirm
                          title={
                            <div>
                              Название нового модуля:
                              <Input
                                defaultValue={newItemName}
                                onChange={e => setNewItemName(e.target.value)}
                              />
                            </div>
                          }
                          onConfirm={() => onClickAddModule(node?.id)}
                          // onCancel={}
                          okText="Создать"
                          cancelText="Отмена"
                        >
                          <Menu.Item
                            key={2}
                            onClick={() => setNewItemName('')}
                          >
                            Добавить модуль
                          </Menu.Item>
                        </Popconfirm>
                        )}
                    </Menu>
                  }
                >
                  <Button
                    size='small'
                    icon={<PlusOutlined size={16} />}
                  />
                </Dropdown>
              )}
              <Button
                size='small'
                icon={<DeleteOutlined size={16} style={{ color: 'red'  }} />}
              />
            </div>
          </div>
        )}
      />

      {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>
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
      </div> */}
    </CommonLayout>
  );
};

export default observer(ModulesPage);




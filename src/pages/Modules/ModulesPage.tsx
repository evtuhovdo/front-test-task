import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Card, Switch, Typography, Tree, Radio, Dropdown, Menu, Popconfirm, Input } from 'antd';
import { useNavigate } from 'react-router';

import { PublicationState, useCreateModuleMutation, useGetModulesQuery, useGetMeQuery, useCreateSectionMutation, useCreateTopicMutation, useGetDisciplinesGradesQuery, useDeleteModuleMutation, useDeleteSectionMutation, useDeleteTopicMutation, useUpdateSectionMutation, useUpdateModuleMutation, useUpdateTopicMutation } from '../../generated/graphql';
import { makeModuleUrl } from '../../routes';
import CommonLayout from '../../components/layout/common/CommonLayout';
import styles from './ModulesPage.module.scss';
import { useSearchParams } from 'react-router-dom';
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';

// TODO:
// 2. Открывать редактирование модуля в новом окне
// 5. Дизайн получше
// 6. Удаление
// 7. Переименование


const ModulesPage: FC = () => {
  const navigate = useNavigate();
  const [params, setSearchParams] = useSearchParams();

  const { loading: loadingUser, data: userData } = useGetMeQuery({ fetchPolicy: 'cache-and-network' });
  const isTeacher = userData?.me?.role?.name === 'Teacher';

  const [onlyPublished, setOnlyPublished] = useState(params.get('onlyPublished') === 'true');
  const publicationState = (!isTeacher || onlyPublished)
    ? PublicationState.Live
    : PublicationState.Preview;

  const { loading: loadingDisciplinesGrades, data: dataDisciplinesGrades } = useGetDisciplinesGradesQuery({
    fetchPolicy: 'cache-and-network',
  });
  const [selectedDisciplineId, setSelectedDisciplineId] = useState(params.get('selectedDisciplineId') ?? '1');
  const selectedDiscipline = dataDisciplinesGrades?.disciplines?.data
    .find(discipline => discipline.id === selectedDisciplineId);
  const [selectedGradeId, setSelectedGradeId] = useState(params.get('selectedGradeId') ?? '1');

  const { loading, data, refetch } = useGetModulesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      publicationState,
      disciplineId: selectedDisciplineId,
      gradeId: selectedGradeId,
    }
  });

  useEffect(() => {
    refetch({
      publicationState,
      gradeId: selectedGradeId ?? '1',
      disciplineId: selectedDisciplineId ?? '1',
    });
    setSearchParams([
      `onlyPublished=${onlyPublished}`,
      `selectedDisciplineId=${selectedDisciplineId}`,
      `selectedGradeId=${selectedGradeId}`,
    ].join('&'));
  }, [onlyPublished, selectedDisciplineId, selectedGradeId, refetch, setSearchParams]);


  console.log(data?.topics?.data);
  const modulesTreeMapped = (function mapModulesTree(nodes: any, level = 1): any {
    return nodes?.map(({ id, attributes: attrs }: any) => ({
      ...attrs,
      id,
      // key: id,
      title: attrs?.name ?? attrs?.title ?? id,
      children: mapModulesTree(
        [
          ...(attrs?.sections?.data ?? []),
          ...(attrs?.children?.data ?? []),
          ...(attrs?.modules?.data ?? [])
        ],
        level + 1
      ),
      isLeaf: attrs?.__typename === 'Module',
      level,
    }));
  })(data?.topics?.data);



  const [newItemName, setNewItemName] = useState('');

  const [createModule, createModuleStatus] = useCreateModuleMutation();
  function onClickAddModule({ sectionId, topicId }: { sectionId?: string, topicId?: string }) {
    createModule({
      variables: {
        title: newItemName,
        content: {},
        sectionId,
        topicId,
      },
      onCompleted: r => {
        refetch();
      },
    });
  }

  const [createSection, createSectionStatus] = useCreateSectionMutation();
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

  const [createTopic, createTopicStatus] = useCreateTopicMutation();
  function onClickAddTopic() {
    createTopic({
      variables: {
        name: newItemName,
        disciplineId: selectedDisciplineId,
        gradeId: selectedGradeId,
      },
      onCompleted: r => {
        refetch();
      },
    });
  }



  const [deleteModule, deleteModuleStatus] = useDeleteModuleMutation();
  function onClickDeleteModule(id: string) {
    deleteModule({
      variables: { id },
      onCompleted: r => { refetch(); },
    });
  }

  const [deleteSection, deleteSectionStatus] = useDeleteSectionMutation();
  function onClickDeleteSection(id: string) {
    deleteSection({
      variables: { id },
      onCompleted: r => { refetch(); },
    });
  }

  const [deleteTopic, deleteTopicStatus] = useDeleteTopicMutation();
  function onClickDeleteTopic(id: string) {
    deleteTopic({
      variables: { id },
      onCompleted: r => { refetch(); },
    });
  }


  

  const [updateSection, updateSectionStatus] = useUpdateSectionMutation();
  function onClickUpdateSection({
    id,
    // topicId,
    // parentId
  }: {
    id: string,
    // topicId?: string,
    // parentId?: string
  }) {
    updateSection({
      variables: {
        id,
        name: newItemName,
        // topicId,
        // parentId,
      },
      onCompleted: r => {
        refetch();
      },
    });
  }

  const [updateTopic, updateTopicStatus] = useUpdateTopicMutation();
  function onClickUpdateTopic({
    id,
    // topicId,
    // parentId
  }: {
    id: string,
    // topicId?: string,
    // parentId?: string
  }) {
    console.log('delete module', id)
    updateTopic({
      variables: {
        id,
        name: newItemName,
        // disciplineId: selectedDisciplineId,
        // gradeId: selectedGradeId,
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
          Предмет:
        </Typography.Title>
        <Radio.Group
          onChange={e => setSelectedDisciplineId(e.target.value)}
          defaultValue={selectedDisciplineId}
        >
          {dataDisciplinesGrades?.disciplines?.data.map(discipline => (
            <Radio.Button key={discipline.id} value={discipline.id}>
              {discipline.attributes?.name}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>


      <div style={{ marginTop: 16 }}>
        <Typography.Title level={5}>
          Класс:
        </Typography.Title>
        <Radio.Group
          onChange={e => setSelectedGradeId(e.target.value)}
          defaultValue={selectedGradeId}
        >
          {selectedDiscipline?.attributes?.grades?.data?.map(grade => (
            <Radio.Button key={grade.id} value={grade.id}>
              {grade.attributes?.grade}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>



      <Popconfirm
        icon={null}
        title={
          <div>
            Название новой темы:
            <Input
              autoFocus
              defaultValue={newItemName}
              onChange={e => setNewItemName(e.target.value)}
            />
          </div>
        }
        onConfirm={() => onClickAddTopic()}
        // onCancel={}
        okText="Создать тему"
        cancelText="Отмена"
      >
        <Button
          style={{ marginTop: 32 }}
          onClick={() => setNewItemName('')}
        >
          Добавить тему
        </Button>
      </Popconfirm>


      {!modulesTreeMapped?.length ? (
        <div style={{ marginTop: 16 }}>
          Пока нет ни одной темы
        </div>
      ) : (
        <Tree.DirectoryTree
          style={{ marginTop: 16, maxWidth: 500 }}
          treeData={modulesTreeMapped}
          defaultExpandAll
          titleRender={(node: any) => (
            <div style={{ display: 'inline-flex', flexWrap: 'nowrap' }}>
              <div style={{ flex: 1 }}>
                {node.title}
              </div>
              <div
                style={{ display: 'flex', marginLeft: 48 }}
                onClick={e => { e.stopPropagation(); }}
              >
                {node?.__typename === 'Module' ? (
                  <Button
                    size='small'
                    icon={<EditOutlined size={16} />}
                    onClick={() => navigate(makeModuleUrl(node?.id))}
                  />
                ): (
                  <Popconfirm
                    icon={null}
                    title={
                      <div>
                        Переименовать:
                        <Input
                          autoFocus
                          defaultValue={newItemName}
                          onChange={e => setNewItemName(e.target.value)}
                        />
                      </div>
                    }
                    onConfirm={() => {
                      const __typename = node?.__typename;
                      if (__typename === 'Topic') onClickUpdateTopic({ id: node?.id });
                      if (__typename === 'Section') onClickUpdateSection({ id: node?.id });
                    }}
                    // onCancel={}
                    okText="Переименовать"
                    cancelText="Отмена"
                  >
                    <Button
                      size='small'
                      icon={<EditOutlined size={16} />}
                      onClick={() => setNewItemName(node?.title)}
                    />
                  </Popconfirm>
                )}

                {node?.__typename !== 'Module' && (
                  <Dropdown
                    trigger={['click']}
                    overlay={
                      <Menu>
                        {node?.level <= 3 && (
                          <Popconfirm
                            icon={null}
                            title={
                              <div>
                                Название нового раздела:
                                <Input
                                  autoFocus
                                  defaultValue={newItemName}
                                  onChange={e => setNewItemName(e.target.value)}
                                />
                              </div>
                            }
                            onConfirm={() => onClickAddSection({
                              [node?.__typename === 'Topic' ? 'topicId' : 'parentId']: node?.id
                            })}
                            // onCancel={}
                            okText="Создать раздел"
                            cancelText="Отмена"
                          >
                            <Menu.Item
                              key={1}
                              onClick={() => setNewItemName('')}
                            >
                              Добавить раздел
                            </Menu.Item>
                          </Popconfirm>
                        )}
                        <Popconfirm
                          icon={null}
                          title={
                            <div>
                              Название нового модуля:
                              <Input
                                autoFocus
                                defaultValue={newItemName}
                                onChange={e => setNewItemName(e.target.value)}
                              />
                            </div>
                          }
                          onConfirm={() => onClickAddModule({
                            [node?.__typename === 'Topic' ? 'topicId' : 'sectionId']: node?.id
                          })}
                          // onCancel={}
                          okText="Создать модуль"
                          cancelText="Отмена"
                        >
                          <Menu.Item
                            key={2}
                            onClick={() => setNewItemName('')}
                          >
                            Добавить модуль
                          </Menu.Item>
                        </Popconfirm>
                      </Menu>
                    }
                  >
                    <Button
                      size='small'
                      icon={<PlusOutlined size={16} />}
                    />
                  </Dropdown>
                )}

                <Popconfirm
                  title={`Удалить "${node?.title}"?`}
                  onConfirm={() => {
                    console.log('confirm deletion')
                    const __typename = node?.__typename;
                    if (__typename === 'Topic') onClickDeleteTopic(node?.id);
                    if (__typename === 'Section') onClickDeleteSection(node?.id);
                    if (__typename === 'Module') onClickDeleteModule(node?.id);
                  }}
                  // onCancel={}
                  okText="Удалить"
                  cancelText="Отмена"
                >
                  <Button
                    size='small'
                    icon={<DeleteOutlined size={16} style={{ color: 'red'  }} />}
                    onClick={() => setNewItemName('')}
                  />
                </Popconfirm>
              </div>
            </div>
          )}
        />
      )}
    </CommonLayout>
  );
};

export default observer(ModulesPage);




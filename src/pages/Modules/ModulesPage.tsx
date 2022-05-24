import React, { FC, Key, memo, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Switch, Typography, Tree, Radio, Dropdown, Menu, Popconfirm, Input, Modal, message } from 'antd';
import { useNavigate } from 'react-router';

import {
  PublicationState,
  useCreateModuleMutation,
  useGetModulesQuery,
  useGetMeQuery,
  useCreateSectionMutation,
  useCreateTopicMutation,
  useGetDisciplinesGradesQuery,
  useUpdateSectionMutation,
  useUpdateModuleMutation,
  useUpdateTopicMutation,
  TopicEntity,
  SectionEntity,
  ModuleEntity
} from '../../generated/graphql';
import { makeModuleUrl } from '../../routes';
import CommonLayout from '../../components/layout/common/CommonLayout';
import styles from './ModulesPage.module.scss';
import { useSearchParams } from 'react-router-dom';
import { DeleteOutlined, PlusOutlined, EditOutlined, ReloadOutlined } from '@ant-design/icons';


// TODO:
// регулировка глубины вложенности env
// оптимистический апдейт при перетаскивании


// должно соответствовать глубине запроса getModules
const maxSectionLevel = 5;


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
    ?.find(discipline => discipline.id === selectedDisciplineId);
  const [selectedGradeId, setSelectedGradeId] = useState(params.get('selectedGradeId') ?? '1');
  const selectedGrade = selectedDiscipline?.attributes?.grades?.data
    ?.find(grade => grade.id === selectedGradeId);

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








  const [ItemName, setItemName] = useState('');

  const [createModule, createModuleStatus] = useCreateModuleMutation();
  function onClickAddModule({
    title,
    sectionId,
    topicId
  }: {
    title: string,
    sectionId?: string,
    topicId?: string
  }) {
    createModule({
      variables: {
        title,
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
    name,
    topicId,
    parentId
  }: {
    name: string,
    topicId?: string,
    parentId?: string
  }) {
    createSection({
      variables: {
        name,
        topicId,
        parentId,
      },
      onCompleted: r => {
        refetch();
      },
    });
  }

  const [createTopic, createTopicStatus] = useCreateTopicMutation();
  function onClickAddTopic({
    name,
  }: {
    name: string,
  }) {
    createTopic({
      variables: {
        name,
        disciplineId: selectedDisciplineId,
        gradeId: selectedGradeId,
      },
      onCompleted: r => {
        refetch();
      },
    });
  }



  

  const [updateModule, updateModuleStatus] = useUpdateModuleMutation();
  function onClickUpdateModule({
    id,
    topicId,
    sectionId,
    title,
    isDeleted,
    order,
  }: {
    id: string,
    topicId?: string,
    sectionId?: string,
    title?: string,
    isDeleted?: boolean,
    order?: number,
  }) {
    updateModule({
      variables: {
        id,
        topicId,
        sectionId,
        title,
        isDeleted,
        order,
      },
      onCompleted: r => {
        refetch();
      },
    });
  }

  const [updateSection, updateSectionStatus] = useUpdateSectionMutation();
  function onClickUpdateSection({
    id,
    topicId,
    parentId,
    name,
    isDeleted,
    order,
  }: {
    id: string,
    topicId?: string,
    parentId?: string,
    name?: string,
    isDeleted?: boolean,
    order?: number,
  }) {
    updateSection({
      variables: {
        id,
        topicId,
        parentId,
        name,
        isDeleted,
        order,
      },
      onCompleted: r => {
        refetch();
      },
    });
  }

  const [updateTopic, updateTopicStatus] = useUpdateTopicMutation();
  function onClickUpdateTopic({
    id,
    name,
    isDeleted,
    order,
  }: {
    id: string,
    name?: string,
    isDeleted?: boolean,
    order?: number,
  }) {
    updateTopic({
      variables: {
        id,
        name,
        isDeleted,
        order,
      },
      onCompleted: r => {
        refetch();
      },
    });
  }








  const deletedNodes: any[] = [];

  const modulesTreeMapped = (
    function mapModulesTreeRecursive( // замапить дерево модулей и выделить удаленные ноды в отдельный массив
      nodes: (TopicEntity | SectionEntity | ModuleEntity)[],
      level = 1,
      parentNode
    ) {
      return nodes?.map((node, index) => {
        const { id, attributes: attrs } = node;
        const nodeMapped = {
          ...attrs,
          id,
          // @ts-ignore
          key: `${parentNode ? `${parentNode?.key}-` : ''}${index}`,
          // @ts-ignore
          title: attrs?.name ?? attrs?.title ?? id,
          isLeaf: attrs?.__typename === 'Module',
          level,
          parentNode,
          children: [],
        }
        // @ts-ignore
        nodeMapped.children = mapModulesTreeRecursive(
          [
            // @ts-ignore
            ...(attrs?.sections?.data ?? []),
            // @ts-ignore
            ...(attrs?.children?.data ?? []),
            // @ts-ignore
            ...(attrs?.modules?.data ?? [])
          ],
          level + 1,
          // @ts-ignore
          nodeMapped
        )
        // @ts-ignore
        .sort((a, b) => (a.order - b.order));;
        return nodeMapped;
      })
      .filter(node => {
        // @ts-ignore
        if (node.isDeleted) {
          deletedNodes.push(node);
          return false;
        }
        return true;
      })
      // @ts-ignore
      .sort((a, b) => (a.order - b.order));
    }
  )(data?.topics?.data ?? []);

  const deletedNodesSorted: any[] = [...deletedNodes]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  // console.log(modulesTreeMapped, deletedNodes, deletedNodesSorted);

  






  async function onDropNode ({
    dragNode,
    dropToGap,
    dropPosition,
    node,
  }: {
    dragNode: any, // MappedNodeType,
    dragNodesKeys: Key[],
    dropPosition: number,
    dropToGap: boolean,
    node: any, // MappedNodeType,
  }) {
    console.log({
      dragNode,
      dropToGap,
      dropPosition,
      node,
    });
    const isDroppedInsideModule = node?.__typename === 'Module' && !dropToGap;
    const targetParent = (dropToGap || isDroppedInsideModule)
      ? node?.parentNode
      : node;
    // @ts-ignore
    const targetParentChildren: any[] = [
      ...targetParent // если нет родителя - это корень с темами
        ? targetParent.children
        : modulesTreeMapped
    ];
    let index = dropToGap
      ? dropPosition
      : targetParentChildren.length;
    if (isDroppedInsideModule) { // если дропнуто внутрь модуля - вставить после него
      index = dropPosition + 1;
    }
    targetParentChildren.splice(index, 0, dragNode);
    const targetParentChildrenFiltered = targetParentChildren.filter((n, i) => ( // если перетаскиваем ноду в тот же список - удалить изначальное положение ноды
      !(isSameNode(n, dragNode) && i !== index)
    )); 
    const parentType = targetParent?.__typename;
    const dragNodeType = dragNode?.__typename;

    // глубина вложенности перетаскиваемого объекта
    const dragNodeDepth = (function computeDepthRecursive(node = dragNode) {
      if (node.__typename === 'Module') {
        return 0;
      } else {
        return 1 + Math.max(
          ...node.children.map(computeDepthRecursive)
        );
      }
    })();

    console.log({
      dragNodeDepth,
      targetParent,
      targetParentChildren,
      targetParentChildrenFiltered,
      index,
      parentType,
      dragNodeType
    });

    if (
      parentType === 'Module' // нельзя перетаскивать в модули
      || (dragNodeType === 'Topic' && parentType) // темы можно перетаскивать только в корень
      || (!targetParent && dragNodeType !== 'Topic') // в корень можно перетаскивать только темы
    ) {
      return;
    }

    if (
      dragNodeDepth + (targetParent?.level ?? 0) > maxSectionLevel // невозможно нарушить максимальную глубину вложенности
    ) {
      message.error(`Максимальная глубина вложенности разделов - ${maxSectionLevel}`);
      return;
    }

    await Promise.allSettled(
      targetParentChildrenFiltered.map((node, order) => {
        const nodeType = node?.__typename;
        console.log(parentType, nodeType)
        if (nodeType === 'Topic') {
          return updateTopic({
            variables: {
              id: node?.id,
              order,
            },
          });
        }
        if (nodeType === 'Section') {
          return updateSection({
            variables: {
              id: node?.id,
              topicId: parentType === 'Topic' ? targetParent?.id : null,
              parentId: parentType === 'Section' ? targetParent?.id : null,
              order,
            },
          });
        }
        if (nodeType === 'Module') {
          return updateModule({
            variables: {
              id: node?.id,
              topicId: parentType === 'Topic' ? targetParent?.id : null,
              sectionId: parentType === 'Section' ? targetParent?.id : null,
              order,
            },
          });
        }
        return null;
      })
    );

    refetch();
  }


  const [isRecycleBinModalVisible, setIsRecycleBinModalVisible] = useState(false);



  const [highlightedNodes, setHighlightedNodes] = useState<any[]>([]);
  function isSameNode(node1: any, node2: any) {
    return node1?.id === node2?.id && node1?.__typename === node2?.__typename;
  }
  function addHighlightedNode(node: any) {
    setHighlightedNodes([...highlightedNodes, node]);
  }
  function removeHighlightedNode(node: any) {
    setHighlightedNodes(hn => hn.filter(n => !isSameNode(n, node)));
  }
  const isNodeHighlighted = useCallback((node: any) => {
    return highlightedNodes.some(n => isSameNode(n, node));
  }, [highlightedNodes]);


  const TreeItem = useCallback(memo(({
    node,
    isHighlighted,
  }: {
    node: any,
    isHighlighted: boolean,
  }) => {
    const [itemName, setItemName] = useState('');

    return (
      <div
        style={{
          display: 'inline-flex',
          flexWrap: 'nowrap',
          backgroundColor: isHighlighted ? 'lightyellow' : 'transparent',
        }}
        onMouseOver={() => {
          removeHighlightedNode(node);
        }}
      >
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
                    defaultValue={itemName}
                    onChange={e => setItemName(e.target.value)}
                  />
                </div>
              }
              onConfirm={() => {
                const __typename = node?.__typename;
                if (__typename === 'Topic') onClickUpdateTopic({ id: node?.id, name: itemName });
                if (__typename === 'Section') onClickUpdateSection({ id: node?.id, name: itemName });
              }}
              // onCancel={}
              okText="Переименовать"
              cancelText="Отмена"
            >
              <Button
                size='small'
                icon={<EditOutlined size={16} />}
                onClick={() => setItemName(node?.title)}
              />
            </Popconfirm>
          )}

          {node?.__typename !== 'Module' && (
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  {node?.level < maxSectionLevel && (
                    <Popconfirm
                      icon={null}
                      title={
                        <div>
                          Название нового раздела:
                          <Input
                            autoFocus
                            defaultValue={itemName}
                            onChange={e => setItemName(e.target.value)}
                          />
                        </div>
                      }
                      onConfirm={() => onClickAddSection({
                        name: itemName,
                        [node?.__typename === 'Topic' ? 'topicId' : 'parentId']: node?.id
                      })}
                      // onCancel={}
                      okText="Создать раздел"
                      cancelText="Отмена"
                    >
                      <Menu.Item
                        key={1}
                        onClick={() => setItemName('')}
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
                          defaultValue={itemName}
                          onChange={e => setItemName(e.target.value)}
                        />
                      </div>
                    }
                    onConfirm={() => onClickAddModule({
                      title: itemName,
                      [node?.__typename === 'Topic' ? 'topicId' : 'sectionId']: node?.id
                    })}
                    // onCancel={}
                    okText="Создать модуль"
                    cancelText="Отмена"
                  >
                    <Menu.Item
                      key={2}
                      onClick={() => setItemName('')}
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
              const __typename = node?.__typename;
              if (__typename === 'Topic') onClickUpdateTopic({ id: node?.id, isDeleted: true });
              if (__typename === 'Section') onClickUpdateSection({ id: node?.id, isDeleted: true });
              if (__typename === 'Module') onClickUpdateModule({ id: node?.id, isDeleted: true });
            }}
            // onCancel={}
            okText="Удалить"
            cancelText="Отмена"
          >
            <Button
              size='small'
              icon={<DeleteOutlined size={16} style={{ color: 'red'  }} />}
            />
          </Popconfirm>
        </div>
      </div>
    );
  }), [navigate]);


  return (
    <CommonLayout
      // contentLoading={loading || loadingUser || createModuleStatus.loading}
    >
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography.Title style={{ width: '80%' }}>
          Модули
        </Typography.Title>

        <Button
          size="large"
          icon={<DeleteOutlined size={48} />}
          onClick={() => {
            setIsRecycleBinModalVisible(true);
          }}
        >
          Корзина
        </Button>

        <Modal
          title={`Удаленное по предмету ${selectedDiscipline?.attributes?.name} за ${selectedGrade?.id} класс`}
          okText="Закрыть"
          cancelText={[]}
          visible={isRecycleBinModalVisible}
          onOk={() => {
            setIsRecycleBinModalVisible(false);
          }}
          onCancel={() => {
            setIsRecycleBinModalVisible(false);
          }}
        >
          <Tree.DirectoryTree
            style={{ marginTop: 16, maxWidth: 500 }}
            treeData={deletedNodesSorted}
            titleRender={(node: any) => (
              <div style={{ display: 'inline-flex', flexWrap: 'nowrap' }}>
                <div style={{ flex: 1 }}>
                  {node.title}
                </div>
                <div
                  style={{ display: 'flex', marginLeft: 48 }}
                  onClick={e => { e.stopPropagation(); }}
                >
                  {node?.isDeleted && (
                    <Popconfirm
                      title={`Восстановить "${node?.title}"?`}
                      onConfirm={() => {
                        const __typename = node?.__typename;
                        addHighlightedNode(node);
                        if (__typename === 'Topic') onClickUpdateTopic({ id: node?.id, isDeleted: false });
                        if (__typename === 'Section') onClickUpdateSection({ id: node?.id, isDeleted: false });
                        if (__typename === 'Module') onClickUpdateModule({ id: node?.id, isDeleted: false });
                      }}
                      // onCancel={}
                      okText="Восстановить"
                      cancelText="Отмена"
                    >
                      <Button
                        size='small'
                        icon={<ReloadOutlined size={16} />}
                      />
                    </Popconfirm>
                  )}
                </div>
              </div>
            )}
          />
        </Modal>
      </div>





      {isTeacher && (
        <div className={styles.topPanel}>
          <div className={styles.publishingContainer}>
            Только опубликованные модули: 
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
              defaultValue={ItemName}
              onChange={e => setItemName(e.target.value)}
            />
          </div>
        }
        onConfirm={() => onClickAddTopic({ name: ItemName })}
        // onCancel={}
        okText="Создать тему"
        cancelText="Отмена"
      >
        <Button
          style={{ marginTop: 32 }}
          onClick={() => setItemName('')}
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
          blockNode
          draggable
          onDragEnter={() => {}}
          onDrop={onDropNode}
          titleRender={node => (
            <TreeItem
              node={node}
              isHighlighted={isNodeHighlighted(node)}
            />
          )}
        />
      )}
      <div style={{ minHeight: 50 }} />
    </CommonLayout>
  );
};

export default observer(ModulesPage);




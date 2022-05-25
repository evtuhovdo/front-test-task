import React, { FC, Key, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Switch, Typography, Tree, Radio, Dropdown, Menu, Popconfirm, Input, Modal, message, Spin, Tooltip } from 'antd';
import { useNavigate } from 'react-router';

import {
  PublicationState,
  useCreateContentMutation,
  useGetContentTreeQuery,
  useGetMeQuery,
  useCreateSectionMutation,
  useGetDisciplinesGradesQuery,
  useUpdateSectionMutation,
  useUpdateContentMutation,
  SectionEntity,
  ContentEntity
} from '../../generated/graphql';
import { makeContentUrl } from '../../routes';
import CommonLayout from '../../components/layout/common/CommonLayout';
import styles from './ContentTreePage.module.scss';
import { useSearchParams } from 'react-router-dom';
import { DeleteOutlined, PlusOutlined, EditOutlined, ReloadOutlined, LoadingOutlined } from '@ant-design/icons';


// TODO:
// оптимистический апдейт при перетаскивании
// типизация 
// рефакторинг


// должно соответствовать глубине запроса getContentTree
const maxSectionLevel = 5;


const ContentTreePage: FC = () => {
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

  const { loading, data, refetch, networkStatus } = useGetContentTreeQuery({
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

  const [createContent, createContentStatus] = useCreateContentMutation();
  function onClickAddContent({
    name,
    sectionId,
    order,
  }: {
    name: string,
    sectionId?: string,
    order?: number,
  }) {
    createContent({
      variables: {
        name,
        content: {},
        sectionId,
        order,
      },
      onCompleted: r => {
        refetch();
      },
    });
  }

  const [createSection, createSectionStatus] = useCreateSectionMutation();
  function onClickAddSection({
    name,
    disciplineId,
    gradeId,
    parentId,
    order,
  }: {
    name: string,
    disciplineId?: string,
    gradeId?: string,
    parentId?: string,
    order?: number,
  }) {
    createSection({
      variables: {
        name,
        disciplineId,
        gradeId,
        parentId,
        order,
      },
      onCompleted: r => {
        refetch();
      },
    });
  }





  const [updateContent, updateContentStatus] = useUpdateContentMutation();
  function onClickUpdateContent({
    id,
    sectionId,
    name,
    isDeleted,
    order,
  }: {
    id: string,
    sectionId?: string,
    name?: string,
    isDeleted?: boolean,
    order?: number,
  }) {
    updateContent({
      variables: {
        id,
        sectionId,
        name,
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
    parentId,
    name,
    isDeleted,
    order,
  }: {
    id: string,
    parentId?: string,
    name?: string,
    isDeleted?: boolean,
    order?: number,
  }) {
    updateSection({
      variables: {
        id,
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









  const { deletedNodes, contentTreeMapped } = useMemo(() => {
    const deletedNodes: any[] = [];

    const contentTreeMapped = (
      function mapContentTreeRecursive( // замапить дерево модулей и выделить удаленные ноды в отдельный массив
        nodes: (SectionEntity | ContentEntity)[],
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
            title: attrs?.name ?? id,
            isLeaf: attrs?.__typename === 'Content',
            level,
            parentNode,
            children: [],
          }
          // @ts-ignore
          nodeMapped.children = mapContentTreeRecursive(
            [
              // @ts-ignore
              ...(attrs?.children?.data ?? []),
              // @ts-ignore
              ...(attrs?.contentList?.data ?? [])
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
    )(data?.sections?.data ?? []);

    return { deletedNodes, contentTreeMapped };
  }, [data]);

  const deletedNodesSorted = [...deletedNodes]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  type TreeNodeItemMapped = typeof contentTreeMapped[number];




  const [replaceLoading, setReplaceLoading] = useState(false);
  const [contentTreeMappedUpdated, setContentTreeMappedUpdated] = useState<any[] | null>(null);
  const contentTreeWithOptimisticChange = contentTreeMappedUpdated ?? contentTreeMapped;

  // console.log(contentTreeMapped, contentTreeMappedUpdated, contentTreeWithOptimisticChange);

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
    const isDroppedInsideContent = node?.__typename === 'Content' && !dropToGap;
    const targetParent = (dropToGap || isDroppedInsideContent)
      ? node?.parentNode
      : node;
    // @ts-ignore
    const targetParentChildren: any[] = [
      ...targetParent // если нет родителя - это корень дерева
        ? targetParent.children
        : contentTreeMapped
    ];
    let index = dropToGap
      ? dropPosition
      : 0;
    if (isDroppedInsideContent) { // если дропнуто внутрь модуля - вставить после него
      index = dropPosition + 1;
    }
    targetParentChildren.splice(index, 0, dragNode);
    // если перетаскиваем ноду в тот же список - удалить изначальное положение ноды
    const targetParentChildrenFiltered = targetParentChildren.filter((n, i) => ( 
      !(isSameNode(n, dragNode) && i !== index)
    )); 
    const parentType = targetParent?.__typename; // если parentType === undefined, то это - корень
    const dragNodeType = dragNode?.__typename;

    // глубина вложенности перетаскиваемого объекта
    const dragNodeDepth = (function computeDepthRecursive(node = dragNode) {
      if (node.__typename === 'Content') {
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
      parentType === 'Content' // нельзя перетаскивать в содержание
      || (!parentType && dragNodeType === 'Content') // содержание нельзя перетащить в корень
    ) {
      return;
    }

    if (
      dragNodeDepth + (targetParent?.level ?? 0) > maxSectionLevel // невозможно нарушить максимальную глубину вложенности
    ) {
      message.error(`Максимальная глубина вложенности разделов - ${maxSectionLevel}`);
      return;
    }

    
    // optimitic update
    const contentTreeUpdated = !targetParent
      ? targetParentChildrenFiltered
      : (function replaceTargetParentChildrenRecursive(nodes = contentTreeMapped, skipFiltering = false): any[] {
          return nodes
            .filter(n => (!isSameNode(n, dragNode) || skipFiltering))
            .map(n => {
              return {
                ...n,
                children: isSameNode(n, targetParent)
                  ? replaceTargetParentChildrenRecursive(targetParentChildrenFiltered, true)
                  : n.children ? replaceTargetParentChildrenRecursive(n.children) : undefined
              }
            });
        })();
    setContentTreeMappedUpdated(contentTreeUpdated);




    setReplaceLoading(true);

    await Promise.allSettled(
      targetParentChildrenFiltered.map((node, order) => {
        const nodeType = node?.__typename;
        console.log(parentType, nodeType);
        if (nodeType === 'Section') {
          return updateSection({
            variables: {
              id: node?.id,
              parentId: parentType === 'Section' ? targetParent?.id : null,
              disciplineId: !parentType ? selectedDisciplineId : null,
              gradeId: !parentType ? selectedGradeId : null,
              order,
            },
          });
        }
        if (nodeType === 'Content') {
          return updateContent({
            variables: {
              id: node?.id,
              sectionId: targetParent?.id,
              order,
            },
          });
        }
        return null;
      })
    );

    await refetch();

    setReplaceLoading(false);
    setContentTreeMappedUpdated(null);
  }




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
          {node?.__typename === 'Content' ? (
            <Tooltip placement="bottom" title="Редактировать">
              <Button
                size='small'
                type="text"
                icon={<EditOutlined size={16} />}
                onClick={() => navigate(makeContentUrl(node?.id))}
              />
            </Tooltip>
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
                onClickUpdateSection({ id: node?.id, name: itemName });
              }}
              // onCancel={}
              okText="Переименовать"
              cancelText="Отмена"
            >
              <Tooltip placement="bottom" title="Переименовать">
                <Button
                  size='small'
                  type="text"
                  icon={<EditOutlined size={16} />}
                  onClick={() => setItemName(node?.title)}
                />
              </Tooltip>
            </Popconfirm>
          )}

          {node?.__typename !== 'Content' && (
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
                        parentId: node?.id,
                        order: node?.children?.length,
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
                        Название содержания:
                        <Input
                          autoFocus
                          defaultValue={itemName}
                          onChange={e => setItemName(e.target.value)}
                        />
                      </div>
                    }
                    onConfirm={() => onClickAddContent({
                      name: itemName,
                      sectionId: node?.id,
                      order: node?.children?.length,
                    })}
                    // onCancel={}
                    okText="Добавить содержание"
                    cancelText="Отмена"
                  >
                    <Menu.Item
                      key={2}
                      onClick={() => setItemName('')}
                    >
                      Добавить содержание
                    </Menu.Item>
                  </Popconfirm>
                </Menu>
              }
            >
              <Tooltip placement="bottom" title="Добавить сущность">
                <Button
                  size='small'
                  type="text"
                  icon={<PlusOutlined size={16} />}
                />
              </Tooltip>
            </Dropdown>
          )}

          <Popconfirm
            title={`Удалить "${node?.title}"?`}
            onConfirm={() => {
              const __typename = node?.__typename;
              if (__typename === 'Section') onClickUpdateSection({ id: node?.id, isDeleted: true });
              if (__typename === 'Content') onClickUpdateContent({ id: node?.id, isDeleted: true });
            }}
            // onCancel={}
            okText="Удалить"
            cancelText="Отмена"
          >
            <Tooltip placement="bottom" title="Удалить сущность">
              <Button
                size='small'
                type="text"
                icon={<DeleteOutlined size={16} style={{ color: 'red'  }} />}
              />
            </Tooltip>
          </Popconfirm>
        </div>
      </div>
    );
  }), [navigate]);


  

  const [isRecycleBinModalVisible, setIsRecycleBinModalVisible] = useState(false);

  return (
    <CommonLayout
      // contentLoading={loading || loadingUser || createContentStatus.loading}
    >
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography.Title style={{ width: '80%' }}>
          Учебный контент
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
                        if (__typename === 'Section') onClickUpdateSection({ id: node?.id, isDeleted: false });
                        if (__typename === 'Content') onClickUpdateContent({ id: node?.id, isDeleted: false });
                      }}
                      // onCancel={}
                      okText="Восстановить"
                      cancelText="Отмена"
                    >
                      <Tooltip placement="bottom" title="Восстановить сущность">
                        <Button
                          size='small'
                          type="text"
                          icon={<ReloadOutlined size={16} />}
                        />
                      </Tooltip>
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
            Только опубликованное содержание: 
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
            Название нового раздела:
            <Input
              autoFocus
              defaultValue={ItemName}
              onChange={e => setItemName(e.target.value)}
            />
          </div>
        }
        onConfirm={() => onClickAddSection({
          name: ItemName,
          disciplineId: selectedDisciplineId,
          gradeId: selectedGradeId,
          order: contentTreeWithOptimisticChange.length,
        })}
        // onCancel={}
        okText="Создать раздел"
        cancelText="Отмена"
      >
        <Button
          style={{ marginTop: 32 }}
          onClick={() => setItemName('')}
        >
          Добавить раздел
        </Button>
      </Popconfirm>


      <div style={{ position: 'relative' }}>
        {(loading || replaceLoading) && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 100,
            }}
          >
            <Spin
              style={{
                position: 'absolute',
                top: '40%',
                left: '40%',
              }}
              size="large"
              indicator={<LoadingOutlined />}
            />
          </div>
        )}

        {!contentTreeWithOptimisticChange?.length ? (
          <div style={{ marginTop: 16 }}>
            Пока нет ни одного раздела
          </div>
        ) : (
          <Tree.DirectoryTree
            style={{ marginTop: 16, maxWidth: 500 }}
            treeData={contentTreeWithOptimisticChange}
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
      </div>
      <div style={{ minHeight: 50 }} />
    </CommonLayout>
  );
};

export default observer(ContentTreePage);




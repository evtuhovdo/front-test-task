import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, DatePicker, Space, Table, TablePaginationConfig, Typography } from 'antd';
import moment from 'moment';

import { MarkEntity, useGetDisciplinesQuery, useGetMarksLazyQuery, useGetMeQuery } from '../../generated/graphql';
import CommonLayout from '../../components/layout/common/CommonLayout';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';


const MarksPage: FC = () => {
  // const [ params, setSearchParams ] = useSearchParams();
  // const date = params.get('date') || moment().format('YYYY-MM');
  // const mode: CalendarMode = params.get('mode') === 'year' ? 'year' : 'month';

  const [getMarks, { loading, data }] = useGetMarksLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { loading: loadingDisciplines, data: dataDisciplines } = useGetDisciplinesQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { data: userData, loading: loadingUser } = useGetMeQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: d => {
      getMarks({
        variables: {
          studentId: d.me?.id,
          pageSize: 10,
        }
      });
    }
  });

  const onChangeTableOptions = useCallback((
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorting: SorterResult<MarkEntity>[] | SorterResult<MarkEntity>
  ) => {
    console.log(pagination, filters, sorting);

    const { columnKey, order, column } = Array.isArray(sorting) ? sorting[0] : sorting;
    let sortPath = columnKey;
    if (columnKey === 'teacher') sortPath = 'teacher.firstname';
    if (columnKey === 'discipline') sortPath = 'discipline.name';
    const sortOrderPostfix = order === 'descend' ? ':desc' : '';
    const sort = column
      ? [`${sortPath}${sortOrderPostfix}`]
      : null;
    
    const variables = {
      studentId: userData?.me?.id,
      createdAtBetween: filters.createdAt ? filters.createdAt : undefined,
      mark: filters.mark ? filters.mark.map(Number) : undefined,
      septima: filters.septima ? filters.septima.map(Number) : undefined,
      disciplineId: filters.discipline ? filters.discipline.map(String) : undefined,
      page: pagination.current || 1,
      pageSize: pagination.pageSize,
      sort,
    };

    console.log(variables)
    
    getMarks({ variables });

    // const dateString = dateNew.format('YYYY-MM');
    // if (date !== dateString || mode !== modeNew) {
    //   // void refetch(getMonthlyRange(dateString));
    //   setSearchParams(`date=${dateString}&mode=${modeNew}`);
    // }
  }, [getMarks, userData]);

  const pagination = data?.marks?.meta.pagination;

  return (
    <CommonLayout>
      <Typography.Title>Оценки</Typography.Title>

      <Table
        loading={loading || loadingUser || loadingDisciplines}
        dataSource={data?.marks?.data as Partial<MarkEntity>[]}
        pagination={{
          total: pagination?.total,
          pageSize: pagination?.pageSize,
          defaultCurrent: pagination?.page,
          showSizeChanger: false,
        }}
        onChange={onChangeTableOptions}
        rowKey='id'
        columns={[
          {
            title: 'Дата',
            dataIndex: ['attributes', 'createdAt'],
            key: 'createdAt',
            sorter: true,
            render: createdAt => moment(createdAt).format('DD.MM.YYYY hh:mm'),
            filterDropdown: ({
              setSelectedKeys,
              selectedKeys: [start, end] = [],
              confirm,
              clearFilters
            }) => (
              <div style={{ padding: 8, display: 'flex', flexDirection: 'column' }}>
                <DatePicker.RangePicker
                  value={[
                    !start ? null : moment(start),
                    !end ? null : moment(end),
                  ]}
                  onChange={e => {
                    console.log(e);
                    if (e) setSelectedKeys([
                      moment(e[0]).startOf('date').format(),
                      moment(e[1]).endOf('date').format()
                    ])
                  }}
                  style={{ marginBottom: 8 }}
                />
                <Space size="small" style={{ justifyContent: 'end' }}>
                  <Button
                    type="link"
                    size="small"
                    style={{ width: 90 }}
                    disabled={!start && !end}
                    onClick={() => {
                      if (clearFilters) clearFilters();
                    }}
                  >
                    Сбросить
                  </Button>
                  <Button
                    type="primary"
                    size="small"
                    style={{ width: 90 }}
                    onClick={() => {
                      confirm({ closeDropdown: true })
                    }}
                  >
                    OK
                  </Button>
                </Space>
              </div>
            )
          }, 
          {
            title: 'Класс',
            dataIndex: ['attributes'],
            key: 'class',
            sorter: true,
            render: attrs => `${attrs?.class}${attrs?.classLetter}`,
          },
          {
            title: 'Септима',
            dataIndex: ['attributes'],
            key: 'septima',
            sorter: true,
            render: attrs => `${attrs?.septima}я ${attrs?.schoolyear}`,
            filters: Array(7).fill(1).map((_, i) => ({
              text: `${i + 1}я`,
              value: i + 1,
            })),
          },
          {
            title: 'Предмет',
            dataIndex: ['attributes', 'discipline', 'data', 'attributes', 'name'],
            key: 'discipline',
            sorter: true,
            filters: dataDisciplines?.disciplines?.data.map(d => ({
              text: d.attributes?.name,
              value: String(d.id),
            })),
          },
          {
            title: 'Оценка',
            dataIndex: ['attributes', 'mark'],
            key: 'mark',
            sorter: true,
            filters: Array(5).fill(1).map((_, i) => ({
              text: i + 1,
              value: i + 1,
            })),
          },
          {
            title: 'Критерий',
            dataIndex: ['attributes', 'criterion'],
            key: 'criterion',
            sorter: true,
          },
          {
            title: 'Кто поставил',
            dataIndex: ['attributes', 'teacher', 'data', 'attributes'],
            key: 'teacher',
            sorter: true,
            render: (t) => `${t.firstname} ${t.lastname}`,
          },
          {
            title: 'Комментарий',
            dataIndex: ['attributes', 'septima'],
            key: 'comment',
            sorter: true,
          },
        ]}
      />
    </CommonLayout>
  );
};

export default observer(MarksPage);




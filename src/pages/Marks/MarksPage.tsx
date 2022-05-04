import React, { FC, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Calendar, DatePicker, Table, Typography } from 'antd';
import { useSearchParams } from 'react-router-dom';
import moment, { Moment } from 'moment';
import { CalendarMode } from 'antd/lib/calendar/generateCalendar';

import { useGetCalendarEventsQuery, useGetMarksQuery } from '../../generated/graphql';
import CommonLayout from '../../components/layout/common/CommonLayout';

const validRange: [Moment, Moment] = [moment('2022-04'), moment('2099-01')];


const MarksPage: FC = () => {
  const [ params, setSearchParams ] = useSearchParams();
  const date = params.get('date') || moment().format('YYYY-MM');
  const mode: CalendarMode = params.get('mode') === 'year' ? 'year' : 'month';

  const { loading, data, refetch } = useGetMarksQuery({
    // variables: getMonthlyRange(date),
  });

  const onChangeDate = useCallback((dateNew: Moment, modeNew: CalendarMode = 'month') => {
    const dateString = dateNew.format('YYYY-MM');
    if (date !== dateString || mode !== modeNew) {
      // void refetch(getMonthlyRange(dateString));
      setSearchParams(`date=${dateString}&mode=${modeNew}`);
    }
  }, [date, mode, refetch, setSearchParams]);

  return (
    <CommonLayout contentLoading={loading}>
      <Typography.Title>Оценки</Typography.Title>

      <Table
        dataSource={data?.marks?.data}
        pagination={{
          total: 350,
          pageSize: 100,
          defaultCurrent: 1,
          showSizeChanger: false,
        }}
        onChange={console.log}
        rowKey='id'
        columns={[
          {
            title: 'Дата',
            dataIndex: ['attributes', 'createdAt'],
            key: 'createdAt',
            sorter: true,
            render: createdAt => moment(createdAt).format('DD.MM.YYYY hh:mm'),
            filterDropdown: ({ confirm }) => (
              <DatePicker.RangePicker
                onChange={() => confirm({ closeDropdown: true })}
              />
            )
          }, 
          {
            title: 'Класс',
            dataIndex: ['attributes'],
            key: 'class',
            sorter: true,
            render: attrs => `${attrs?.class}${attrs?.classLetter}`,
            filters: Array(11).fill(1).map((_, i) => ({
              text: i + 1,
              value: i + 1,
            })),
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
            filters: [{
              text: 'Русский язык',
              value: 1,
            }],
          },
          {
            title: 'Оценка',
            dataIndex: ['attributes', 'mark'],
            key: 'mark',
            sorter: true,
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




import React, { FC, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Calendar, Typography } from 'antd';
import { useSearchParams } from 'react-router-dom';
import moment, { Moment } from 'moment';
import { CalendarMode } from 'antd/lib/calendar/generateCalendar';

import { useGetCalendarEventsQuery } from '../../generated/graphql';
import CommonLayout from '../../components/layout/common/CommonLayout';

function getMonthlyRange(date: moment.MomentInput) {
  return {
    gte: moment(date).startOf('month').add(-7, 'days').format(),
    lte: moment(date).endOf('month').add(14, 'days').format(),
  };
}

const validRange: [ Moment, Moment ] = [ moment('2022-04'), moment('2099-01') ];


const EventsPage: FC = () => {
  const [ params, setSearchParams ] = useSearchParams();
  const date = params.get('date') || moment().format('YYYY-MM');
  const mode: CalendarMode = params.get('mode') === 'year' ? 'year' : 'month';

  const { loading, data, refetch } = useGetCalendarEventsQuery({
    variables: getMonthlyRange(date),
  });

  const onChangeDate = useCallback((dateNew: Moment, modeNew: CalendarMode = 'month') => {
    const dateString = dateNew.format('YYYY-MM');
    if (date !== dateString || mode !== modeNew) {
      void refetch(getMonthlyRange(dateString));
      setSearchParams(`date=${dateString}&mode=${modeNew}`);
    }
  }, [ date, mode, refetch, setSearchParams ]);

  const dateCellRender = useCallback((v: Moment) => {
    const event = data?.calendarEvents?.data
      .find(e => v.isSame(e.attributes?.dateTime, 'date'));

    return (
      <div>
        <p>{event?.attributes?.name}</p>
        <p>{event?.attributes?.description}</p>
      </div>
    );
  }, [ data ]);

  const defaultValue = useMemo(() => moment(date), [ date ]);

  return (
    <CommonLayout contentLoading={loading}>
      <Typography.Title>События</Typography.Title>

      <Calendar
        validRange={validRange}
        defaultValue={defaultValue}
        mode={mode}
        onPanelChange={onChangeDate}
        dateCellRender={dateCellRender}
      />
    </CommonLayout>
  );
};

export default observer(EventsPage);




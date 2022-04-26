import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Calendar, message, Spin, Typography } from 'antd';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
import { CalendarMode } from 'antd/lib/calendar/generateCalendar';
import { LoadingOutlined } from '@ant-design/icons';
import { useGetCalendarEventsQuery } from '../../generated/graphql';

function getMonthRange(date: moment.MomentInput) {
  return {
    gte: moment(date).startOf('month').add(-7, 'days').format(),
    lte: moment(date).endOf('month').add(14, 'days').format(),
  }
}

const EventsPage: FC = () => {
  const [params, setSearchParams] = useSearchParams();
  const date = params.get('date') || moment().format('YYYY-MM');
  const mode: CalendarMode = params.get('mode') === 'year' ? 'year' : 'month';

  const { loading, data, refetch } = useGetCalendarEventsQuery({
    fetchPolicy: 'network-only',
    variables: getMonthRange(date),
    onError: () => message.error('Something went wrong.'),
  });

  function onChangeDate(dateNew: moment.Moment, modeNew: CalendarMode = 'month') {
    const dateString = dateNew.format('YYYY-MM');
    if (date !== dateString || mode !== modeNew) {
      refetch(getMonthRange(dateString));
      setSearchParams(`date=${dateString}&mode=${modeNew}`);
    }
  }

  return (
    <div style={{ padding: 60 }}>
      {loading && (
        <Spin
          style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 100 }}
          indicator={<LoadingOutlined style={{ fontSize: 96 }} spin />}
        />
      )}

      <Typography.Title>События</Typography.Title>

      <Calendar
        validRange={[moment('2021-04'), moment('2099-01')]}
        defaultValue={moment(date)}
        mode={mode}
        onPanelChange={onChangeDate}
        dateCellRender={(v) => {
          const event = data?.calendarEvents?.data
            .find(e => v.isSame(e.attributes?.dateTime, 'date'));
          return (
            <div>
              <p>{event?.attributes?.name}</p>
              <p>{event?.attributes?.description}</p>
            </div>
          );
        }}
      />
    </div>
  )
};

export default observer(EventsPage);




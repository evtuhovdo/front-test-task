import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Calendar, Typography } from 'antd';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
import { CalendarMode } from 'antd/lib/calendar/generateCalendar';
// import { Link } from 'react-router-dom';
// import { LOGOUT } from '../../routes';
// import { gql, useQuery } from '@apollo/client';

// const GET_ME = gql`
//     query getMe {
//         me {
//             id
//             email
//             username
//             role {
//                 id
//                 name
//             }
//         }
//     }
// `;

const EventsPage: FC = () => {
  // const { loading, error, data } = useQuery(GET_ME, {fetchPolicy: 'network-only'});
  const [params, setSearchParams] = useSearchParams();
  const date = params.get('date');
  const mode: CalendarMode = (params.get('mode') as any) || 'month';

  function onChangeDate(dateNew: moment.Moment, modeNew: CalendarMode = 'month') {
    const dateString = dateNew.format('YYYY-MM');
    console.log(dateNew, modeNew);
    if (date !== dateString || mode !== modeNew) {
      setSearchParams(`date=${dateString}&mode=${modeNew}`);
    }
  }

  return (
    <div style={{ padding: 60 }}>
      <Typography.Title>Events Page</Typography.Title>

      <Calendar
        validRange={[moment('2021-04'), moment('2099-01')]}
        defaultValue={moment(date)}
        mode={mode}
        onPanelChange={onChangeDate}
      />
    </div>
  )
};

export default observer(EventsPage);




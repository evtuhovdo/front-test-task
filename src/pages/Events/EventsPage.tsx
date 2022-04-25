import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Calendar, Typography } from 'antd';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
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
  const date = params.get('date') || moment();

  return (
    <div style={{ padding: 60 }}>
      <Typography.Title>Events Page</Typography.Title>

      <Calendar
        validRange={[moment('2021-04-01'), moment('2099-01-01')]}
        defaultValue={moment(date)}
        onChange={v => setSearchParams(`date=${v.format('YYYY-MM-DD')}`)}
      />
    </div>
  )
};

export default observer(EventsPage);




import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Calendar, Typography } from 'antd';
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

  return (
    <div style={{ padding: 60 }}>
      <Typography.Title>Events Page</Typography.Title>

      <Calendar onPanelChange={console.log} />
    </div>
  )
};

export default observer(EventsPage);




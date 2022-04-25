import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { LOGOUT } from '../../routes';
import { gql, useQuery } from '@apollo/client';

const GET_ME = gql`
    query getMe {
        me {
            id
            email
            username
            role {
                id
                name
            }
        }
    }
`;

const IndexPage: FC = () => {
  const { loading, error, data } = useQuery(GET_ME, {fetchPolicy: 'network-only'});

  return (
    <div>
      IndexPage<br/>
      {loading && <b>loading...</b>}
      {error && <b>{`Error! ${error}`}</b>}
      {data && <pre>{JSON.stringify(data, null, 4)}</pre>}
      <Link to={LOGOUT}>
        <Button type="link" block={true}>Выйти</Button>
      </Link>
    </div>
  )
};

export default observer(IndexPage);




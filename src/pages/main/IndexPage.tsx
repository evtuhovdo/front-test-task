import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { LOGOUT } from '../../routes';
import { useGetMeQuery } from '../../generated/graphql';

const IndexPage: FC = () => {
  const { loading, error, data} = useGetMeQuery({fetchPolicy: 'network-only'});

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




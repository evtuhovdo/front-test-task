import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import Editor from '../../components/common/Editor';


const IndexPage: FC = () => {
  return (
    <div>
      <Editor />
    </div>
  );
};

export default observer(IndexPage);




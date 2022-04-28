import React, { FC, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Typography, Breadcrumb } from 'antd';
import { OutputData } from '@editorjs/editorjs';
import { useNavigate, useParams } from 'react-router';
import { debounce } from 'lodash';

import { useGetMaterialQuery, useGetMeQuery, useUpdateMaterialMutation } from '../../generated/graphql';
import Editor from '../../components/common/Editor';
import { MATERIALS } from '../../routes';
import CommonLayout from '../../components/layout/common/CommonLayout';
import { Link } from 'react-router-dom';


const MaterialsPage: FC = () => {
  const { id = '' } = useParams();
  const { loading: loadingUser, data: userData } = useGetMeQuery();
  const [ updateMaterial, updateMaterialStatus ] = useUpdateMaterialMutation();
  const isTeacher = userData?.me?.role?.name === 'Teacher';
  const navigate = useNavigate();
  const [ title, setTitle ] = useState('');
  const { loading, data } = useGetMaterialQuery({
    variables: { id },
    onCompleted: m => setTitle(m.material?.data?.attributes?.title || ''),
  });
  const content = data?.material?.data?.attributes?.content;

  function onChange({ content, title }: { content?: OutputData, title?: string }) {
    updateMaterial({
      variables: { id, title, content },
    });
  }

  const onChangeDebounced = useCallback(
    debounce(onChange, 500, { maxWait: 10000 }),
    [],
  );

  useEffect(() => {
    if (isTeacher) {
      onChangeDebounced({ title });
    }
  }, [ title, onChangeDebounced, isTeacher ]);

  return (
    <CommonLayout contentLoading={loading}>
      <Breadcrumb style={{ paddingBottom: 20 }}>
        <Breadcrumb.Item><Link to={MATERIALS}>Материалы</Link></Breadcrumb.Item>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
      </Breadcrumb>

      <Typography.Title
        editable={isTeacher && {
          onChange: title => setTitle(title),
          triggerType: [ 'text', 'icon' ],
        }}
      >
        {title}
      </Typography.Title>

      {content && (
        <Editor
          readOnly={!isTeacher}
          onChange={content => onChangeDebounced({ content, title })}
          data={content}
        />
      )}
    </CommonLayout>
  );
};

export default observer(MaterialsPage);




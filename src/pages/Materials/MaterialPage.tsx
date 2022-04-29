import React, { FC, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Typography, Breadcrumb, Switch } from 'antd';
import { OutputData } from '@editorjs/editorjs';
import { useNavigate, useParams } from 'react-router';
import { debounce } from 'lodash';

import { useGetMaterialQuery, useGetMeQuery, useUpdateMaterialMutation } from '../../generated/graphql';
import Editor from '../../components/common/Editor';
import { MATERIALS } from '../../routes';
import CommonLayout from '../../components/layout/common/CommonLayout';
import { Link } from 'react-router-dom';
import styles from './MaterialPage.module.scss';
import moment from 'moment';


const MaterialsPage: FC = () => {
  const { id = '' } = useParams();
  const { loading: loadingUser, data: userData } = useGetMeQuery();
  const [ updateMaterial, updateMaterialStatus ] = useUpdateMaterialMutation();
  const isTeacher = userData?.me?.role?.name === 'Teacher';
  const [ title, setTitle ] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const { loading, data } = useGetMaterialQuery({
    variables: { id },
    onCompleted: m => {
      const attributes = m.material?.data?.attributes;
      setTitle(attributes?.title || '');
      setIsPublished(!!attributes?.publishedAt);
    },
  });
  const content = data?.material?.data?.attributes?.content;

  function onChange(
    vars: {
      content?: OutputData,
      title?: string,
      publishedAt?: string | null
    }
  ) {
    updateMaterial({
      variables: { id, ...vars },
    });
  }

  const onChangeDebounced = useCallback(
    debounce(onChange, 500, { maxWait: 10000 }),
    [],
  );

  useEffect(() => {
    if (isTeacher && !loading) onChange({ title });
  }, [title, onChangeDebounced, isTeacher]);

  function onCheckPublish(checked: Boolean) {
    const publishedAt = checked ? moment().format() : null;
    setIsPublished(true);
    onChange({ publishedAt })
  }


  return (
    <CommonLayout contentLoading={loading}>
      <Breadcrumb style={{ paddingBottom: 20 }}>
        <Breadcrumb.Item><Link to={MATERIALS}>Материалы</Link></Breadcrumb.Item>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
      </Breadcrumb>

      <div className={styles.topPanel}>
        <Typography.Title
          className={styles.heading}
          editable={isTeacher && {
            onChange: title => setTitle(title),
            triggerType: [ 'text', 'icon' ],
          }}
        >
          {title}
        </Typography.Title>
        {isTeacher && (
          <div className={styles.publishingContainer}>
            Опубликовать: 
            <Switch
              checked={isPublished}
              onChange={onCheckPublish}
              className={styles.publishingSwitch}
            />
          </div>
        )}
      </div>

      {content && (
        <Editor
          readOnly={!isTeacher}
          onChange={content => onChangeDebounced({ content })}
          data={content}
        />
      )}
    </CommonLayout>
  );
};

export default observer(MaterialsPage);




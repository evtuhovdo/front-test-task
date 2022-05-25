import React, { FC, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Typography, Breadcrumb, Switch } from 'antd';
import { OutputData } from '@editorjs/editorjs';
import { useParams } from 'react-router';
import { debounce } from 'lodash';

import { useGetContentQuery, useGetMeQuery, useUpdateContentMutation } from '../../generated/graphql';
import Editor from '../../components/common/Editor';
import { CONTENT_TREE } from '../../routes';
import CommonLayout from '../../components/layout/common/CommonLayout';
import { Link } from 'react-router-dom';
import styles from './ContentPage.module.scss';
import moment from 'moment';


const ContentTreePage: FC = () => {
  const { id = '' } = useParams();
  const { loading: loadingUser, data: userData } = useGetMeQuery({ fetchPolicy: 'cache-and-network' });
  const [ updateContent, updateContentStatus ] = useUpdateContentMutation();
  const isTeacher = userData?.me?.role?.name === 'Teacher';
  const [ name, setName ] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const { loading, data } = useGetContentQuery({
    variables: { id },
    onCompleted: n => {
      const attributes = n.content?.data?.attributes;
      setName(attributes?.name || '');
      setIsPublished(!!attributes?.publishedAt);
    },
  });
  const content = data?.content?.data?.attributes?.content;

  function onChange(
    vars: {
      content?: OutputData,
      name?: string,
      publishedAt?: string | null
    }
  ) {
    updateContent({
      variables: { id, ...vars },
    });
  }

  const onChangeDebounced = useCallback(
    debounce(onChange, 500, { maxWait: 10000 }),
    [],
  );

  useEffect(() => {
    if (isTeacher && !loading) onChange({ name });
  }, [name, onChangeDebounced, isTeacher]);

  function onCheckPublish(checked: Boolean) {
    const publishedAt = checked ? moment().format() : null;
    setIsPublished(true);
    onChange({ publishedAt })
  }


  return (
    <CommonLayout contentLoading={loading}>
      <Breadcrumb style={{ paddingBottom: 20 }}>
        <Breadcrumb.Item><Link to={CONTENT_TREE}>Модули</Link></Breadcrumb.Item>
        <Breadcrumb.Item>{name}</Breadcrumb.Item>
      </Breadcrumb>

      <div className={styles.topPanel}>
        <Typography.Title
          className={styles.heading}
          editable={isTeacher && {
            onChange: name => setName(name),
            triggerType: [ 'text', 'icon' ],
          }}
        >
          {name}
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

export default observer(ContentTreePage);




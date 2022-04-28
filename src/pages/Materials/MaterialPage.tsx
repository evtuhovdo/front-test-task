import React, { FC, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Layout, Typography } from 'antd';
import { useGetMaterialQuery, useGetMeQuery, useUpdateMaterialMutation } from '../../generated/graphql';
import { HeaderCustom } from '../../components/common/HeaderCustom';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import SidebarMenu from '../../components/common/SidebarMenu';
import Editor from '../../components/common/Editor';
import { OutputData } from '@editorjs/editorjs';
import { useNavigate, useParams } from 'react-router';
import { debounce } from 'lodash';
import { MATERIALS } from '../../routes';
import Loading from '../../components/common/Loading';

const MaterialsPage: FC = () => {
  const { id = '' } = useParams();
  const { loading: loadingUser, data: userData } = useGetMeQuery();
  const [updateMaterial, updateMaterialStatus] = useUpdateMaterialMutation();
  const isTeacher = userData?.me?.role?.name === 'Teacher';
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
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
    []
  );

  useEffect(() => {
    if (isTeacher) onChangeDebounced({ title });
  }, [title, onChangeDebounced]);


  return (
    <Layout>
      <Loading loading={loading || loadingUser || !content} />
      <HeaderCustom />
      <Layout style={{ flexDirection: 'row' }}>
        <Sider>
          <SidebarMenu />
        </Sider>
        <Content style={{ padding: 60, minHeight: '100vh' }}>

          <Button onClick={() => navigate(MATERIALS)}>
            Назад
          </Button>

          <Typography.Title
            editable={isTeacher && {
              onChange: title => setTitle(title),
              triggerType: ['text', 'icon'],
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
        </Content>
      </Layout>
    </Layout>
  )
};

export default observer(MaterialsPage);




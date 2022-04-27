import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Layout, Spin, Typography } from 'antd';
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
  let { id = '' } = useParams();
  const { loading: loadingUser, data: userData } = useGetMeQuery();
  const { loading, data } = useGetMaterialQuery({ variables: { id } });
  const [updateMaterial, updateMaterialStatus] = useUpdateMaterialMutation();
  const isTeacher = userData?.me?.role?.name === 'Teacher';
  const navigate = useNavigate();
  const content = data?.material?.data?.attributes?.content;


  const onChange = useCallback(
    debounce(({ content, title }: { content?: OutputData, title?: string }) => {
      updateMaterial({
        variables: { id, title, content },
        // onCompleted: () => {
        // }
      });
    }, 1000, { maxWait: 10000 }),
    []
  );

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
            editable={{
              onChange: title => onChange({ title }),
              triggerType: ['text', 'icon'],
            }}
          >
            {data?.material?.data?.attributes?.title}
          </Typography.Title>

          {(!loading && content) && (
            <Editor
              readOnly={!isTeacher}
              onChange={content => onChange({ content })}
              data={content}
            />
          )}
        </Content>
      </Layout>
    </Layout>
  )
};

export default observer(MaterialsPage);




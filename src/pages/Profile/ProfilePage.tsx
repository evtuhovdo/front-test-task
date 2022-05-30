import React, { FC, useEffect, useState } from 'react';
import CommonLayout from '../../components/layout/common/CommonLayout';
import { Button, Avatar, Typography, Input, Space, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import styles from './ProfilePage.module.scss';
import * as yup from 'yup';
import { gql, useQuery, useMutation } from '@apollo/client';

const schema = yup
  .object({
    firstname: yup.string().min(2).required(),
    lastname: yup.string().min(2).required(),
  })
  .required();

interface IProfile {

}

export const getAllData = gql`
  query getMe($id: ID!) {
    usersPermissionsUser(id: $id) {
      data {
        id
        attributes {
          lastname
          firstname
        }
      }
    }
    me {
      id
      email
      username
      role {
        id
        name
        description
      }
    }
  }
`;

export const changeUserData = gql`
  mutation changeUserProfile($id: ID!, $data: UsersPermissionsUserInput!) {
    updateUsersPermissionsUser(id: $id, data: $data) {
      data {
        id
        attributes {
          firstname
        }
      }
    }
  }
`;

const ProfilePage: FC<IProfile> = () => {
  const [openForm, setOpenForm] = useState(false);

  const userId = localStorage.getItem('userId');
  const { loading, data } = useQuery(getAllData, {
    variables: {
      id: userId,
    },
  });

  const [chageData] = useMutation(changeUserData);

  useEffect(() => {
    setOpenForm((prev) => !prev);
  }, []);

  const handleOpenForm = () => {
    setOpenForm((prev) => !prev);
  };

  const {
    handleSubmit,
    control,
    getValues,
    formState: { isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstname: '',
      lastname: '',
    },
    reValidateMode: 'onChange',
    mode: 'all',
  });

  const onSubmit = async () => {
    const values = getValues();
    try {
      const res = await chageData({
        variables: {
          id: userId,
          data: {
            firstname: values.firstname,
            lastname: values.lastname,
          },
        },
      });
      message.info('Данные изменены!');
      handleOpenForm();
    } catch (error: any) {
      console.error(error);
      if (error.message === 'Failed to fetch') {
        message.error('Ошибка получения данных');
      }
    }
  };


  return (
    <CommonLayout>
      <Typography.Title>Профиль</Typography.Title>
      {openForm ? (
        <div className={styles.userData}>
          <Avatar className={styles.avatar} size={82}>
            {data?.me?.email.charAt(0)}
          </Avatar>
          <div className={styles.row}>
            <Space size="small" style={{ alignItems: 'baseline' }}>
              <Typography.Title level={5}>Имя: </Typography.Title>
              <Typography.Text>
                {loading
                  ? 'Загрузка...'
                  : ` ${data?.usersPermissionsUser?.data?.attributes?.firstname}`}
              </Typography.Text>
            </Space>
          </div>
          <div className={styles.row}>
            <Space size="small" style={{ alignItems: 'baseline' }}>
              <Typography.Title level={5}>Фамилия: </Typography.Title>
              <Typography.Paragraph>
                {loading
                  ? 'Загрузка...'
                  : ` ${data?.usersPermissionsUser?.data?.attributes?.lastname}`}
              </Typography.Paragraph>
            </Space>
          </div>
          <div className={styles.row}>
            <Space size="small" style={{ alignItems: 'baseline' }}>
              <Typography.Title level={5}>Роль: </Typography.Title>
              <Typography.Paragraph>
                {loading ? 'Загрузка...' : ` ${data?.me?.role?.description}`}
              </Typography.Paragraph>
            </Space>
          </div>
          <div className={styles.row}>
            <Space size="small" style={{ alignItems: 'baseline' }}>
              <Typography.Title level={5}>Email: </Typography.Title>
              <Typography.Paragraph>
                {loading ? 'Загрузка...' : ` ${data?.me?.email}`}
              </Typography.Paragraph>
            </Space>
          </div>
          <Button type="primary" className={styles.changeDataBtn} onClick={() => handleOpenForm()}>
            Изменить данные
          </Button>
        </div>
      ) : (
        <div>
          <Space direction="vertical" size={20} style={{ width: '50%', marginTop: "50px" }}>
            <Space direction="vertical" size={10} style={{ width: '50%' }}>
              <div style={{ textAlign: 'left' }}>Имя</div>
              <Controller
                name="firstname"
                control={control}
                render={({
                  field,
                  formState: { submitCount },
                  fieldState: { error, isTouched },
                }) => (
                  <React.Fragment>
                    <Input placeholder="Введите Имя" size="large" {...field} />
                 
                    {(submitCount > 0 || isTouched) && !!error && error.message}
                    
                  </React.Fragment>
                )}
              />
            </Space>

            <Space direction="vertical" size={10} style={{ width: '50%' }}>
              <div style={{ textAlign: 'left' }}>Фамилия</div>
              <Controller
                name="lastname"
                control={control}
                render={({
                  field,
                  formState: { submitCount },
                  fieldState: { error, isTouched },
                }) => (
                  <React.Fragment>
                    <Input size="large" placeholder="Введите фамилию" {...field} />
                    {(submitCount > 0 || isTouched) && !!error && error.message}
                  </React.Fragment>
                )}
              />
            </Space>
            <Space size="small" style={{ alignItems: 'baseline' }}>
              <Button type="default" size="middle" onClick={() => handleOpenForm()}>
                Назад
              </Button>
              <Button
                type="primary"
                size="middle"
                loading={isSubmitting}
                disabled={!isValid}
                onClick={handleSubmit(onSubmit)}>
                Изменить
              </Button>
            </Space>
          </Space>
        </div>
      )}
    </CommonLayout>
  );
};

export default observer(ProfilePage);

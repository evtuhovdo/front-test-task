import React, { FC, useEffect, useState } from 'react';
import CommonLayout from '../../components/layout/common/CommonLayout';
import { Button, Avatar, Typography, Input, Space, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import styles from './ProfilePage.module.scss';
import * as yup from 'yup';
import { useInstance } from 'react-ioc';
import { Store } from '../../model/store/Store';
import { useGetAllDataUserQuery, useChangeUserProfileMutation } from '../../generated/graphql';

const schema = yup
  .object({
    firstname: yup.string().min(2).required(),
    lastname: yup.string().min(2).required(),
  })
  .required();

interface IProfile {

}


const ProfilePage: FC<IProfile> = () => {
  const [openForm, setOpenForm] = useState(false);
  const store = useInstance(Store);
  const userId = store.auth.userId;
 
  const { loading, data } = useGetAllDataUserQuery({
    variables: {
      id:userId??''
    },
  });

  const [chageData] = useChangeUserProfileMutation();

  useEffect(() => {
    setOpenForm((prev) => !prev);
  }, []);

  const toggleOpenForm = () => {
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
          id: userId!,
          data: {
            firstname: values.firstname,
            lastname: values.lastname,
          },
        },
      });
      message.info('Данные изменены!');
      toggleOpenForm();
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
      {openForm && (
        <div className={styles.userData}>
          <Avatar className={styles.avatar} size={82}>
            {data?.me?.email?.charAt(0)}
          </Avatar>
          <div className={styles.row}>
            <Space size="small" className={styles.space}>
              <Typography.Title level={5}>Имя: </Typography.Title>
              <Typography.Text>
                {loading
                  ? 'Загрузка...'
                  : ` ${data?.usersPermissionsUser?.data?.attributes?.firstname}`}
              </Typography.Text>
            </Space>
          </div>
          <div className={styles.row}>
            <Space size="small" className={styles.space}>
              <Typography.Title level={5}>Фамилия: </Typography.Title>
              <Typography.Paragraph>
                {loading
                  ? 'Загрузка...'
                  : ` ${data?.usersPermissionsUser?.data?.attributes?.lastname}`}
              </Typography.Paragraph>
            </Space>
          </div>
          <div className={styles.row}>
            <Space size="small" className={styles.space}>
              <Typography.Title level={5}>Роль: </Typography.Title>
              <Typography.Paragraph>
                {loading ? 'Загрузка...' : ` ${data?.me?.role?.description}`}
              </Typography.Paragraph>
            </Space>
          </div>
          <div className={styles.row}>
            <Space size="small" className={styles.space}>
              <Typography.Title level={5}>Email: </Typography.Title>
              <Typography.Paragraph>
                {loading ? 'Загрузка...' : ` ${data?.me?.email}`}
              </Typography.Paragraph>
            </Space>
          </div>
          <Button type="primary" className={styles.changeDataBtn} onClick={toggleOpenForm}>
            Изменить данные
          </Button>
        </div>
      )}  
      

      {(!openForm &&
        <div>
          <Space direction="vertical" size={20} className={styles.formSpace}>
            <Space direction="vertical" size={10}>
              <div>Имя</div>
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

            <Space direction="vertical" size={10}>
              <div>Фамилия</div>
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
            <Space size="small" className={styles.space}>
              <Button type="default" size="middle" onClick={toggleOpenForm}>
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

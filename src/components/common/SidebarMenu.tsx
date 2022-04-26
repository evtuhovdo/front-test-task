import React, { FC } from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router';
import { EVENTS, MATERIALS } from '../../routes';
import { useLocation } from 'react-router';


interface IProps {

}

export const SidebarMenu: FC<IProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Menu
      mode="inline"
      style={{ height: '100%' }}
      defaultOpenKeys={['learning_plan']}
      selectedKeys={[location.pathname]}
    >
      <Menu.SubMenu title="Учебный план" key="learning_plan">
        <Menu.Item key="1">
          Задачи
        </Menu.Item>
        <Menu.Item key={EVENTS} onClick={() => navigate(EVENTS)}>
          Календарь
        </Menu.Item>
        <Menu.Item key={MATERIALS} onClick={() => navigate(MATERIALS)}>
          Материалы
        </Menu.Item>
      </Menu.SubMenu>
      {/* <Menu.Item>Лента</Menu.Item>
      <Menu.Item>Пользователи</Menu.Item>
      <Menu.Item>Звонки</Menu.Item>
      <Menu.Item>Мои настройки</Menu.Item> */}
    </Menu>
  )
};

export default SidebarMenu;

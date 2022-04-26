import React, { FC } from 'react';
import { Menu } from 'antd';


interface IProps {

}

export const SidebarMenu: FC<IProps> = () => {
  return (
    <Menu
      mode="inline"
      style={{ height: '100%' }}
    >
      <Menu.SubMenu title="Учебный план">
        <Menu.Item>Задачи</Menu.Item>
        <Menu.Item>Календарь</Menu.Item>
        <Menu.Item>Материалы</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item>Лента</Menu.Item>
      <Menu.Item>Пользователи</Menu.Item>
      <Menu.Item>Звонки</Menu.Item>
      <Menu.Item>Мои настройки</Menu.Item>
    </Menu>
  )
};

export default SidebarMenu;

import React, { FC } from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router';

import { EVENTS, MATERIALS } from '../../../routes';
import styles from './SidebarMenu.module.scss';

interface IProps {

}

export const SidebarMenu: FC<IProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Menu
      mode="inline"
      className={styles.menu}
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
    </Menu>
  )
};

export default React.memo(SidebarMenu);

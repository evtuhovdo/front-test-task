import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { provider, useInstance } from 'react-ioc';
import { observer } from 'mobx-react-lite';
import { ApolloClient, ApolloProvider } from '@apollo/client';

import './App.scss';

import StoreDI from './model/store/StoreDI';
import ApolloClientDI from './model/graphql/ApolloClientDI';
import { Store } from './model/store/Store';
import ScrollToTop from './components/common/ScrollToTop';
import { EVENTS, FORGET_PASSWORD, INDEX, LOGIN, LOGOUT, MATERIAL, MATERIALS, NOT_FOUND, RESET_PASSWORD } from './routes';
import NotFound from './pages/NotFound';
import LoginPage from './pages/Auth/LoginPage';
import ForgetPasswordPage from './pages/Auth/ForgetPasswordPage';
import LogoutPage from './pages/Auth/LogoutPage';
import ResetPasswordPage from './pages/Auth/ResetPasswordPage';

import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';

import EventsPage from './pages/Events/EventsPage';

import moment from 'moment';
import 'moment/locale/ru';
import MaterialsPage from './pages/Materials/MaterialsPage';
import MaterialPage from './pages/Materials/MaterialPage';
moment.locale('ru');

const App: FC = () => {
  const store = useInstance(Store);
  const { hydrated, auth } = store;
  const { hasAuthToken } = auth;
  const apolloClient = useInstance(ApolloClient);

  if (!hydrated) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <ConfigProvider locale={ruRU}>
      <ApolloProvider client={apolloClient}>
        <Router>
          <ScrollToTop/>
          <Routes>
            <React.Fragment>
              {!hasAuthToken && (
                <React.Fragment>
                  <Route path={LOGIN} element={<LoginPage/>}/>
                  <Route path={FORGET_PASSWORD} element={<ForgetPasswordPage/>}/>
                  <Route path={RESET_PASSWORD} element={<ResetPasswordPage/>}/>
                  <Route path="*" element={<Navigate to={LOGIN}/>}/>
                </React.Fragment>
              )}

              {hasAuthToken && (
                <React.Fragment>
                  <Route path={INDEX} element={<Navigate to={EVENTS}/>}/>
                  <Route path={MATERIALS} element={<MaterialsPage/>}/>
                  <Route path={MATERIAL} element={<MaterialPage/>}/>
                  <Route path={LOGOUT} element={<LogoutPage/>}/>
                  <Route path={EVENTS} element={<EventsPage/>}/>
                  <Route path="*" element={<Navigate to={INDEX}/>}/>
                  <Route path={NOT_FOUND} element={<NotFound/>}/>
                </React.Fragment>
              )}
            </React.Fragment>
          </Routes>
        </Router>
      </ApolloProvider>
    </ConfigProvider>
  );
};

export default provider(
  StoreDI(),
  ApolloClientDI(),
)(observer(App));

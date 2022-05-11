import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { toFactory,  } from 'react-ioc';
import { Store } from '../store/Store';
import { GlobalActions } from './GlobalActions';

const GlobalActionsDI = (): any => [
  GlobalActions,
  toFactory(
    [Store, ApolloClient],
    (store, apolloClient: ApolloClient<NormalizedCacheObject>) => new GlobalActions(store, apolloClient),
  ),
];


export default GlobalActionsDI;

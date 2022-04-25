import {toFactory} from 'react-ioc';
import {ApolloClient} from "@apollo/client";
import ApolloClientFactory from "./ApolloClientFactory";
import { Store } from '../store/Store';

const ApolloClientDI = (): any => [
  ApolloClient,
  toFactory(
    [Store],
    (store) => ApolloClientFactory(store),
  ),
];

export default ApolloClientDI;

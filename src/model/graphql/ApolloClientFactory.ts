import { getApiBase } from '../../env';
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { IRootStoreModel } from '../store/RootStore';
import { onError } from '@apollo/client/link/error';
import { message } from 'antd';

const API_BASE = getApiBase();

const ApiClientFactory = (store: IRootStoreModel) => {
  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    const { response } = operation.getContext();

    message.error('Что то пошло не так.');

    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    } else if (response && response.status === 401) {
      // Если токен сдох, то разлогиниваем пользователя
      store.auth.clearState();
    }
  });

  const authLink = setContext((_, { headers }) => {
    if (!store.auth.token) {
      return headers;
    }
    const token = store.auth.token;

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const uploadLink = createUploadLink({
    uri: `${API_BASE}/graphql`,
  });

  return new ApolloClient({
    link: ApolloLink.from([ errorLink, authLink, uploadLink ]),
    cache: new InMemoryCache(),
  });
};

export default ApiClientFactory;

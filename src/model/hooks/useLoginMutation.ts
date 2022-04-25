import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { UsersPermissionsLoginInput } from '../../__generated__/global-types';
import { login, loginVariables } from './__generated__/login';

const LOGIN_MUTATION = gql`
    mutation login ($input: UsersPermissionsLoginInput!) {
        login(input: $input) {
            jwt
            user {
                id
                blocked
            }
        }
    }
`;

const useLoginMutation = () => {
  const [ loginMutation ] = useMutation<login, loginVariables>(LOGIN_MUTATION);

  return useCallback(async (data: Omit<UsersPermissionsLoginInput, 'provider'>) => {
    const input = {
      identifier: data.identifier,
      password: data.password,
      provider: 'local',
    };

    return loginMutation({
      variables: {
        input,
      },
    });
  }, [ loginMutation ]);
};

export default useLoginMutation;

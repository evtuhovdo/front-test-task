import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { resetPassword, resetPasswordVariables } from './__generated__/resetPassword';

const RESET_PASSWORD_MUTATION = gql`
    mutation resetPassword($code: String!, $password: String!, $passwordConfirmation: String!) {
        resetPassword(code: $code, password: $password, passwordConfirmation: $passwordConfirmation) {
            jwt
            user {
                id
                blocked
            }
        }
    }
`;


const useResetPasswordMutation = () => {
  const [ resetPasswordMutation ] = useMutation<resetPassword, resetPasswordVariables>(RESET_PASSWORD_MUTATION);

  return useCallback(async (code: string, password: string, passwordConfirmation: string) => {
    return resetPasswordMutation({
      variables: {
        code,
        password,
        passwordConfirmation
      },
    });
  }, [ resetPasswordMutation ]);
};

export default useResetPasswordMutation;

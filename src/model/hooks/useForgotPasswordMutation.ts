import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { forgotPassword, forgotPasswordVariables } from './__generated__/forgotPassword';

const FORGOT_PASSWORD_MUTATION = gql`
    mutation forgotPassword ($email: String!) {
        forgotPassword(email: $email) {
            ok
        }
    }
`;

const useForgotPasswordMutation = () => {
  const [ forgotPasswordMutation ] = useMutation<forgotPassword, forgotPasswordVariables>(FORGOT_PASSWORD_MUTATION);

  return useCallback(async (email: string) => {
    return forgotPasswordMutation({
      variables: {
        email,
      },
    });
  }, [ forgotPasswordMutation ]);
};

export default useForgotPasswordMutation;

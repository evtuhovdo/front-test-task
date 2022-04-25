/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: resetPassword
// ====================================================

export interface resetPassword_resetPassword_user {
  __typename: "UsersPermissionsMe";
  id: string;
  blocked: boolean | null;
}

export interface resetPassword_resetPassword {
  __typename: "UsersPermissionsLoginPayload";
  jwt: string | null;
  user: resetPassword_resetPassword_user;
}

export interface resetPassword {
  /**
   * Reset user password. Confirm with a code (resetToken from forgotPassword)
   */
  resetPassword: resetPassword_resetPassword | null;
}

export interface resetPasswordVariables {
  code: string;
  password: string;
  passwordConfirmation: string;
}

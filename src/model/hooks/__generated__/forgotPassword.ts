/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: forgotPassword
// ====================================================

export interface forgotPassword_forgotPassword {
  __typename: "UsersPermissionsPasswordPayload";
  ok: boolean;
}

export interface forgotPassword {
  /**
   * Request a reset password token
   */
  forgotPassword: forgotPassword_forgotPassword | null;
}

export interface forgotPasswordVariables {
  email: string;
}

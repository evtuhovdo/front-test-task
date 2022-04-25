/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UsersPermissionsLoginInput } from "./../../../__generated__/global-types";

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_login_user {
  __typename: "UsersPermissionsMe";
  id: string;
  blocked: boolean | null;
}

export interface login_login {
  __typename: "UsersPermissionsLoginPayload";
  jwt: string | null;
  user: login_login_user;
}

export interface login {
  login: login_login;
}

export interface loginVariables {
  input: UsersPermissionsLoginInput;
}

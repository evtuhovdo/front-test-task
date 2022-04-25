/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMe
// ====================================================

export interface getMe_me_role {
  __typename: "UsersPermissionsMeRole";
  id: string;
  name: string;
}

export interface getMe_me {
  __typename: "UsersPermissionsMe";
  id: string;
  email: string | null;
  username: string;
  role: getMe_me_role | null;
}

export interface getMe {
  me: getMe_me | null;
}

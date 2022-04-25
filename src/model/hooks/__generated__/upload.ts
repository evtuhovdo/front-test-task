/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: upload
// ====================================================

export interface upload_upload_data_attributes {
  __typename: "UploadFile";
  url: string;
  formats: any | null;
}

export interface upload_upload_data {
  __typename: "UploadFileEntity";
  id: string | null;
  attributes: upload_upload_data_attributes | null;
}

export interface upload_upload {
  __typename: "UploadFileEntityResponse";
  data: upload_upload_data | null;
}

export interface upload {
  upload: upload_upload;
}

export interface uploadVariables {
  file: any;
}

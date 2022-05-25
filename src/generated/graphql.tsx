import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  contains?: InputMaybe<Scalars['Boolean']>;
  containsi?: InputMaybe<Scalars['Boolean']>;
  endsWith?: InputMaybe<Scalars['Boolean']>;
  eq?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']>;
  notContainsi?: InputMaybe<Scalars['Boolean']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']>;
};

export type CalendarEvent = {
  __typename?: 'CalendarEvent';
  createdAt?: Maybe<Scalars['DateTime']>;
  dateTime: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CalendarEventEntity = {
  __typename?: 'CalendarEventEntity';
  attributes?: Maybe<CalendarEvent>;
  id?: Maybe<Scalars['ID']>;
};

export type CalendarEventEntityResponse = {
  __typename?: 'CalendarEventEntityResponse';
  data?: Maybe<CalendarEventEntity>;
};

export type CalendarEventEntityResponseCollection = {
  __typename?: 'CalendarEventEntityResponseCollection';
  data: Array<CalendarEventEntity>;
  meta: ResponseCollectionMeta;
};

export type CalendarEventFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CalendarEventFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  dateTime?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CalendarEventFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CalendarEventFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CalendarEventInput = {
  dateTime?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Content = {
  __typename?: 'Content';
  content?: Maybe<Scalars['JSON']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  isDeleted: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  section?: Maybe<SectionEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ContentEntity = {
  __typename?: 'ContentEntity';
  attributes?: Maybe<Content>;
  id?: Maybe<Scalars['ID']>;
};

export type ContentEntityResponse = {
  __typename?: 'ContentEntityResponse';
  data?: Maybe<ContentEntity>;
};

export type ContentEntityResponseCollection = {
  __typename?: 'ContentEntityResponseCollection';
  data: Array<ContentEntity>;
  meta: ResponseCollectionMeta;
};

export type ContentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ContentFiltersInput>>>;
  content?: InputMaybe<JsonFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isDeleted?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ContentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ContentFiltersInput>>>;
  order?: InputMaybe<IntFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  section?: InputMaybe<SectionFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ContentInput = {
  content?: InputMaybe<Scalars['JSON']>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  section?: InputMaybe<Scalars['ID']>;
};

export type ContentRelationResponseCollection = {
  __typename?: 'ContentRelationResponseCollection';
  data: Array<ContentEntity>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  contains?: InputMaybe<Scalars['DateTime']>;
  containsi?: InputMaybe<Scalars['DateTime']>;
  endsWith?: InputMaybe<Scalars['DateTime']>;
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  ne?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']>;
  notContainsi?: InputMaybe<Scalars['DateTime']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']>;
};

export type Discipline = {
  __typename?: 'Discipline';
  createdAt?: Maybe<Scalars['DateTime']>;
  grades?: Maybe<GradeRelationResponseCollection>;
  name: Scalars['String'];
  sections?: Maybe<SectionRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type DisciplineGradesArgs = {
  filters?: InputMaybe<GradeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type DisciplineSectionsArgs = {
  filters?: InputMaybe<SectionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type DisciplineEntity = {
  __typename?: 'DisciplineEntity';
  attributes?: Maybe<Discipline>;
  id?: Maybe<Scalars['ID']>;
};

export type DisciplineEntityResponse = {
  __typename?: 'DisciplineEntityResponse';
  data?: Maybe<DisciplineEntity>;
};

export type DisciplineEntityResponseCollection = {
  __typename?: 'DisciplineEntityResponseCollection';
  data: Array<DisciplineEntity>;
  meta: ResponseCollectionMeta;
};

export type DisciplineFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<DisciplineFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  grades?: InputMaybe<GradeFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<DisciplineFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DisciplineFiltersInput>>>;
  sections?: InputMaybe<SectionFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type DisciplineInput = {
  grades?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
  sections?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type DisciplineRelationResponseCollection = {
  __typename?: 'DisciplineRelationResponseCollection';
  data: Array<DisciplineEntity>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  contains?: InputMaybe<Scalars['Float']>;
  containsi?: InputMaybe<Scalars['Float']>;
  endsWith?: InputMaybe<Scalars['Float']>;
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']>;
  notContainsi?: InputMaybe<Scalars['Float']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  startsWith?: InputMaybe<Scalars['Float']>;
};

export type GenericMorph = CalendarEvent | Content | Discipline | Grade | I18NLocale | Mark | Section | UploadFile | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;

export type Grade = {
  __typename?: 'Grade';
  createdAt?: Maybe<Scalars['DateTime']>;
  disciplines?: Maybe<DisciplineRelationResponseCollection>;
  grade?: Maybe<Scalars['Int']>;
  sections?: Maybe<SectionRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type GradeDisciplinesArgs = {
  filters?: InputMaybe<DisciplineFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type GradeSectionsArgs = {
  filters?: InputMaybe<SectionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type GradeEntity = {
  __typename?: 'GradeEntity';
  attributes?: Maybe<Grade>;
  id?: Maybe<Scalars['ID']>;
};

export type GradeEntityResponse = {
  __typename?: 'GradeEntityResponse';
  data?: Maybe<GradeEntity>;
};

export type GradeEntityResponseCollection = {
  __typename?: 'GradeEntityResponseCollection';
  data: Array<GradeEntity>;
  meta: ResponseCollectionMeta;
};

export type GradeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<GradeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  disciplines?: InputMaybe<DisciplineFiltersInput>;
  grade?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<GradeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<GradeFiltersInput>>>;
  sections?: InputMaybe<SectionFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type GradeInput = {
  disciplines?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  grade?: InputMaybe<Scalars['Int']>;
  sections?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type GradeRelationResponseCollection = {
  __typename?: 'GradeRelationResponseCollection';
  data: Array<GradeEntity>;
};

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contains?: InputMaybe<Scalars['ID']>;
  containsi?: InputMaybe<Scalars['ID']>;
  endsWith?: InputMaybe<Scalars['ID']>;
  eq?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  ne?: InputMaybe<Scalars['ID']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']>;
  notContainsi?: InputMaybe<Scalars['ID']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  startsWith?: InputMaybe<Scalars['ID']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  contains?: InputMaybe<Scalars['Int']>;
  containsi?: InputMaybe<Scalars['Int']>;
  endsWith?: InputMaybe<Scalars['Int']>;
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']>;
  notContainsi?: InputMaybe<Scalars['Int']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  startsWith?: InputMaybe<Scalars['Int']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  contains?: InputMaybe<Scalars['JSON']>;
  containsi?: InputMaybe<Scalars['JSON']>;
  endsWith?: InputMaybe<Scalars['JSON']>;
  eq?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  ne?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']>;
  notContainsi?: InputMaybe<Scalars['JSON']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  startsWith?: InputMaybe<Scalars['JSON']>;
};

export type Mark = {
  __typename?: 'Mark';
  comment?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  criterion?: Maybe<Scalars['String']>;
  discipline?: Maybe<DisciplineEntityResponse>;
  grade?: Maybe<GradeEntityResponse>;
  gradeLetter?: Maybe<Scalars['String']>;
  mark: Scalars['Int'];
  schoolyear: Scalars['Int'];
  septima: Scalars['Int'];
  student?: Maybe<UsersPermissionsUserEntityResponse>;
  teacher?: Maybe<UsersPermissionsUserEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MarkEntity = {
  __typename?: 'MarkEntity';
  attributes?: Maybe<Mark>;
  id?: Maybe<Scalars['ID']>;
};

export type MarkEntityResponse = {
  __typename?: 'MarkEntityResponse';
  data?: Maybe<MarkEntity>;
};

export type MarkEntityResponseCollection = {
  __typename?: 'MarkEntityResponseCollection';
  data: Array<MarkEntity>;
  meta: ResponseCollectionMeta;
};

export type MarkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<MarkFiltersInput>>>;
  comment?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  criterion?: InputMaybe<StringFilterInput>;
  discipline?: InputMaybe<DisciplineFiltersInput>;
  grade?: InputMaybe<GradeFiltersInput>;
  gradeLetter?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mark?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<MarkFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<MarkFiltersInput>>>;
  schoolyear?: InputMaybe<IntFilterInput>;
  septima?: InputMaybe<IntFilterInput>;
  student?: InputMaybe<UsersPermissionsUserFiltersInput>;
  teacher?: InputMaybe<UsersPermissionsUserFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MarkInput = {
  comment?: InputMaybe<Scalars['String']>;
  criterion?: InputMaybe<Scalars['String']>;
  discipline?: InputMaybe<Scalars['ID']>;
  grade?: InputMaybe<Scalars['ID']>;
  gradeLetter?: InputMaybe<Scalars['String']>;
  mark?: InputMaybe<Scalars['Int']>;
  schoolyear?: InputMaybe<Scalars['Int']>;
  septima?: InputMaybe<Scalars['Int']>;
  student?: InputMaybe<Scalars['ID']>;
  teacher?: InputMaybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCalendarEvent?: Maybe<CalendarEventEntityResponse>;
  createContent?: Maybe<ContentEntityResponse>;
  createDiscipline?: Maybe<DisciplineEntityResponse>;
  createGrade?: Maybe<GradeEntityResponse>;
  createMark?: Maybe<MarkEntityResponse>;
  createSection?: Maybe<SectionEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteCalendarEvent?: Maybe<CalendarEventEntityResponse>;
  deleteContent?: Maybe<ContentEntityResponse>;
  deleteDiscipline?: Maybe<DisciplineEntityResponse>;
  deleteGrade?: Maybe<GradeEntityResponse>;
  deleteMark?: Maybe<MarkEntityResponse>;
  deleteSection?: Maybe<SectionEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Update an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateCalendarEvent?: Maybe<CalendarEventEntityResponse>;
  updateContent?: Maybe<ContentEntityResponse>;
  updateDiscipline?: Maybe<DisciplineEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateGrade?: Maybe<GradeEntityResponse>;
  updateMark?: Maybe<MarkEntityResponse>;
  updateSection?: Maybe<SectionEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};


export type MutationCreateCalendarEventArgs = {
  data: CalendarEventInput;
};


export type MutationCreateContentArgs = {
  data: ContentInput;
};


export type MutationCreateDisciplineArgs = {
  data: DisciplineInput;
};


export type MutationCreateGradeArgs = {
  data: GradeInput;
};


export type MutationCreateMarkArgs = {
  data: MarkInput;
};


export type MutationCreateSectionArgs = {
  data: SectionInput;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationDeleteCalendarEventArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteContentArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteDisciplineArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteGradeArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMarkArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSectionArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  files: Array<InputMaybe<Scalars['Upload']>>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationUpdateCalendarEventArgs = {
  data: CalendarEventInput;
  id: Scalars['ID'];
};


export type MutationUpdateContentArgs = {
  data: ContentInput;
  id: Scalars['ID'];
};


export type MutationUpdateDisciplineArgs = {
  data: DisciplineInput;
  id: Scalars['ID'];
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdateGradeArgs = {
  data: GradeInput;
  id: Scalars['ID'];
};


export type MutationUpdateMarkArgs = {
  data: MarkInput;
  id: Scalars['ID'];
};


export type MutationUpdateSectionArgs = {
  data: SectionInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID'];
};


export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int'];
  pageCount: Scalars['Int'];
  pageSize: Scalars['Int'];
  total: Scalars['Int'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  calendarEvent?: Maybe<CalendarEventEntityResponse>;
  calendarEvents?: Maybe<CalendarEventEntityResponseCollection>;
  content?: Maybe<ContentEntityResponse>;
  contents?: Maybe<ContentEntityResponseCollection>;
  discipline?: Maybe<DisciplineEntityResponse>;
  disciplines?: Maybe<DisciplineEntityResponseCollection>;
  grade?: Maybe<GradeEntityResponse>;
  grades?: Maybe<GradeEntityResponseCollection>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  mark?: Maybe<MarkEntityResponse>;
  marks?: Maybe<MarkEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  section?: Maybe<SectionEntityResponse>;
  sections?: Maybe<SectionEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type QueryCalendarEventArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryCalendarEventsArgs = {
  filters?: InputMaybe<CalendarEventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryContentArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryContentsArgs = {
  filters?: InputMaybe<ContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryDisciplineArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryDisciplinesArgs = {
  filters?: InputMaybe<DisciplineFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGradeArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryGradesArgs = {
  filters?: InputMaybe<GradeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryMarkArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryMarksArgs = {
  filters?: InputMaybe<MarkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QuerySectionArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QuerySectionsArgs = {
  filters?: InputMaybe<SectionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type Section = {
  __typename?: 'Section';
  children?: Maybe<SectionRelationResponseCollection>;
  contentList?: Maybe<ContentRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  discipline?: Maybe<DisciplineEntityResponse>;
  grade?: Maybe<GradeEntityResponse>;
  isDeleted: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  parent?: Maybe<SectionEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type SectionChildrenArgs = {
  filters?: InputMaybe<SectionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type SectionContentListArgs = {
  filters?: InputMaybe<ContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type SectionEntity = {
  __typename?: 'SectionEntity';
  attributes?: Maybe<Section>;
  id?: Maybe<Scalars['ID']>;
};

export type SectionEntityResponse = {
  __typename?: 'SectionEntityResponse';
  data?: Maybe<SectionEntity>;
};

export type SectionEntityResponseCollection = {
  __typename?: 'SectionEntityResponseCollection';
  data: Array<SectionEntity>;
  meta: ResponseCollectionMeta;
};

export type SectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<SectionFiltersInput>>>;
  children?: InputMaybe<SectionFiltersInput>;
  contentList?: InputMaybe<ContentFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  discipline?: InputMaybe<DisciplineFiltersInput>;
  grade?: InputMaybe<GradeFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  isDeleted?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<SectionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<SectionFiltersInput>>>;
  order?: InputMaybe<IntFilterInput>;
  parent?: InputMaybe<SectionFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type SectionInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contentList?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  discipline?: InputMaybe<Scalars['ID']>;
  grade?: InputMaybe<Scalars['ID']>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  parent?: InputMaybe<Scalars['ID']>;
};

export type SectionRelationResponseCollection = {
  __typename?: 'SectionRelationResponseCollection';
  data: Array<SectionEntity>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains?: InputMaybe<Scalars['String']>;
  containsi?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']>;
  notContainsi?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  ext?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['JSON']>;
  hash?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  mime?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  previewUrl?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_metadata?: InputMaybe<Scalars['JSON']>;
  size?: InputMaybe<Scalars['Float']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Scalars['String'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstname: Scalars['String'];
  grade?: Maybe<GradeEntityResponse>;
  gradeLetter?: Maybe<Scalars['String']>;
  lastname: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  tutors?: Maybe<UsersPermissionsUserRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};


export type UsersPermissionsUserTutorsArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  firstname?: InputMaybe<StringFilterInput>;
  grade?: InputMaybe<GradeFiltersInput>;
  gradeLetter?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  lastname?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  tutors?: InputMaybe<UsersPermissionsUserFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmationToken?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  grade?: InputMaybe<Scalars['ID']>;
  gradeLetter?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ID']>;
  tutors?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  username?: InputMaybe<Scalars['String']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'UsersPermissionsMe', id: string, email?: string | null, username: string, role?: { __typename?: 'UsersPermissionsMeRole', id: string, name: string, description?: string | null } | null } | null };

export type LoginMutationVariables = Exact<{
  input: UsersPermissionsLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UsersPermissionsLoginPayload', jwt?: string | null, user: { __typename?: 'UsersPermissionsMe', id: string, blocked?: boolean | null } } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword?: { __typename?: 'UsersPermissionsPasswordPayload', ok: boolean } | null };

export type ResetPasswordMutationVariables = Exact<{
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword?: { __typename?: 'UsersPermissionsLoginPayload', jwt?: string | null, user: { __typename?: 'UsersPermissionsMe', id: string, blocked?: boolean | null } } | null };

export type GetContentQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetContentQuery = { __typename?: 'Query', content?: { __typename?: 'ContentEntityResponse', data?: { __typename?: 'ContentEntity', id?: string | null, attributes?: { __typename?: 'Content', createdAt?: any | null, name?: string | null, content?: any | null, publishedAt?: any | null } | null } | null } | null };

export type ContentFieldsFragmentFragment = { __typename?: 'ContentRelationResponseCollection', data: Array<{ __typename?: 'ContentEntity', id?: string | null, attributes?: { __typename?: 'Content', name?: string | null, isDeleted: boolean, order?: number | null, createdAt?: any | null, updatedAt?: any | null } | null }> };

export type ContentListFragmentFragment = { __typename?: 'Section', contentList?: { __typename?: 'ContentRelationResponseCollection', data: Array<{ __typename?: 'ContentEntity', id?: string | null, attributes?: { __typename?: 'Content', name?: string | null, isDeleted: boolean, order?: number | null, createdAt?: any | null, updatedAt?: any | null } | null }> } | null };

export type SectionFieldsFragmentFragment = { __typename?: 'Section', name?: string | null, isDeleted: boolean, order?: number | null, createdAt?: any | null, updatedAt?: any | null, contentList?: { __typename?: 'ContentRelationResponseCollection', data: Array<{ __typename?: 'ContentEntity', id?: string | null, attributes?: { __typename?: 'Content', name?: string | null, isDeleted: boolean, order?: number | null, createdAt?: any | null, updatedAt?: any | null } | null }> } | null };

export type GetContentTreeQueryVariables = Exact<{
  publicationState?: InputMaybe<PublicationState>;
  gradeId: Scalars['ID'];
  disciplineId: Scalars['ID'];
}>;


export type GetContentTreeQuery = { __typename?: 'Query', sections?: { __typename?: 'SectionEntityResponseCollection', data: Array<{ __typename?: 'SectionEntity', id?: string | null, attributes?: { __typename?: 'Section', name?: string | null, isDeleted: boolean, order?: number | null, createdAt?: any | null, updatedAt?: any | null, children?: { __typename?: 'SectionRelationResponseCollection', data: Array<{ __typename?: 'SectionEntity', id?: string | null, attributes?: { __typename?: 'Section', name?: string | null, isDeleted: boolean, order?: number | null, createdAt?: any | null, updatedAt?: any | null, children?: { __typename?: 'SectionRelationResponseCollection', data: Array<{ __typename?: 'SectionEntity', id?: string | null, attributes?: { __typename?: 'Section', name?: string | null, isDeleted: boolean, order?: number | null, createdAt?: any | null, updatedAt?: any | null, children?: { __typename?: 'SectionRelationResponseCollection', data: Array<{ __typename?: 'SectionEntity', id?: string | null, attributes?: { __typename?: 'Section', name?: string | null, isDeleted: boolean, order?: number | null, createdAt?: any | null, updatedAt?: any | null, children?: { __typename?: 'SectionRelationResponseCollection', data: Array<{ __typename?: 'SectionEntity', id?: string | null, attributes?: { __typename?: 'Section', name?: string | null, isDeleted: boolean, order?: number | null, createdAt?: any | null, updatedAt?: any | null, contentList?: { __typename?: 'ContentRelationResponseCollection', data: Array<{ __typename?: 'ContentEntity', id?: string | null, attributes?: { __typename?: 'Content', name?: string | null, isDeleted: boolean, order?: number | null, createdAt?: any | null, updatedAt?: any | null } | null }> } | null } | null }> } | null, contentList?: { __typename?: 'ContentRelationResponseCollection', data: Array<{ __typename?: 'ContentEntity', id?: string | null, attributes?: { __typename?: 'Content', name?: string | null, isDeleted: boolean, order?: number | null, createdAt?: any | null, updatedAt?: any | null } | null }> } | null } | null }> } | null, contentList?: { __typename?: 'ContentRelationResponseCollection', data: Array<{ __typename?: 'ContentEntity', id?: string | null, attributes?: { __typename?: 'Content', name?: string | null, isDeleted: boolean, order?: number | null, createdAt?: any | null, updatedAt?: any | null } | null }> } | null } | null }> } | null, contentList?: { __typename?: 'ContentRelationResponseCollection', data: Array<{ __typename?: 'ContentEntity', id?: string | null, attributes?: { __typename?: 'Content', name?: string | null, isDeleted: boolean, order?: number | null, createdAt?: any | null, updatedAt?: any | null } | null }> } | null } | null }> } | null, contentList?: { __typename?: 'ContentRelationResponseCollection', data: Array<{ __typename?: 'ContentEntity', id?: string | null, attributes?: { __typename?: 'Content', name?: string | null, isDeleted: boolean, order?: number | null, createdAt?: any | null, updatedAt?: any | null } | null }> } | null } | null }> } | null };

export type GetDisciplinesGradesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDisciplinesGradesQuery = { __typename?: 'Query', disciplines?: { __typename?: 'DisciplineEntityResponseCollection', data: Array<{ __typename?: 'DisciplineEntity', id?: string | null, attributes?: { __typename?: 'Discipline', name: string, grades?: { __typename?: 'GradeRelationResponseCollection', data: Array<{ __typename?: 'GradeEntity', id?: string | null, attributes?: { __typename?: 'Grade', grade?: number | null } | null }> } | null } | null }> } | null };

export type CreateSectionMutationVariables = Exact<{
  name: Scalars['String'];
  parentId?: InputMaybe<Scalars['ID']>;
  gradeId?: InputMaybe<Scalars['ID']>;
  disciplineId?: InputMaybe<Scalars['ID']>;
  order?: InputMaybe<Scalars['Int']>;
}>;


export type CreateSectionMutation = { __typename?: 'Mutation', createSection?: { __typename?: 'SectionEntityResponse', data?: { __typename?: 'SectionEntity', id?: string | null, attributes?: { __typename?: 'Section', name?: string | null } | null } | null } | null };

export type CreateContentMutationVariables = Exact<{
  name: Scalars['String'];
  content: Scalars['JSON'];
  sectionId?: InputMaybe<Scalars['ID']>;
  order?: InputMaybe<Scalars['Int']>;
}>;


export type CreateContentMutation = { __typename?: 'Mutation', createContent?: { __typename?: 'ContentEntityResponse', data?: { __typename?: 'ContentEntity', id?: string | null, attributes?: { __typename?: 'Content', name?: string | null, content?: any | null } | null } | null } | null };

export type UpdateSectionMutationVariables = Exact<{
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  gradeId?: InputMaybe<Scalars['ID']>;
  disciplineId?: InputMaybe<Scalars['ID']>;
  parentId?: InputMaybe<Scalars['ID']>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  order?: InputMaybe<Scalars['Int']>;
}>;


export type UpdateSectionMutation = { __typename?: 'Mutation', updateSection?: { __typename?: 'SectionEntityResponse', data?: { __typename?: 'SectionEntity', id?: string | null, attributes?: { __typename?: 'Section', name?: string | null } | null } | null } | null };

export type UpdateContentMutationVariables = Exact<{
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['JSON']>;
  sectionId?: InputMaybe<Scalars['ID']>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  order?: InputMaybe<Scalars['Int']>;
}>;


export type UpdateContentMutation = { __typename?: 'Mutation', updateContent?: { __typename?: 'ContentEntityResponse', data?: { __typename?: 'ContentEntity', id?: string | null, attributes?: { __typename?: 'Content', name?: string | null } | null } | null } | null };

export type GetCalendarEventsQueryVariables = Exact<{
  gte: Scalars['DateTime'];
  lte: Scalars['DateTime'];
}>;


export type GetCalendarEventsQuery = { __typename?: 'Query', calendarEvents?: { __typename?: 'CalendarEventEntityResponseCollection', data: Array<{ __typename?: 'CalendarEventEntity', id?: string | null, attributes?: { __typename?: 'CalendarEvent', dateTime: any, name: string, description?: string | null } | null }> } | null };

export type GetMarksQueryVariables = Exact<{
  studentId?: InputMaybe<Scalars['ID']>;
  createdAtBetween?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>> | InputMaybe<Scalars['DateTime']>>;
  mark?: InputMaybe<Array<InputMaybe<Scalars['Int']>> | InputMaybe<Scalars['Int']>>;
  septima?: InputMaybe<Array<InputMaybe<Scalars['Int']>> | InputMaybe<Scalars['Int']>>;
  disciplineId?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type GetMarksQuery = { __typename?: 'Query', marks?: { __typename?: 'MarkEntityResponseCollection', meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', total: number, page: number, pageSize: number, pageCount: number } }, data: Array<{ __typename?: 'MarkEntity', id?: string | null, attributes?: { __typename?: 'Mark', mark: number, schoolyear: number, septima: number, gradeLetter?: string | null, criterion?: string | null, comment?: string | null, discipline?: { __typename?: 'DisciplineEntityResponse', data?: { __typename?: 'DisciplineEntity', id?: string | null, attributes?: { __typename?: 'Discipline', name: string } | null } | null } | null, teacher?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstname: string, lastname: string } | null } | null } | null, grade?: { __typename?: 'GradeEntityResponse', data?: { __typename?: 'GradeEntity', id?: string | null, attributes?: { __typename?: 'Grade', grade?: number | null } | null } | null } | null } | null }> } | null };

export type GetDisciplinesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDisciplinesQuery = { __typename?: 'Query', disciplines?: { __typename?: 'DisciplineEntityResponseCollection', data: Array<{ __typename?: 'DisciplineEntity', id?: string | null, attributes?: { __typename?: 'Discipline', name: string } | null }> } | null };

export const ContentFieldsFragmentFragmentDoc = gql`
    fragment ContentFieldsFragment on ContentRelationResponseCollection {
  data {
    id
    attributes {
      name
      isDeleted
      order
      createdAt
      updatedAt
    }
  }
}
    `;
export const ContentListFragmentFragmentDoc = gql`
    fragment ContentListFragment on Section {
  contentList(
    sort: ["order"]
    pagination: {limit: 1000000000}
    publicationState: $publicationState
  ) {
    ...ContentFieldsFragment
  }
}
    ${ContentFieldsFragmentFragmentDoc}`;
export const SectionFieldsFragmentFragmentDoc = gql`
    fragment SectionFieldsFragment on Section {
  name
  isDeleted
  order
  createdAt
  updatedAt
  ...ContentListFragment
}
    ${ContentListFragmentFragmentDoc}`;
export const GetMeDocument = gql`
    query getMe {
  me {
    id
    email
    username
    role {
      id
      name
      description
    }
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const LoginDocument = gql`
    mutation login($input: UsersPermissionsLoginInput!) {
  login(input: $input) {
    jwt
    user {
      id
      blocked
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($email: String!) {
  forgotPassword(email: $email) {
    ok
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($code: String!, $password: String!, $passwordConfirmation: String!) {
  resetPassword(
    code: $code
    password: $password
    passwordConfirmation: $passwordConfirmation
  ) {
    jwt
    user {
      id
      blocked
    }
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      code: // value for 'code'
 *      password: // value for 'password'
 *      passwordConfirmation: // value for 'passwordConfirmation'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const GetContentDocument = gql`
    query getContent($id: ID!) {
  content(id: $id) {
    data {
      id
      attributes {
        createdAt
        name
        content
        publishedAt
      }
    }
  }
}
    `;

/**
 * __useGetContentQuery__
 *
 * To run a query within a React component, call `useGetContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetContentQuery(baseOptions: Apollo.QueryHookOptions<GetContentQuery, GetContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContentQuery, GetContentQueryVariables>(GetContentDocument, options);
      }
export function useGetContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContentQuery, GetContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContentQuery, GetContentQueryVariables>(GetContentDocument, options);
        }
export type GetContentQueryHookResult = ReturnType<typeof useGetContentQuery>;
export type GetContentLazyQueryHookResult = ReturnType<typeof useGetContentLazyQuery>;
export type GetContentQueryResult = Apollo.QueryResult<GetContentQuery, GetContentQueryVariables>;
export const GetContentTreeDocument = gql`
    query getContentTree($publicationState: PublicationState, $gradeId: ID!, $disciplineId: ID!) {
  sections(
    sort: ["order"]
    filters: {grade: {id: {eq: $gradeId}}, discipline: {id: {eq: $disciplineId}}}
  ) {
    data {
      id
      attributes {
        ...SectionFieldsFragment
        children(sort: ["order"]) {
          data {
            id
            attributes {
              ...SectionFieldsFragment
              children(sort: ["order"]) {
                data {
                  id
                  attributes {
                    ...SectionFieldsFragment
                    children(sort: ["order"]) {
                      data {
                        id
                        attributes {
                          ...SectionFieldsFragment
                          children(sort: ["order"]) {
                            data {
                              id
                              attributes {
                                ...SectionFieldsFragment
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    ${SectionFieldsFragmentFragmentDoc}`;

/**
 * __useGetContentTreeQuery__
 *
 * To run a query within a React component, call `useGetContentTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContentTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContentTreeQuery({
 *   variables: {
 *      publicationState: // value for 'publicationState'
 *      gradeId: // value for 'gradeId'
 *      disciplineId: // value for 'disciplineId'
 *   },
 * });
 */
export function useGetContentTreeQuery(baseOptions: Apollo.QueryHookOptions<GetContentTreeQuery, GetContentTreeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContentTreeQuery, GetContentTreeQueryVariables>(GetContentTreeDocument, options);
      }
export function useGetContentTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContentTreeQuery, GetContentTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContentTreeQuery, GetContentTreeQueryVariables>(GetContentTreeDocument, options);
        }
export type GetContentTreeQueryHookResult = ReturnType<typeof useGetContentTreeQuery>;
export type GetContentTreeLazyQueryHookResult = ReturnType<typeof useGetContentTreeLazyQuery>;
export type GetContentTreeQueryResult = Apollo.QueryResult<GetContentTreeQuery, GetContentTreeQueryVariables>;
export const GetDisciplinesGradesDocument = gql`
    query getDisciplinesGrades {
  disciplines(pagination: {pageSize: 1000}) {
    data {
      id
      attributes {
        name
        grades(pagination: {pageSize: 1000}, sort: ["grade"]) {
          data {
            id
            attributes {
              grade
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetDisciplinesGradesQuery__
 *
 * To run a query within a React component, call `useGetDisciplinesGradesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDisciplinesGradesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDisciplinesGradesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDisciplinesGradesQuery(baseOptions?: Apollo.QueryHookOptions<GetDisciplinesGradesQuery, GetDisciplinesGradesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDisciplinesGradesQuery, GetDisciplinesGradesQueryVariables>(GetDisciplinesGradesDocument, options);
      }
export function useGetDisciplinesGradesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDisciplinesGradesQuery, GetDisciplinesGradesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDisciplinesGradesQuery, GetDisciplinesGradesQueryVariables>(GetDisciplinesGradesDocument, options);
        }
export type GetDisciplinesGradesQueryHookResult = ReturnType<typeof useGetDisciplinesGradesQuery>;
export type GetDisciplinesGradesLazyQueryHookResult = ReturnType<typeof useGetDisciplinesGradesLazyQuery>;
export type GetDisciplinesGradesQueryResult = Apollo.QueryResult<GetDisciplinesGradesQuery, GetDisciplinesGradesQueryVariables>;
export const CreateSectionDocument = gql`
    mutation createSection($name: String!, $parentId: ID, $gradeId: ID, $disciplineId: ID, $order: Int) {
  createSection(
    data: {name: $name, grade: $gradeId, discipline: $disciplineId, parent: $parentId, order: $order}
  ) {
    data {
      id
      attributes {
        name
      }
    }
  }
}
    `;
export type CreateSectionMutationFn = Apollo.MutationFunction<CreateSectionMutation, CreateSectionMutationVariables>;

/**
 * __useCreateSectionMutation__
 *
 * To run a mutation, you first call `useCreateSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSectionMutation, { data, loading, error }] = useCreateSectionMutation({
 *   variables: {
 *      name: // value for 'name'
 *      parentId: // value for 'parentId'
 *      gradeId: // value for 'gradeId'
 *      disciplineId: // value for 'disciplineId'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useCreateSectionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSectionMutation, CreateSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSectionMutation, CreateSectionMutationVariables>(CreateSectionDocument, options);
      }
export type CreateSectionMutationHookResult = ReturnType<typeof useCreateSectionMutation>;
export type CreateSectionMutationResult = Apollo.MutationResult<CreateSectionMutation>;
export type CreateSectionMutationOptions = Apollo.BaseMutationOptions<CreateSectionMutation, CreateSectionMutationVariables>;
export const CreateContentDocument = gql`
    mutation createContent($name: String!, $content: JSON!, $sectionId: ID, $order: Int) {
  createContent(
    data: {name: $name, content: $content, section: $sectionId, order: $order}
  ) {
    data {
      id
      attributes {
        name
        content
      }
    }
  }
}
    `;
export type CreateContentMutationFn = Apollo.MutationFunction<CreateContentMutation, CreateContentMutationVariables>;

/**
 * __useCreateContentMutation__
 *
 * To run a mutation, you first call `useCreateContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContentMutation, { data, loading, error }] = useCreateContentMutation({
 *   variables: {
 *      name: // value for 'name'
 *      content: // value for 'content'
 *      sectionId: // value for 'sectionId'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useCreateContentMutation(baseOptions?: Apollo.MutationHookOptions<CreateContentMutation, CreateContentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateContentMutation, CreateContentMutationVariables>(CreateContentDocument, options);
      }
export type CreateContentMutationHookResult = ReturnType<typeof useCreateContentMutation>;
export type CreateContentMutationResult = Apollo.MutationResult<CreateContentMutation>;
export type CreateContentMutationOptions = Apollo.BaseMutationOptions<CreateContentMutation, CreateContentMutationVariables>;
export const UpdateSectionDocument = gql`
    mutation updateSection($id: ID!, $name: String, $gradeId: ID, $disciplineId: ID, $parentId: ID, $isDeleted: Boolean, $order: Int) {
  updateSection(
    id: $id
    data: {isDeleted: $isDeleted, name: $name, grade: $gradeId, discipline: $disciplineId, parent: $parentId, order: $order}
  ) {
    data {
      id
      attributes {
        name
      }
    }
  }
}
    `;
export type UpdateSectionMutationFn = Apollo.MutationFunction<UpdateSectionMutation, UpdateSectionMutationVariables>;

/**
 * __useUpdateSectionMutation__
 *
 * To run a mutation, you first call `useUpdateSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSectionMutation, { data, loading, error }] = useUpdateSectionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      gradeId: // value for 'gradeId'
 *      disciplineId: // value for 'disciplineId'
 *      parentId: // value for 'parentId'
 *      isDeleted: // value for 'isDeleted'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useUpdateSectionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSectionMutation, UpdateSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSectionMutation, UpdateSectionMutationVariables>(UpdateSectionDocument, options);
      }
export type UpdateSectionMutationHookResult = ReturnType<typeof useUpdateSectionMutation>;
export type UpdateSectionMutationResult = Apollo.MutationResult<UpdateSectionMutation>;
export type UpdateSectionMutationOptions = Apollo.BaseMutationOptions<UpdateSectionMutation, UpdateSectionMutationVariables>;
export const UpdateContentDocument = gql`
    mutation updateContent($id: ID!, $name: String, $content: JSON, $sectionId: ID, $isDeleted: Boolean, $publishedAt: DateTime, $order: Int) {
  updateContent(
    id: $id
    data: {isDeleted: $isDeleted, name: $name, content: $content, section: $sectionId, publishedAt: $publishedAt, order: $order}
  ) {
    data {
      id
      attributes {
        name
      }
    }
  }
}
    `;
export type UpdateContentMutationFn = Apollo.MutationFunction<UpdateContentMutation, UpdateContentMutationVariables>;

/**
 * __useUpdateContentMutation__
 *
 * To run a mutation, you first call `useUpdateContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContentMutation, { data, loading, error }] = useUpdateContentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      content: // value for 'content'
 *      sectionId: // value for 'sectionId'
 *      isDeleted: // value for 'isDeleted'
 *      publishedAt: // value for 'publishedAt'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useUpdateContentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContentMutation, UpdateContentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContentMutation, UpdateContentMutationVariables>(UpdateContentDocument, options);
      }
export type UpdateContentMutationHookResult = ReturnType<typeof useUpdateContentMutation>;
export type UpdateContentMutationResult = Apollo.MutationResult<UpdateContentMutation>;
export type UpdateContentMutationOptions = Apollo.BaseMutationOptions<UpdateContentMutation, UpdateContentMutationVariables>;
export const GetCalendarEventsDocument = gql`
    query getCalendarEvents($gte: DateTime!, $lte: DateTime!) {
  calendarEvents(filters: {dateTime: {gte: $gte, lte: $lte}}) {
    data {
      id
      attributes {
        dateTime
        name
        description
      }
    }
  }
}
    `;

/**
 * __useGetCalendarEventsQuery__
 *
 * To run a query within a React component, call `useGetCalendarEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCalendarEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCalendarEventsQuery({
 *   variables: {
 *      gte: // value for 'gte'
 *      lte: // value for 'lte'
 *   },
 * });
 */
export function useGetCalendarEventsQuery(baseOptions: Apollo.QueryHookOptions<GetCalendarEventsQuery, GetCalendarEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCalendarEventsQuery, GetCalendarEventsQueryVariables>(GetCalendarEventsDocument, options);
      }
export function useGetCalendarEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCalendarEventsQuery, GetCalendarEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCalendarEventsQuery, GetCalendarEventsQueryVariables>(GetCalendarEventsDocument, options);
        }
export type GetCalendarEventsQueryHookResult = ReturnType<typeof useGetCalendarEventsQuery>;
export type GetCalendarEventsLazyQueryHookResult = ReturnType<typeof useGetCalendarEventsLazyQuery>;
export type GetCalendarEventsQueryResult = Apollo.QueryResult<GetCalendarEventsQuery, GetCalendarEventsQueryVariables>;
export const GetMarksDocument = gql`
    query getMarks($studentId: ID, $createdAtBetween: [DateTime], $mark: [Int], $septima: [Int], $disciplineId: [ID], $page: Int, $pageSize: Int, $sort: [String]) {
  marks(
    sort: $sort
    filters: {createdAt: {between: $createdAtBetween}, mark: {in: $mark}, septima: {in: $septima}, student: {id: {eq: $studentId}}, discipline: {id: {in: $disciplineId}}}
    pagination: {page: $page, pageSize: $pageSize}
  ) {
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
    data {
      id
      attributes {
        discipline {
          data {
            id
            attributes {
              name
            }
          }
        }
        teacher {
          data {
            id
            attributes {
              firstname
              lastname
            }
          }
        }
        mark
        schoolyear
        septima
        grade {
          data {
            id
            attributes {
              grade
            }
          }
        }
        gradeLetter
        criterion
        comment
      }
    }
  }
}
    `;

/**
 * __useGetMarksQuery__
 *
 * To run a query within a React component, call `useGetMarksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMarksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMarksQuery({
 *   variables: {
 *      studentId: // value for 'studentId'
 *      createdAtBetween: // value for 'createdAtBetween'
 *      mark: // value for 'mark'
 *      septima: // value for 'septima'
 *      disciplineId: // value for 'disciplineId'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetMarksQuery(baseOptions?: Apollo.QueryHookOptions<GetMarksQuery, GetMarksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMarksQuery, GetMarksQueryVariables>(GetMarksDocument, options);
      }
export function useGetMarksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMarksQuery, GetMarksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMarksQuery, GetMarksQueryVariables>(GetMarksDocument, options);
        }
export type GetMarksQueryHookResult = ReturnType<typeof useGetMarksQuery>;
export type GetMarksLazyQueryHookResult = ReturnType<typeof useGetMarksLazyQuery>;
export type GetMarksQueryResult = Apollo.QueryResult<GetMarksQuery, GetMarksQueryVariables>;
export const GetDisciplinesDocument = gql`
    query getDisciplines {
  disciplines {
    data {
      id
      attributes {
        name
      }
    }
  }
}
    `;

/**
 * __useGetDisciplinesQuery__
 *
 * To run a query within a React component, call `useGetDisciplinesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDisciplinesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDisciplinesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDisciplinesQuery(baseOptions?: Apollo.QueryHookOptions<GetDisciplinesQuery, GetDisciplinesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDisciplinesQuery, GetDisciplinesQueryVariables>(GetDisciplinesDocument, options);
      }
export function useGetDisciplinesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDisciplinesQuery, GetDisciplinesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDisciplinesQuery, GetDisciplinesQueryVariables>(GetDisciplinesDocument, options);
        }
export type GetDisciplinesQueryHookResult = ReturnType<typeof useGetDisciplinesQuery>;
export type GetDisciplinesLazyQueryHookResult = ReturnType<typeof useGetDisciplinesLazyQuery>;
export type GetDisciplinesQueryResult = Apollo.QueryResult<GetDisciplinesQuery, GetDisciplinesQueryVariables>;
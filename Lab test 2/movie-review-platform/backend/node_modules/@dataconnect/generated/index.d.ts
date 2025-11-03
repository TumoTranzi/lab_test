import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddMovieToListData {
  listMovie_insert: ListMovie_Key;
}

export interface AddMovieToListVariables {
  listId: UUIDString;
  movieId: UUIDString;
  note?: string | null;
  position: number;
}

export interface CreateNewListData {
  list_insert: List_Key;
}

export interface CreateNewListVariables {
  name: string;
  description?: string | null;
  public: boolean;
}

export interface DeleteListData {
  list_delete?: List_Key | null;
}

export interface DeleteListVariables {
  id: UUIDString;
}

export interface GetPublicListsData {
  lists: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & List_Key)[];
}

export interface ListMovie_Key {
  listId: UUIDString;
  movieId: UUIDString;
  __typename?: 'ListMovie_Key';
}

export interface List_Key {
  id: UUIDString;
  __typename?: 'List_Key';
}

export interface Movie_Key {
  id: UUIDString;
  __typename?: 'Movie_Key';
}

export interface Review_Key {
  id: UUIDString;
  __typename?: 'Review_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface Watch_Key {
  id: UUIDString;
  __typename?: 'Watch_Key';
}

interface CreateNewListRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewListVariables): MutationRef<CreateNewListData, CreateNewListVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNewListVariables): MutationRef<CreateNewListData, CreateNewListVariables>;
  operationName: string;
}
export const createNewListRef: CreateNewListRef;

export function createNewList(vars: CreateNewListVariables): MutationPromise<CreateNewListData, CreateNewListVariables>;
export function createNewList(dc: DataConnect, vars: CreateNewListVariables): MutationPromise<CreateNewListData, CreateNewListVariables>;

interface GetPublicListsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPublicListsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetPublicListsData, undefined>;
  operationName: string;
}
export const getPublicListsRef: GetPublicListsRef;

export function getPublicLists(): QueryPromise<GetPublicListsData, undefined>;
export function getPublicLists(dc: DataConnect): QueryPromise<GetPublicListsData, undefined>;

interface AddMovieToListRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddMovieToListVariables): MutationRef<AddMovieToListData, AddMovieToListVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddMovieToListVariables): MutationRef<AddMovieToListData, AddMovieToListVariables>;
  operationName: string;
}
export const addMovieToListRef: AddMovieToListRef;

export function addMovieToList(vars: AddMovieToListVariables): MutationPromise<AddMovieToListData, AddMovieToListVariables>;
export function addMovieToList(dc: DataConnect, vars: AddMovieToListVariables): MutationPromise<AddMovieToListData, AddMovieToListVariables>;

interface DeleteListRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteListVariables): MutationRef<DeleteListData, DeleteListVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteListVariables): MutationRef<DeleteListData, DeleteListVariables>;
  operationName: string;
}
export const deleteListRef: DeleteListRef;

export function deleteList(vars: DeleteListVariables): MutationPromise<DeleteListData, DeleteListVariables>;
export function deleteList(dc: DataConnect, vars: DeleteListVariables): MutationPromise<DeleteListData, DeleteListVariables>;


import { CreateNewListData, CreateNewListVariables, GetPublicListsData, AddMovieToListData, AddMovieToListVariables, DeleteListData, DeleteListVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateNewList(options?: useDataConnectMutationOptions<CreateNewListData, FirebaseError, CreateNewListVariables>): UseDataConnectMutationResult<CreateNewListData, CreateNewListVariables>;
export function useCreateNewList(dc: DataConnect, options?: useDataConnectMutationOptions<CreateNewListData, FirebaseError, CreateNewListVariables>): UseDataConnectMutationResult<CreateNewListData, CreateNewListVariables>;

export function useGetPublicLists(options?: useDataConnectQueryOptions<GetPublicListsData>): UseDataConnectQueryResult<GetPublicListsData, undefined>;
export function useGetPublicLists(dc: DataConnect, options?: useDataConnectQueryOptions<GetPublicListsData>): UseDataConnectQueryResult<GetPublicListsData, undefined>;

export function useAddMovieToList(options?: useDataConnectMutationOptions<AddMovieToListData, FirebaseError, AddMovieToListVariables>): UseDataConnectMutationResult<AddMovieToListData, AddMovieToListVariables>;
export function useAddMovieToList(dc: DataConnect, options?: useDataConnectMutationOptions<AddMovieToListData, FirebaseError, AddMovieToListVariables>): UseDataConnectMutationResult<AddMovieToListData, AddMovieToListVariables>;

export function useDeleteList(options?: useDataConnectMutationOptions<DeleteListData, FirebaseError, DeleteListVariables>): UseDataConnectMutationResult<DeleteListData, DeleteListVariables>;
export function useDeleteList(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteListData, FirebaseError, DeleteListVariables>): UseDataConnectMutationResult<DeleteListData, DeleteListVariables>;

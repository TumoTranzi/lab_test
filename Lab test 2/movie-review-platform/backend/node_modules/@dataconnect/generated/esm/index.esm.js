import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'labtest2',
  location: 'us-west1'
};

export const createNewListRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewList', inputVars);
}
createNewListRef.operationName = 'CreateNewList';

export function createNewList(dcOrVars, vars) {
  return executeMutation(createNewListRef(dcOrVars, vars));
}

export const getPublicListsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPublicLists');
}
getPublicListsRef.operationName = 'GetPublicLists';

export function getPublicLists(dc) {
  return executeQuery(getPublicListsRef(dc));
}

export const addMovieToListRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddMovieToList', inputVars);
}
addMovieToListRef.operationName = 'AddMovieToList';

export function addMovieToList(dcOrVars, vars) {
  return executeMutation(addMovieToListRef(dcOrVars, vars));
}

export const deleteListRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteList', inputVars);
}
deleteListRef.operationName = 'DeleteList';

export function deleteList(dcOrVars, vars) {
  return executeMutation(deleteListRef(dcOrVars, vars));
}


const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'labtest2',
  location: 'us-west1'
};
exports.connectorConfig = connectorConfig;

const createNewListRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewList', inputVars);
}
createNewListRef.operationName = 'CreateNewList';
exports.createNewListRef = createNewListRef;

exports.createNewList = function createNewList(dcOrVars, vars) {
  return executeMutation(createNewListRef(dcOrVars, vars));
};

const getPublicListsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPublicLists');
}
getPublicListsRef.operationName = 'GetPublicLists';
exports.getPublicListsRef = getPublicListsRef;

exports.getPublicLists = function getPublicLists(dc) {
  return executeQuery(getPublicListsRef(dc));
};

const addMovieToListRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddMovieToList', inputVars);
}
addMovieToListRef.operationName = 'AddMovieToList';
exports.addMovieToListRef = addMovieToListRef;

exports.addMovieToList = function addMovieToList(dcOrVars, vars) {
  return executeMutation(addMovieToListRef(dcOrVars, vars));
};

const deleteListRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteList', inputVars);
}
deleteListRef.operationName = 'DeleteList';
exports.deleteListRef = deleteListRef;

exports.deleteList = function deleteList(dcOrVars, vars) {
  return executeMutation(deleteListRef(dcOrVars, vars));
};

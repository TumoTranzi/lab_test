# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createNewList, getPublicLists, addMovieToList, deleteList } from '@dataconnect/generated';


// Operation CreateNewList:  For variables, look at type CreateNewListVars in ../index.d.ts
const { data } = await CreateNewList(dataConnect, createNewListVars);

// Operation GetPublicLists: 
const { data } = await GetPublicLists(dataConnect);

// Operation AddMovieToList:  For variables, look at type AddMovieToListVars in ../index.d.ts
const { data } = await AddMovieToList(dataConnect, addMovieToListVars);

// Operation DeleteList:  For variables, look at type DeleteListVars in ../index.d.ts
const { data } = await DeleteList(dataConnect, deleteListVars);


```
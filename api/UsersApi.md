# .UsersApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authUserUsersAuthPost**](UsersApi.md#authUserUsersAuthPost) | **POST** /users/auth | Auth User
[**createUserUsersPost**](UsersApi.md#createUserUsersPost) | **POST** /users | Create User
[**deleteUserUsersIdDelete**](UsersApi.md#deleteUserUsersIdDelete) | **DELETE** /users/{id} | Delete User
[**getMeUsersMeGet**](UsersApi.md#getMeUsersMeGet) | **GET** /users/me | Get Me
[**getUserByIdUsersIdGet**](UsersApi.md#getUserByIdUsersIdGet) | **GET** /users/{id} | Get User By Id
[**listUsersUsersGet**](UsersApi.md#listUsersUsersGet) | **GET** /users | List Users
[**updateUserUsersIdPatch**](UsersApi.md#updateUserUsersIdPatch) | **PATCH** /users/{id} | Update User


# **authUserUsersAuthPost**
> UserJWT authUserUsersAuthPost(UserAuth)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .UsersApi(configuration);

let body:.UsersApiAuthUserUsersAuthPostRequest = {
  // UserAuth
  UserAuth: {
    login: "login_example",
    password: "password_example",
  },
};

apiInstance.authUserUsersAuthPost(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **UserAuth** | **UserAuth**|  |


### Return type

**UserJWT**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **createUserUsersPost**
> User createUserUsersPost(CreateUser)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .UsersApi(configuration);

let body:.UsersApiCreateUserUsersPostRequest = {
  // CreateUser
  CreateUser: {
    name: "name_example",
    comment: "comment_example",
    login: "login_example",
    password: "password_example",
  },
};

apiInstance.createUserUsersPost(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **CreateUser** | **CreateUser**|  |


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteUserUsersIdDelete**
> User deleteUserUsersIdDelete()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .UsersApi(configuration);

let body:.UsersApiDeleteUserUsersIdDeleteRequest = {
  // number
  id: 1,
  // string (optional)
  user_jwt: "user-jwt_example",
};

apiInstance.deleteUserUsersIdDelete(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] |  | defaults to undefined
 **user_jwt** | [**string**] |  | (optional) defaults to undefined


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getMeUsersMeGet**
> User getMeUsersMeGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .UsersApi(configuration);

let body:.UsersApiGetMeUsersMeGetRequest = {
  // string (optional)
  user_jwt: "user-jwt_example",
};

apiInstance.getMeUsersMeGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user_jwt** | [**string**] |  | (optional) defaults to undefined


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getUserByIdUsersIdGet**
> User getUserByIdUsersIdGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .UsersApi(configuration);

let body:.UsersApiGetUserByIdUsersIdGetRequest = {
  // number
  id: 1,
  // string (optional)
  user_jwt: "user-jwt_example",
};

apiInstance.getUserByIdUsersIdGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] |  | defaults to undefined
 **user_jwt** | [**string**] |  | (optional) defaults to undefined


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **listUsersUsersGet**
> Array<User> listUsersUsersGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .UsersApi(configuration);

let body:.UsersApiListUsersUsersGetRequest = {
  // string (optional)
  user_jwt: "user-jwt_example",
};

apiInstance.listUsersUsersGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user_jwt** | [**string**] |  | (optional) defaults to undefined


### Return type

**Array<User>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **updateUserUsersIdPatch**
> User updateUserUsersIdPatch(UpdateUser)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .UsersApi(configuration);

let body:.UsersApiUpdateUserUsersIdPatchRequest = {
  // number
  id: 1,
  // UpdateUser
  UpdateUser: {
    name: "name_example",
    comment: "comment_example",
    login: "login_example",
    password: "password_example",
  },
  // string (optional)
  user_jwt: "user-jwt_example",
};

apiInstance.updateUserUsersIdPatch(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **UpdateUser** | **UpdateUser**|  |
 **id** | [**number**] |  | defaults to undefined
 **user_jwt** | [**string**] |  | (optional) defaults to undefined


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)



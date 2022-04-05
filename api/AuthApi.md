# .AuthApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authUserUsersAuthPost**](AuthApi.md#authUserUsersAuthPost) | **POST** /users/auth | Auth User


# **authUserUsersAuthPost**
> UserJWT authUserUsersAuthPost(UserAuth)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .AuthApi(configuration);

let body:.AuthApiAuthUserUsersAuthPostRequest = {
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



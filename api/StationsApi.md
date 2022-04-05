# .StationsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createStationStationsPost**](StationsApi.md#createStationStationsPost) | **POST** /stations | Create Station
[**deleteStationStationsIdDelete**](StationsApi.md#deleteStationStationsIdDelete) | **DELETE** /stations/{id} | Delete Station
[**getStationByIdStationsIdGet**](StationsApi.md#getStationByIdStationsIdGet) | **GET** /stations/{id} | Get Station By Id
[**listStationsStationsGet**](StationsApi.md#listStationsStationsGet) | **GET** /stations | List Stations
[**updateStationStationsIdPatch**](StationsApi.md#updateStationStationsIdPatch) | **PATCH** /stations/{id} | Update Station


# **createStationStationsPost**
> Station createStationStationsPost(CreateStation)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .StationsApi(configuration);

let body:.StationsApiCreateStationStationsPostRequest = {
  // CreateStation
  CreateStation: {
    name: "name_example",
    comment: "comment_example",
  },
  // string (optional)
  user_jwt: "user-jwt_example",
};

apiInstance.createStationStationsPost(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **CreateStation** | **CreateStation**|  |
 **user_jwt** | [**string**] |  | (optional) defaults to undefined


### Return type

**Station**

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

# **deleteStationStationsIdDelete**
> Station deleteStationStationsIdDelete()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .StationsApi(configuration);

let body:.StationsApiDeleteStationStationsIdDeleteRequest = {
  // number
  id: 1,
  // string (optional)
  user_jwt: "user-jwt_example",
};

apiInstance.deleteStationStationsIdDelete(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] |  | defaults to undefined
 **user_jwt** | [**string**] |  | (optional) defaults to undefined


### Return type

**Station**

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

# **getStationByIdStationsIdGet**
> Station getStationByIdStationsIdGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .StationsApi(configuration);

let body:.StationsApiGetStationByIdStationsIdGetRequest = {
  // number
  id: 1,
  // string (optional)
  user_jwt: "user-jwt_example",
};

apiInstance.getStationByIdStationsIdGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] |  | defaults to undefined
 **user_jwt** | [**string**] |  | (optional) defaults to undefined


### Return type

**Station**

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

# **listStationsStationsGet**
> Array<Station> listStationsStationsGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .StationsApi(configuration);

let body:.StationsApiListStationsStationsGetRequest = {
  // string (optional)
  user_jwt: "user-jwt_example",
};

apiInstance.listStationsStationsGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user_jwt** | [**string**] |  | (optional) defaults to undefined


### Return type

**Array<Station>**

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

# **updateStationStationsIdPatch**
> Station updateStationStationsIdPatch(UpdateStation)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .StationsApi(configuration);

let body:.StationsApiUpdateStationStationsIdPatchRequest = {
  // number
  id: 1,
  // UpdateStation
  UpdateStation: {
    name: "name_example",
    comment: "comment_example",
  },
  // string (optional)
  user_jwt: "user-jwt_example",
};

apiInstance.updateStationStationsIdPatch(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **UpdateStation** | **UpdateStation**|  |
 **id** | [**number**] |  | defaults to undefined
 **user_jwt** | [**string**] |  | (optional) defaults to undefined


### Return type

**Station**

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



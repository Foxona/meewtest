import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'

import { CreateStation } from '../models/CreateStation';
import { CreateUser } from '../models/CreateUser';
import { HTTPValidationError } from '../models/HTTPValidationError';
import { Station } from '../models/Station';
import { UpdateStation } from '../models/UpdateStation';
import { UpdateUser } from '../models/UpdateUser';
import { User } from '../models/User';
import { UserAuth } from '../models/UserAuth';
import { UserJWT } from '../models/UserJWT';
import { ValidationError } from '../models/ValidationError';

import { ObservableAuthApi } from "./ObservableAPI";
import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";

export interface AuthApiAuthUserUsersAuthPostRequest {
    /**
     * 
     * @type UserAuth
     * @memberof AuthApiauthUserUsersAuthPost
     */
    UserAuth: UserAuth
}

export class ObjectAuthApi {
    private api: ObservableAuthApi

    public constructor(configuration: Configuration, requestFactory?: AuthApiRequestFactory, responseProcessor?: AuthApiResponseProcessor) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Auth User
     * @param param the request object
     */
    public authUserUsersAuthPost(param: AuthApiAuthUserUsersAuthPostRequest, options?: Configuration): Promise<UserJWT> {
        return this.api.authUserUsersAuthPost(param.UserAuth,  options).toPromise();
    }

}

import { ObservableStationsApi } from "./ObservableAPI";
import { StationsApiRequestFactory, StationsApiResponseProcessor} from "../apis/StationsApi";

export interface StationsApiCreateStationStationsPostRequest {
    /**
     * 
     * @type CreateStation
     * @memberof StationsApicreateStationStationsPost
     */
    CreateStation: CreateStation
    /**
     * 
     * @type string
     * @memberof StationsApicreateStationStationsPost
     */
    user_jwt?: string
}

export interface StationsApiDeleteStationStationsIdDeleteRequest {
    /**
     * 
     * @type number
     * @memberof StationsApideleteStationStationsIdDelete
     */
    id: number
    /**
     * 
     * @type string
     * @memberof StationsApideleteStationStationsIdDelete
     */
    user_jwt?: string
}

export interface StationsApiGetStationByIdStationsIdGetRequest {
    /**
     * 
     * @type number
     * @memberof StationsApigetStationByIdStationsIdGet
     */
    id: number
    /**
     * 
     * @type string
     * @memberof StationsApigetStationByIdStationsIdGet
     */
    user_jwt?: string
}

export interface StationsApiListStationsStationsGetRequest {
    /**
     * 
     * @type string
     * @memberof StationsApilistStationsStationsGet
     */
    user_jwt?: string
}

export interface StationsApiUpdateStationStationsIdPatchRequest {
    /**
     * 
     * @type number
     * @memberof StationsApiupdateStationStationsIdPatch
     */
    id: number
    /**
     * 
     * @type UpdateStation
     * @memberof StationsApiupdateStationStationsIdPatch
     */
    UpdateStation: UpdateStation
    /**
     * 
     * @type string
     * @memberof StationsApiupdateStationStationsIdPatch
     */
    user_jwt?: string
}

export class ObjectStationsApi {
    private api: ObservableStationsApi

    public constructor(configuration: Configuration, requestFactory?: StationsApiRequestFactory, responseProcessor?: StationsApiResponseProcessor) {
        this.api = new ObservableStationsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Station
     * @param param the request object
     */
    public createStationStationsPost(param: StationsApiCreateStationStationsPostRequest, options?: Configuration): Promise<Station> {
        return this.api.createStationStationsPost(param.CreateStation, param.user_jwt,  options).toPromise();
    }

    /**
     * Delete Station
     * @param param the request object
     */
    public deleteStationStationsIdDelete(param: StationsApiDeleteStationStationsIdDeleteRequest, options?: Configuration): Promise<Station> {
        return this.api.deleteStationStationsIdDelete(param.id, param.user_jwt,  options).toPromise();
    }

    /**
     * Get Station By Id
     * @param param the request object
     */
    public getStationByIdStationsIdGet(param: StationsApiGetStationByIdStationsIdGetRequest, options?: Configuration): Promise<Station> {
        return this.api.getStationByIdStationsIdGet(param.id, param.user_jwt,  options).toPromise();
    }

    /**
     * List Stations
     * @param param the request object
     */
    public listStationsStationsGet(param: StationsApiListStationsStationsGetRequest = {}, options?: Configuration): Promise<Array<Station>> {
        return this.api.listStationsStationsGet(param.user_jwt,  options).toPromise();
    }

    /**
     * Update Station
     * @param param the request object
     */
    public updateStationStationsIdPatch(param: StationsApiUpdateStationStationsIdPatchRequest, options?: Configuration): Promise<Station> {
        return this.api.updateStationStationsIdPatch(param.id, param.UpdateStation, param.user_jwt,  options).toPromise();
    }

}

import { ObservableUsersApi } from "./ObservableAPI";
import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";

export interface UsersApiAuthUserUsersAuthPostRequest {
    /**
     * 
     * @type UserAuth
     * @memberof UsersApiauthUserUsersAuthPost
     */
    UserAuth: UserAuth
}

export interface UsersApiCreateUserUsersPostRequest {
    /**
     * 
     * @type CreateUser
     * @memberof UsersApicreateUserUsersPost
     */
    CreateUser: CreateUser
}

export interface UsersApiDeleteUserUsersIdDeleteRequest {
    /**
     * 
     * @type number
     * @memberof UsersApideleteUserUsersIdDelete
     */
    id: number
    /**
     * 
     * @type string
     * @memberof UsersApideleteUserUsersIdDelete
     */
    user_jwt?: string
}

export interface UsersApiGetMeUsersMeGetRequest {
    /**
     * 
     * @type string
     * @memberof UsersApigetMeUsersMeGet
     */
    user_jwt?: string
}

export interface UsersApiGetUserByIdUsersIdGetRequest {
    /**
     * 
     * @type number
     * @memberof UsersApigetUserByIdUsersIdGet
     */
    id: number
    /**
     * 
     * @type string
     * @memberof UsersApigetUserByIdUsersIdGet
     */
    user_jwt?: string
}

export interface UsersApiListUsersUsersGetRequest {
    /**
     * 
     * @type string
     * @memberof UsersApilistUsersUsersGet
     */
    user_jwt?: string
}

export interface UsersApiUpdateUserUsersIdPatchRequest {
    /**
     * 
     * @type number
     * @memberof UsersApiupdateUserUsersIdPatch
     */
    id: number
    /**
     * 
     * @type UpdateUser
     * @memberof UsersApiupdateUserUsersIdPatch
     */
    UpdateUser: UpdateUser
    /**
     * 
     * @type string
     * @memberof UsersApiupdateUserUsersIdPatch
     */
    user_jwt?: string
}

export class ObjectUsersApi {
    private api: ObservableUsersApi

    public constructor(configuration: Configuration, requestFactory?: UsersApiRequestFactory, responseProcessor?: UsersApiResponseProcessor) {
        this.api = new ObservableUsersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Auth User
     * @param param the request object
     */
    public authUserUsersAuthPost(param: UsersApiAuthUserUsersAuthPostRequest, options?: Configuration): Promise<UserJWT> {
        return this.api.authUserUsersAuthPost(param.UserAuth,  options).toPromise();
    }

    /**
     * Create User
     * @param param the request object
     */
    public createUserUsersPost(param: UsersApiCreateUserUsersPostRequest, options?: Configuration): Promise<User> {
        return this.api.createUserUsersPost(param.CreateUser,  options).toPromise();
    }

    /**
     * Delete User
     * @param param the request object
     */
    public deleteUserUsersIdDelete(param: UsersApiDeleteUserUsersIdDeleteRequest, options?: Configuration): Promise<User> {
        return this.api.deleteUserUsersIdDelete(param.id, param.user_jwt,  options).toPromise();
    }

    /**
     * Get Me
     * @param param the request object
     */
    public getMeUsersMeGet(param: UsersApiGetMeUsersMeGetRequest = {}, options?: Configuration): Promise<User> {
        return this.api.getMeUsersMeGet(param.user_jwt,  options).toPromise();
    }

    /**
     * Get User By Id
     * @param param the request object
     */
    public getUserByIdUsersIdGet(param: UsersApiGetUserByIdUsersIdGetRequest, options?: Configuration): Promise<User> {
        return this.api.getUserByIdUsersIdGet(param.id, param.user_jwt,  options).toPromise();
    }

    /**
     * List Users
     * @param param the request object
     */
    public listUsersUsersGet(param: UsersApiListUsersUsersGetRequest = {}, options?: Configuration): Promise<Array<User>> {
        return this.api.listUsersUsersGet(param.user_jwt,  options).toPromise();
    }

    /**
     * Update User
     * @param param the request object
     */
    public updateUserUsersIdPatch(param: UsersApiUpdateUserUsersIdPatchRequest, options?: Configuration): Promise<User> {
        return this.api.updateUserUsersIdPatch(param.id, param.UpdateUser, param.user_jwt,  options).toPromise();
    }

}

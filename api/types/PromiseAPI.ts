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
import { ObservableAuthApi } from './ObservableAPI';

import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";
export class PromiseAuthApi {
    private api: ObservableAuthApi

    public constructor(
        configuration: Configuration,
        requestFactory?: AuthApiRequestFactory,
        responseProcessor?: AuthApiResponseProcessor
    ) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Auth User
     * @param UserAuth 
     */
    public authUserUsersAuthPost(UserAuth: UserAuth, _options?: Configuration): Promise<UserJWT> {
        const result = this.api.authUserUsersAuthPost(UserAuth, _options);
        return result.toPromise();
    }


}



import { ObservableStationsApi } from './ObservableAPI';

import { StationsApiRequestFactory, StationsApiResponseProcessor} from "../apis/StationsApi";
export class PromiseStationsApi {
    private api: ObservableStationsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: StationsApiRequestFactory,
        responseProcessor?: StationsApiResponseProcessor
    ) {
        this.api = new ObservableStationsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Station
     * @param CreateStation 
     * @param user_jwt 
     */
    public createStationStationsPost(CreateStation: CreateStation, user_jwt?: string, _options?: Configuration): Promise<Station> {
        const result = this.api.createStationStationsPost(CreateStation, user_jwt, _options);
        return result.toPromise();
    }

    /**
     * Delete Station
     * @param id 
     * @param user_jwt 
     */
    public deleteStationStationsIdDelete(id: number, user_jwt?: string, _options?: Configuration): Promise<Station> {
        const result = this.api.deleteStationStationsIdDelete(id, user_jwt, _options);
        return result.toPromise();
    }

    /**
     * Get Station By Id
     * @param id 
     * @param user_jwt 
     */
    public getStationByIdStationsIdGet(id: number, user_jwt?: string, _options?: Configuration): Promise<Station> {
        const result = this.api.getStationByIdStationsIdGet(id, user_jwt, _options);
        return result.toPromise();
    }

    /**
     * List Stations
     * @param user_jwt 
     */
    public listStationsStationsGet(user_jwt?: string, _options?: Configuration): Promise<Array<Station>> {
        const result = this.api.listStationsStationsGet(user_jwt, _options);
        return result.toPromise();
    }

    /**
     * Update Station
     * @param id 
     * @param UpdateStation 
     * @param user_jwt 
     */
    public updateStationStationsIdPatch(id: number, UpdateStation: UpdateStation, user_jwt?: string, _options?: Configuration): Promise<Station> {
        const result = this.api.updateStationStationsIdPatch(id, UpdateStation, user_jwt, _options);
        return result.toPromise();
    }


}



import { ObservableUsersApi } from './ObservableAPI';

import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";
export class PromiseUsersApi {
    private api: ObservableUsersApi

    public constructor(
        configuration: Configuration,
        requestFactory?: UsersApiRequestFactory,
        responseProcessor?: UsersApiResponseProcessor
    ) {
        this.api = new ObservableUsersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Auth User
     * @param UserAuth 
     */
    public authUserUsersAuthPost(UserAuth: UserAuth, _options?: Configuration): Promise<UserJWT> {
        const result = this.api.authUserUsersAuthPost(UserAuth, _options);
        return result.toPromise();
    }

    /**
     * Create User
     * @param CreateUser 
     */
    public createUserUsersPost(CreateUser: CreateUser, _options?: Configuration): Promise<User> {
        const result = this.api.createUserUsersPost(CreateUser, _options);
        return result.toPromise();
    }

    /**
     * Delete User
     * @param id 
     * @param user_jwt 
     */
    public deleteUserUsersIdDelete(id: number, user_jwt?: string, _options?: Configuration): Promise<User> {
        const result = this.api.deleteUserUsersIdDelete(id, user_jwt, _options);
        return result.toPromise();
    }

    /**
     * Get Me
     * @param user_jwt 
     */
    public getMeUsersMeGet(user_jwt?: string, _options?: Configuration): Promise<User> {
        const result = this.api.getMeUsersMeGet(user_jwt, _options);
        return result.toPromise();
    }

    /**
     * Get User By Id
     * @param id 
     * @param user_jwt 
     */
    public getUserByIdUsersIdGet(id: number, user_jwt?: string, _options?: Configuration): Promise<User> {
        const result = this.api.getUserByIdUsersIdGet(id, user_jwt, _options);
        return result.toPromise();
    }

    /**
     * List Users
     * @param user_jwt 
     */
    public listUsersUsersGet(user_jwt?: string, _options?: Configuration): Promise<Array<User>> {
        const result = this.api.listUsersUsersGet(user_jwt, _options);
        return result.toPromise();
    }

    /**
     * Update User
     * @param id 
     * @param UpdateUser 
     * @param user_jwt 
     */
    public updateUserUsersIdPatch(id: number, UpdateUser: UpdateUser, user_jwt?: string, _options?: Configuration): Promise<User> {
        const result = this.api.updateUserUsersIdPatch(id, UpdateUser, user_jwt, _options);
        return result.toPromise();
    }


}




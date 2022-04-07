import { paths, components } from "./schema";
import useSWR from 'swr'
import { Fetcher, Middleware, ApiResponse } from "openapi-typescript-fetch"

const clientSide = (typeof window !== 'undefined')

const patchHeader: Middleware = async (url, init, next) => {
    const token = clientSide ? localStorage.getItem('token') : null
    const response = await next(url, !token ? init : { ...init, headers: { ...init.headers, "user-jwt": token, "content-type": "application/json" } } as any)
    return response
}

const fetcher = Fetcher.for<paths>()

// global configuration
fetcher.configure({
    baseUrl: "https://ryikku.meew.me",
    use: [patchHeader]
})


// create fetch operations
export const ListUsers = fetcher.path("/users").method("get").create()
export const Login = fetcher.path("/users/auth").method("post").create()
export const GetMe = fetcher.path("/users/me").method("get").create()
export const GetStation = fetcher.path("/stations/{id}").method("get").create()
export const GetUser = fetcher.path("/users/{id}").method("get").create()
export const DelStation = fetcher.path("/stations/{id}").method("delete").create()
export const DelUser = fetcher.path("/users/{id}").method("delete").create()
type CreateStationArg = components['schemas']['CreateStation'] // type hack
export const CreateStation = (arg: CreateStationArg, init?: RequestInit) => fetcher.path("/stations").method("post").create()(arg as any, init)
export const CreateUser = fetcher.path("/users").method("post").create()
export const UpdateStation = fetcher.path("/stations/{id}").method("patch").create()
export const UpdateUser = fetcher.path("/users/{id}").method("patch").create()
export const ListStations = fetcher.path("/stations").method("get").create()


export type CreateStationType = GetParams<typeof CreateStation>;
export type CreateUserType = GetParams<typeof CreateUser>;
export type LoginType = GetParams<typeof Login>;

export type ApiFunc<D> = (..._: any) => Promise<ApiResponse<D>>
export type GetDataType<F> = F extends ApiFunc<infer D> ? D : never
export type GetParams<F extends ApiFunc<any>> = Parameters<F>[0]

export function useFetcher<F extends ApiFunc<D>, D = GetDataType<F>>(fn: F, param: Parameters<F>[0] | false) {
    return useSWR(param && [fn, param], () => fn(param).then(d => d.data))
}
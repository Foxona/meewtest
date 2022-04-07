import { paths, components } from "./schema";
import useSWR from 'swr'
import { Fetcher, Middleware, ApiResponse , TypedFetch} from "openapi-typescript-fetch"


// type hack to override the body type
function wb<F extends (...x: any) => any, S extends keyof components['schemas']>(fetchFn: F, opSchema: S) {
    return fetchFn as any as (arg: components['schemas'][typeof opSchema], init?: RequestInit) => ReturnType<F>
}

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
// export const CreateStation = fetcher.path("/stations").method("post").create()
export const CreateStation = wb(fetcher.path("/stations").method("post").create(), 'CreateStation')
export const CreateUser = fetcher.path("/users").method("post").create()
export const UpdateStation = fetcher.path("/stations/{id}").method("patch").create()
export const UpdateUser = fetcher.path("/users/{id}").method("patch").create()
export const ListStations = fetcher.path("/stations").method("get").create()


type ApiFunc<D> = (..._: any) => Promise<ApiResponse<D>>
type GetDataType<F> = F extends ApiFunc<infer D> ? D : never

export function useFetcher<F extends ApiFunc<D>, D = GetDataType<F>>(fn: F, ...params: Parameters<F>) {
    return useSWR([fn, params], (request, init) => fn(...params).then(d => d.data))
}
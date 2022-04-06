
import { stringify } from 'query-string';

export default function dataProviderCreate(apiUrl, httpClient) {
    return {
        getList: (resource, params) => {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
                filter: JSON.stringify(params.filter),
            };
            const url = `${apiUrl}/${resource}?${stringify(query)}`;

            return httpClient(url).then(({ json }) => ({
                data: Array.isArray(json) ? json.sort((a, b) => (a?.id - b?.id) || 0) : json,
                total: parseInt(Array.isArray(json) ? json.length : 0, 10),
            }));
        },

        getOne: (resource, params) =>
            httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
                data: json,
            })),

        getMany: (resource, params) => {
            const query = {
                filter: JSON.stringify({ id: params.ids }),
            };
            const url = `${apiUrl}/${resource}?${stringify(query)}`;
            return httpClient(url).then(({ json }) => ({ data: json }));
        },

        getManyReference: (resource, params) => {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
                filter: JSON.stringify({
                    ...params.filter,
                    [params.target]: params.id,
                }),
            }; // TODO: doesnt work
            const url = `${apiUrl}/${resource}?${stringify(query)}`;

            return httpClient(url).then(({ json }) => ({
                data: Array.isArray(json) ? json.sort((a, b) => (a?.id - b?.id) || 0) : json,
                total: parseInt(Array.isArray(json) ? json.length : 0, 10),
            }));
        },

        update: (resource, params) =>
            httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'PATCH',
                body: JSON.stringify(params.data),
            }).then(({ json }) => ({ data: json })),

        updateMany: (resource, params) => {
            const proms = params.ids.map((id) => {
                return httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(params.data),
                }).then(({ json }) => (json));
            })
            return Promise.all(proms).then(d => ({ data: d }))
        },

        create: (resource, params) =>
            httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: JSON.stringify(params.data),
            }).then(({ json }) => ({
                data: { ...params.data, id: json.id },
            })),

        delete: (resource, params) =>
            httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'DELETE',
            }).then(({ json }) => ({ data: json })),

        deleteMany: (resource, params) => {
            const proms = params.ids.map((id) => {
                return httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'DELETE',
                }).then(({ json }) => (json));
            })
            return Promise.all(proms).then(d => ({ data: d }))
        }
    }
};
import envVars from "./env-vars";

export type HttpMethod = "GET" | "HEAD" | "POST" | "DELETE" | "PUT" | "PATCH";
export type ResponseType = "Json" | "Text" | "Blob" | "ArrayBuffer";

export type RequestOptions = {
    token?: string;
    method?: HttpMethod;
    contentType?: string;
    headers?: HeadersInit;
    responseType?: ResponseType;
    queryParams?: Record<string, any>;
    body?: Record<string, any> | FormData;
}

function buildFetchHeaders({token, contentType}: Pick<RequestOptions, "token" | "contentType">): Headers {
    const headers = new Headers();

    if (contentType) {
        headers.append('Content-Type', contentType)
    }

    if (token) {
        headers.append('Authorization', token)
    }

    return headers
}

function buildUrl(url: string, queryParams?: Record<string, any>): string {
    const fullUrl = new URL(url, envVars.REACT_APP_API_URL);

    if (queryParams) {
        Object.entries(queryParams).forEach(([key, value]) => {
            fullUrl.searchParams.append(key, String(value));
        })
    }

    return fullUrl.toString()
}

function buildFetchOptions(body: object | FormData, options?: RequestOptions): RequestInit {
    const {
        token,
        method = "GET",
        contentType,
        headers,
    } = options || {};

    const fetchOptions: RequestInit = {
        method,
        headers: {
            ...buildFetchHeaders({token, contentType}),
            ...(headers ?? {}),
        },
    };

    if (body) {
        fetchOptions.body = body instanceof FormData
            ? body
            : JSON.stringify(body)
    }

    return fetchOptions
}

async function fetchData(url: string, options?: RequestOptions) {
    const {
        responseType = 'Text',
        queryParams,
        body
    } = options || {};

    const response = await fetch(
        buildUrl(url, queryParams),
        buildFetchOptions(body, options)
    );

    if (response.ok) {
        switch (responseType) {
            case 'Json':
                return await response.json()
            case 'Text':
                return await response.text()
            case 'Blob':
                return await response.blob()
            case 'ArrayBuffer':
                return await response.arrayBuffer()
        }
    } else {
        const errorMessage = await response.text();
        throw Error(errorMessage)
    }
}

const buildQuerystring = (properties: Record<string, any>) => '?' + Object.entries(properties).map(([key, value]) => `${key}=${encodeURI(value)}`).join('&');

function buildFormData(formData: Record<string, any>): FormData {
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value)
    })

    return data
}

export {
    fetchData,
    buildQuerystring,
    buildFormData,
    buildUrl,
    buildFetchHeaders,
    buildFetchOptions,
}

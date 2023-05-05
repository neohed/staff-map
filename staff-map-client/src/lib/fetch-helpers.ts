import envVars from "./env-vars";

export type HttpMethod = "GET" | "HEAD" | "POST" | "DELETE" | "PUT" | "PATCH";
export type ResponseType = "Json" | "Text" | "Blob" | "ArrayBuffer";
type ValueType = string | number | boolean | null | undefined;
export type BodyType = Record<string, ValueType> | FormData;

export type RequestOptions = {
    token?: string;
    method?: HttpMethod;
    contentType?: string;
    headers?: Record<string, string>;
    responseType?: ResponseType;
    queryParams?: Record<string, ValueType>;
    body?: BodyType;
}

function buildFetchHeaders({token, contentType}: Pick<RequestOptions, "token" | "contentType">, headers?: Record<string, string>): Headers {
    const res = new Headers();

    if (contentType) {
        res.append('Content-Type', contentType)
    }

    if (token) {
        res.append('Authorization', token)
    }

    if (headers) {
        for (const [key, value] of Object.entries(headers)) {
            res.append(key, value)
        }
    }

    return res
}

function buildUrl(url: string, queryParams?: Record<string, ValueType>): string {
    const fullUrl = new URL(url, envVars.REACT_APP_API_URL);

    if (queryParams) {
        Object.entries(queryParams).forEach(([key, value]) => {
            fullUrl.searchParams.append(key, String(value));
        })
    }

    return fullUrl.toString()
}

function buildFetchOptions(body: BodyType, options?: RequestOptions): RequestInit {
    const {
        token,
        method = "GET",
        contentType,
        headers,
    } = options || {};

    const fetchOptions: RequestInit = {
        method,
        headers: buildFetchHeaders({token, contentType}, headers)
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
        responseType = 'Json',
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

const buildQuerystring = (properties: Record<string, string>) => '?' + Object.entries(properties).map(([key, value]) => `${key}=${encodeURI(value)}`).join('&');

function buildFormData(formData: Record<string, ValueType>): FormData {
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
        data.append(key, String(value))
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

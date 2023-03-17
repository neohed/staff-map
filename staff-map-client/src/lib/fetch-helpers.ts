function getFetchHeaders({token, setContentType, contentType}: {token: string, setContentType: boolean, contentType: string}) {
    const headers = new Headers();

    if (contentType) {
        headers.append('Content-Type', contentType)
    } else if (setContentType) {
        headers.append('Content-Type', 'application/json')
    }

    if (token) {
        headers.append('Authorization', token)
    }

    return headers
}

function createFormDataObject(formData: object) {
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value)
    })

    return data
}

const getUrl = (url: string) => new URL(url, process.env.REACT_APP_API).toString();

const getQuerystring = (properties: object) => '?' + Object.entries(properties).map(([key, value]) => `${key}=${encodeURI(value)}`).join('&');

type FetchOptionParams = {
    token: string;
    method: string;
    contentType: string;
    isPost?: boolean;
    stringify?: boolean;
    setContentType?: boolean;
}

function getFetchOptions(postData: object, options: FetchOptionParams): RequestInit {
    const hasPostData = !!postData;
    const isFormData = hasPostData && postData instanceof FormData;

    const {
        token,
        method,
        contentType,
        isPost = false,
        stringify = !isFormData, // Don't stringify FormData objects.
        setContentType = !isFormData, // FormData contentType gets auto detected.
    } = options;

    const fetchOptions: RequestInit = {
        method: method ?? ((isPost || hasPostData) ? 'POST' : 'GET'),
        headers: getFetchHeaders({token, setContentType, contentType}),
    };

    if (postData) {
        fetchOptions.body = stringify
            ? JSON.stringify(postData) as BodyInit
            : postData as BodyInit;
    }

    return fetchOptions
}

async function doFetch(url: string, postData: object, options: FetchOptionParams) {
    const response = await fetch(
        getUrl(url),
        getFetchOptions(postData, options)
    );

    if (response.ok) {
        return await response.json();
    } else {
        const errorMessage = await response.text();

        throw new Error(errorMessage)
    }
}

export {
    getUrl,
    getFetchOptions,
    doFetch,
    getQuerystring,
    createFormDataObject,
}

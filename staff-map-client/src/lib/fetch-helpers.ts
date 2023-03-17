function getFetchHeaders(token, setContentType) {
    const headers = new Headers();

    if (setContentType) {
        headers.append('Content-Type', 'application/json');
    }

    if (token) {
        headers.append('Authorization', token);
    }

    return headers
}

function createFormDataObject(formData) {
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value)
    })

    return data
}

const getUrl = url => new URL(url, process.env.REACT_APP_API).toString();

const getQuerystring = properties => '?' + Object.entries(properties).map(([key, value]) => `${key}=${encodeURI(value)}`).join('&');

function getFetchOptions(postData, options = {}) {
    const hasPostData = !!postData;
    const isFormData = hasPostData && postData instanceof FormData;

    const {
        token,
        contentType,
        isPost = false,
        stringify = !isFormData, // Don't stringify FormData objects.
        setContentType = !isFormData, // FormData contentType gets auto detected.
    } = options;

    const fetchOptions = {
        method: (isPost || hasPostData) ? 'POST' : 'GET',
        headers: getFetchHeaders(token, setContentType, contentType)
    };

    if (postData) {
        fetchOptions.body = stringify
            ? JSON.stringify(postData)
            : postData;
    }

    return fetchOptions
}

async function doFetch(url, postData, options, success, fail) {
    const response = await fetch(getUrl(url), getFetchOptions(postData, options));

    if (!response.ok) {
        return fail()
    }

    const data = await response.json();
    return success(data)
}

export {
    getUrl,
    getFetchOptions,
    doFetch,
    getQuerystring,
    createFormDataObject,
}
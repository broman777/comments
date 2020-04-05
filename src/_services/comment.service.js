import config from 'config';

export const commentService = {
    get,
    write
};

function get() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${config.apiUrl}/comments`, requestOptions)
        .then(handleResponse)
        .then(list => {
            return list.comments;
        });
}

function write(text) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(text)
    };

    return fetch(`${config.apiUrl}/write`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
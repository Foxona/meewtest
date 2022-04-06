
// in src/authProvider.js
const authProvider = {
    login: ({ username, password }) =>  {
        const request = new Request('https://ryikku.meew.me/users/auth', {

            method: 'POST',
            body: JSON.stringify({ login: username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(auth => {
                console.log(auth)
                localStorage.setItem('token', auth?.user_jwt);
            })
            .catch(() => {
                throw new Error('Network error')
            });
    },
    checkAuth: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            return Promise.reject({ redirectTo: '/unauthorized', logoutUser: false });
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    getPermissions: () => {
        // Required for the authentication to work
        return Promise.resolve();
    },
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    }
};

export default authProvider;

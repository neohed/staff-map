import {getUrl, getFetchOptions} from "../../../lib/fetch-helpers";

const authProvider = {
    async login(username: string, password: string) {
        const response = await fetch(
            getUrl('auth/login'),
            getFetchOptions({username, password})
        );

        if (response.ok) {
            const data = await response.json();

            if (data) {
                const {token, user} = data;

                if (token && user?.username !== '') {
                    const {id, name, username} = user;

                    return {
                        id,
                        name,
                        username,
                        token,
                        isAuthenticated: true,
                    }
                }
            }
        }

        const data = await response.json();
        const {message} = data;
        return Promise.reject(message)
    },
}

export default authProvider
/*
const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};
 */
/**
 * This represents some generic auth provider API, like Firebase.
 */
const loginAuthProvider = {
    isAuthenticated: false,
    signin(callback: VoidFunction) {
        loginAuthProvider.isAuthenticated = true;
        callback();
    },
    signout(callback: VoidFunction) {
        loginAuthProvider.isAuthenticated = false;
        setTimeout(callback, 100);
    },
};

export { loginAuthProvider };
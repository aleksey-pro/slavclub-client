export const getToken = () => window.localStorage.getItem('auth-token');
export const setToken = value => window.localStorage.setItem('auth-token', value);
export const isToken = () => !!window.localStorage.getItem('auth-token');
export const removeToken = () => window.localStorage.setItem('auth-token', '');

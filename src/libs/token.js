export const getToken = () => window.localStorage.getItem('auth-token');
export const setToken = value => window.localStorage.setItem('auth-token', value);
export const isToken = () => !!window.localStorage.getItem('auth-token');
export const removeToken = () => window.localStorage.setItem('auth-token', '');

export const getId = () => window.localStorage.getItem('user-id');
export const setId = value => window.localStorage.setItem('user-id', value);
export const isId = () => !!window.localStorage.getItem('user-id');
export const removeId = () => window.localStorage.setItem('user-id', '');

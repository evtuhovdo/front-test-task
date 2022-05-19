// INDEX
export const INDEX = '/';

// EVENTS
export const EVENTS = '/events';

// MODULES
export const MODULES = '/modules';
export const MODULE = '/modules/:id';
export const makeModuleUrl = (id: string) => `/modules/${id}`;

// MARKS
export const MARKS = '/marks';

// AUTH
export const LOGIN = '/login';
export const ABOUT = '/about';
export const LOGOUT = '/logout';
export const FORGET_PASSWORD = '/forget_password';
export const RESET_PASSWORD = '/reset_password';

// 404
export const NOT_FOUND = '/404';


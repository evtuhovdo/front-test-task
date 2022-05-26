// INDEX
export const INDEX = '/';

// EVENTS
export const EVENTS = '/events';

// CONTENT_TREE
export const CONTENT_TREE = '/content';
export const CONTENT = '/content/:id';
export const makeContentUrl = (id: string) => `/content/${id}`;

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


// INDEX
export const INDEX = '/';

// EVENTS
export const EVENTS = '/events';

// MATERIALS
export const MATERIALS = '/materials';
export const MATERIAL = '/materials/:id';
export const makeMaterialUrl = (id: string) => `/materials/${id}`;

// AUTH
export const LOGIN = '/login';
export const ABOUT = '/about';
export const LOGOUT = '/logout';
export const FORGET_PASSWORD = '/forget_password';
export const RESET_PASSWORD = '/reset_password';

// 404
export const NOT_FOUND = '/404';


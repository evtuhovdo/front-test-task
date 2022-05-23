export const getApiBase = () => process.env.REACT_APP_API_BASE || '';
export const getMaxUploadSize = () => Number(process.env.REACT_APP_MAX_UPLOAD_SIZE) || 1073741824;

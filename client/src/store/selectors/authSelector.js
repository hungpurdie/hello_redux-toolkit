export const getAuth = (state) => state?.auth;
export const getAuthenticated = (state) => state?.auth?.isAuthenticated;
export const getAuthError = (state) => state?.auth?.error;
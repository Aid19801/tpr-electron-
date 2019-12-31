export const saveToCache = (key, val) => {
  if (typeof val === 'object') {
    return localStorage.setItem(key, JSON.stringify(val))
  }
  return localStorage.setItem(key, val);
};

export const getFromCache = key => {
  const val = localStorage.getItem(key);
  return val;
};

export const clearFromCache = key => {
    return localStorage.removeItem(key);
};

// export const setAuthUser = authUser => {
//   if (process.browser) {
//     localStorage.setItem('authUser', authUser);
//   }
//   return;
// };

// export const getAuthUser = () => {
//   if (process.browser) {
//     const val = localStorage.getItem('authUser');
//     return val;
//   }
// };

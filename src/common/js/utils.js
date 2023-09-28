export const setLocal = (key, value) => {
  localStorage.setItem(key, value);
};

export const removeLocal = (key) => {
  localStorage.removeItem(key);
};

export const getLocal = (key) => {
  return localStorage.getItem(key);
};

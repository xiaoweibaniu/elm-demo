/*
 获取localStorage存储信息
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

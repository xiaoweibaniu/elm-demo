/**
 * 获取localStorage存储信息
 * @param name
 * @returns {string}
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

/**
 * 设置locaStorage存储信息
 * @param name
 * @param content
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 删除localStorage存储信息
 * @param name
 */
export const removeStore = name =>{
  if(!name) return;
  window.localStorage.removeItem(name);
};
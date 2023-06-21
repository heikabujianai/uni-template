import pak from "../../package.json";

/**
 * 获取缓存key值
 * @param key
 * @return {string}
 */
export function formatStorageKey(key) {
  let formatKey = key;
  // #ifdef H5
  formatKey = import.meta.env.VITE_APP_ENV === "development" ? `${pak.name}_${import.meta.env.VITE_APP_ENV}_${formatKey}` : formatKey;
  // #endif
  return formatKey;
}

/**
 * 获取缓存data值
 * @param data
 * @param options
 * @returns {*&{data}}
 */
export function formatStorageData(data, options) {
  return {data, ...options, xsbCustom: true};
}

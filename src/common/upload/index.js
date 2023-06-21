import {formatUrl} from "@/utils";
import {
  BASE_URL,
  CONSOLE_DETAIL,
  ERROR_MESSAGE,
  EXTRA_DATA,
  EXTRA_HEADER,
  FAILED_MESSAGE,
  FAL_FILED,
  MESSAGE_FILED,
  RESULT_FILED,
  SUCCESS_FILED,
  SUCCESS_VALUE
} from "@/config/request";
import {showLoading, hideLoading, showToast} from "@/common/request/requestToast";

export function useUpload(baseUrl = BASE_URL) {
  const config = {
    baseUrl: baseUrl,
    successValue: SUCCESS_VALUE,
    successFiled: SUCCESS_FILED,
    falFiled: FAL_FILED,
    messageFiled: MESSAGE_FILED,
    resultFiled: RESULT_FILED,
    failedMessage: FAILED_MESSAGE,
    errorMessage: ERROR_MESSAGE,
    consoleDetail: CONSOLE_DETAIL,
    loadingTitle: "加载中...", // loading显示时的文案
    header: {},
  };

  const extraConfig = {
    extraData: EXTRA_DATA,
    extraHeader: EXTRA_HEADER,
  };

  function setUploadConfig(option) {
    Object.assign(config, option.config);
    Object.assign(extraConfig, option.extraConfig);
  }

  function uploadResponsesHandler(res, resolve, reject) {
    console.log("\n文件上传原始出参=>", res.data);
    if (res.statusCode === 200) {
      let result;
      try {
        result = JSON.parse(res.data);
      } catch (e) {
        result = res.data || {};
      }
      console.log("\n文件上传出参序列化结果=>", result);
      if (result[config.successFiled] === config.successValue) {
        hideLoading();
        resolve(typeof result === "object" ? result[config.successFiled] : result);
      } else {
        showToast({
          title: result[config.messageFiled] || config.errorMessage || "上传失败",
        });
        reject(result);
      }
    } else {
      showToast({
        title: config.errorMessage || "服务器繁忙，请稍后重新上传！",
      });
      reject(null);
    }
  }

  function uploadHandler(url, options) {
    const fileList = [];
    if (typeof options.filePath === "string") {
      fileList.push(options.filePath);
    }
    if (Array.isArray(options.filePath)) {
      fileList.push(...options.filePath);
    }
    if (!fileList.length) return Promise.reject("请输入文件地址");
    const uploadList = fileList.map((value) => {
      return new Promise((resolve, reject) => {
        showLoading({
          title: config.loadingTitle || "上传中...",
        });
        uni.uploadFile({
          url: formatUrl(url, baseUrl),
          filePath: value,
          name: options.name,
          formData: Object.assign({}, extraConfig.extraData(), options.header),
          header: Object.assign({}, extraConfig.extraHeader(), options.header),
          success: (res) => {
            uploadResponsesHandler(res, resolve, reject);
          },
          fail: (err) => {
            showToast({
              title: config.failedMessage || "上传失败，请稍后重试！",
            });
            reject(err.errMsg);
          },
        });
      });
    });
    return Promise.all(uploadList);
  }

  return {
    setUploadConfig,
    uploadHandler,
  };
}

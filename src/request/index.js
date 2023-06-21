// 实例化request对象
import {useRequest} from "@/common/request";
import {useUpload} from "@/common/upload";
import {EXTRA_DATA, EXTRA_HEADER, FAL_FILED} from "@/config/request";

const {requestHandler, setRequestConfig} = useRequest();
const {uploadHandler, setUploadConfig} = useUpload();

setRequestConfig({
  extraConfig: {
    extraData: EXTRA_DATA,
    extraHeader: EXTRA_HEADER,
  },
  config: {
    errCodeList: ["错误码"], // 特殊code码处理
  },
  interceptor: {
    response: ((options) => {
      console.log("responseInterceptor=>", options);
      /**
       * errCode 中存在的会在这边出现  需要立即处理
       */
      if (options[FAL_FILED] === "错误码") {
        uni.showToast({
          title: options.message,
          icon: "none",
        });
        return Promise.resolve(options);
      }
    }),
  },
});

setUploadConfig({
  extraConfig: {
    extraData: EXTRA_DATA,
    extraHeader: EXTRA_HEADER,
  },
});

export const request = requestHandler;

// 抛出upload对象
export const upload = uploadHandler;

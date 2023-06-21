import {appInfoStore} from "@/store/app";
import {DEFAULT_TOAST_DURATION} from "@/config";

const appInfo = appInfoStore();

let loadingTimes = 0;

let loadingTimesInter = null;

/**
 * showLoading
 * @param option
 */
export function showLoading(option) {
  clearTimeout(loadingTimesInter);
  if (!loadingTimes) {
    uni.showLoading({
      title: option.title,
      mask: true,
      success() {
        appInfo.setIsShow(true);
      },
    });
  }
  ++loadingTimes;
}

/**
 * hideLoading
 */
export function hideLoading() {
  loadingTimes > 0 && --loadingTimes;
  if (!loadingTimes) {
    loadingTimesInter = setTimeout(() => {
      console.log("关闭loading");
      uni.hideLoading();
      uni.stopPullDownRefresh();
      appInfo.setIsShow(false);
    }, 50);
  }
}

/**
 * showToast
 * @param option
 */
export function showToast(option) {
  loadingTimes > 0 && --loadingTimes;
  if (!loadingTimes) {
    loadingTimesInter = setTimeout(() => {
      uni.hideLoading();
      if (option.title.length > 18) {
        uni.showModal({
          title: "提示",
          content: option.title,
          showCancel: false,
        });
      } else {
        uni.showToast({
          icon: "none",
          title: option.title,
          mask: true,
          duration: option.duration || DEFAULT_TOAST_DURATION,
        });
      }
      appInfo.setIsShow(false);
    }, 50);

  }
}

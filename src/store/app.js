import {defineStore} from "pinia";

export const appInfoStore = defineStore("appInfo", {
  state: () =>({
    isConnected: true,
    isShow: false,
    showTabBar: true,
    wxAPPID: uni.getAccountInfoSync().miniProgram.appId,
  }),
  getters: {
    getConnectedStatus: (state) => state.isConnected,
    getShowStatus: (state) => state.isShow,
    getShowTabBar: (state) => state.showTabBar,
  },
  actions: {
    setIsConnected(status) {
      this.isConnected = status;
    },
    setIsShow(status) {
      this.isShow = status;
    },
    setShowTabBar(status) {
      this.showTabBar = status;
    },
  },
});

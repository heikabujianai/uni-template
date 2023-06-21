import {defineStore} from "pinia";

const state = {
  isConnected: true,
  isShow: false,
  showTabBar: true,
};

export const appInfoStore = defineStore("appInfo", {
  state: () => {
    return state;
  },
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

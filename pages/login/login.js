// pages/login/login.js
Page({
  wechatLogin() {

  },
  doubanLogin() {

  },
  openAgreement () {
    wx.navigateTo({
      url: '/pages/agreement/agreement',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });

  }
})
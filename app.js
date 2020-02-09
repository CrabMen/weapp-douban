//app.js
App({
  onLaunch: function () {
    //微信toast封装
    wx.cm = {}
    wx.cm.url = (url) => {
      return `https://douban-api.uieee.com/${url}`
    }
    this.initToast()

    const info = wx.getSystemInfoSync();
    wx.cm.statusBarHeight = info.statusBarHeight
    if (info.platform == 'android') {
      wx.cm.navBarHeight = 48
    } else {
      wx.cm.navBarHeight = 44
    }


  },

  initToast() {
    let commonToast = (title, type, druction = 1500) => {
      let options = {
        title: title,
        duration: druction,
        mask: false,
        icon: 'none'
      }

      if (type == 1) {
        options.icon = 'success'
      } else if (type == 2) {
        options.image = '/assets/imgs/upsdk_cancel_normal.png'
      }
      wx.showToast(options);
    }

    wx.cm.toast = (title, type, druction) => {
      commonToast(title, 0, druction)
    }

    wx.cm.toastSuccess = (title, druction) => {
      commonToast(title, 1, druction)
    }

    wx.cm.toastError = (title, druction) => {
      commonToast(title, 2, druction)

    }







    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
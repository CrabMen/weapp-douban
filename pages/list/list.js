// pages/list/list.js
Page({

  data: {
    movies: [],
    title: ''
  },

  onLoad: function (options) {
    this.setData({ title: options.title })
    wx.getStorage({
      key: options.title,
      success: (result) => {
        console.log(result)
        this.data.movies = result.data
        this.setData(this.data)
      },
    });
  },

  backTap: function (evt){
   console.log('返会的回调以及参数',evt.detail)
  },

  homeTap() {
    console.log('home点击的回调以及参数',evt.detail)
  }

})
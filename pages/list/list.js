// pages/list/list.js
Page({

  data: {
    movies: []
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title,
    });
    wx.getStorage({
      key: options.title,
      success: (result) => {
        console.log(result)
        this.data.movies = result.data
        this.setData(this.data)
      },
    });
  },


})
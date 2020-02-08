// cmps/movie-item/movie-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movie: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    detail: function() {
      wx.navigateTo({
        //参数序列化
        url: `/pages/detail/detail?movie=${JSON.stringify(this.data.movie)}`,
      });

    }
  }
})

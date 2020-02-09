// cmps/nav-bar/nav-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    titleColor: {
      type: String,
      value: '#000000'
    },
    statusBarColor: {
      type: String,
      value: '#fff'
    },
    navBarColor: {
      type: String,
      value: '#fff'
    },
    back: {
      type: String,
      value: false
    },
    home: {
      type: String,
      value: false
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    // statusBarStyle:'',
    // navBarStyle:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back: function () {
      wx.navigateBack();
      this.triggerEvent('backTap',{params:'backTap的回调参数'})
    },

    home: function () {
      wx.navigateBack({
        delta: 999
      });
      this.triggerEvent('homeTap',{params:'homeTap的回调参数'})
    }

  },

  lifetimes: {
    attached: function () {
      const statusBarStyle = `
      height:${wx.cm.statusBarHeight}px;
      background-color:${this.data.statusBarColor}; 
      `
      const navBarStyle = `
      height:${ wx.cm.navBarHeight}px;
      background-color:${this.data.navBarColor};
      color:${this.data.titleColor};
      `



      this.setData({
        statusBarStyle,
        navBarStyle
      })

    }
  }



})

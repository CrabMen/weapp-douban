// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadCity(this.loadData)
  },


  loadData(city) {
    wx.request({
      url: 'https://douban-api.uieee.com/v2/movie/in_theaters',
      data: {
        city: city
      },
      dataType: 'json',
      header: { 'content-type': 'json' },
      success: (result) => {

        let movies = result.data.subjects
        for (let index = 0; index < movies.length; index++) {
          this.updateMovies(movies[index])
        }

        this.setData({
          movies: movies
        })
        console.log(movies)
      },
      fail: () => {
        console.log('最热的数据请求失败')
      },
      complete: () => { }
    });
  },

  loadCity(citySuccess) {
    wx.getLocation({
      type: 'wgs84',
      altitude: false,
      success: (result) => {
        console.log(`当前的经纬度${result.latitude},${result.longitude}`)

        wx.request({
          url: 'https://api.map.baidu.com/reverse_geocoding/v3/',
          data: {
            ak: 'gKOWMANmlhTaec1SX2mgmM4h7OZP3xRK',
            output: 'json',
            coordtype: 'wgs84',
            location: `${result.latitude},${result.longitude}`,

          },
          dataType: 'json',
          success: (result) => {
            console.log(result)
            let { city } = result.data.result.addressComponent
            city = city.substring(0, city.length - 1)
            citySuccess && citySuccess(city)
          },
          fail: () => {
            wx.cm.toast('获取地理位置失败~~')
          },
          complete: () => { }
        });


      },
      fail: () => { },
      complete: () => { }
    });
  },

  updateMovies(movie) {
    let stars = parseInt(movie.rating.stars)
    if (stars == 0)  return
    // movie.stars = [1, 1, 1, 0.5, 0]
    movie.stars = {}
    movie.stars.on = parseInt(stars / 10)
    movie.stars.half = stars % 10 > 0 ? 1 : 0
    movie.stars.off = parseInt((50 - stars) / 10)
  }

})
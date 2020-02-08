// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    allMovies: [
      {
        title: '影院热映',
        url: 'v2/movie/in_theaters',
        movies: [],
      },
      {
        title: '新片榜',
        url: 'v2/movie/new_movies',
        movies: [],
      },
      {
        title: '口碑榜',
        url: 'v2/movie/weekly',
        movies: [],
      },
      {
        title: '口碑榜',
        url: 'v2/movie/us_box',
        movies: [],
      },
      {
        title: 'Top250',
        url: 'v2/movie/top250',
        movies: [],
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.loadLocalData()

    // this.loadCity(city => {
    //   this.loadNewData(0, { city: city })
    // })
    // this.loadNewData(1)
    // this.loadNewData(2)
    // this.loadNewData(3)
    // this.loadNewData(4)
  },

  loadLocalData() {
    for (let index = 0; index < this.data.allMovies.length; index++) {
      let obj = this.data.allMovies[index]
      obj.movies = wx.getStorageSync(obj.title);
    }
    this.setData(this.data)
  },

  loadNewData(idx, params) {

    wx.request({
      url: wx.cm.url(this.data.allMovies[idx].url),
      data: params,
      dataType: 'json',
      header: { 'content-type': 'json' },
      success: (result) => {
        console.log(result)
        let obj = this.data.allMovies[idx]
        const movies = result.data.subjects
        obj.movies = []
        for (let index = 0; index < movies.length; index++) {
          let movie = movies[index].subject || movies[index]
          this.updateMovies(movie)
          obj.movies.push(movie)
        }
        this.setData(this.data)
        //将movies数组保存到本地
      
        wx.setStorages({
          key: obj.title,
          data: obj.movies,
        });
      },
      fail: () => {
        // console.log('电影数据请求失败')
        wx.cm.toast(`获取${this.data.allMovies[idx].title}失败`)
      },
      complete: () => { }
    });

  },

  loadData(city) {
    wx.request({
      url: wx.cm.url('v2/movie/in_theaters'),
      data: {
        city: city
      },
      dataType: 'json',
      header: { 'content-type': 'json' },
      success: (result) => {

        let movies = result.data.subjects.length ? result.data.subjects : []
        for (let index = 0; index < movies.length; index++) {
          this.updateMovies(movies[index])
        }
        this.data.allMovies[0].movies = movies;
        this.setData(this.data)
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
    if (stars == 0) return
    // movie.stars = [1, 1, 1, 0.5, 0]
    movie.stars = {}
    movie.stars.on = parseInt(stars / 10)
    movie.stars.half = stars % 10 > 0 ? 1 : 0
    movie.stars.off = parseInt((50 - stars) / 10)
  },

  viewMore(evt) {
    const index = evt.currentTarget.dataset.index
    const obj = this.data.allMovies[index]
    wx.navigateTo({
      url: `/pages/list/list?title=${obj.title}&url=${obj.url}`,
    });
  }

})
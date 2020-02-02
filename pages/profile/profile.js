// pages/profile/profile.js
Page({
  data:{
    items:[
      {
        icon:'ic_cat_movie.png',
        title:'观影分析',
        count:0,
        has:'看过',
        mark:'标记10部影片\n开启观影模式',
      },
      {
        icon:'ic_cat_book.png',
        title:'读书分析',
        count:0,
        has:'读过',
        mark:'标记10本片\n开启读书分析',
      },
      {
        icon:'ic_cat_music.png',
        title:'音乐分析',
        count:0,
        has:'听过',
        mark:'标记10部唱片\n开启音乐分析',
      },
    ]
  },

  begin (event){
    const idx = event.currentTarget.dataset.index;

    if (idx == 0) {
      console.log('观影分析')
    } else if (idx == 1) {
      console.log('读书分析')
    } else if (idx == 2) {
      console.log('音乐分析')
    }
  }

})
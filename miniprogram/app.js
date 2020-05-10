//app.js
App({
  onLaunch: function (e) {
  
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  console.log("是否是新用户");
   // console.log(this.onGetOpenid());
   // console.log(e.scene);

   this.onGetOpenid(e);
  //  if(false){
  //    if (e.scene == 1007 || e.scene == 1008) {
  //      // 其他用户邀请进入的
  //      let id = e.query.id;
  //      // 需要为邀请的用户次数加1次
  //      wx.cloud.callFunction({
  //        name: 'addTimes',
  //        data: {
  //          invite_userOpenid: e.query.id
  //        },
  //        success: res => {
  //        }
  //      })
  //    }
  //  }
    // 在这需要判断是否是新用户
    this.globalData = {}
  },
  onGetOpenid: function (e) {
    // console.log("11111111$");
    // console.log(e);
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        getApp().globalData.openid = res.result.openid;
        // 需要在这儿来判断该用户是够是已经有的用户，如果没有则新建用户
        const db = wx.cloud.database();
        db.collection("bdy_user").where({
          _openid: res.result.openid
        }).get({
          success: function (res) {
            console.log("判断在bdy_user中是否存在该用户");
            console.log(res.data);
            console.log(res.data.length);
            if (res.data.length == 0) {
              console.log("新建用户");
              // 需要新建用户
              db.collection('bdy_user').add({
                data: {
                  times: 0,
                  createtime: new Date(),
                  status: true
                }
              })
                .then(res => {
                  console.log(res);
                  // 将返回的user_id缓存到本地
                  wx.setStorage({
                    key: 'user_id',
                    data: res._id,
                  }),
                  wx.setStorage({
                    key: 'times',
                    data: 0,
                  })
                    wx.setStorage({
                      key: 'user',
                      data: res,
                    })
                })
              if (e.scene == 1007 || e.scene == 1008) {
                // 其他用户邀请进入的
                let id = e.query.id;
                // 需要为邀请的用户次数加1次
                
                wx.cloud.callFunction({
                  name: 'addTimes',
                  data: {
                    invite_userOpenid: e.query.id
                  },
                  success: res => {
                  }
                })
              }
            } else {
              console.log("老用户");
             // getApp().globalData.vip = res.data[0].vip;
              wx.setStorage({
                key: 'user_id',
                data: res.data[0]._id,
              });
              wx.setStorage({
                key: 'user',
                data: res.data[0],
              });
              return 0;
            }
          }
        })

      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  globalData: {
    ColorList: [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '森绿',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '姹紫',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '木槿',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '桃粉',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '棕褐',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '玄灰',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '草灰',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '墨黑',
      name: 'black',
      color: '#333333'
    },
    {
      title: '雅白',
      name: 'white',
      color: '#ffffff'
    },
    ]
  }
})

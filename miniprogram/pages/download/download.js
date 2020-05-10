// pages/download/download.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 提交下载信息
   */
  submitDownInfo:function(e){
    const db = wx.cloud.database();
    // 在提交之前需要判断当前的用户次数是否还可以再提交免费下载
    db.collection('bdy_user').get({
      success:function(res){
        if(res.data[0].times < 1){
          console.log('次数用完了，请先获取下载次数');
          wx.showModal({
            // title: '提示',
            content: '没有下载次数了，请先获取下载次数。',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                // 返回主页
                wx.navigateBack({
                })

              }
            }
          })
        }else{
          db.collection('bdy_download').add({
            data: {
              mail: e.detail.value.mail,
              url: e.detail.value.url,
              code: e.detail.value.code,
              datetime: new Date(),
              status: true
            }
          })
            .then(res => {
              console.log(res);
              // 提交成功后，还需要修改该用户的下载次数

              wx.cloud.callFunction({
                name: 'reduceTimes',
                data: {
                  user_openid: getApp().globalData.openid
                },
                success: res => {
                  // 执行用户次数自减
                  console.log(res);
                  wx.showModal({
                    // title: '提示',
                    content: '提交成功',
                    showCancel: false,
                    success(res) {
                      if (res.confirm) {
                        console.log('用户点击确定');
                        // 返回主页
                        wx.navigateBack({
                        })

                      }
                    }
                  })
                }
              })
            })
        }
      }
    })
  //  console.log(e.detail.value);
   
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
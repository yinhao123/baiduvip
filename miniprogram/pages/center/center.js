// miniprogram/pages/center/center.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    times:0
  },
  /**
   * 获取用户次数
   */
  getUserTimes: function(){
    var _this = this;
    var db = wx.cloud.database();
    db.collection('bdy_user').get({
      success:function(res){
        console.log(res.data[0]);
        // 需要将查询出来的数据赋值给user
        _this.setData({
          times:res.data[0].times
        })
      }
    })
  },
  /**
   * 跳转到下载页面
   */
  navToDownoadPage: function(){
    wx.navigateTo({
      url: '/pages/download/download',
    })
  },
  /**
   * 跳转到获取积分页面
   */
  navToPointPage: function(){
    wx.navigateTo({
      url: '/pages/point/point',
    })
  },
  /**
   * 跳转到我的下载记录
   */
  navToMyDownoadPage: function(){
    wx.navigateTo({
      url: '/pages/mydownload/mydownload',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // var _this = this;
    // wx.getStorage({
    //   key: 'user',
    //   success: function(res) {
    //     _this.setData({
    //       user:res.data,
    //       times:res.data.times
    //     })
    //   },
    // })
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
     this.getUserTimes();
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
// pages/point/point.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      user:null
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
    var _this = this;
    wx.getStorage({
      key: 'user',
      success: function(res) {
        _this.setData({
          user:res.data
        });
      },
    })
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
    // 获取openid 
    let openid = this.data.user._openid;
    console.log(openid);
    return {
      title: '快看，我找到一个百度网盘免费极速下载工具',
     path: '/pages/center/center?id='+openid,
     imageUrl: '/images/baidu.jpg'
    }
  },
})
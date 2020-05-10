// pages/mydownload/mydownload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    downloadList:null,
    record:false
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
    this.getDownloadList();
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

  },
  /**
   * 获取下载文件列表
   */
  getDownloadList: function(){
    var _this = this;
    const db = wx.cloud.database();
    db.collection('bdy_download').get({
      success: function (res) {
        console.log(res);
        if(res.data.length == 0){
          // 如果没有记录
          _this.setData({
           record: false
          })
        }else{
          _this.setData({
            downloadList: res.data,
            record:true
          })
        }
       
      }
    })
  }
})
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  try {
    return await db.collection('bdy_user').where({
      _openid: event.user_openid
    }).update({
      data: {
        // 表示指示数据库将字段自增 10
        times: _.inc(-1)
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  } catch (err) {
    console.log(err);
  }
}
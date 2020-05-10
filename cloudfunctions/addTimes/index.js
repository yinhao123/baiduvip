// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  try {
    return await db.collection('bdy_user').where({
      _openid: event.invite_userOpenid
    }).update({
      data: {
        // 表示指示数据库将字段自增 10
        times: _.inc(1)
      },
      success: function (res) {
        console.log(res.data)
      }
    })
    } catch (err) {
      console.log(err);
    }
}
/**
 * @name goodEvening
 * @description 说晚安
 */
import API from '../../api/loveMsg'
import { getConfig } from '../../utils/getConfig'
import { wxNotify } from '../WxNotify'

const CONFIG = getConfig().loveMsg

export const goodEvening = async () => {
  let text = `晚上好呀，${CONFIG.girl_name}~\n`

  const tiangou = await API.getTiangou()
  text += `
『舔狗日记』\n${tiangou.content}\n`

  const wanan = await API.getWanan()
  text += `
『晚安心语』\n${wanan.content}\n`

  text += `
不要再熬夜了${CONFIG.girl_name}，对手机不好~\n
小心黑眼圈哦~👁👁\n
晚安~ 🌕🌔🌓🌒🌑😘😘\n`

  const template = {
    msgtype: 'text',
    text: {
      content: text,
    },
  }

  await wxNotify(template)
}

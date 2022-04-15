/**
 * @name goodAfternoon
 * @description 说午安
 */
import API from '../../api/loveMsg'
import { getConfig } from '../../utils/getConfig'
import { wxNotify } from '../WxNotify'

const CONFIG = getConfig().loveMsg

export const goodAfternoon = async () => {
  const res = await API.getJoke(5)

  let text = `${CONFIG.girl_name}下午好呀~\n`

  text += `
请欣赏以下雷人笑话😝\n`

  text += `
${res.map((n) => `『${n.title}』${n.content}`).join('\n\n')}`

  const result = await API.getDujitang()
  text += `
\n\n😏😏今日份『毒鸡汤』:\n${result.content}`

  const template = {
    msgtype: 'text',
    text: {
      content: text,
    },
  }

  await wxNotify(template)
}

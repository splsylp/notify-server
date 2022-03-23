/**
 * @description 纯文本模板-企业微信消息通知
 * https://open.work.weixin.qq.com/api/doc/90000/90135/90236
 */

import { weekToday } from '../../../utils/dayjs'
import { getConfig } from '../../../utils/getConfig'

const CONFIG = getConfig().loveMsg

export const textTemplate = (data: TextTemplateProps) => {
  const { zaoan, caiHongpi, sayLove, oneMagazines, netEaseCloud, oneWord, dayEnglish, dialogue } =
    data

  let text = `早安呀，我的${CONFIG.girl_name}小可爱~\n`

  // 工作日/休息日，需要排除节假日
  const week = weekToday()
  if (['星期六', '星期日'].includes(week)) {
    text += `
如果我${CONFIG.girl_name}还没起床，那${CONFIG.boy_name}就等着${CONFIG.girl_name}起床给我说早安呦🤣
既然今天是${week}，就让你再睡会懒觉吧~下次可不能啦~😝\n`
  } else {
    text += `
如果我${CONFIG.girl_name}已经起床啦！${CONFIG.boy_name}向你说早安呦~记得吃早饭呀😆\n
今天可是${week}哦，上班别迟到了哦~\n`
  }

  // 早安心语
  if (zaoan) {
    text += `
『早安心语』${zaoan.content}\n`
  }

  // 彩虹屁
  if (caiHongpi) {
    text += `
『彩虹屁』${caiHongpi.content}\n`
  }

  // 土味情话
  if (sayLove) {
    text += `
『土味情话』${sayLove.content}\n`
  }

  // 一言
  if (oneWord) {
    text += `
『一言』${oneWord.hitokoto}\n`
  }

  // ONE杂志
  if (oneMagazines) {
    text += `
『ONE杂志』${oneMagazines.word}\n`
  }

  // 网易云音乐热评
  if (netEaseCloud) {
    text += `
『网易云音乐热评』${netEaseCloud.content} ---《${netEaseCloud.source}》\n`
  }

  // 每日英语
  if (dayEnglish) {
    text += `
『每日英语』${dayEnglish.content} (${dayEnglish.note})\n`
  }

  // 经典台词
  if (dialogue) {
    text += `
『经典台词』${dialogue.dialogue}`
    if (dialogue.english?.length > 0) text += `(${dialogue.english})`
    text += ` ---《${dialogue.source}》`
  }

  return {
    msgtype: 'text',
    text: {
      content: text,
    },
  }
}

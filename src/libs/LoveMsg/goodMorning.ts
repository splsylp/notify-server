/**
 * @name goodMorning
 * @description 说早安
 */
import API from '../../api/loveMsg'
import { getConfig } from '../../utils/getConfig'
import { wxNotify } from '../WxNotify'
import { textTemplate } from './templates/text'
import { textCardTemplate } from './templates/textcard'

const CONFIG = getConfig().loveMsg

// 美丽短句
const goodWord = async () => {
  try {
    // 并行请求，优响相应
    const dataSource = await Promise.allSettled([
      API.getZaoan(), // 早安心语
      API.getSaylove(), // 土味情话
      API.getCaihongpi(), // 彩虹屁
      API.getOneWord(), // 一言
      API.getOneMagazines(), // one杂志
      API.getNetEaseCloud(), // 网易云热评
      API.getDayEnglish(), // 每日英语
      API.getDialogue(), // 经典台词
    ])

    // 过滤掉异常数据
    const [zaoan, sayLove, caiHongpi, oneWord, oneMagazines, netEaseCloud, dayEnglish, dialogue] =
      dataSource.map((n) => (n.status === 'fulfilled' ? n.value : null))

    // 对象写法
    const data: any = {
      zaoan,
      sayLove,
      caiHongpi,
      oneWord,
      oneMagazines,
      netEaseCloud,
      dayEnglish,
      dialogue,
    }

    const template = textTemplate(data)
    console.log('goodWord', template)

    wxNotify(template)
  } catch (error) {
    console.log('goodWord:err', error)
  }
}

// 天气信息
const weatherInfo = async () => {
  try {
    const weather = await API.getWeather(CONFIG.city_name)
    if (weather) {
      const lunarInfo = await API.getLunarDate(weather.date)
      const template = textCardTemplate({ ...weather, lunarInfo })
      console.log('weatherInfo', template)

      // 发送消息
      await wxNotify(template)
    }
  } catch (error) {
    console.log('weatherInfo:err', error)
  }
}

// goodMorning
export const goodMorning = async () => {
  await weatherInfo()
  await goodWord()
}

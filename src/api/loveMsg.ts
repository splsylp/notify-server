import axios from 'axios'
import { getTian } from '../utils/http'

/**
 * 给女朋友发送内容的相关接口
 */
enum LoveMsgURL {
  // 天气接口：默认获取最近7天的数据
  weather = 'http://api.tianapi.com/tianqi/index',
  // 每日英语
  dayEnglish = 'http://api.tianapi.com/everyday/index',
  // ONE一个
  oneMagazines = 'http://api.tianapi.com/one/index',
  // 网易云热评
  netEaseCloud = 'http://api.tianapi.com/hotreview/index',
  // 获取农历信息
  lunarDate = 'http://api.tianapi.com/lunar/index',
  // 土味情话
  saylove = 'http://api.tianapi.com/saylove/index',
  // 彩虹屁
  caihongpi = 'http://api.tianapi.com/caihongpi/index',
  // 笑话
  joke = 'http://api.tianapi.com/joke/index',
  // 一言
  oneWord = 'https://v1.hitokoto.cn/?encode=json',
  // 毒鸡汤
  dujitang = 'http://api.tianapi.com/dujitang/index',
  // 经典台词
  dialogue = 'http://api.tianapi.com/dialogue/index',
  // 早安心语
  zaoan = 'http://api.tianapi.com/zaoan/index',
  // 晚安心语
  wanan = 'http://api.tianapi.com/wanan/index',
  // 舔狗日记
  tiangou = 'http://api.tianapi.com/tiangou/index',
}

class API {
  key: string
  constructor(key?: string) {
    this.key = key || '' // 为了方便，key在 http中统一添加
  }

  getKey() {
    return this.key
  }

  /**
   * 接口 ++++++++++
   */

  // 天气
  async getWeather(city_name: string): Promise<IWeatherResponseProps> {
    const res = await getTian({ url: LoveMsgURL.weather, params: { city: city_name } })
    return res?.[0]
  }

  // 每日一句美好英语
  async getDayEnglish() {
    const res = await getTian<ResEnglishProps[]>({ url: LoveMsgURL.dayEnglish })
    return res?.[0]
  }

  // one一个杂志
  async getOneMagazines() {
    const res = await getTian<OneMagazines[]>({ url: LoveMsgURL.oneMagazines })
    return res?.[0]
  }

  // 网易云热评
  async getNetEaseCloud() {
    const res = await getTian<NetEaseCloudProps[]>({ url: LoveMsgURL.netEaseCloud })
    return res?.[0]
  }

  // 获取农历信息
  async getLunarDate(date: string) {
    const res = await getTian<ResLunarDateProps[]>({ url: LoveMsgURL.lunarDate, params: { date } })
    return res?.[0]
  }

  // 土味情话
  async getSaylove() {
    const res = await getTian<SayloveProps[]>({ url: LoveMsgURL.saylove })
    return res?.[0]
  }

  // 彩虹屁
  async getCaihongpi() {
    const res = await getTian<SayloveProps[]>({ url: LoveMsgURL.caihongpi })
    return res?.[0]
  }

  // 雷人笑话
  async getJoke(num = 6) {
    const res = await getTian<JokeProps[]>({ url: LoveMsgURL.joke, params: { num } })
    return res
  }

  // 一言
  async getOneWord(): Promise<OneWordProps | null> {
    try {
      const response = await axios(LoveMsgURL.oneWord, { timeout: 30000 })
      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  // 毒鸡汤
  async getDujitang() {
    const res = await getTian<SayloveProps[]>({ url: LoveMsgURL.dujitang })
    return res?.[0]
  }

  // 经典台词
  async getDialogue() {
    const res = await getTian<DialogueProps[]>({ url: LoveMsgURL.dialogue })
    return res?.[0]
  }

  // 早安心语
  async getZaoan() {
    const res = await getTian<SayloveProps[]>({ url: LoveMsgURL.zaoan })
    return res?.[0]
  }

  // 晚安心语
  async getWanan() {
    const res = await getTian<SayloveProps[]>({ url: LoveMsgURL.wanan })
    return res?.[0]
  }

  // 舔狗日记
  async getTiangou() {
    const res = await getTian<SayloveProps[]>({ url: LoveMsgURL.tiangou })
    return res?.[0]
  }
}

export default new API()

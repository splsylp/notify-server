/**
 * @name goodMorning
 * @description 说早安
 */
import dotenv from 'dotenv'
import API from '../../api/loveMsg'
import { getConfig } from '../../utils/getConfig'
import { wxNotify } from '../WxNotify'
import { textTemplate } from './templates/text'
import { textCardTemplate } from './templates/textcard'

// 读取 .env环境变量
dotenv.config()

// WEDDING_DAY日期格式为: 2022-01-01
// BOY_BIRTHDAY / GIRL_BIRTHDAY日期格式为: 2022-正月-初一
const { BOY_BIRTHDAY, GIRL_BIRTHDAY, WEDDING_DAY } = process.env

const CONFIG = getConfig().loveMsg

let today: string
let lunar: ResLunarDateProps

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

    // wxNotify(template)
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

      // 保存日期信息变量
      today = weather.date
      lunar = lunarInfo

      // 发送消息
      // await wxNotify(template)
    }
  } catch (error) {
    console.log('weatherInfo:err', error)
  }
}

// 结婚纪念日
const wedding = async () => {
  const year = today.split('-')?.[0]
  const month = today.split('-')?.[1]
  const day = today.split('-')?.[2]
  const weddingYear = WEDDING_DAY?.split('-')?.[0] || '0'
  const weddingMonth = WEDDING_DAY?.split('-')?.[1]
  const weddingDay = WEDDING_DAY?.split('-')?.[2]
  if (month === weddingMonth && day === weddingDay) {
    const years = +year - +weddingYear
    const text = `知道今天是什么日子吗？今天是我们的结婚纪念日呀${CONFIG.girl_name}!\n
还记得${weddingYear}年${weddingMonth}月${weddingDay}号那天吗，时光匆匆，转眼间已是${years}年了~\n
往后余生，愿我们：\n
一生一世执子手，不离不弃共白头。\n风雨齐闯，苦乐同享。\n即使两鬓都苍苍，共你十指紧扣看斜阳。\n爱你永不变。\n
${CONFIG.girl_name}😘😘
❤❤ 结婚${years}周年快乐 ❤❤
`
    console.log('结婚纪念日感言------', text)
    const template = {
      msgtype: 'text',
      text: {
        content: text,
      },
    }
    await wxNotify(template)
  }
}

// 年龄
const getAge = (birth = '') => {
  const year = today.split('-')?.[0]
  const birthYear = birth?.split('-')?.[0] || '0'
  const birthMonth = birth?.split('-')?.[1]
  const birthDay = birth?.split('-')?.[2]
  // 生日录入的农历日期
  if (lunar.lubarmonth === birthMonth && lunar.lunarday === birthDay) return +year - +birthYear
  return -1
}

// 👦🏻自己生日
const boyBirthday = async () => {
  try {
    const birth = BOY_BIRTHDAY
    const year = today.split('-')?.[0]
    const birthYear = birth?.split('-')?.[0] || '0'
    const birthMonth = birth?.split('-')?.[1]
    const birthDay = birth?.split('-')?.[2]
    // 生日录入的农历日期
    // if (lunar.lubarmonth === birthMonth && lunar.lunarday === birthDay) return +year - +birthYear
    const age = +year - +birthYear
    const text = `
    birth: ${birth}\n
    year: ${year}\n
    birthYear: ${birthYear}\n
    birthMonth: ${birthMonth}\n
    birthDay: ${birthDay}\n
    equal: ${lunar.lubarmonth === birthMonth && lunar.lunarday === birthDay}\n
    age: ${age}\n
  `
    const template = {
      msgtype: 'text',
      text: {
        content: text,
      },
    }
    console.log('boy birth---', template)
    // await wxNotify(template)
  } catch (e) {
    console.log('boy birth error: ', e)
  }
  return
  const age = getAge(BOY_BIRTHDAY)
  console.log('age---', age)
  if (age > 0) {
    const text = `哇哈哈，今天是我的生日耶~好开心呀！😄😄\n
${CONFIG.girl_name}想好要送我什么🎁了吗？${CONFIG.boy_name}可在这眼巴巴的等着呢~\n
要不就先请我去吃一顿大餐再说吧🤤\n
又长一岁，那就㊗️自己${age}岁生日快乐吧😎\n
Happy birthday to myself 🎂`
    console.log('自己生日------', text)
    const template = {
      msgtype: 'text',
      text: {
        content: text,
      },
    }
    await wxNotify(template)
  }
}

// 👧🏻女孩生日
const girlBirthday = async () => {
  const age = getAge(GIRL_BIRTHDAY)
  if (age > 0) {
    const sayAge = 3
    const sayMonths = (age - sayAge) * 12
    const text = `哇塞塞，今天是我的小可爱${CONFIG.girl_name}生日呢！🎉🎉🎉🎉🎉🎉\n
我们家${CONFIG.girl_name}已经是${sayAge}岁零${sayMonths}个月大的宝宝👶🏻了呢！😂😂\n
${CONFIG.boy_name}在这里㊗️我的${CONFIG.girl_name}:\n
健康平安\n事事顺遂\n笑口常开\n永远18岁\n
🎂生日快乐🎂`
    console.log('自己生日------', text)
    const template = {
      msgtype: 'text',
      text: {
        content: text,
      },
    }
    await wxNotify(template)
  }
}

// 节日
const festival = async () => {
  await wedding()
  await boyBirthday()
  await girlBirthday()
}

// goodMorning
export const goodMorning = async () => {
  // await goodWord()
  await weatherInfo()
  await festival()
}

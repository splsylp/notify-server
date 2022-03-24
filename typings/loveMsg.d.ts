// 定义天气返回值类型
interface IWeatherResponseProps {
  /** 2021-12-18 */
  date: string
  /** 星期六 */
  week: string
  /** 蚌埠 */
  area: string
  /** 晴 */
  weather: string
  /** 西南风 */
  wind: string
  /** 3-4级 */
  windsc: string
  /** 湿度：35% */
  humidity: string
  /** 降雨量 */
  pcpn: string
  /** 降雨概率 */
  pop: string
  /** 当前温度 4 */
  real: string
  /** 最高温度 8 */
  highest: string
  /** 最低温度 -2 */
  lowest: string
  /** 生活指数提示 */
  tips: string
}

// 获取农历信息
interface ResLunarDateProps {
  gregoriandate: string // '2022-03-24'
  lunardate: string // '2022-2-22' 注意月份不是两位
  lunar_festival: string
  festival: string
  lubarmonth: string // 二月
  lunarday: string // 廿二
  jieqi: string
}

// 每日英语
interface ResEnglishProps {
  content: string
  note: string
  imgurl: string
  date: string
}

// ONE一个
interface OneMagazines {
  word: string
  wordfrom: string
  imgurl: string
  note: string
}

// 网易云热评
interface NetEaseCloudProps {
  source: string
  content: string
}

// 土味情话
interface SayloveProps {
  content: string
}

// 雷人笑话
interface JokeProps {
  title: string
  content: string
}

// 一言
interface OneWordProps {
  hitokoto: string
  from: string
  from_who: string
  creator: string
}

// 经典台词
interface DialogueProps {
  dialogue: string
  english: string
  source: string
}

/**
 * 模板
 */
// goodMorning
type TextCardTemplateProps = IWeatherResponseProps & {
  lunarInfo: ResLunarDateProps
  oneWord?: OneWordProps | null
}

// goodMorning
type TextTemplateProps = {
  zaoan: SayloveProps | null
  sayLove: SayloveProps | null
  caiHongpi: SayloveProps | null
  oneWord: OneWordProps | null
  oneMagazines: OneMagazines | null
  netEaseCloud: NetEaseCloudProps | null
  dayEnglish: ResEnglishProps | null
  dialogue: DialogueProps | null
}

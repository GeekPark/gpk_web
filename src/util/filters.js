import moment from 'moment'

export function timeAt (value) {
  if (!value) return ''
  const time = moment.unix(value)
  return time.calendar(null, {
    sameDay: '今天',
    lastDay: '昨天',
    lastWeek: 'MM.DD',
    sameElse: 'MM.DD'
  }) + ' \\ ' + time.format(`ddd.`)
}

export function fromNow (value) {
  if (!value) return ''
  const time = Number(value) ? moment.unix(value) : moment(value)
  const diff = moment().diff(time, 'days')
  return diff >= 1 ? time.format('YYYY/MM/DD') : time.locale('zh-cn').fromNow()
}

export function fromHours (value) {
  if (!value) return ''
  const time = Math.floor((Date.now() / 1000 - value) / 3600)
  return Math.max(time, 1) + 'h'
}

export function getDay (value) {
  if (!value) return ''
  return moment.unix(value).format('MM月DD日');
}

export function formatDate (value) {
  if (!value) return ''
  return moment.unix(value).format("YYYY/MM/DD")
}

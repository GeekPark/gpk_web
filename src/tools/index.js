import moment     from 'moment'
import config     from '../config.js'
// console.log(config);

function printLog(title, info) {
  window.console && console.log(title, info);
}

export default {
  moment: (obj, format = 'YYYY/MM/DD HH:mm:ss') => {
    return moment(obj).format(format)
  }
}

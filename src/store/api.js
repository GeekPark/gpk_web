import config from '../config'
import axios  from 'axios'
const base_url = `${config.host}v1`

const request = create();

function create(url = base_url) {
  return axios.create({
    baseURL: url,
    timeout: 20000,
    withCredentials: true, // 允许跨域 cookie
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
  })
}

request.account = create(`${config.account}`)

export default request

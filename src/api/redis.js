import config from '../config'
const redis = require('redis')
const client = redis.createClient(config.redis.port, config.redis.host)
console.log('connect:', config.redis.host, config.redis.port)
client.on('error', function (err) {
  console.log('Error ' + err)
})
client.on('ready', function (res) {
  console.log('client ready')
})
client.on('connect', function () {
  console.log('connect')
})
export default client

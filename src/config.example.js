const isDev = process.env.NODE_ENV === 'development'

const config = {
  'development': {
    'host': '',
    'account': '',
    'redis': {
      host: '127.0.0.1',
      port: 6379
    }
  },
  'production': {
    'host': '',
    'account': '',
    'redis': {
      host: '127.0.0.1',
      port: 6379
    }
  }
}

export default isDev ? config['development'] : config['production']

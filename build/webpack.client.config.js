const glob = require('glob')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const config = merge(base, {
  entry: {
    app: './src/entry-client.js'
  },
  resolve: {
    alias: {
      'create-api': './create-api-client.js'
    }
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"',
      'process.env.DEBUG_API': '"true"'
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.require)
        )
      }
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new VueSSRClientPlugin()
  ]
})

if (process.env.NODE_ENV === 'production') {
  // config.output.publicPath = 'https://o185dmv7p.qnssl.com/dist/'
  // config.plugins.push(
  //   // auto generate service worker
  //   new SWPrecachePlugin({
  //     cacheId: 'geekpark-ssr',
  //     filename: 'service-worker.js',
  //     minify: true,
  //     // stripPrefixMulti: prefixMulti,
  //     dontCacheBustUrlsMatching: /./,
  //     staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
  //     runtimeCaching: [{
  //         urlPattern: '/',
  //         handler: 'networkFirst'
  //       },
  //       {
  //         urlPattern: '/news/:id',
  //         handler: 'networkFirst'
  //       }
  //     ]
  //   })
  // )
}
module.exports = config

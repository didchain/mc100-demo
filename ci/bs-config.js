const chalk =  require('chalk')


const { R, dist } = require('./paths')

const PROT = 41589

const { createProxyMiddleware } = require('http-proxy-middleware')

const apiProxy = createProxyMiddleware('/api', {
  target: 'xxx',
  changeOrigin: true, // for vhosted sites
})

module.exports = {
  port: PROT,
  browser: ['chrome'],
  files: ['./docs/**/*.{html,css,js}'],
  server: {
    baseDir: dist,
    // middleware: {
    //   10: apiProxy,
    // },
  },
  open: true,
}
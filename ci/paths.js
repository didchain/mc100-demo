const path = require('path')

module.exports = {
  R: (...p) => path.resolve(...p),
  join: (...p) => path.join(...p),
  baseResovle: (...p) => path.resolve(__dirname, '..', ...p),
  favicon: path.resolve(__dirname, '../docs/favicon.ico'),
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../docs'),
}

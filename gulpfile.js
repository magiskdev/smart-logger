const rimraf = require('rimraf');

function removeDist(cb) {
  rimraf('dist/**', cb);
}

exports.removeDist = removeDist;

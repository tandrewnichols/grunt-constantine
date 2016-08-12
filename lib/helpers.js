var grunt = require('grunt');
var chalk = require('chalk');

exports.filter = function(filepath) {
  if (!grunt.file.exists(filepath)) {
    grunt.log.warn(chalk.cyan(filepath) + ' not found.');
    return false;
  } else {
    return true;
  }
};

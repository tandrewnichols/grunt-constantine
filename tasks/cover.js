var cover = require('../lib/cover');

module.exports = function(grunt) {
  grunt.registerMultiTask('cover', 'Run istanbul cover', cover);
};

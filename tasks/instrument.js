var instrument = require('../lib/instrument');

module.exports = function(grunt) {
  grunt.registerMultiTask('instrument', 'Run istanbul instrument', instrument);
};

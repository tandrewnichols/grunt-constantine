var _ = require('lodash');
var istanbul = require('istanbul');
var helpers = require('./helpers');
var async = require('async');
var fs = require('fs-extra');
var grunt = require('grunt');

module.exports = function() {
  var done = this.async();

  var options = this.options({
    noCompact: false
  });

  var operands = _.reduce(this.files, function(memo, file) {
    return memo.concat(file.src.filter(helpers.filter).map(function(filepath) {
      return {
        instrumenter: new istanbul.Instrumenter(_.clone(options)),
        src: filepath,
        dest: file.dest
      };
    }));
  }, []);

  async.each(operands, function(operand, next) {
    fs.readFile(operand.src, { encoding: 'utf8' }, function(err, contents) {
      if (err) {
        next(err);
      } else {
        var instrumented = operand.instrumenter.instrumentSync(contents, operand.src);
        fs.outputFile(operand.dest, instrumented, { encoding: 'utf8' }, next);
      }
    });
  }, function(err) {
    if (err) {
      grunt.log.error(err);
      done(err);
    } else {
      grunt.log.ok(operands.length + ' files instrumented');
      done();
    }
  });
};

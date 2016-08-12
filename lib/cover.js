var istanbul = require('istanbul/lib/command/common/run-with-cover');
var _ = require('lodash');
var opted = require('opted');

module.exports = function() {
  var done = this.async();
  var options = this.options({});
  var opts = _.omit(options, ['command', 'commandArgs']);

  var command = options.command instanceof Array ? options.command : options.command.split(' ');
  var args = ['istanbul', 'cover'].concat(opted(opts)).concat(command);

  if (options.commandArgs) {
    args.push('--');
    args.concat(opted(options.commandArgs));
  }

  istanbul.run(args, 'cover', true, function() {
    done();
  });

  process.once('exit', function() {
    console.log('done');
    done();
  });
};

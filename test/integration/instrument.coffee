spawn = require('child_process').spawn
fs = require('fs')

describe 'integration: instrument task', ->
  Given -> @spawn = (cmd, args, opts, cb) ->
    output = ''
    child = spawn(cmd, args, opts)
    child.stdin.on 'data', (data) ->
      output += data.toString()
    child.on 'close', -> cb(output)

  Given -> @contains = (dir, file, cb) ->
    fs.readdir dir, (err, files) ->
      cb err, (files || []).indexOf(file) > -1

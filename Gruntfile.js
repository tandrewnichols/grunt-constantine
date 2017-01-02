module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-simple-istanbul');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-travis-matrix');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadTasks('./tasks');

  grunt.initConfig({
    tests: 'test/**/*.coffee',
    tasks: 'tasks/**/*.js',
    lib: 'lib/**/*.js',
    clean: {
      coverage: ['coverage']
    },
    eslint: {
      tasks: {
        options: {
          configFile: '.eslint.json',
          format: 'node_modules/eslint-codeframe-formatter'
        },
        src: ['<%= tasks %>', '<%= lib %>']
      }
    },
    shell: {
      codeclimate: 'npm run codeclimate'
    },
    travisMatrix: {
      v4: {
        test: function() {
          return /^v4/.test(process.version);
        },
        tasks: ['istanbul:unit', 'shell:codeclimate']
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec',
        ui: 'mocha-given',
        require: ['coffee-script/register', 'should', 'should-sinon' ]
      },
      test: {
        src: ['<%= tests %>']
      },
      watch: {
        options: {
          reporter: 'dot'
        },
        src: ['<%= tests %>']
      }
    },
    istanbul: {
      unit: {
        options: {
          root: 'tasks',
          dir: 'coverage',
          simple: {
            cmd: 'cover',
            args: ['grunt', 'mocha'],
            rawArgs: ['--', '--color']
          }
        }
      }
    },
    open: {
      coverage: {
        path: 'coverage/lcov-report/index.html'
      }
    },
    watch: {
      tests: {
        files: ['<%= tasks %>', '<%= lib %>', '<%= tests %>'],
        tasks: ['mochaTest:watch'],
        options: {
          atBegin: true
        }
      }
    }
  });

  grunt.registerTask('mocha', ['mochaTest:test']);
  grunt.registerTask('test', ['mochaTest:test']);
  grunt.registerTask('default', ['eslint:tasks', 'mocha']);
  grunt.registerTask('cover', ['istanbul:unit', 'open:coverage']);
  grunt.registerTask('ci', ['eslint:tasks', 'mocha', 'travisMatrix']);
};

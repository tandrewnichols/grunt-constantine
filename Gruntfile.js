module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-travis-matrix');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadTasks('tasks');

  grunt.initConfig({
    clean: {
      coverage: ['coverage']
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        eqeqeq: true,
        es3: true,
        indent: 2,
        newcap: true,
        quotmark: 'single',
        boss: true
      },
      all: ['tasks/**/*.js']
    },
    shell: {
      codeclimate: 'codeclimate-test-reporter < coverage/lcov.info'
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
        src: ['test/helpers/**/*.coffee', 'test/**/*.coffee']
      }
    },
    open: {
      coverage: {
        path: 'coverage/lcov-report/index.html'
      }
    },
    watch: {
      tests: {
        files: ['tasks/**/*.js', 'test/**/*.coffee'],
        tasks: ['mocha'],
        options: {
          atBegin: true
        }
      }
    }
  });

  grunt.registerTask('mocha', ['mochaTest:test']);
  grunt.registerTask('default', ['jshint:all', 'mocha']);
  grunt.registerTask('ci', ['jshint:all', 'mocha', 'travisMatrix']);
};
'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    copy: {
      liquid: {
        files: [
          {expand: true, src: ['src/views/**'], dest: 'build/'}
        ]
      }
    },
    clean: ['build/*'],
    env: {
      dev: {
        NODE_ENV: 'development'
      },
      prod: {
        NODE_ENV: 'production'
      },
      test: {
        NODE_ENV: 'test'
      }
    },
    mochaTest: {
      test: {
        options: {
          colors: false,
          //reporter: 'min',
          reporter: 'spec',
        },
        src: ['build/test/app.js'],
      },
    },
    livescript: {
      options: {
        //bare: true,
      },
      src: {
        expand: true,
        src: ['src/**/*.ls', 'test/**/*.ls'],
        dest: 'build/',
        ext: '.js'
      },
    },
    nodemon: {
      dev: {
        options: {
          file: 'build/src/app.js',
          watchedExtensions: ['.ls', '.liquid'],
          watchedFolders: ['src']
        }
      },
      prod: {
        options: {
          file: 'build/src/app.js',
        }
      }
    },
    watch: {
      default: {
        files: ['src/**/*.ls', 'src/views/**/*.liquid'],
        tasks: ['build', 'liquid']
      }
    },
    concurrent: {
      target: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-livescript');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', ['concurrent:target']);
  grunt.registerTask('build', ['env:dev', 'clean', 'livescript']);
  grunt.registerTask('test', ['env:test', 'clean', 'livescript', 'mochaTest']);
  grunt.registerTask('mocha', ['clean', 'livescript', 'mochaTest']);
  grunt.registerTask('liquid', ['copy:liquid']);
};

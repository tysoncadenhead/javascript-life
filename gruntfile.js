/*jslint node: true */

module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({

        mocha: {
            all: {
                options: {
                    threshhold: 90,
                    urls: [
                        'http://localhost:1111/spec/index.html'
                    ]
                }
            }
        },

        connect: {
            test: {
                options: {
                    hostname: '*',
                    port: 1111,
                    base: '.',
                    keepalive: false
                }
            },
            server: {
                options: {
                    hostname: '*',
                    port: 1112,
                    base: './app',
                    keepalive: true
                }
            }
        },

        watch: {
            options: {
                livereload: 1337
            },
            scripts: {
                files: [
                    'app/js/**/*.js',
                    'spec/**/*.js'
                ],
                options: {
                    livereload: 1337
                }
            },
            templates: {
                files: [
                    'app/views/**/*.html'
                ]
            },
            css: {
              files: ['app/scss/**/*.scss', 'app/scss/**/**/*.scss'],
              tasks: ['compass']
            }
        },

        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('test', ['connect:test', 'mocha']);
    grunt.registerTask('server', ['connect:server', 'watch']);

};
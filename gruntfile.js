'use strict';

module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            jade: {
                files: ['app/views/**'],
                options: {
                    livereload: true,
                },
            },
            js: {
                files: ['gruntfile.js',
                    'server.js',
                    '<%= filePaths.serverSourceFiles %>',
                    '<%= filePaths.clientSourceFiles %>',
                    '<%= filePaths.clientTestFiles %>',
                    '<%= filePaths.serverTestFiles %>'
                ],
                tasks: ['jshint'],
                options: {
                    livereload: true,
                },
            },
            html: {
                files: ['public/views/**'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: ['public/css/**'],
                options: {
                    livereload: true
                }
            },
            serverTests: {
                files: ['<%= filePaths.serverSourceFiles %>', '<%= filePaths.serverTestFiles %>'],
                tasks: ['jshint', 'mochaTest']
            },
            clientTests: {
                files: ['<%= filePaths.clientSourceFiles %>', '<%= filePaths.clientTestFiles %>'],
                tasks: ['jshint', 'karma:unit:run']
            },
            tests: {
                files: ['<%= filePaths.clientSourceFiles %>',
                    '<%= filePaths.clientTestFiles %>',
                    '<%= filePaths.serverSourceFiles %>',
                    '<%= filePaths.serverTestFiles %>'
                ],
                tasks: ['jshint', 'karma:unit:run', 'mochaTest']
            }
        },
        filePaths: {
            serverTestFiles: 'test/server-side/mocha/**/*.js',
            clientTestFiles: 'test/client-side/karma/unit/**/*.js',
            serverSourceFiles: 'app/**/*.js',
            clientSourceFiles: 'public/js/**/*.js',
        },

        jshint: {
            all: {
                src: ['gruntfile.js',
                    'server.js',
                    '<%= filePaths.serverSourceFiles %>',
                    '<%= filePaths.clientSourceFiles %>',
                    '<%= filePaths.clientTestFiles %>',
                    '<%= filePaths.serverTestFiles %>'
                ],
                options: {
                    jshintrc: true,
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    file: 'server.js',
                    args: [],
                    ignoredFiles: ['public/**'],
                    watchedExtensions: ['js'],
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec',
                require: 'server.js'
            },
            src: ['<%= filePaths.serverTestFiles %>']
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        karma: {
            unit: {
                configFile: 'test/client-side/karma/karma.conf.js'
            }
        }
    });

    //Load NPM tasks 
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-env');

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('default', ['jshint', 'concurrent']);

    grunt.registerTask('server', ['concurrent']);

    //Lint task.
    grunt.registerTask('lint', ['env:test', 'jshint', 'watch:js']);

   



    //client side tests
    grunt.registerTask('test-client', ['env:test', 'karma:unit']);
    grunt.registerTask('test-client-live', ['env:test', 'watch:clientTests']);

    //server side tests
    grunt.registerTask('test-server', ['env:test', 'mochaTest', 'jshint']);
    grunt.registerTask('test-server-live', ['test-server', 'watch:serverTests']);


 //Test task.
    grunt.registerTask('test', ['env:test', 'test-client', 'test-server']);
    grunt.registerTask('test-live', ['test-server', 'test-client', 'watch:tests']);
};
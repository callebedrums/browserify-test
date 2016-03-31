
module.exports = function (grunt) {

    var modRewrite = require('connect-modrewrite');

    var config = {
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 7000,
                    base: ['public', 'node_modules'],
                    keepalive: true,
                    open: true,
                    middleware: function (connect, options, middleware) {
                        middleware.unshift(modRewrite(['^[^\\.]*$ /index.html [L]']));
                        return middleware;
                    }
                }
            }
        },
        browserify: {
            options: {
                debug: true
            },
            dev: {
                src: ['public/js/index.js'],
                dest: 'public/bundle.js'
            }
        },
        watch: {
            browserify: {
                files: ['public/js/**/*.js'],
                tasks: ['browserify:dev', 'uglify:dev']   
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            serve: ['watch', 'connect:server'],
        },
        uglify: {
            options: {
                sourceMap: true
            },
            dev: {
                files: {
                    'public/bundle.min.js': ['public/bundle.js']
                }
            }
        }
    };

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('serve', ['browserify:dev', 'uglify:dev', 'concurrent:serve']);
};
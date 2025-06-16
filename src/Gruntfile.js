'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            options: {
                force: true
            }, 
            dist: ['../dist/**/*.*'],
            temp: ['../temp/**/*.*']
        },
        concat: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                , mangle: false
                , stripBanners: true
                , seperator: ';'
            },
            dist: {
                files: {
                    '../temp/index.css': [
                        'bower_components/bootstrap/dist/css/bootstrap.min.css'
                        , 'index.css'
                    ]
                    , '../temp/index.js': [
                        'bower_components/jquery/dist/jquery.min.js'
                        , 'bower_components/bootstrap/dist/js/bootstrap.min.js'
                        , '*.js'
                        , '!Gruntfile.js'
                    ]
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        src: 'manifest.json'
                        , dest: '../dist/manifest.json'
                    },
                    {
                        expand: true
                        , flatten: true
                        , cwd: '.'
                        , src: '*.png'
                        , dest: '../dist'
                        , filter: 'isFile'
                    },
                    {
                        expand: true
                        , flatten: true
                        , cwd: '.'
                        , src: '*.html'
                        , dest: '../temp'
                        , filter: 'isFile'
                    }
                ]
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false
                , roundingPrecision: -1
                , sourceMap: false
                , rebase: false
            },
            dist: {
                files: {
                    '../dist/index.min.css': ['../temp/index.css']
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '../temp/',
                    src: ['*.html'],
                    dest: '../dist/'
                }]
            }
        },
        processhtml: {
            dist: {
                options: {
                    process: true
                },
                files: {
                    '../temp/index.html': ['../temp/index.html']
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                , beautify: false
                , compress: {
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true
                }
                , force: true
                , mangle: false                
            },
            dist: {
                files: {
                    '../dist/index.min.js': '../temp/index.js'
                }
            }
        },
        watch: {
            css: {
                files: ['*.css']
                , tasks: ['copy', 'concat', 'cssmin', 'clean:temp']
            },
            js: {
                files: ['*.js']
                , tasks: ['copy', 'concat', 'uglify', 'clean:temp']
            },
            html: {
                files: ['*.html']
                , tasks: ['copy', 'processhtml', 'htmlmin', 'clean:temp']
            },
            json: {
                files: ['*.json']
                , tasks: ['clean', 'copy', 'concat', 'cssmin', 'uglify', 'processhtml', 'htmlmin', 'clean:temp']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-processhtml');

    grunt.registerTask('default', ['clean', 'copy', 'concat', 'cssmin', 'uglify', 'processhtml', 'htmlmin', 'clean:temp']);
};
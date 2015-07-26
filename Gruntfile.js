module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['Gruntfile.js', 'src/js/**/*.js'],
            gruntfile: ['Gruntfile.js'],
            javascript: ['src/js/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {                         // Dictionary of files
                    'dist/css/main.css': 'src/scss/main.scss'       // 'destination': 'source'
                }
            }
        },
        cssmin: {
            min: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            all: {
                files: [{
                    expand: true,
                    cwd: 'dist/js',
                    src: ['*.js', '!*.min.js'],
                    dest: 'dist/js',
                    ext: '.min.js',
                }]
            }
        },
        concat: {
            js: {
                options: {
                    separator: ';',
                },
                files: {
                    'dist/js/elife.js': ['src/js/app.js', 'src/js/api.js', 'src/js/module/*.js'],
                }
            },
        },
        copy: {
            html: {
                files: [
                    {expand: true, cwd: 'src', src: ['*.html'], dest: 'dist/'},
                    {expand: true, cwd: 'src', src: ['*.js'], dest: 'dist/'},
                    {expand: true, cwd: 'src/views/', src: ['**/*.html'], dest: 'dist/views/'},
                ]
            },
            img: {
                files: [
                    {expand: true, cwd: 'src/scss/img/', src: ['*.*'], dest: 'dist/css/img/'},
                    {expand: true, cwd: 'src/images/', src: ['*.*'], dest: 'dist/images/'},
                ]
            },
        },
        clean: {
            all: ['dist/']
        },
        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile'],
            },
            js: {
                files: ['src/js/**/*.js', 'src/*.js'],
                tasks: ['jshint:javascript', 'concat:js', 'uglify', 'copy:html']
            },
            sass: {
                files: 'src/scss/*.scss',
                tasks: ['sass', 'cssmin:min']
            },
            html: {
                files: 'src/**/*.html',
                tasks: ['copy:html']
            },
            images: {
                files: ['src/images/*.*', 'src/scss/img/*.*'],
                tasks: ['copy:img']
            }
        },
        manifest: {
            generate: {
                options: {
                    basePath: "dist/",
                    //cache: ["js/app.js", "css/style.css"],
                    //network: ["http://*", "https://*"],
                    //fallback: ["/ /offline.html"],
                    //exclude: ["js/jquery.min.js"],
                    //preferOnline: true,
                    verbose: true,
                    timestamp: true
                },
                src: [
                    //"*.html",
                    '*.js',
                    "js/*.min.js",
                    "css/*.min.css",
                    'images/*.*'
                ],
                dest: "dist/manifest.appcache"
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-readme');
    grunt.loadNpmTasks('grunt-manifest');
    //grunt.loadNpmTasks('grunt-karma');


    grunt.registerTask('build', ['clean', 'sass', 'cssmin:min', 'jshint:javascript', 'concat:js', 'uglify', 'copy:html', 'copy:img','manifest']);
    grunt.registerTask('images', ['copy:img']);
    grunt.registerTask('default', ['build']);
};
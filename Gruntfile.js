module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Define clean task
    clean: {
      options: {
        dot: true
      },
      dist: ['build', 'dist/*']
    },

    /**
    * Build Dyndoc.js with bundle and rake
    */
    shell: {  // Task
      bundleInstall: {                        // Target
        options: {                        // Options
          stderr: false
        },
        command: 'bundle install'
      },
      rakeDist: {                        // Target
        options: {                        // Options
          stderr: false
        },
        command: 'bundle exec rake dist'
      },
      rakeExamples: {                        // Target
        options: {                        // Options
          stderr: false
        },
        command: 'bundle exec rake examples'
      }
    },

    /**
    * Generate file with npm format
    */
    concat: {
      npmDyndoc: {
        src: [
          'src/npm/prepend-core.js',
          'build/dyndoc.js',
          'src/npm/append-core.js'
        ],
        dest: 'build/npm/dyndoc.js'
      },
      all: {
        src: [
          'bower_components/opal/opal/current/opal.js',
          'build/dyndoc.js'
        ],
        dest: 'build/dyndoc-all.js'
      }
    },

    /**
    * Minify all js
    */
    uglify: {
      dist: {
        files: {
          'dist/npm/dyndoc.min.js': ['build/npm/dyndoc-min.js'],
          'dist/dyndoc-all.min.js': ['build/dyndoc-all.js']
        }
      }
    },

    /**
    * Copy unminified files
    */
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'build/',
          src: ['**/*.js', '!**/*-min.js', '!**/*.min.js'],
          dest: 'dist/',
          filter: 'isFile'
        },
        {
          expand: true,
          cwd: 'build/',
          src: ['dyndoc.css'],
          dest: 'dist/css/'
        }]
      }
    },

    /**
    * Gunzip
    */
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        files: [
          // Each of the files in the src/ folder will be output to
          // the dist/ folder each with the extension .gz.js
          {expand: true, src: ['dist/**/*.js'], dest: '', ext: '.gz.js'}
        ]
      }
    },

    jasmine: {
      options: {
        specs: 'spec/bower/bower.spec.js',
        vendor: ['spec/share/common-specs.js']
      },
      allStandard: {
        src: ['dist/dyndoc-all.js']
      },
      allMinified: {
        src: ['dist/dyndoc-all.min.js']
      },
    },

    jasmine_node: {
      options: {
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: 'spec',
        jUnit: {
          report: false,
          savePath : "./build/reports/jasmine/",
          useDotNotation: true,
          consolidate: true
        }
      },
      all: ['spec/npm']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  //grunt.loadNpmTasks('grunt-contrib-jasmine');
  //grunt.loadNpmTasks('grunt-jasmine-node');

  grunt.registerTask('default', ['dist']);
  grunt.registerTask('dist', ['clean', 'rake', 'npm', 'bower', 'uglify', 'copy', 'compress']);
  grunt.registerTask('rake', ['shell:bundleInstall', 'shell:rakeDist']);
  // grunt.registerTask('example-result', 'Log the path to view the example result task', function() {
  //   grunt.log.subhead('You can now open the file build/dyndoc_example.html');
  // });
  // grunt.registerTask('examples', ['shell:rakeExamples', 'example-result']);
  grunt.registerTask('npm', ['concat:npmDyndoc']);
  grunt.registerTask('bower', ['concat:all']);
  // grunt.registerTask('test', ['jasmine:allStandard', 'jasmine:allMinified', 'jasmine_node:all']);
}


/* gulpfile.js */

// Load some modules which are installed through NPM.
var gulp = require('gulp');
var path = require('path');
var browserify = require('browserify');  // Bundles JS.

var source = require('vinyl-source-stream');
var chalk = require('chalk');
var notifier = require('node-notifier');
var uglify = require('gulp-uglify');


// Define some paths.
var paths = {
    app_js: ['./src/main.js'],
    js: ['./src/**/**/*.js*',
    	'./src/**/*.js*',
    	'./src/*.js*']
};

function notiErr(err){
    var notiConf = {};
    if(err){
        notiConf = {
            message: "Error: " + err.message.slice(0,30),
            title: "Failed running browserify",
            icon: path.join(__dirname, 'fail.png')
        };
    }else{
        notiConf = {
            message: "You just fixed it!",
            title: "Resolved",
            icon: path.join(__dirname, 'approved.png')
        };
    }
    notifier.notify(notiConf);
}


var isOnErrorState = false;
gulp.task('js', function() {
    return browserify({ debug: false })
        //.transform(babelify)
        .require(paths.app_js, { entry: true })
        .bundle(function(err,bff){
            if(bff){
                if(isOnErrorState){
                    notiErr(false)
                }
                isOnErrorState = false;
            }
        })
        .on("error", function (err) {
            console.log(chalk.red(err.toString()));
            this.emit('end');
            if(!isOnErrorState){
                notiErr(err);
            }
            isOnErrorState = true;

        })
        //.pipe(uglify())
        .pipe(source('d3.chart.js'))
        .pipe(gulp.dest('./dist/'));

});

// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
    return gulp.watch(paths.js, ['js']);
});

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['js','watch']);

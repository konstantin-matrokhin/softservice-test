let gulp = require('gulp');

let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let babel = require('gulp-babel');
let sync = require('browser-sync');
let plumber = require('gulp-plumber');

let reload = sync.reload;

const src = {
    index: 'src/*.html',
    styles: 'src/styles/*.scss',
    js: 'src/js/*.js'
};

const build = {
    index: 'build/',
    styles: 'build/styles/',
    js: 'build/js/'
};

const vendor = {
    angular: 'src/vendor/angular/angular.min.js',
    jq: 'src/vendor/jquery/dist/jquery.min.js'
};

gulp.task('start', () => {
    gulp.src(vendor.angular).pipe(gulp.dest(build.js));
    gulp.src(vendor.jq).pipe(gulp.dest(build.js));

    sync({
        server: {
            baseDir: 'build/'
        },
        port: 7080,
        open: true,
    });
});

gulp.task('index', () => {
    return gulp.src(src.index)
        .pipe(gulp.dest(build.index))
        .pipe(reload({stream:true}));
});

gulp.task('styles', () => {
    return gulp.src(src.styles)
        .pipe(plumber())
        .pipe(autoprefixer({
            browsers: 'last 2 versions',
            cascade: false
        }))
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest(build.styles))
        .pipe(reload({stream:true}));
});

gulp.task('js', () => {
    return gulp.src(src.js)
        .pipe(plumber())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest(build.js))
        .pipe(reload({stream:true}));
});

gulp.task('watch', () => {
    gulp.watch(src.styles, ['styles']);
    gulp.watch(src.index, ['index']);
    gulp.watch(src.js, ['js']);
});

gulp.task('default', ['start', 'styles', 'js', 'index', 'watch']);
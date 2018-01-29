const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const livereload = require('gulp-livereload');

const paths = {
    vendor: './node_modules/',
    src: './src/styles/',
    dist: './public/css/'
};

gulp.task('sass', () => {
    gulp.src(`${paths.src}index.scss`)
        .pipe(sass({
            includePaths: [paths.vendor]
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(rename('app.css'))
        .pipe(gulp.dest(paths.dist))
        .pipe(livereload());
});

gulp.task('watch:sass', () =>{
    livereload.listen({ basePath: 'public' });
    gulp.watch(paths.src + '**/*.scss', ['sass'])
});
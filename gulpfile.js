var gulp = require('gulp');

gulp.task('move', function() {
    return gulp.src(
        ['www/static/src/jquery*js'], {
            base: './'   //如果设置为 base: 'js' 将只会复制 js目录下文件, 其他文件会忽略
        }
    ).pipe(gulp.dest('public'));
});

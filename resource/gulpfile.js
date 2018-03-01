var gulp = require('gulp');
var bro = require('gulp-bro'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require("gulp-minify-html"),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    order = require('gulp-order'),
    cache = require('gulp-cache'),
    pngquant = require('imagemin-pngquant'),

    include = require('gulp-file-include'),
    imageminify = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    es2015 = require('babel-preset-es2015'),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    spritesmith = require('gulp.spritesmith'),
    changed = require('gulp-changed'),
    reload = browserSync.reload

gulp.task('scripts', function () {
    return gulp.src(['./src/js/**/*.*'])
        .pipe(plumber())
        .pipe(gulp.dest('./dist/js'))
        .pipe(reload({stream: true}));
});

/*
 * js concat
 * 执行任务 需要手动配置合并的文件路径  可以用正则匹配 或者 包含文件路径的数组
 * 打包的顺序会根据你的输入数组的顺序来合并
 */
gulp.task('concat', function () {
    return gulp.src(['./src/js/common/jquery.js', './src/js/common/c.js']) //需要合并的文件
        .pipe(concat('all.js')) //合并后文件名称
        .pipe(uglify()) //压缩文件
        .pipe(gulp.dest('./dist/')); // 输出文件路径
});
/*
 * js concat-order
 * 执行任务 需要手动配置合并的文件路径  可以用正则匹配 或者 包含文件路径的数组
 * 打包的顺序会根据你的order配置前后顺序相关，越在上面的规则 会打在文件的头部
 */
gulp.task('concat-order', function () {
    return gulp.src(['./src/js/common/jquery.js', './src/js/common/c.js']) //需要合并的文件
        .pipe(order([
            "src/js/common/c.js",
            "src/**/*.js"
        ]))
        .pipe(concat('all.js')) //合并后文件名称
        .pipe(uglify()) //压缩文件
        .pipe(gulp.dest('./dist/')); // 输出文件路径
});

/*less编译*/
gulp.task('less', function () {
    return gulp.src('./src/css/*.css')
        .pipe(plumber())
        .pipe(changed('./dist/css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css'))
        .pipe(reload({stream: true}));
});

gulp.task('font', function () {
    return gulp.src(['./src/font/*.*'])
        .pipe(plumber())
        .pipe(gulp.dest('./dist/font'))
        .pipe(reload({stream: true}));
});

/*html头尾部件复用*/
gulp.task('fileinclude', function () {
    gulp.src(['./src/html/**/*.html'])
        .pipe(plumber())
        .pipe(changed('dist'))
        .pipe(include({
            prefix: '@@',
            basepath: '@file'
        }))
        // .pipe(minifyHtml()) //压缩
        .pipe(gulp.dest('dist/pages'))
        .pipe(reload({stream: true}));
});


/*图片压缩*/
gulp.task('images', function () {
    gulp.src('./src/img/*.*')
        .pipe(plumber())

        .pipe(changed('./dist/img'))
        .pipe(cache(imageminify({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true,//类型：Boolean 默认：false 多次优化svg直到完全优化
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        })))
        .pipe(gulp.dest('./dist/img'))
        .pipe(reload({stream: true}));
});
// 精灵图
gulp.task('sprite', function () {
    var spriteData = gulp.src('./src/img/sprite/*.png').pipe(spritesmith({
        imgName: 'img/sprite/sprite.png',
        cssName: 'css/sprite/sprite.css'
    }));
    return spriteData.pipe(gulp.dest('src/'));
});

gulp.task('watch', function () {
    gulp.watch('src/css/*.css', ['less']);
    gulp.watch('src/html/**/*.html', ['fileinclude']);
    gulp.watch('src/js/**/*.js', ['scripts']);
})
/*浏览器实时刷新*/
gulp.task('server', ['less', 'fileinclude', 'scripts'], function () {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch('src/css/*.css', ['less']);
    gulp.watch('src/html/*/*.html', ['fileinclude']);
    gulp.watch('src/js/*/*.js', ['scripts']);

});
/*清楚文件夹*/
gulp.task('clean', function () {
    return gulp.src(['dist']).pipe(clean());
});

gulp.task('default', ['server','images',"font"]);

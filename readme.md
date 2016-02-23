* install

```
npm install gulp-rem
```
* useage

gulp-rem works with hotcss.js

```
// gulpfile.js
var rem = require('gulp-rem');

gulp.task('build-css', function() {
    return gulp.src('./less/base.less')
    .pipe(plugins.less())
    .pipe(rem({
         width:640,
         unit:'pm'
    }))
    .pipe(plugins.cssmin())
    .pipe(gulp.dest('./css'))
});

//
```


* options

```
｛
	width: 640, // Width of the design draft
	unit: 'pm' // 单位为pm的会被转换为rem
｝

```

> sorry for my poor english ..




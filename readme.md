* install

```
npm install gulp-rem
```
* useage

```
// gulpfile.js
var rem = require('gulp-rem');

gulp.task('build-css', function() {
    return gulp.src('./less/base.less')
    .pipe(plugins.less())
    .pipe(rem({
         prop:40,
         unit:'pm'
    }))
    .pipe(plugins.cssmin())
    .pipe(gulp.dest('./css'))
});
```


* options

```
｛
	prop: 100, // default 100，1rem = 100px
	unit: 'pm' // default 'pm', 100pm will change to 1rem
｝

```

> sorry for may poor english ..




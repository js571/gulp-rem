var path           = require('path');
var through2       = require('through2');
var gutil          = require('gulp-util');
var assign         = require('object-assign');

var PluginError    = gutil.PluginError;

module.exports = function (options) {
  // Mixes in default options.
    options = assign({}, {
        width: 640,
        unit: 'px'
    }, options);

    function convert(contents){
        var str = contents.toString('utf8');
        var regex = new RegExp('\([?]*[0-9]+?)('+ options.unit +')','gi');
        str = str.replace(regex,function($0,$1) {
            var res  = $1*320/options.width/20;
            return res + 'rem';
        });
        return new Buffer(str);
    }    

    return through2.obj(function(file, enc, cb) {
        if (file.isNull()) {
          return cb(null, file);
        }

        if (file.isStream()) {
          return cb(new PluginError('gulp-rem', 'Streaming not supported'));
        }
        var str = file.contents.toString();
        file.contents = convert(file.contents);
        this.push(file);
        cb();
    });
}

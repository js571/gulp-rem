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
        // var regex2 = new RegExp('([a-zA-Z|-]*)[\\s]*\\:[\\s]*([0-9]*)[\\s]*px[\\s]*[;]*','gi');
        var regex2 = new RegExp('font\\-size[\\s]*\\:[\\s]*([0-9]*)[\\s]*px[\\s]*[;]*','gi');
        str = str.replace(regex,function($0,$1) {
            var res  = $1*320/options.width/20;
            return res + 'rem';
        });


        str = str.replace(regex2,function($0,$2) {
            var tmp = `font-size: ${$2/2}px;
                        [data-dpr="1.5"] &{
                            font-size: ${$2*1.5/2}px;
                        }
                        [data-dpr="2"] &{
                            font-size: ${$2}px;
                        }
                        [data-dpr="2.5"] &{
                            font-size: ${$2*2.5/2}px;
                        }
                        [data-dpr="2.75"] &{
                            font-size: ${$2*2.75/2}px;
                        }
                        [data-dpr="3"] &{
                            font-size: ${$2*3/2}px;
                        }
                        [data-dpr="3.25"] &{
                            font-size: ${$2*3.25/2}px;
                        }
                        [data-dpr="3.5"] &{
                            font-size: ${$2*3.5/2}px;
                        }
                        [data-dpr="3.75"] &{
                            font-size: ${$2*3.75/2}px;
                        }
                        [data-dpr="4"] &{
                            font-size: ${$2*4/2}px;
                        }`;
            return tmp;
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

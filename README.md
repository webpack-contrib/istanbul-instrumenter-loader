## Istanbul instrumenter loader for [webpack](https://webpack.github.io/)

[![travis](http://img.shields.io/travis/deepsweet/istanbul-loader.svg?style=flat-square)](https://travis-ci.org/deepsweet/istanbul-loader)
[![npm](http://img.shields.io/npm/v/istanbul-loader.svg?style=flat-square)](https://www.npmjs.org/package/istanbul-loader)
[![peer deps](http://img.shields.io/david/peer/deepsweet/istanbul-loader.svg?style=flat-square)](https://david-dm.org/deepsweet/istanbul-loader#info=peerDependencies)
[![dev deps](http://img.shields.io/david/dev/deepsweet/istanbul-loader.svg?style=flat-square)](https://david-dm.org/deepsweet/istanbul-loader#info=devDependencies)
![unicorn approved](http://img.shields.io/badge/unicorn-approved-ff69b4.svg?style=flat-square)

Instrument JS files with [Istanbul](https://github.com/gotwarlost/istanbul) for subsequent code coverage reporting.<br/>
"Forked" from [unfold/istanbul-instrument-loader](https://github.com/unfold/istanbul-instrument-loader).

### Install

```sh
npm i -S istanbul-loader
```

### Usage

Useful to get work together [karma-webpack](https://github.com/webpack/karma-webpack) and [karma-coverage](https://github.com/karma-runner/karma-coverage). For example:

1. [karma-webpack config](https://github.com/webpack/karma-webpack#karma-webpack)
2. [karma-coverage config](https://github.com/karma-runner/karma-coverage#configuration)
3. replace `karma-coverage`'s code instrumenting with `istanbul-loader`'s one:

```javascript
config.set({
    ...
    files: [
      // 'src/**/*.js', << you don't need this anymore
      'test/**/*.js'
    ],
    ...
    preprocessors: {
        // 'src/**/*.js': ['coverage'] << and this too
        'test/**/*.js': [ 'webpack' ]
    },
    reporters: [ 'progress', 'coverage' ],
    coverageReporter: {
        type: 'html',
        dir: 'coverage/'
    },
    ...
    webpack: {
        ...
        module: {
            preLoaders: [ { // << add istanbul-loader as webpack's preloader
                test: /\.js$/,
                exclude: /(test|node_modules|bower_components)\//,
                loader: 'istanbul-loader'
            } ],
            loaders: [ ... ]
        },
        ...
    }
});
```

[Documentation: Using loaders](https://webpack.github.io/docs/using-loaders.html).

### License
[WTFPL](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-strip.jpg)

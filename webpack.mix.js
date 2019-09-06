const mix = require('laravel-mix');

mix.react('resources/js/app.js', 'public/js')
   .less('resources/less/app.less', 'public/css',  {
        javascriptEnabled: true
    })
   .sourceMaps()
   .browserSync({
        proxy: '127.0.0.1:8000'
   })
   .webpackConfig({
        resolve: {
            alias: {
                '~': path.resolve('resources/js')
            }
        }
    });

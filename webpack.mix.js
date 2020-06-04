const mix = require('laravel-mix');
const dotenv = require('dotenv');

dotenv.config();

mix.react('resources/js/app.js', 'public/js')
   .less('resources/less/app.less', 'public/css',  {
        javascriptEnabled: true
    })
   .sourceMaps()
   .browserSync({
        proxy: `127.0.0.1:${process.env.DOCKER_SERVER_CONTAINER_PORT}`
   })
   .webpackConfig({
        resolve: {
            alias: {
                '~': path.resolve('resources/js')
            }
        }
    });

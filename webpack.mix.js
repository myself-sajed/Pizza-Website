// webpack.mix.js

let mix = require('laravel-mix');

mix.js('resources/js/explore.js', 'public/js/explore.js').sass('resources/scss/app.scss', 'public/style/app.css');

mix.babelConfig({
    "plugins": ["@babel/plugin-proposal-class-properties"]
});
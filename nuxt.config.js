const ExtractTextPlugin = require('extract-text-webpack-plugin')

const dirPublic = '/public/'
const dirJS = 'js/'
const dirStyle = 'css/'

const prod = process.env.NODE_ENV === 'production'

const extractCSS = new ExtractTextPlugin({
  filename: dirStyle + '[name].[contenthash].css',
  allChunks: true
});

module.exports = {
  mode: 'spa',

  srcDir: './src',

  // router: {
  //   // mode: 'hash',
  //   // base: '',
  //   extendRoutes (routes, resolve) {
  //     // console.log(routes);
  //     const ext = '.aspx';
  //     routes.forEach((route) => {
  //       // route.name = (route.name.split('-').join('/') + ext);
  //
  //       // console.log(route);
  //       if (route.path === '/') {
  //         route.path = '/index' + ext;
  //       } else if (route.path && route.path.length > 1) {
  //         // route.alias = route.path + ext;
  //         route.path += ext;
  //       }
  //     });
  //     // console.log(routes);
  //   }
  // },

  plugins: [
    { src: '~/plugins/mint-ui.js', ssr: false },
    // { src: '~/plugins/vconsole.js', ssr: false }, // Develop
  ],

  css: [
    '~/assets/css/main.scss'
  ],

  head: {
    title: '[TITLE]',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
      { 'http-equiv': 'Cache-Control', content: 'no-siteapp' },
      { name: 'description', content: '', hid: 'description' },
      // { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { name: 'renderer', content: 'webkit' },
      { name: 'format-detection', content: 'telphone=no, email=no' },
      { name: 'HandheldFriendly', content: 'true' },
      { name: 'browsermode', content: 'application' },
      { name: 'x5-page-mode', content: 'app' },
      { name: 'msapplication-tap-highlight', content: 'no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  cache: false,

  loading: { color: '#3B8070' },

  build: {
    extractCSS: true,

    publicPath: dirPublic,

    filenames: {
      vendor: dirJS + 'vendor.[hash].js',
      app: dirJS + 'app.[chunkhash].js',
      manifest: dirJS + 'manifest.[hash].js',
      chunk: dirJS + '[name].[chunkhash].js',
      css: dirStyle + '[name].[contenthash].css'
    },

    vendor: [
      'babel-polyfill',
      'axios',
      'qs'
    ],

    // https://www.w3cplus.com/mobile/vw-layout-in-vue.html
    postcss:[
      require('postcss-import')(),
      require('postcss-url')(),
      require('postcss-aspect-ratio-mini')(),
      require('postcss-write-svg')(),
      require('postcss-cssnext')(),
      require('postcss-px-to-viewport')({
        viewportWidth: 750,   // (Number) The width of the viewport.
        viewportHeight: 1334, // (Number) The height of the viewport.
        unitPrecision: 5,     // (Number) The decimal numbers to allow the REM units to
                              // grow to.
        viewportUnit: 'vw',   // (String) Expected units.
        selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore
                                                      // and leave as px.
        minPixelValue: 1,     // (Number) Set the minimum pixel value to replace.
        mediaQuery: false     // (Boolean) Allow px to be converted in media queries.
      }),
      require('postcss-viewport-units')(),
      require('cssnano')({
        preset: 'advanced',
        autoprefixer: false,
        'postcss-zindex': false
      })
    ],

    loaders: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              extractCSS: true,
              loaders: {
                css: ExtractTextPlugin.extract({
                  use: 'css-loader',
                  fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
                })
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: ['sass-loader'],
            options: {
              outputStyle: 'expanded'
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        // 重要：使用 vue-style-loader 替代 style-loader
        use: extractCSS.extract([
          'vue-style-loader',
          'sass-loader',
          // 'postcss-loader',
          'css-loader'
        ]),
        options: {
          outputStyle: 'expanded'
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000, // 1KB
              // name: 'img/[name].[hash:7].[ext]'
              name: 'img/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000, // 1 KB
              // name: 'fonts/[name].[hash:7].[ext]'
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      }
    ],

    plugins: [
      extractCSS
    ],

    babel: {
      presets: ['vue-app', 'es2015', 'stage-3'],
      plugins: [
        'transform-runtime'
      ]
    },

    /*
     ** Run ESLint on save
     */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  generate: {
    dir: 'dist',
    subFolders: false,

    minify: {
      minifyCSS: false,
      minifyJS: false,
      collapseBooleanAttributes: true,
      collapseWhitespace: false,
      decodeEntities: true,
      processConditionalComments: true,
      removeAttributeQuotes: false,
      removeComments: true,
      removeEmptyAttributes: false,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: false,
      removeStyleLinkTypeAttributes: false,
      removeTagWhitespace: false,
      sortAttributes: false,
      sortClassName: false,
      trimCustomFragments: false,
      useShortDoctype: true
    }
  },

  dev: !prod
}

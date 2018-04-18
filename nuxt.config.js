const ExtractTextPlugin = require('extract-text-webpack-plugin')

const dirPublic = '/public/'
const dirJS = 'js'
const dirStyle = 'css'

const prod = process.env.NODE_ENV === 'production'

const extractCSS = new ExtractTextPlugin({
  filename: dirStyle + '/[name].[contenthash].css',
  allChunks: true
});

module.exports = {
  srcDir: './src',

  css: [
    '~/assets/css/main.scss'
  ],

  head: {
    title: '[TITLE]',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '[DESCRIPTION]' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: { color: '#3B8070' },

  build: {
    cache: false,
    extractCSS: true,

    publicPath: dirPublic,

    filenames: {
      vendor: dirJS + '/vendor.[hash].js',
      app: dirJS + '/app.[chunkhash].js',
      manifest: dirJS + '/manifest.[hash].js',
      chunk: dirJS + '/[name].[chunkhash].js',
      css: dirStyle + '/[name].[contenthash].css'
    },

    vendor: [],

    // https://www.w3cplus.com/mobile/vw-layout-in-vue.html
    postcss: [
      require('postcss-import')(),
      require('postcss-url')(),
      require('postcss-aspect-ratio-mini')(),
      require('postcss-write-svg')(),
      require('postcss-cssnext')(),
      require('postcss-px-to-viewport')({
        viewportWidth: 750,   // (Number) The width of the viewport.
        viewportHeight: 1334, // (Number) The height of the viewport.
        unitPrecision: 5,     // (Number) The decimal numbers to allow the REM units to grow to.
        viewportUnit: 'vw',   // (String) Expected units.
        selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave
                                                      // as px.
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
      },
      {
        test: /\.scss$/,
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded'
        }
      },
      {
        test: /\.css$/,
        // 重要：使用 vue-style-loader 替代 style-loader
        use: extractCSS.extract(['vue-style-loader', 'css-loader', 'sass-loader']),
        options: {
          outputStyle: 'expanded'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1KB
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1 KB
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ],

    plugins: [
      extractCSS
    ],

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
    subFolders: false,
    minify: {
      minifyCSS: false,
      minifyJS: false,
      collapseBooleanAttributes: true,
      collapseWhitespace: false,
      decodeEntities: true,
      processConditionalComments: true,
      removeAttributeQuotes: false,
      removeComments: false,
      removeEmptyAttributes: true,
      removeOptionalTags: false,
      removeRedundantAttributes: false,
      removeScriptTypeAttributes: false,
      removeStyleLinkTypeAttributes: false,
      removeTagWhitespace: false,
      sortAttributes: false,
      sortClassName: false,
      trimCustomFragments: true,
      useShortDoctype: true
    }
  },

  dev: !prod
}

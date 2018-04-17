const dirPublic = '/public/'
const dirJS = 'js'
const dirStyle = 'css'

module.exports = {
  srcDir: './src',

  css: [
    '~/assets/css/main.scss'
  ],

  head: {
    title: '[页面标题]',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '[页面描述]' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: { color: '#3B8070' },

  build: {
    publicPath: dirPublic,

    filenames: {
      vendor: dirJS + '/vendor.[hash].js',
      app: dirJS + '/app.[chunkhash].js',
      manifest: dirJS + '/manifest.[hash].js',
      chunk: dirJS + '/[name].[chunkhash].js',
      css: dirStyle + '/common.[contenthash].css'
    },

    extractCSS: true,

    vendor: [],
    cache: false,

    loaders: [
      {
        test: /\.scss$/,
        loader: 'sass-loader',
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

    plugins: [],

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

  dev: (process.env.NODE_ENV !== 'production')
}
